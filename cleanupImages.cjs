const fs = require('fs');
const path = require('path');

const srcDir = 'frontend/assets/course image';
const destDir = 'frontend/public/course-images';

// 1. Delete all existing files in public/course-images
const oldFiles = fs.readdirSync(destDir);
for (const file of oldFiles) {
  fs.unlinkSync(path.join(destDir, file));
}
console.log('Old images deleted');

// 2. Copy all webp files from assets to public/course-images
const newFiles = fs.readdirSync(srcDir);
for (const file of newFiles) {
  if (file.endsWith('.webp')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
}
console.log('New images copied');

// 3. Update paths in CoursesGrid.jsx and coursesData.js
function replacePaths(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\/course-images\/graphic\.webp/g, '/course-images/Graphic-Design.webp');
  content = content.replace(/\/course-images\/uiux\.webp/g, '/course-images/UIUX-Design.webp');
  // Just in case we missed anything with the older names
  content = content.replace(/\/course-images\/graphicc\.webp/g, '/course-images/Graphic-Design.webp');
  content = content.replace(/\/course-images\/uiuxx\.webp/g, '/course-images/UIUX-Design.webp');
  fs.writeFileSync(filePath, content);
}

replacePaths('frontend/src/components/CoursesGrid.jsx');
replacePaths('frontend/src/data/coursesData.js');
console.log('Paths updated');
