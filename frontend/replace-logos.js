const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Replace black logo
  newContent = newContent.replace(/https:\/\/customer-assets\.emergentagent\.com\/job_learning-hub-preview-2\/artifacts\/bmqusq6t_black\.(png|webp)/g, '/assets/logo_black.webp');
  
  // Replace large white logo
  newContent = newContent.replace(/https:\/\/customer-assets\.emergentagent\.com\/job_learning-hub-preview-2\/artifacts\/o9ol4rh4_white\.(png|webp)/g, '/assets/logo_white.webp');
  
  // Replace small white logo
  newContent = newContent.replace(/https:\/\/customer-assets\.emergentagent\.com\/job_learning-hub-preview-2\/artifacts\/joiartmj_white\.(png|webp)/g, '/assets/logo_white_small.webp');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      replaceInFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, 'src'));
console.log('Global logo replacement complete!');
