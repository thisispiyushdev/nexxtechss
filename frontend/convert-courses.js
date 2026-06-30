const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    require.resolve('sharp');
  } catch (e) {
    console.log("Installing sharp...");
    execSync('npm install sharp --no-save --legacy-peer-deps');
  }
  
  const sharp = require('sharp');
  
  const dir = path.join(__dirname, 'public', 'course-images');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.toLowerCase().endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const name = path.basename(file, path.extname(file));
      const outputPath = path.join(dir, `${name}.webp`);
      
      console.log(`Converting ${file} to ${name}.webp...`);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      fs.unlinkSync(inputPath);
      console.log(`Deleted ${file}`);
    }
  }

  // Update coursesData.js
  let content = fs.readFileSync('src/data/coursesData.js', 'utf8');
  content = content.replace(/\.jpeg/g, '.webp');
  content = content.replace(/\.PNG/g, '.webp');
  content = content.replace(/\.png/g, '.webp');
  content = content.replace(/\.jpg/g, '.webp');
  fs.writeFileSync('src/data/coursesData.js', content);
  
  console.log("Course images converted to WebP!");
}

main().catch(console.error);
