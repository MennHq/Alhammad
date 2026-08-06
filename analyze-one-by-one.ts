import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const projects = [
  { id: "walnut-residence", file: "tmp_img_analysis/1.webp", currentTitle: "The Smoked Walnut Manor Penthouse" },
  { id: "gourmet-kitchen", file: "tmp_img_analysis/2.webp", currentTitle: "The Cocoa Minimalist Kitchen Suite" },
  { id: "executive-lounge", file: "tmp_img_analysis/3.webp", currentTitle: "Creative Studio HQ Boardroom" },
  { id: "bronze-oasis-bedroom", file: "tmp_img_analysis/4.webp", currentTitle: "The Bronze Haven Master Suite" },
  { id: "commercial-showroom", file: "tmp_img_analysis/5.webp", currentTitle: "The Terrazzo & Oak Boutique Showroom" },
  { id: "bespoke-living-lounge", file: "tmp_img_analysis/6.webp", currentTitle: "The Espresso Modular Residence" },
  { id: "arch-villa-dining", file: "tmp_img_analysis/7.webp", currentTitle: "The Ivory & Cedar Architectural Villa" },
  { id: "executive-suite", file: "tmp_img_analysis/8.webp", currentTitle: "The Obsidian Executive Office Suite" },
  { id: "custom-wardrobe-suite", file: "tmp_img_analysis/9.webp", currentTitle: "Bespoke Fluted Timber Master Wardrobe" },
  { id: "travertine-lounge", file: "tmp_img_analysis/10.webp", currentTitle: "The Travertine & Cedar Lounge" },
  { id: "acoustic-timber-residence", file: "tmp_img_analysis/11.webp", currentTitle: "Acoustic Timber Feature Residence" },
  { id: "fluted-vitrine-gallery", file: "tmp_img_analysis/12.webp", currentTitle: "The Fluted Walnut Vitrine & Gallery" },
  { id: "sculptural-plaster-nook", file: "tmp_img_analysis/13.webp", currentTitle: "The Sculptural Plaster & Oak Nook" }
];

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const results: any[] = [];
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`Analyzing ${i+1}/${projects.length}: ${p.id}...`);
    try {
      const buffer = fs.readFileSync(path.join(process.cwd(), p.file));
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/webp',
                  data: buffer.toString('base64')
                }
              },
              {
                text: `Describe this interior image accurately:
Current title: "${p.currentTitle}"
1. What space is depicted? (e.g., Living Room, TV Wall, Bedroom, Kitchen, Dining Room, Wardrobe/Walk-in closet, Bathroom, Office desk, Reception, Lounge, etc.)
2. List main objects/furniture seen in image.
3. Suggest an accurate title for this space (3-6 words).
4. Suggest a short 1-sentence description.`
              }
            ]
          }
        ]
      });
      const text = res.text || '';
      console.log(`Result for ${p.id}:\n${text}\n---`);
      results.push({ id: p.id, currentTitle: p.currentTitle, analysis: text });
    } catch(e: any) {
      console.error(`Error on ${p.id}:`, e.message);
      results.push({ id: p.id, currentTitle: p.currentTitle, error: e.message });
    }
    await delay(6000);
  }
  fs.writeFileSync('img_analysis_detailed.json', JSON.stringify(results, null, 2));
  console.log('Finished writing img_analysis_detailed.json');
}

run();
