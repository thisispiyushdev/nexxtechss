const fs = require('fs');
const path = require('path');

const srcDir = 'frontend/assets/course image';
const destDir = 'frontend/public/course-images';

// Copy new webp files
const files = fs.readdirSync(srcDir);
for (const file of files) {
  if (file.endsWith('.webp')) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  }
}

// Now update STATIC_COURSES in CoursesGrid.jsx
let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

content = content.replace(/\/course-images\/da\.webp/g, '/course-images/Data-Analytics.webp');
content = content.replace(/\/course-images\/ds\.webp/g, '/course-images/Data-Science.webp');
content = content.replace(/\/course-images\/ccp\.webp/g, '/course-images/Cloud-Computing.webp');
content = content.replace(/\/course-images\/cyber\.webp/g, '/course-images/Cyber-Security.webp');
content = content.replace(/\/course-images\/Devops\.webp/g, '/course-images/DevOps.webp');
content = content.replace(/\/course-images\/dsa\.webp/g, '/course-images/DSA.webp');
content = content.replace(/\/course-images\/python\.webp/g, '/course-images/Python-Full-Stack.webp');
content = content.replace(/\/course-images\/web\.webp/g, '/course-images/Web-Development.webp');
content = content.replace(/\/course-images\/dm\.webp/g, '/course-images/Digital-Marketing.webp'); // Wait, earlier I replaced dmm with dm? Let's check what's actually there.
content = content.replace(/\/course-images\/dmm\.webp/g, '/course-images/Digital-Marketing.webp');
content = content.replace(/\/course-images\/sapp\.webp/g, '/course-images/SAP.webp');

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update successful');
