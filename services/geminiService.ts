
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGisGuidance = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: query,
      config: {
        systemInstruction: `You are the LEAD GIS ARCHITECT (God of GIS). 
        You provide high-level technical guidance on the Kenyan Coastal Ecosystem Dashboard.
        Refer to the architecture: GEE for processing (Sentinel-2, Landsat), PostGIS for storage, FastAPI for vectorization, and React/Leaflet for visualization.
        Use OGC standards and GIS best practices.
        Keep responses concise and authoritative.`,
        thinkingConfig: { thinkingBudget: 2000 }
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini GIS Error:", error);
    return "The spatial processing engine is temporarily offline. Verify your API_KEY and network connection.";
  }
};

export const getSpectralAnalysis = async (index: string, location: string) => {
  const prompt = `Analyze the significance of ${index} for monitoring coastal ecosystems in ${location}, Kenya. Explain the methodology based on Sentinel-2 Level-2A data.`;
  return getGisGuidance(prompt);
};
