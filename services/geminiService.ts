
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProjectBrief = async (prompt: string): Promise<AIResponse> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this project brief and provide a professional scope: "${prompt}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          summary: { type: Type.STRING },
          features: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedTimeline: { type: Type.STRING },
          recommendedStack: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          complexity: { 
            type: Type.STRING,
            enum: ['Low', 'Medium', 'High']
          }
        },
        required: ["projectName", "summary", "features", "estimatedTimeline", "recommendedStack", "complexity"]
      },
      systemInstruction: "You are a senior digital consultant. Your goal is to help a client define their project requirements for a web/app developer or logo designer. Provide realistic, high-quality professional insights."
    }
  });

  return JSON.parse(response.text);
};

export const generatePromoPoster = async (brandName: string, service: string): Promise<string | null> => {
  const prompt = `A professional, high-end digital marketing poster for a business named "${brandName}". 
  The poster should showcase "${service}" services. 
  Style: Modern, sleek, dark tech aesthetic, glowing neon accents in indigo and purple. 
  It should look like a professional LinkedIn or Instagram promotional graphic. 
  Include abstract digital elements like 3D shapes, clean typography, and a sense of innovation. 
  No faces, just professional abstract tech design.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: prompt }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
