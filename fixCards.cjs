const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

// 1. Update STATIC_COURSES titles
content = content.replace(
  `{ title: "Cloud Computing", slug: "cloud-computing"`,
  `{ title: "Diploma in Cloud Computing", slug: "cloud-computing"`
);
content = content.replace(
  `{ title: "DevOps", slug: "devops"`,
  `{ title: "DevOps with AWS", slug: "devops"`
);
content = content.replace(
  `{ title: "DSA", slug: "dsa"`,
  `{ title: "Data Structures and Algorithm", slug: "dsa"`
);
content = content.replace(
  `{ title: "Python Full Stack", slug: "python-full-stack"`,
  `{ title: "Python Full Stack with Gen AI", slug: "python-full-stack"`
);
content = content.replace(
  `{ title: "Web Development", slug: "web-development"`,
  `{ title: "Web Dev with Gen AI", slug: "web-development"`
);
content = content.replace(
  `{ title: "Cyber Security", slug: "cyber-security"`,
  `{ title: "Diploma in Cyber Security", slug: "cyber-security"`
);

// 2. Fix Layout for Marquee Card
const oldMarqueeCardContent = `<div className="p-6 pt-5 flex flex-col flex-1 relative z-10">
                          <div className="flex flex-col gap-2 mb-3">
                            <h4 className="font-bold text-[#111827] dark:text-white text-xl md:text-2xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#84CC16] group-hover:to-[#10b981] transition-all duration-300 whitespace-normal leading-tight">
                              {course.title}
                            </h4>
                          </div>
                          <div className="flex flex-col flex-1 mb-4">
                            <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-3 leading-relaxed whitespace-normal font-medium line-clamp-2">{course.desc}</p>
                            {course.features && (
                              <ul className="space-y-1.5 mt-auto">
                                {course.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start text-[13px] text-gray-600 dark:text-gray-400">
                                    <span className="text-[#84CC16] mr-2 mt-0.5">•</span>
                                    <span className="leading-tight">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">`;

const newMarqueeCardContent = `<div className="p-6 pt-5 flex flex-col flex-1 relative z-10 h-full">
                          <div className="flex flex-col gap-2 mb-3">
                            <h4 className="font-bold text-[#111827] dark:text-white text-xl md:text-2xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#84CC16] group-hover:to-[#10b981] transition-all duration-300 whitespace-normal leading-tight">
                              {course.title}
                            </h4>
                          </div>
                          <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-4 leading-relaxed whitespace-normal font-medium line-clamp-2">{course.desc}</p>
                          {course.features && (
                            <ul className="space-y-1.5 mb-6">
                              {course.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start text-[13px] text-gray-600 dark:text-gray-400">
                                  <span className="text-[#84CC16] mr-2 mt-0.5">•</span>
                                  <span className="leading-tight">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">`;

content = content.split(oldMarqueeCardContent).join(newMarqueeCardContent);

// Add h-full to the marquee outer div
content = content.replace(
  `className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 group bg-white/80`,
  `className="w-[280px] sm:w-[320px] md:w-[380px] h-full shrink-0 group bg-white/80`
);

// We should also make sure the grid card container has flex-col which it does, and h-full which it does.
// The newMarqueeCardContent replacement actually fixes BOTH because the inner structure is identical. Let's verify by the number of splits.
console.log("Replaced inner blocks: ", content.split(newMarqueeCardContent).length - 1);

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update complete.');
