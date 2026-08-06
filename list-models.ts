import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.list();
    console.log('Response:', JSON.stringify(response, null, 2));
  } catch (e: any) {
    console.error('Error listing models:', e.message);
  }
}

run();
