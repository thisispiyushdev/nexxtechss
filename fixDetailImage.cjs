const fs = require('fs');

let content = fs.readFileSync('frontend/src/pages/CourseDetail.jsx', 'utf8');

// Replace the image container to not have a fixed height and remove dark overlay
const oldImageHTML = `                {course.image && (
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                    <ResponsiveImage src={course.image} alt={\`\${course.title} Course in Delhi | NexxTechs IT Training Institute Vikaspuri\`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}`;

const newImageHTML = `                {course.image && (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white">
                    <ResponsiveImage src={course.image} alt={\`\${course.title} Course in Delhi | NexxTechs IT Training Institute Vikaspuri\`} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}`;

if (content.includes(oldImageHTML)) {
  content = content.replace(oldImageHTML, newImageHTML);
  fs.writeFileSync('frontend/src/pages/CourseDetail.jsx', content);
  console.log('Course detail image layout updated successfully');
} else {
  console.log('Could not find the exact code block to replace. Here is the block:');
  
  // Try to find a fallback match
  const fallbackRegex = /<div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white\/10 shadow-2xl group">[\s\S]*?<\/div>/;
  if(fallbackRegex.test(content)) {
     content = content.replace(fallbackRegex, `<div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white">
                    <ResponsiveImage src={course.image} alt={\`\${course.title} Course in Delhi | NexxTechs IT Training Institute Vikaspuri\`} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>`);
     fs.writeFileSync('frontend/src/pages/CourseDetail.jsx', content);
     console.log('Fallback replace successful');
  } else {
     console.log('Could not find fallback either.');
  }
}
