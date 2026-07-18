const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'course-images');

async function resizeImages() {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    if (file.endsWith('.webp')) {
      const inputPath = path.join(inputDir, file);
      // Read file into buffer so we can overwrite it
      const buffer = fs.readFileSync(inputPath);
      
      console.log(`Resizing ${file}...`);
      await sharp(buffer)
        .resize(800) // Resize to 800px width, auto height
        .webp({ quality: 80 })
        .toFile(inputPath);
    }
  }
  
  // also resize assets/logo_black.webp and assets/logo_white.webp if needed
  const assetsDir = path.join(__dirname, 'public', 'assets');
  if (fs.existsSync(assetsDir)) {
      const assetFiles = ['logo_black.webp', 'logo_white.webp'];
      for (const file of assetFiles) {
          const inputPath = path.join(assetsDir, file);
          if (fs.existsSync(inputPath)) {
              const buffer = fs.readFileSync(inputPath);
              console.log(`Resizing ${file}...`);
              await sharp(buffer)
                .resize(600)
                .webp({ quality: 85 })
                .toFile(inputPath);
          }
      }
  }
  console.log('Finished resizing images.');
}

resizeImages().catch(console.error);
