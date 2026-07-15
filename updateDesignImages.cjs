const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

content = content.replace(/\/course-images\/graphicc\.webp/g, '/course-images/graphic.webp');
content = content.replace(/\/course-images\/uiuxx\.webp/g, '/course-images/uiux.webp');

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update successful');
