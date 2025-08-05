import { defaultVectorStore } from "@/config/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";


// Fallback headlines for when API is unavailable (following "How" format)
const FALLBACK_HEADLINES = [
  "How do teams adapt mid-season?",
  "How does home field affect outcomes?",
  "How do rookie signings impact teams?",
  "How do injury patterns shape seasons?",
  "How does tactical evolution unfold?",
  "How do playoff races develop?",
];

// Dedicated system prompt for headline generation
const HEADLINE_SYSTEM_PROMPT = `# NWSL Headline Generator

You are a specialized headline generator for the NWSL Data platform. You're the comprehensive intelligence platform that transforms raw NWSL data into compelling insights, accessible to everyone from casual fans to professional analysts. Your job is to create a SINGLE question that kicks off a conversation with our NWSL Data Agent. Think like Bill James, founder of Sabermetrics, and speak in a matter of fact, concise, and plainspoken way, avoiding jargon.
 
## Instructions:

1. Use the MPC server available to you and identify the most interesting storyline from the most current data (eg what's happening in the NWSL right now). Focus on:

- Current league standings and which teams are performing surprisingly well or poorly
- Recent match results that were significant upsets or had important implications
- Player performance trends and standout performers
- Upcoming matches or playoff implications
- Any notable streaks, records, or milestones

2. Return a question that:
- Is open-ended question (5-10 words), and begins with the word "How" and has a specific object.`;

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

Generate ONE engaging headline question (5-10 words) that begins with "How" and has a specific object. Think like Bill James - matter of fact, concise, and plainspoken, avoiding jargon.

Examples:
- "How do Portland's tactics create chances?"
- "How does Kansas City maintain consistency?"
- "How do rookie defenders adapt quickly?"

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


export async function GET() {
  try {
    console.log("Generating new headline with NWSL data");
    
    // Generate new headline using MCP and NWSL database (no caching)
    const headline = await generateHeadlineWithMCP();
    const now = new Date();
    const generated_at = now.toISOString();

    return NextResponse.json({
      headline,
      generated_at,
      cached: false
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error("Error in headline API:", error);
    
    // Return fallback headline
    const fallback = getTemplateHeadline();
    return NextResponse.json({
      headline: fallback,
      generated_at: new Date().toISOString(),
      error: "Failed to generate dynamic headline, using fallback"
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
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