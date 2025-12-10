import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
// Note: In a production environment, you should proxy these requests through a backend
// to avoid exposing your API KEY if it's not restricted to a specific domain.
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
} else {
  console.warn("Gemini API Key is missing. AI features will mimic response.");
}

export const generateAgentContent = async (prompt: string): Promise<string> => {
  if (!ai) {
    // Fallback simulation if no key is present for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "API Key missing. Please configure process.env.API_KEY to see real AI generation.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert business consultant and digital product strategist. Return the output in clean, formatted Markdown.",
      }
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate content.");
  }
};
