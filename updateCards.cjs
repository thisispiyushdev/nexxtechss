const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

// The marquee card
const oldMarqueeCard = `                      <div
                        key={\`\${groupIndex}-\${course.title}\`}
                        className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 group bg-white dark:bg-[#0f1117]/60 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[20px] sm:rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_30px_rgba(132,204,22,0.15)] dark:hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col"
                        onClick={() => navigate(\`/course/\${course.slug}/\`)}
                      >
                        {course.image && (
                          <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-[#050505]">
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                            <ResponsiveImage src={course.image} alt={\`\${course.title} course at NexxTechs\`} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" priority={i < 3} width={480} height={270} />
                            
                            {/* Badges */}
                            {course.isPopular && (
                              <div className="absolute top-4 right-4 z-20">
                                <span className="bg-[#84CC16] text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-[#84CC16]/20 md:animate-pulse">
                                  POPULAR
                                </span>
                              </div>
                            )}
                            {course.isTrending && (
                              <div className="absolute top-4 right-4 z-20">
                                <span className="bg-[#3B82F6] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/20 md:animate-pulse">
                                  TRENDING
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-6 flex flex-col flex-1 relative z-10">
                          <div className="flex flex-col gap-3 mb-4">
                            <h4 className="font-bold text-[#111827] dark:text-white text-xl group-hover:text-[#84CC16] transition-colors whitespace-normal">
                              {course.title}
                            </h4>
                          </div>
                          <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-6 flex-1 leading-relaxed whitespace-normal">{course.desc}</p>
                          <div className="flex items-center gap-3 mt-auto pt-5 border-t border-gray-100 dark:border-white/10">
                            <Button
                              onClick={(e) => { e.stopPropagation(); navigate(\`/course/\${course.slug}/\`); }}
                              variant="outline"
                              className="flex-1 px-4 text-sm h-11 rounded-xl border-[#84CC16]/40 text-[#111827] dark:text-[#84CC16] font-semibold hover:!bg-[#84CC16] hover:!text-black dark:hover:!text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0"
                              data-testid={\`view-details-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                            >
                              <span className="truncate">View Details</span>
                              <ArrowRight size={16} className="ml-2 shrink-0 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button
                              onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                              className="h-11 w-11 p-0 shrink-0 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10"
                              data-testid={\`brochure-btn-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                              title="Download Syllabus"
                              aria-label={\`Download \${course.title} Syllabus\`}
                            >
                              <Download size={18} className="shrink-0 group-hover/btn:animate-bounce" />
                            </Button>
                          </div>
                        </div>
                      </div>`;

const newMarqueeCard = `                      <div
                        key={\`\${groupIndex}-\${course.title}\`}
                        className="w-[280px] sm:w-[320px] md:w-[380px] shrink-0 group bg-white/80 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-[24px] sm:rounded-[28px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_-10px_rgba(132,204,22,0.3)] hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col"
                        onClick={() => navigate(\`/course/\${course.slug}/\`)}
                      >
                        {course.image && (
                          <div className="relative w-full aspect-video p-2 sm:p-3 pb-0 z-10">
                            <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-gray-100 dark:bg-[#050505] shadow-inner">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-10"></div>
                              <ResponsiveImage src={course.image} alt={\`\${course.title} course at NexxTechs\`} className="w-full h-full object-cover transform group-hover:scale-[1.15] group-hover:rotate-1 transition-all duration-700 ease-out" priority={i < 3} width={480} height={270} />
                              
                              {/* Badges */}
                              {course.isPopular && (
                                <div className="absolute top-3 right-3 z-20">
                                  <span className="bg-[#84CC16]/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#84CC16]/30">
                                    POPULAR
                                  </span>
                                </div>
                              )}
                              {course.isTrending && (
                                <div className="absolute top-3 right-3 z-20">
                                  <span className="bg-[#3B82F6]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                                    TRENDING
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">
                          <div className="flex flex-col gap-2 mb-3">
                            <h4 className="font-bold text-[#111827] dark:text-white text-xl md:text-2xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#84CC16] group-hover:to-[#10b981] transition-all duration-300 whitespace-normal leading-tight">
                              {course.title}
                            </h4>
                          </div>
                          <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-6 flex-1 leading-relaxed whitespace-normal font-medium">{course.desc}</p>
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                            <Button
                              onClick={(e) => { e.stopPropagation(); navigate(\`/course/\${course.slug}/\`); }}
                              variant="outline"
                              className="flex-1 px-4 h-12 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-[#111827] dark:text-white font-semibold hover:bg-[#84CC16] hover:text-black dark:hover:bg-[#84CC16] dark:hover:text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0 flex items-center justify-center overflow-hidden"
                              data-testid={\`view-details-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                            >
                              <span className="truncate">View Course</span>
                              <ArrowRight size={16} className="ml-2 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                            </Button>
                            <Button
                              onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                              className="h-12 w-12 p-0 shrink-0 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10 flex items-center justify-center"
                              data-testid={\`brochure-btn-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                              title="Download Syllabus"
                              aria-label={\`Download \${course.title} Syllabus\`}
                            >
                              <Download size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                            </Button>
                          </div>
                        </div>
                      </div>`;

