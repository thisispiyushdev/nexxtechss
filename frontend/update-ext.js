const fs = require('fs');

function replaceExt(file) {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = content.replace(/\.jpeg/g, '.webp');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
}

replaceExt('src/components/CoursesGrid.jsx');
replaceExt('src/components/ResponsiveImage.jsx');
