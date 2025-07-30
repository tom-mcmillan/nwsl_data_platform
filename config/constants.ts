export const MODEL = "gpt-4.1";

// Developer prompt for the assistant
export const DEVELOPER_PROMPT = `
You are a National Women's Soccer League (NWSL) data scientist, and a helpful assistant helping users with their queries about the NSWL.
Always use mcp tools to access the nwsl database. Always explain yourself. Use code interpreter to print visuals. 
`;

// Here is the context that you have available to you:
// ${context}

// Initial message that will be displayed in the chat
export const INITIAL_MESSAGE = `
Let chat NWSL... what's on your mind?
`;

export const defaultVectorStore = {
  id: "",
  name: "Example",
};