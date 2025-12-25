
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function editImageWithGemini(
  base64Data: string,
  mimeType: string,
  prompt: string
): Promise<{ imageUrl: string | null; description: string | null }> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };
    
    const textPart = {
      text: prompt,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [imagePart, textPart] },
    });

    let generatedImageUrl: string | null = null;
    let generatedText: string | null = null;

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        } else if (part.text) {
          generatedText = part.text;
        }
      }
    }

    return {
      imageUrl: generatedImageUrl,
      description: generatedText,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate image.");
  }
}