const oldGridCard = `                <div
                  key={\`grid-\${course.title}\`}
                  className="h-full group bg-white dark:bg-[#0f1117]/60 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[20px] sm:rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_30px_rgba(132,204,22,0.15)] dark:hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col"
                  onClick={() => navigate(\`/course/\${course.slug}/\`)}
                >
                  {course.image && (
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-[#050505]">
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                      <ResponsiveImage src={course.image} alt={\`\${course.title} course at NexxTechs\`} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" priority={i < 3} width={480} height={270} />
                      
                      {/* Badges */}
                      {course.isPopular && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="bg-[#84CC16] text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-[#84CC16]/20 md:animate-pulse">
                            POPULAR
                          </span>
                        </div>
                      )}
                      {course.isTrending && (
                        <div className="absolute top-4 right-4 z-20">
                          <span className="bg-[#3B82F6] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-500/20 md:animate-pulse">
                            TRENDING
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <div className="flex flex-col gap-3 mb-4">
                      <h4 className="font-bold text-[#111827] dark:text-white text-xl group-hover:text-[#84CC16] transition-colors whitespace-normal">
                        {course.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-6 flex-1 leading-relaxed whitespace-normal">{course.desc}</p>
                    <div className="flex items-center gap-3 mt-auto pt-5 border-t border-gray-100 dark:border-white/10">
                      <Button
                        onClick={(e) => { e.stopPropagation(); navigate(\`/course/\${course.slug}/\`); }}
                        variant="outline"
                        className="flex-1 px-4 text-sm h-11 rounded-xl border-[#84CC16]/40 text-[#111827] dark:text-[#84CC16] font-semibold hover:!bg-[#84CC16] hover:!text-black dark:hover:!text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0"
                        data-testid={\`view-details-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                      >
                        <span className="truncate">View Details</span>
                        <ArrowRight size={16} className="ml-2 shrink-0 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button
                        onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                        className="h-11 w-11 p-0 shrink-0 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10"
                        data-testid={\`brochure-btn-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                        title="Download Syllabus"
                        aria-label={\`Download \${course.title} Syllabus\`}
                      >
                        <Download size={18} className="shrink-0 group-hover/btn:animate-bounce" />
                      </Button>
                    </div>
                  </div>
                </div>`;

const newGridCard = `                <div
                  key={\`grid-\${course.title}\`}
                  className="h-full group bg-white/80 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-[24px] sm:rounded-[28px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_-10px_rgba(132,204,22,0.3)] hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col"
                  onClick={() => navigate(\`/course/\${course.slug}/\`)}
                >
                  {course.image && (
                    <div className="relative w-full aspect-video p-2 sm:p-3 pb-0 z-10">
                      <div className="relative w-full h-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-gray-100 dark:bg-[#050505] shadow-inner">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-10"></div>
                        <ResponsiveImage src={course.image} alt={\`\${course.title} course at NexxTechs\`} className="w-full h-full object-cover transform group-hover:scale-[1.15] group-hover:rotate-1 transition-all duration-700 ease-out" priority={i < 3} width={480} height={270} />
                        
                        {/* Badges */}
                        {course.isPopular && (
                          <div className="absolute top-3 right-3 z-20">
                            <span className="bg-[#84CC16]/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#84CC16]/30">
                              POPULAR
                            </span>
                          </div>
                        )}
                        {course.isTrending && (
                          <div className="absolute top-3 right-3 z-20">
                            <span className="bg-[#3B82F6]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                              TRENDING
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">
                    <div className="flex flex-col gap-2 mb-3">
                      <h4 className="font-bold text-[#111827] dark:text-white text-xl md:text-2xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#84CC16] group-hover:to-[#10b981] transition-all duration-300 whitespace-normal leading-tight">
                        {course.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-6 flex-1 leading-relaxed whitespace-normal font-medium">{course.desc}</p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                      <Button
                        onClick={(e) => { e.stopPropagation(); navigate(\`/course/\${course.slug}/\`); }}
                        variant="outline"
                        className="flex-1 px-4 h-12 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-[#111827] dark:text-white font-semibold hover:bg-[#84CC16] hover:text-black dark:hover:bg-[#84CC16] dark:hover:text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0 flex items-center justify-center overflow-hidden"
                        data-testid={\`view-details-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                      >
                        <span className="truncate">View Course</span>
                        <ArrowRight size={16} className="ml-2 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                      </Button>
                      <Button
                        onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                        className="h-12 w-12 p-0 shrink-0 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10 flex items-center justify-center"
                        data-testid={\`brochure-btn-\${course.title.toLowerCase().replace(/[\\s/.]+/g, '-')}\`}
                        title="Download Syllabus"
                        aria-label={\`Download \${course.title} Syllabus\`}
                      >
                        <Download size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      </Button>
                    </div>
                  </div>
                </div>`;

if (!content.includes(oldMarqueeCard.substring(0, 100))) {
  console.log("Could not find old marquee card.");
} else {
  content = content.replace(oldMarqueeCard, newMarqueeCard);
}

if (!content.includes(oldGridCard.substring(0, 100))) {
  console.log("Could not find old grid card.");
} else {
  content = content.replace(oldGridCard, newGridCard);
}

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update complete.');
