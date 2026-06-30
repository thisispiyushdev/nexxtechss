const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

async function main() {
  try {
    require.resolve('sharp');
  } catch (e) {
    execSync('npm install sharp --no-save --legacy-peer-deps');
  }
  const sharp = require('sharp');

  const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    });
  };

  const logos = [
    { url: 'https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/bmqusq6t_black.png', name: 'logo_black.webp', width: 600 },
    { url: 'https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/o9ol4rh4_white.png', name: 'logo_white.webp', width: 600 },
    { url: 'https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/joiartmj_white.png', name: 'logo_white_small.webp', width: 400 }
  ];

  const assetsDir = path.join(__dirname, 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  for (const logo of logos) {
    const tempPath = path.join(assetsDir, 'temp.png');
    const finalPath = path.join(assetsDir, logo.name);
    
    console.log(`Downloading ${logo.url}...`);
    await downloadFile(logo.url, tempPath);
    
    console.log(`Converting and resizing to ${logo.name}...`);
    await sharp(tempPath)
      .resize({ width: logo.width })
      .webp({ quality: 85 })
      .toFile(finalPath);
      
    fs.unlinkSync(tempPath);
  }

  console.log("Logos optimized successfully!");
}

main().catch(console.error);
