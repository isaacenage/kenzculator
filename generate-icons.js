const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir);
}

// Source favicon
const sourceFavicon = path.join(__dirname, 'favicon', 'favicon-32x32.png');

console.log('Generating PWA icons from favicon...\n');

// Generate icons for each size
async function generateIcons() {
  try {
    for (const size of sizes) {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);

      await sharp(sourceFavicon)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${size}x${size} icon`);
    }

    console.log('\n✅ All PWA icons generated successfully!');
    console.log(`📁 Icons saved to: ${iconsDir}`);
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
