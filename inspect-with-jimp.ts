import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('tmp_img_analysis').filter(f => f.endsWith('.webp'));

async function inspect() {
  for (const f of files) {
    const p = path.join('tmp_img_analysis', f);
    try {
      const img = await Jimp.read(p);
      const w = img.width;
      const h = img.height;
      
      // Sample 100 pixels across the image to calculate average R, G, B, Brightness, and Warmth
      let totalR = 0, totalG = 0, totalB = 0;
      let count = 0;
      
      for (let x = 0; x < w; x += Math.floor(w / 10)) {
        for (let y = 0; y < h; y += Math.floor(h / 10)) {
          const colorHex = img.getPixelColor(x, y);
          // colorHex is RGBA
          const r = (colorHex >> 24) & 0xFF;
          const g = (colorHex >> 16) & 0xFF;
          const b = (colorHex >> 8) & 0xFF;
          totalR += r;
          totalG += g;
          totalB += b;
          count++;
        }
      }
      
      const avgR = Math.round(totalR / count);
      const avgG = Math.round(totalG / count);
      const avgB = Math.round(totalB / count);
      const brightness = Math.round((avgR + avgG + avgB) / 3);
      
      console.log(`File: ${f} | Size: ${w}x${h} | Avg RGB: (${avgR}, ${avgG}, ${avgB}) | Brightness: ${brightness}`);
    } catch (e: any) {
      console.error(`Error reading ${f}:`, e.message);
    }
  }
}

inspect();
