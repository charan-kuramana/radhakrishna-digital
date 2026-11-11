// Convert an image (PNG/JPG) to a compressed WebP for the website.
//
// Usage:
//   npm run images -- <input> <output.webp> [maxWidth=1280] [quality=78]
//
// Examples:
//   npm run images -- ~/Desktop/charan.jpg public/images/founder.webp 800
//   npm run images -- ~/Desktop/hostlify.png public/images/work/hostlify-desktop.webp
import sharp from 'sharp';

const [input, output, maxWidth = '1280', quality = '78'] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: npm run images -- <input> <output.webp> [maxWidth] [quality]');
  process.exit(1);
}

const info = await sharp(input)
  .resize({ width: Number(maxWidth), withoutEnlargement: true })
  .webp({ quality: Number(quality) })
  .toFile(output);

console.log(`${output}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`);
