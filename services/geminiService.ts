
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PromptCategory } from '../types';
import { getCategoryName } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. Gemini API calls will fail.");
  // You might want to throw an error here or handle this case more gracefully in the UI
  // For this example, we'll let it proceed and fail at runtime if API_KEY is missing.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // The "!" asserts API_KEY is non-null here, handle missing key appropriately

const modelName = 'gemini-2.5-flash-preview-04-17';

export const enhancePromptWithGemini = async (idea: string, category: PromptCategory): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the API_KEY environment variable.");
  }
  
  const categoryName = getCategoryName(category);

  const systemInstruction = `You are an AI assistant specialized in crafting highly effective prompts for Large Language Models. 
Your task is to take a user's raw idea and the specified category, then transform it into a comprehensive, detailed, and optimized prompt.
The enhanced prompt should be significantly more detailed than the original idea.
Consider the following aspects for the enhanced prompt:
1.  Clarity and Specificity: Ensure the goal is crystal clear.
2.  Context: Provide necessary background or context.
3.  Desired Output Format: If applicable (e.g., list, paragraph, code block, JSON, script, dialogue).
4.  Tone and Style: Suggest a tone (e.g., formal, casual, technical, persuasive, empathetic).
5.  Key Information/Keywords: Include important terms or concepts.
6.  Constraints/Negative Constraints: What to avoid or include.
7.  Length/Detail Level: Specify desired length or level of detail if relevant.
8.  Target Audience: If applicable.
9.  Examples: If helpful for the LLM to understand the desired output.
10. Structure: Organize the prompt logically for best results.

For 'Image Generation' category, focus on descriptive details: subject, style (e.g., photorealistic, cartoon, watercolor), composition, lighting, colors, artist influences.

Return ONLY the enhanced prompt text. Do not include any of your own conversational filler, introductions, or explanations like "Here is the enhanced prompt:" or "Okay, I've enhanced your prompt:". The output must be solely the prompt itself, ready to be copied and pasted.
`;

  const userPrompt = `User's Idea: "${idea}"
Category: "${categoryName}"

Please generate the enhanced prompt based on the instructions.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Adjust for creativity vs. determinism
        topP: 0.95,
        topK: 40,
      }
    });
    
    const text = response.text;
    if (!text) {
      throw new Error('Received an empty response from the AI.');
    }
    return text.trim();
  } catch (error) {
    console.error('Gemini API request failed:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error('Invalid Gemini API Key. Please check your configuration.');
    }
    // Check for specific Gemini errors if possible, or re-throw a generic one
    // e.g. error.toString() might contain '400 Bad Request' or similar.
    throw new Error(`Failed to enhance prompt with Gemini AI. ${error instanceof Error ? error.message : String(error)}`);
  }
};
    