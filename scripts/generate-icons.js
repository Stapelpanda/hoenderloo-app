import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = readFileSync(join(process.cwd(), 'public', 'icons', 'icon.svg'));

async function generateIcons() {
  try {
    await Promise.all(
      sizes.map(async (size) => {
        await sharp(inputSvg)
          .resize(size, size)
          .png()
          .toFile(join(process.cwd(), 'public', 'icons', `icon-${size}x${size}.png`));
        console.log(`Generated ${size}x${size} icon`);
      })
    );
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
