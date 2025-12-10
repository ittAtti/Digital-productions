import { GoogleGenAI } from "@google/genai";

// Safely access process.env for browser compatibility
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

// Initialize Gemini Client
// Note: In a production environment, you should proxy these requests through a backend
// to avoid exposing your API KEY if it's not restricted to a specific domain.
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey: apiKey });
} else {
  // Silent fallback - prompts will use simulation mode
  // console.warn("Gemini API Key is missing. AI features will mimic response.");
}

export const generateAgentContent = async (prompt: string): Promise<string> => {
  if (!ai) {
    // Fallback simulation if no key is present for demo purposes
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if it's the specific marketing prompt to give a better demo response
    if (prompt.includes("marketing")) {
      return `## 🚀 Nonstop Sales Launch Sequence (Demo Output)

### 1. The Hook (LinkedIn/X)
**"Stop tracking expenses. Start tracking profit."**
Most freelancers are bookkeeping like it's 1999. I just automated my entire tax year in 15 minutes. Here's the exact stack I used (and why your accountant might hate it). 🧵👇

### 2. The Value Ladder
*   **Lead Magnet:** "The 15-Minute Tax Audit" (Free PDF Checklist)
*   **Tripwire ($29):** "Freelance Finance Dashboard" (Notion Template)
*   **Core Offer ($199):** "Small Business Financial Automation Mastery" (Video Course)

### 3. The Scarcity (48-Hour Bonus)
*"Buy the dashboard in the next 48 hours and get my 'Audit-Proof Receipt Organizer' custom GPT for FREE."*

*(Add your API Key to see real-time AI generation)*`;
    }
    
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