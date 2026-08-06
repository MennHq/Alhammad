import { Jimp } from 'jimp';
import fs from 'fs';

async function test() {
  try {
    const img = await Jimp.read('tmp_jpg/1.jpg');
    console.log('SUCCESS: Read 1.jpg successfully!', img.width, 'x', img.height);
  } catch (e: any) {
    console.error('FAILED to read 1.jpg:', e.message);
  }
}

test();
