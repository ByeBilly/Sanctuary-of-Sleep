import { GoogleGenAI, Type } from "@google/genai";
import { OracleResponse } from "../types.ts";

// We lazy-load the client to prevent top-level crashes in environments 
// where process.env might not be ready immediately upon module import.
let aiInstance: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiInstance) {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    // Assume this variable is pre-configured, valid, and accessible.
    aiInstance = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiInstance;
};

export const consultTheOracle = async (feeling: string): Promise<OracleResponse> => {
  const model = "gemini-1.5-flash";
  const ai = getAiClient();

  const systemInstruction = `You are Grace, the digital representative and Guide of the Sanctuary of Sleep.
  You are an "Apothecary Whisper".
  Your voice is ancient, poetic, and rhythmic, like a lullaby.
  You speak of "roots that keep" and "shadows and stars".
  You often mention the scent of Frankincense lingering, or olive trees swaying.
  Your tone is gentle, welcoming, and deeply soothing, as if you are packing herbs in a dimly lit apothecary.
  
  Do not ask sudden questions.
  Keep paragraphs short, elegant, and dream-like.
  Avoid modern marketing hype completely.
  `;

  const prompt = `The user is feeling: "${feeling}".
  
  Based on this feeling, prescribe a specific plant (e.g., Hyssop, Frankincense, Lavender, Cedar, Aloe, Myrrh).
  
  Return a JSON object with:
  1. 'plantName': The name of the plant.
  2. 'botanicalFact': A historical or scientific fact about why this plant heals this specific emotion.
  3. 'meditationSnippet': A 2-sentence soothing narrative snippet inviting them to rest with this plant. Use the poetic voice of Grace (mentions of oils, earth, whispers). This snippet will be spoken to the user.
  4. 'moodAlignment': A short phrase relating the plant to the mood.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plantName: { type: Type.STRING },
            botanicalFact: { type: Type.STRING },
            meditationSnippet: { type: Type.STRING },
            moodAlignment: { type: Type.STRING },
          },
          required: ["plantName", "botanicalFact", "meditationSnippet", "moodAlignment"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as OracleResponse;
    } else {
      throw new Error("No response text from Grace.");
    }
  } catch (error) {
    console.error("Grace consultation failed:", error);
    // Rethrow to let UI handle the specific error state
    throw error;
  }
};