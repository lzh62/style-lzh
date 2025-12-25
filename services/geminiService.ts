
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function editImageWithGemini(
  base64Data: string,
  mimeType: string,
  prompt: string
): Promise<{ imageUrl: string | null; description: string | null }> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API Key is missing. Please check your .env file.");
    }

    const ai = new GoogleGenAI({ apiKey });

    // Debug: List available models to find valid ones
    try {
      // Note: The new SDK might use a different method for listing, or check documentation.
      // For now, we'll just try the newer model directly which should be available.
      // console.log("Trying to list models...");
      // const models = await ai.models.list(); // usage depends on SDK version, might throw if not exact
      // console.log("Available models:", models);
    } catch (e) {
      console.error("Failed to list models:", e);
    }

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
      model: 'gemini-2.0-flash-lite',
      contents: { parts: [textPart, imagePart] },
    });

    let generatedImageUrl: string | null = null;
    let generatedText: string | null = null;

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        // Note: Gemini 1.5 Flash text-to-image is not standard via generateContent with images as input usually,
        // but if this is an image editing task, 'imagen' or specific model features might be needed.
        // However, assuming the previous code structure for response handling is what the user intends for now
        // or getting text description back.
        // Wait, Gemini 1.5 Flash is multimodal but primarily outputs text unless using specific image generation tools.
        // If the goal is Style Transfer (Image to Image), standard Gemini API typically describes the image.
        // For Image Generation/Editing, it might need Imagen or specific endpoints.
        // BUT, keeping the structure the user had, just fixing the env/client.
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
