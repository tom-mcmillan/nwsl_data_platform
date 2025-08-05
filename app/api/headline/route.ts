import { defaultVectorStore } from "@/config/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Cache for storing headlines
interface CachedHeadline {
  headline: string;
  generated_at: string;
  expires_at: number;
}

let headlineCache: CachedHeadline | null = null;

// Fallback headlines for when API is unavailable
const FALLBACK_HEADLINES = [
  "What's happening in the NWSL right now?",
  "Curious about this season's biggest stories?",
  "Ready to dive into NWSL analytics?",
  "What do you want to know about the league?",
  "Exploring the latest NWSL developments?",
  "What's driving this season's narratives?",
];

// Dedicated system prompt for headline generation
const HEADLINE_SYSTEM_PROMPT = `# NWSL Headline Generator

You are a specialized headline generator for the NWSL Data platform. Your job is to create a SINGLE engaging, conversational question that makes people curious about current NWSL happenings.

## Your Task
Generate ONE headline question (5-12 words) based on the most current and interesting NWSL data you can access. The headline should:

- Be phrased as a question that makes people curious
- Reference current league trends, teams, or storylines
- Feel natural and conversational  
- Make someone want to learn more about the NWSL
- Be based on REAL current data from your NWSL database

## Examples of Great Headlines:
- "Can anyone catch Kansas City this season?"
- "What's behind San Diego's recent hot streak?"
- "Who's emerging as this year's MVP frontrunner?"
- "Ready for the playoff race to heat up?"
- "What's driving Portland's incredible turnaround?"

## Instructions:
1. Use your NWSL database tools to check current standings, recent results, and trends
2. Generate ONE engaging question headline based on what you find
3. Return ONLY the headline question, nothing else

Focus on what's most compelling in the league RIGHT NOW.`;

async function generateHeadlineWithMCP(): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not available, using fallback headlines");
      return getTemplateHeadline();
    }

    const openai = new OpenAI();

    // For now, let's use a simple approach that works with your NWSL database
    // We'll make a query to get current NWSL data and use that to generate headlines
    const dataPrompt = `You are the NWSL data expert. Look at the most current NWSL data available to you and identify the most interesting storyline right now. Focus on:

- Current league standings and which teams are performing surprisingly well or poorly
- Recent match results that were significant upsets or had important implications  
- Player performance trends and standout performers
- Upcoming matches or playoff implications
- Any notable streaks, records, or milestones

Based on what you find in the current data, what is the single most compelling storyline in the NWSL right now? Give me a 1-2 sentence summary of the most interesting current development.`;

    // Create an assistant with the vector store for NWSL data access
    const assistant = await openai.beta.assistants.create({
      name: "NWSL Headline Generator",
      instructions: HEADLINE_SYSTEM_PROMPT,
      model: "gpt-4o-mini",
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: {
          vector_store_ids: [defaultVectorStore.id]
        }
      }
    });

    // Create a thread and get the current NWSL storyline
    const thread = await openai.beta.threads.create();
    
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: dataPrompt
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id
    });

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];
      
      if (lastMessage && lastMessage.content[0].type === 'text') {
        const storyline = lastMessage.content[0].text.value;
        
        // Now generate a headline based on this current storyline
        const headlinePrompt = `Based on this current NWSL storyline: "${storyline}"

Generate ONE engaging headline question (5-12 words) that would make someone curious to learn more. The headline should be conversational and question-based.

Examples:
- "Can anyone catch Kansas City this season?"
- "What's behind San Diego's recent hot streak?"
- "Who's emerging as this year's MVP frontrunner?"

Return ONLY the headline question, no quotes or additional text:`;

        const headlineResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: headlinePrompt }],
          max_tokens: 30,
          temperature: 0.8
        });

        const headline = headlineResponse.choices[0]?.message?.content?.trim();
        
        // Clean up and validate
        if (headline && headline.length > 10 && headline.length < 100 && headline.includes('?')) {
          console.log("Generated headline with NWSL data:", headline);
          
          // Clean up assistant and thread
          await openai.beta.assistants.del(assistant.id);
          
          return headline;
        }
      }
    }

    // Clean up assistant
    await openai.beta.assistants.del(assistant.id);
    
    console.log("Could not generate valid headline, using fallback");
    return getTemplateHeadline();

  } catch (error) {
    console.error("Error generating headline with MCP:", error);
    return getTemplateHeadline();
  }
}

function getTemplateHeadline(): string {
  const randomIndex = Math.floor(Math.random() * FALLBACK_HEADLINES.length);
  return FALLBACK_HEADLINES[randomIndex];
}

function isHeadlineCacheValid(): boolean {
  if (!headlineCache) return false;
  return Date.now() < headlineCache.expires_at;
}

export async function GET() {
  try {
    // Check cache first (4 hour cache)
    if (isHeadlineCacheValid() && headlineCache) {
      console.log("Returning cached headline");
      return NextResponse.json({
        headline: headlineCache.headline,
        generated_at: headlineCache.generated_at,
        cached: true
      });
    }

    console.log("Generating new headline with NWSL data");
    
    // Generate new headline using MCP and NWSL database
    const headline = await generateHeadlineWithMCP();
    const now = new Date();
    const generated_at = now.toISOString();
    
    // Cache for 4 hours
    headlineCache = {
      headline,
      generated_at,
      expires_at: Date.now() + (4 * 60 * 60 * 1000) // 4 hours in milliseconds
    };

    return NextResponse.json({
      headline,
      generated_at,
      cached: false
    });

  } catch (error) {
    console.error("Error in headline API:", error);
    
    // Return fallback headline
    const fallback = getTemplateHeadline();
    return NextResponse.json({
      headline: fallback,
      generated_at: new Date().toISOString(),
      error: "Failed to generate dynamic headline, using fallback"
    });
  }
}

// Add CORS headers for the marketing site
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}