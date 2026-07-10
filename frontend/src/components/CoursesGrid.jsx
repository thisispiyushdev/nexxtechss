import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Monitor, Palette, PenTool, Megaphone, BarChart3,
  Brain, Cloud, Shield, GitBranch, Code2, ArrowRight, Download, Server, FileCode2, Building2, BookOpen
} from "lucide-react";
import BrochureModal from "./BrochureModal";
import { Button } from "../components/ui/button";
import { cachedFetch, API } from "@/lib/apiCache";
import ResponsiveImage from "./ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Brochure mapping - add more courses here as brochures are uploaded
const BROCHURES = {
  "Graphic Design": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/5dqm9aj0_Nexxtechs%20Graphic%20Design.pdf",
  "Data Science": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/ahqd4k9j_Data%20Science.pdf",
  "Cyber Security": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/80vqjbz6_Cyber%20Security.pdf%20%282%29.pdf",
  "Data Analytics": "https://drive.google.com/file/d/1bLTYVi2td1EoEl22zkUqoulxHTX4VJJl/view",
  "Digital Marketing": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/qybkbw7c_Nexxtechs%20Digital%20Marketing.pdf",
  "DevOps": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/33kmjfsa_Devops%20brochure.pdf",
  "Cloud Computing": "https://drive.google.com/file/d/1Fb_ThEN7VtcRgiDsUDb1-t5QLeYiNrwI/view",
  "Web Development": "https://drive.google.com/file/d/19r5PpBv2JuU80k3neQu0H15cs1l1h_iW/view",
  "UI/UX Design": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/5dqm9aj0_Nexxtechs%20Graphic%20Design.pdf",
};

const STATIC_COURSES = [
  { title: "Data Analytics", slug: "data-analytics", image: "/course-images/da.webp", desc: "Master tools to turn raw data into actionable insights.", features: ["Excel & Advanced SQL", "Power BI & Tableau", "Live Industry Datasets"], icon: BarChart3, color: "#EDE9FE", category: "Data & AI", isPopular: true },
  { title: "Data Science", slug: "data-science", image: "/course-images/ds.webp", desc: "Learn AI, Machine Learning, and deep statistical analysis.", features: ["Python & R Programming", "Machine Learning Models", "Predictive Analytics"], icon: Brain, color: "#FEF2F2", category: "Data & AI", isPopular: true },
  { title: "Diploma in Cloud Computing", slug: "cloud-computing", image: "/course-images/ccp.webp", desc: "Master top cloud platforms and scalable infrastructure.", features: ["AWS, Azure & GCP", "Cloud Architecture", "Deployment Strategies"], icon: Cloud, color: "#ECFEFF", category: "Cloud & DevOps", isPopular: true },
  { title: "Diploma in Cyber Security", slug: "cyber-security", image: "/course-images/cyber.webp", desc: "Protect critical systems and networks from digital threats.", features: ["Ethical Hacking", "Network Security", "Vulnerability Assessment"], icon: Shield, color: "#FFF7ED", category: "Cloud & DevOps", isPopular: true },
  { title: "DevOps with AWS", slug: "devops", image: "/course-images/Devops.webp", desc: "Automate and streamline the software development lifecycle.", features: ["CI/CD Pipelines", "Docker & Kubernetes", "Infrastructure as Code"], icon: GitBranch, color: "#F0FDFA", category: "Cloud & DevOps", isTrending: true },
  { title: "Data Structures and Algorithm", slug: "dsa", image: "/course-images/dsa.webp", desc: "Master algorithms and crack top tech coding interviews.", features: ["Array & Strings", "Trees & Graphs", "Dynamic Programming"], icon: Code2, color: "#F5F3FF", category: "Development", isTrending: true },
  { title: "Python Full Stack with Gen AI", slug: "python-full-stack", image: "/course-images/python.webp", desc: "Build powerful, scalable web applications using Python.", features: ["Django & Flask", "React.js Integration", "Database Management"], icon: FileCode2, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "Web Dev with Gen AI", slug: "web-development", image: "/course-images/web.webp", desc: "Build modern web apps with the latest MERN stack frameworks.", features: ["MongoDB & Express", "React.js & Node.js", "Responsive Design"], icon: Monitor, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "UI/UX Design", slug: "ui-ux-design", image: "/course-images/uiuxx.webp", desc: "Create stunning, user-centric digital experiences.", features: ["Figma Prototyping", "User Research", "Wireframing"], icon: Palette, color: "#FEF3C7", category: "Design & Marketing" },
  { title: "Graphic Design", slug: "graphic-design", image: "/course-images/graphicc.webp", desc: "Master visual communication, branding, and typography.", features: ["Adobe Photoshop", "Illustrator & InDesign", "Brand Identity"], icon: PenTool, color: "#FCE7F3", category: "Design & Marketing" },
  { title: "Digital Marketing", slug: "digital-marketing", image: "/course-images/dmm.webp", desc: "Drive exponential business growth with digital strategies.", features: ["SEO & SEM", "Social Media Marketing", "Google Ads"], icon: Megaphone, color: "#F0FDF4", category: "Design & Marketing" },
  { title: "SAP Masterclass", slug: "sap-masterclass", image: "/course-images/sapp.webp", desc: "Master enterprise resource planning with SAP modules.", features: ["SAP FICO & MM", "S/4HANA Architecture", "Business Processes"], icon: Building2, color: "#FEF3C7", category: "Enterprise" },
];

