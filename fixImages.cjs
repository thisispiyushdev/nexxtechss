const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

const oldImageBlockMarquee = `<div className="relative w-full aspect-video p-2 sm:p-3 pb-0 z-10">
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
                        <div className="p-6 pt-5 flex flex-col flex-1 relative z-10 h-full">`;

const newImageBlockMarquee = `<div className="relative w-full aspect-video overflow-hidden rounded-t-[24px] sm:rounded-t-[28px] z-10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-20 pointer-events-none"></div>
                            <ResponsiveImage src={course.image} alt={\`\${course.title} course at NexxTechs\`} className="w-full h-full object-cover transform group-hover:scale-[1.15] group-hover:rotate-1 transition-all duration-700 ease-out" priority={i < 3} width={480} height={270} />
                            
                            {/* Badges */}
                            {course.isPopular && (
                              <div className="absolute top-4 right-4 z-30">
                                <span className="bg-[#84CC16]/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#84CC16]/30">
                                  POPULAR
                                </span>
                              </div>
                            )}
                            {course.isTrending && (
                              <div className="absolute top-4 right-4 z-30">
                                <span className="bg-[#3B82F6]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                                  TRENDING
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">`;

const oldImageBlockGrid = `<div className="relative w-full aspect-video p-2 sm:p-3 pb-0 z-10">
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
                  <div className="p-6 pt-5 flex flex-col flex-1 relative z-10 h-full">`;

const newImageBlockGrid = `<div className="relative w-full aspect-video overflow-hidden rounded-t-[24px] sm:rounded-t-[28px] z-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-20 pointer-events-none"></div>
                      <ResponsiveImage src={course.image} alt={\`\${course.title} course at NexxTechs\`} className="w-full h-full object-cover transform group-hover:scale-[1.15] group-hover:rotate-1 transition-all duration-700 ease-out" priority={i < 3} width={480} height={270} />
                      
                      {/* Badges */}
                      {course.isPopular && (
                        <div className="absolute top-4 right-4 z-30">
                          <span className="bg-[#84CC16]/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#84CC16]/30">
                            POPULAR
                          </span>
                        </div>
                      )}
                      {course.isTrending && (
                        <div className="absolute top-4 right-4 z-30">
                          <span className="bg-[#3B82F6]/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                            TRENDING
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">`;

content = content.replace(oldImageBlockMarquee, newImageBlockMarquee);
content = content.replace(oldImageBlockGrid, newImageBlockGrid);

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update complete.');
