const fs = require('fs');

let content = fs.readFileSync('frontend/src/components/CoursesGrid.jsx', 'utf8');

// Replace STATIC_COURSES
const oldStaticCourses = `const STATIC_COURSES = [
  { title: "Data Analytics", slug: "data-analytics", image: "/course-images/da.webp", desc: "Turn data into actionable insights", icon: BarChart3, color: "#EDE9FE", category: "Data & AI", isPopular: true },
  { title: "Data Science", slug: "data-science", image: "/course-images/ds.webp", desc: "AI & ML with Python and R", icon: Brain, color: "#FEF2F2", category: "Data & AI", isPopular: true },
  { title: "Cloud Computing", slug: "cloud-computing", image: "/course-images/ccp.webp", desc: "AWS, Azure & GCP mastery", icon: Cloud, color: "#ECFEFF", category: "Cloud & DevOps", isPopular: true },
  { title: "Cyber Security", slug: "cyber-security", image: "/course-images/cyber.webp", desc: "Protect systems from threats", icon: Shield, color: "#FFF7ED", category: "Cloud & DevOps", isPopular: true },
  { title: "DevOps", slug: "devops", image: "/course-images/Devops.webp", desc: "CI/CD, Docker & Kubernetes", icon: GitBranch, color: "#F0FDFA", category: "Cloud & DevOps", isTrending: true },
  { title: "DSA", slug: "dsa", image: "/course-images/dsa.webp", desc: "Crack coding interviews with confidence", icon: Code2, color: "#F5F3FF", category: "Development", isTrending: true },
  { title: "Python Full Stack", slug: "python-full-stack", image: "/course-images/python.webp", desc: "Build powerful apps with Python", icon: FileCode2, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "Web Development", slug: "web-development", image: "/course-images/web.webp", desc: "Build modern web apps with latest frameworks", icon: Monitor, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "UI/UX Design", slug: "ui-ux-design", image: "/course-images/uiuxx.webp", desc: "Create stunning user experiences", icon: Palette, color: "#FEF3C7", category: "Design & Marketing" },
  { title: "Graphic Design", slug: "graphic-design", image: "/course-images/graphicc.webp", desc: "Master visual communication & branding", icon: PenTool, color: "#FCE7F3", category: "Design & Marketing" },
  { title: "Digital Marketing", slug: "digital-marketing", image: "/course-images/dmm.webp", desc: "Drive growth with digital strategies", icon: Megaphone, color: "#F0FDF4", category: "Design & Marketing" },
  { title: "SAP Masterclass", slug: "sap-masterclass", image: "/course-images/sapp.webp", desc: "Master SAP FICO, MM & S/4HANA", icon: Building2, color: "#FEF3C7", category: "Enterprise" },
];`;

const newStaticCourses = `const STATIC_COURSES = [
  { title: "Data Analytics", slug: "data-analytics", image: "/course-images/da.webp", desc: "Master tools to turn raw data into actionable insights.", features: ["Excel & Advanced SQL", "Power BI & Tableau", "Live Industry Datasets"], icon: BarChart3, color: "#EDE9FE", category: "Data & AI", isPopular: true },
  { title: "Data Science", slug: "data-science", image: "/course-images/ds.webp", desc: "Learn AI, Machine Learning, and deep statistical analysis.", features: ["Python & R Programming", "Machine Learning Models", "Predictive Analytics"], icon: Brain, color: "#FEF2F2", category: "Data & AI", isPopular: true },
  { title: "Cloud Computing", slug: "cloud-computing", image: "/course-images/ccp.webp", desc: "Master top cloud platforms and scalable infrastructure.", features: ["AWS, Azure & GCP", "Cloud Architecture", "Deployment Strategies"], icon: Cloud, color: "#ECFEFF", category: "Cloud & DevOps", isPopular: true },
  { title: "Cyber Security", slug: "cyber-security", image: "/course-images/cyber.webp", desc: "Protect critical systems and networks from digital threats.", features: ["Ethical Hacking", "Network Security", "Vulnerability Assessment"], icon: Shield, color: "#FFF7ED", category: "Cloud & DevOps", isPopular: true },
  { title: "DevOps", slug: "devops", image: "/course-images/Devops.webp", desc: "Automate and streamline the software development lifecycle.", features: ["CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code"], icon: GitBranch, color: "#F0FDFA", category: "Cloud & DevOps", isTrending: true },
  { title: "DSA", slug: "dsa", image: "/course-images/dsa.webp", desc: "Master algorithms and crack top tech coding interviews.", features: ["Array & Strings", "Trees & Graphs", "Dynamic Programming"], icon: Code2, color: "#F5F3FF", category: "Development", isTrending: true },
  { title: "Python Full Stack", slug: "python-full-stack", image: "/course-images/python.webp", desc: "Build powerful, scalable web applications using Python.", features: ["Django & Flask", "React.js Integration", "Database Management"], icon: FileCode2, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "Web Development", slug: "web-development", image: "/course-images/web.webp", desc: "Build modern web apps with the latest MERN stack frameworks.", features: ["MongoDB & Express", "React.js & Node.js", "Responsive Design"], icon: Monitor, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "UI/UX Design", slug: "ui-ux-design", image: "/course-images/uiuxx.webp", desc: "Create stunning, user-centric digital experiences.", features: ["Figma Prototyping", "User Research", "Wireframing"], icon: Palette, color: "#FEF3C7", category: "Design & Marketing" },
  { title: "Graphic Design", slug: "graphic-design", image: "/course-images/graphicc.webp", desc: "Master visual communication, branding, and typography.", features: ["Adobe Photoshop", "Illustrator & InDesign", "Brand Identity"], icon: PenTool, color: "#FCE7F3", category: "Design & Marketing" },
  { title: "Digital Marketing", slug: "digital-marketing", image: "/course-images/dmm.webp", desc: "Drive exponential business growth with digital strategies.", features: ["SEO & SEM", "Social Media Marketing", "Google Ads"], icon: Megaphone, color: "#F0FDF4", category: "Design & Marketing" },
  { title: "SAP Masterclass", slug: "sap-masterclass", image: "/course-images/sapp.webp", desc: "Master enterprise resource planning with SAP modules.", features: ["SAP FICO & MM", "S/4HANA Architecture", "Business Processes"], icon: Building2, color: "#FEF3C7", category: "Enterprise" },
];`;

content = content.replace(oldStaticCourses, newStaticCourses);

// Replace paragraph in marquee
const oldDesc = `<p className="text-sm text-[#4B5563] dark:text-gray-400 mb-6 flex-1 leading-relaxed whitespace-normal font-medium">{course.desc}</p>`;

const newDesc = `<div className="flex flex-col flex-1 mb-4">
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
                          </div>`;

content = content.split(oldDesc).join(newDesc);

fs.writeFileSync('frontend/src/components/CoursesGrid.jsx', content);
console.log('Update desc complete.');