const CATEGORIES = ["All", "Development", "Design & Marketing", "Data & AI", "Cloud & DevOps", "Enterprise"];

export default function CoursesGrid({ layout = "grid", limit = null, showMoreButton = false }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [brochureModal, setBrochureModal] = useState({ open: false, course: "", url: "" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [COURSES, setCourses] = useState(STATIC_COURSES);
  const navigate = useNavigate();

  const displayedCourses = activeCategory === "All" ? COURSES : COURSES.filter((c) => c.category === activeCategory);
  const finalCourses = limit ? displayedCourses.slice(0, limit) : displayedCourses;

  useEffect(() => {
    cachedFetch(`${API}/content/courses`)
      .then(data => {
        if (data?.length > 0) {
          const staticSlugs = new Set(STATIC_COURSES.map(c => c.slug));
          const apiOnly = data
            .filter(c => !staticSlugs.has(c.slug))
            .map(c => ({
              title: c.title, slug: c.slug, image: c.image || "",
              desc: c.tagline || c.overview || "", icon: BookOpen,
              color: "#F0FDF4", category: "Other",
              isPopular: c.is_popular, isTrending: c.is_trending,
            }));
          if (apiOnly.length > 0) setCourses([...STATIC_COURSES, ...apiOnly]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    gsap.from(".courses-heading-animate", {
      scrollTrigger: {
        trigger: ".courses-heading-animate",
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  const openBrochure = (courseName) => {
    setBrochureModal({ open: true, course: courseName, url: BROCHURES[courseName] });
  };

  return (
    <>
      <section
        id="courses"
        ref={sectionRef}
        className="py-24 md:py-32 bg-transparent transition-colors duration-300"
        data-testid="courses-section"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-16 courses-heading-animate">
            <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-[#4B5563] dark:text-gray-500 mb-4">
              Our Programs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold text-[#111827] dark:text-white mb-4">
              Explore Our <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-base text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto mb-10">
              Industry-aligned curriculum designed to make you job-ready from day one
            </p>

            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-[#84CC16] text-black shadow-[0_0_20px_rgba(132,204,22,0.4)] scale-105"
                      : "bg-white dark:bg-white/5 backdrop-blur-md text-[#4B5563] dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#84CC16]/50 hover:text-[#84CC16] hover:shadow-[0_0_15px_rgba(132,204,22,0.15)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

        {/* Course Cards rendering logic */}
        {layout === "marquee" ? (
          <div className="relative overflow-hidden w-full group py-4">
            <div className="flex gap-4 sm:gap-6 md:gap-8 w-max">
              {[0, 1].map((groupIndex) => (
                <div 
                  key={groupIndex} 
                  className="flex shrink-0 gap-4 sm:gap-6 md:gap-8 animate-marquee group-hover:[animation-play-state:paused]"
                  style={{ animationDuration: '80s' }}
                  aria-hidden={groupIndex === 1}
                >
                  {finalCourses.map((course, i) => {
                    return (
                      <div
                        key={`${groupIndex}-${course.title}`}
                        className="w-[280px] sm:w-[320px] md:w-[380px] h-full shrink-0 group bg-white/80 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-[24px] sm:rounded-[28px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_-10px_rgba(132,204,22,0.3)] hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col"
                        onClick={() => navigate(`/course/${course.slug}/`)}
                      >
                        {course.image && (
                          <div className="relative w-full aspect-video overflow-hidden rounded-t-[24px] sm:rounded-t-[28px] z-10">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-20 pointer-events-none"></div>
                            <ResponsiveImage src={course.image} alt={`${course.title} course at NexxTechs`} className="w-full h-full object-cover transform group-hover:scale-[1.15] group-hover:rotate-1 transition-all duration-700 ease-out" priority={i < 3} width={480} height={270} />
                            
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
                        <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">
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
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                            <Button
                              onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.slug}/`); }}
                              variant="outline"
                              className="flex-1 px-4 h-12 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-[#111827] dark:text-white font-semibold hover:bg-[#84CC16] hover:text-black dark:hover:bg-[#84CC16] dark:hover:text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0 flex items-center justify-center overflow-hidden"
                              data-testid={`view-details-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                            >
                              <span className="truncate">View Course</span>
                              <ArrowRight size={16} className="ml-2 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                            </Button>
                            <Button
                              onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                              className="h-12 w-12 p-0 shrink-0 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10 flex items-center justify-center"
                              data-testid={`brochure-btn-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                              title="Download Syllabus"
                              aria-label={`Download ${course.title} Syllabus`}
                            >
                              <Download size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {finalCourses.map((course, i) => {
              return (
                <div
                  key={`grid-${course.title}`}
                  className="h-full group bg-white/80 dark:bg-[#0a0a0a]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 rounded-[24px] sm:rounded-[28px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_-10px_rgba(132,204,22,0.3)] hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col"
                  onClick={() => navigate(`/course/${course.slug}/`)}
                >
                  {course.image && (
                    <div className="relative w-full aspect-video overflow-hidden rounded-t-[24px] sm:rounded-t-[28px] z-10">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-transparent transition-colors duration-500 z-20 pointer-events-none"></div>
                      <ResponsiveImage src={course.image} alt={`${course.title} course at NexxTechs`} className="w-full h-full object-cover transform group-hover:scale-[1.15] group-hover:rotate-1 transition-all duration-700 ease-out" priority={i < 3} width={480} height={270} />
                      
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
                  <div className="p-6 pt-5 flex flex-col flex-1 relative z-10">
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
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                      <Button
                        onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.slug}/`); }}
                        variant="outline"
                        className="flex-1 px-4 h-12 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-[#111827] dark:text-white font-semibold hover:bg-[#84CC16] hover:text-black dark:hover:bg-[#84CC16] dark:hover:text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0 flex items-center justify-center overflow-hidden"
                        data-testid={`view-details-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                      >
                        <span className="truncate">View Course</span>
                        <ArrowRight size={16} className="ml-2 shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                      </Button>
                      <Button
                        onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                        className="h-12 w-12 p-0 shrink-0 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10 flex items-center justify-center"
                        data-testid={`brochure-btn-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                        title="Download Syllabus"
                        aria-label={`Download ${course.title} Syllabus`}
                      >
                        <Download size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showMoreButton && (
          <div className="mt-16 flex justify-center courses-heading-animate">
            <Button
              onClick={() => navigate('/courses')}
              className="px-10 h-14 rounded-full bg-[#84CC16] text-black font-bold text-lg hover:bg-[#65a30d] transition-all shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] hover:-translate-y-1 flex items-center"
            >
              Explore All Courses
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        )}
        </div>
      </section>

      <BrochureModal
        isOpen={brochureModal.open}
        onClose={() => setBrochureModal({ open: false, course: "", url: "" })}
        courseName={brochureModal.course}
        brochureUrl={brochureModal.url}
      />
    </>
  );
}
