import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const buf = fs.readFileSync('real_images/1.webp');
    const imagePart = {
      inlineData: {
        mimeType: 'image/webp',
        data: buf.toString('base64')
      }
    };
    const textPart = {
      text: 'Analyze this image and describe the space, style, and major elements in detail.'
    };
    
    const res = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: { parts: [imagePart, textPart] }
    });
    console.log('SUCCESS:', res.text);
  } catch (e: any) {
    console.error('FAILED:', e.message);
  }
}

test();
