import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const images = [
  { file: "1.webp", id: "walnut-residence" },
  { file: "2.webp", id: "gourmet-kitchen" },
  { file: "3.webp", id: "executive-lounge" },
  { file: "4.webp", id: "bronze-oasis-bedroom" },
  { file: "5.webp", id: "commercial-showroom" },
  { file: "6.webp", id: "bespoke-living-lounge" },
  { file: "7.webp", id: "arch-villa-dining" },
  { file: "8.webp", id: "executive-suite" },
  { file: "9.webp", id: "custom-wardrobe-suite" },
  { file: "10.webp", id: "travertine-lounge" },
  { file: "11.webp", id: "acoustic-timber-residence" },
  { file: "12.webp", id: "fluted-vitrine-gallery" },
  { file: "13.webp", id: "sculptural-plaster-nook" }
];

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const results: Record<string, any> = {};
  
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const filePath = path.join(process.cwd(), 'real_images', img.file);
    console.log(`Analyzing ${i + 1}/${images.length}: ${img.file} (${img.id})...`);
    
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const buf = fs.readFileSync(filePath);
      const imagePart = {
        inlineData: {
          mimeType: 'image/webp',
          data: buf.toString('base64')
        }
      };
      
      const textPart = {
        text: `Analyze this interior design image and describe the space, style, and major elements in detail.
Also, provide:
1. A suggested highly accurate Title for this project (e.g., "Warm Walnut Residence Bedroom", "Contemporary Minimalist Kitchen", etc., based strictly on the actual visual contents).
2. A high-quality, elegant, professional description of the space (exactly 2-3 sentences), highlighting materials, lighting, layout, and atmosphere.
3. A list of key design features/tags (exactly 4 items) that are visible in the image.

Return your response strictly in JSON format with the following fields:
{
  "title": "...",
  "description": "...",
  "features": ["...", "...", "...", "..."]
}
Do not include any markdown block formatting like \`\`\`json. Return only the raw JSON.`
      };

      const res = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: { parts: [imagePart, textPart] }
      });
      
      const cleanedText = res.text?.replace(/```json/g, '').replace(/```/g, '').trim() || '';
      try {
        const parsed = JSON.parse(cleanedText);
        results[img.id] = parsed;
        console.log(`Success ${img.id}:`, parsed.title);
      } catch (parseErr) {
        console.log(`Raw output for ${img.id}:`, res.text);
        throw new Error(`JSON parsing failed for ${img.id}`);
      }
      
    } catch (e: any) {
      console.error(`Failed ${img.id}:`, e.message);
      results[img.id] = { error: e.message };
    }
    
    // Safety delay to respect rate limit
    if (i < images.length - 1) {
      console.log('Sleeping for 6 seconds...');
      await sleep(6000);
    }
  }
  
  fs.writeFileSync('img_analysis_detailed.json', JSON.stringify(results, null, 2));
  console.log('Finished all analyses! Written to img_analysis_detailed.json');
}

run();
