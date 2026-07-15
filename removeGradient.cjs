const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

const gradientDiv = `<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-20 pointer-events-none"></div>`;

content = content.split(gradientDiv).join('');

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Removed gradient fade successfully');
