import https from 'https';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const projects = [
  { id: "walnut-residence", url: "https://i.postimg.cc/VvY9CQYt/image.webp" },
  { id: "gourmet-kitchen", url: "https://i.postimg.cc/mkb3Hfbz/image-(2).webp" },
  { id: "executive-lounge", url: "https://i.postimg.cc/yxVhZ4VJ/image-(4).webp" },
  { id: "bronze-oasis-bedroom", url: "https://i.postimg.cc/RhM1H5Mh/image-(6).webp" },
  { id: "commercial-showroom", url: "https://i.postimg.cc/wM65m86v/image-(8).webp" },
  { id: "bespoke-living-lounge", url: "https://i.postimg.cc/nzKYrctD/image-(10).webp" },
  { id: "arch-villa-dining", url: "https://i.postimg.cc/W3m6zbPq/image-(12).webp" },
  { id: "executive-suite", url: "https://i.postimg.cc/4yB6vLdv/image-(14).webp" },
  { id: "custom-wardrobe-suite", url: "https://i.postimg.cc/tJ23dST3/image-(16).webp" },
  { id: "travertine-lounge", url: "https://i.postimg.cc/Hnp0yDp3/image-(18).webp" },
  { id: "acoustic-timber-residence", url: "https://i.postimg.cc/6q9VvJ9M/image-(20).webp" },
  { id: "fluted-vitrine-gallery", url: "https://i.postimg.cc/J013kV1c/image-(22).webp" },
  { id: "sculptural-plaster-nook", url: "https://i.postimg.cc/fyw79nw7/image-(24).webp" }
];

function downloadWithRedirect(urlStr: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    function get(currentUrl: string) {
      https.get(currentUrl, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const nextUrl = new URL(res.headers.location, currentUrl).toString();
          get(nextUrl);
        } else if (res.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
          file.on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
          });
        } else {
          reject(new Error(`Failed to download: Status Code ${res.statusCode}`));
        }
      }).on('error', (err) => {
        reject(err);
      });
    }
    get(urlStr);
  });
}

async function run() {
  const dir = path.join(process.cwd(), 'real_images');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const dest = path.join(dir, `${i + 1}.webp`);
    console.log(`Downloading ${i + 1}/${projects.length}: ${p.id}...`);
    try {
      await downloadWithRedirect(p.url, dest);
      const stats = fs.statSync(dest);
      console.log(`Successfully downloaded ${p.id} to ${dest} (${Math.round(stats.size / 1024)} KB)`);
    } catch (e: any) {
      console.error(`Failed to download ${p.id}:`, e.message);
    }
  }
}

run();
