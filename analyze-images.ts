import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import https from 'https';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const projects = [
  { id: "walnut-residence", url: "https://i.postimg.cc/VvY9CQYt/image.webp", currentTitle: "The Smoked Walnut Manor Penthouse" },
  { id: "gourmet-kitchen", url: "https://i.postimg.cc/mkb3Hfbz/image-(2).webp", currentTitle: "The Cocoa Minimalist Kitchen Suite" },
  { id: "executive-lounge", url: "https://i.postimg.cc/yxVhZ4VJ/image-(4).webp", currentTitle: "Creative Studio HQ Boardroom" },
  { id: "bronze-oasis-bedroom", url: "https://i.postimg.cc/RhM1H5Mh/image-(6).webp", currentTitle: "The Bronze Haven Master Suite" },
  { id: "commercial-showroom", url: "https://i.postimg.cc/wM65m86v/image-(8).webp", currentTitle: "The Terrazzo & Oak Boutique Showroom" },
  { id: "bespoke-living-lounge", url: "https://i.postimg.cc/nzKYrctD/image-(10).webp", currentTitle: "The Espresso Modular Residence" },
  { id: "arch-villa-dining", url: "https://i.postimg.cc/W3m6zbPq/image-(12).webp", currentTitle: "The Ivory & Cedar Architectural Villa" },
  { id: "executive-suite", url: "https://i.postimg.cc/4yB6vLdv/image-(14).webp", currentTitle: "The Obsidian Executive Office Suite" },
  { id: "custom-wardrobe-suite", url: "https://i.postimg.cc/tJ23dST3/image-(16).webp", currentTitle: "Bespoke Fluted Timber Master Wardrobe" },
  { id: "travertine-lounge", url: "https://i.postimg.cc/Hnp0yDp3/image-(18).webp", currentTitle: "The Travertine & Cedar Lounge" },
  { id: "acoustic-timber-residence", url: "https://i.postimg.cc/6q9VvJ9M/image-(20).webp", currentTitle: "Acoustic Timber Feature Residence" },
  { id: "fluted-vitrine-gallery", url: "https://i.postimg.cc/J013kV1c/image-(22).webp", currentTitle: "The Fluted Walnut Vitrine & Gallery" },
  { id: "sculptural-plaster-nook", url: "https://i.postimg.cc/fyw79nw7/image-(24).webp", currentTitle: "The Sculptural Plaster & Oak Nook" }
];

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function analyze() {
  const tmpDir = path.join(process.cwd(), 'tmp_img_analysis');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  let output = '';

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const imgPath = path.join(tmpDir, `${i + 1}.webp`);
    try {
      if (!fs.existsSync(imgPath)) {
        await downloadFile(p.url, imgPath);
      }
      const imageBuffer = fs.readFileSync(imgPath);
      const base64Image = imageBuffer.toString('base64');

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'image/webp',
                  data: base64Image,
                },
              },
              {
                text: `Examine this interior design image in detail.
Current Title in Code: "${p.currentTitle}".
Please answer:
1. Exact Room/Space shown (e.g. Living Room, Kitchen, Bedroom, Office, Dining Room, Wardrobe/Closet, Media Wall/Living Room, Bathroom, Showroom, etc.)
2. Key visual items (e.g., bed, sofa, dining table, kitchen island, cabinets, desk, tv, etc.)
3. Is the current title accurate? If not, what is wrong?
4. Suggested Title (Short, realistic, elegant)
5. Suggested 1-sentence description`,
              },
            ],
          },
        ],
      });

      const entry = `=== ITEM ${i + 1}: ${p.id} ===\nURL: ${p.url}\nCurrent: ${p.currentTitle}\nGemini Output:\n${response.text}\n\n`;
      output += entry;
      console.log(`Finished ${i + 1}/${projects.length}`);
      await delay(2000);
    } catch (e: any) {
      console.error(`Error processing ${p.id}:`, e.message);
      await delay(2000);
    }
  }

  fs.writeFileSync(path.join(process.cwd(), 'analysis_results.txt'), output);
  console.log('Done writing analysis_results.txt');
}

analyze();
