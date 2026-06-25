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
  { title: "Data Analytics", slug: "data-analytics", image: "/course-images/da.jpeg", desc: "Turn data into actionable insights", icon: BarChart3, color: "#EDE9FE", category: "Data & AI", isPopular: true },
  { title: "Data Science", slug: "data-science", image: "/course-images/ds.jpeg", desc: "AI & ML with Python and R", icon: Brain, color: "#FEF2F2", category: "Data & AI", isPopular: true },
  { title: "Cloud Computing", slug: "cloud-computing", image: "/course-images/ccp.jpeg", desc: "AWS, Azure & GCP mastery", icon: Cloud, color: "#ECFEFF", category: "Cloud & DevOps", isPopular: true },
  { title: "Cyber Security", slug: "cyber-security", image: "/course-images/cyber.jpeg", desc: "Protect systems from threats", icon: Shield, color: "#FFF7ED", category: "Cloud & DevOps", isPopular: true },
  { title: "DevOps", slug: "devops", image: "/course-images/Devops.jpeg", desc: "CI/CD, Docker & Kubernetes", icon: GitBranch, color: "#F0FDFA", category: "Cloud & DevOps", isTrending: true },
  { title: "DSA", slug: "dsa", image: "/course-images/dsa.jpeg", desc: "Crack coding interviews with confidence", icon: Code2, color: "#F5F3FF", category: "Development", isTrending: true },
  { title: "Python Full Stack", slug: "python-full-stack", image: "/course-images/python.jpeg", desc: "Build powerful apps with Python", icon: FileCode2, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "Web Development", slug: "web-development", image: "/course-images/web.jpeg", desc: "Build modern web apps with latest frameworks", icon: Monitor, color: "#EFF6FF", category: "Development", isTrending: true },
  { title: "UI/UX Design", slug: "ui-ux-design", image: "/course-images/uiuxx.jpeg", desc: "Create stunning user experiences", icon: Palette, color: "#FEF3C7", category: "Design & Marketing" },
  { title: "Graphic Design", slug: "graphic-design", image: "/course-images/graphicc.jpeg", desc: "Master visual communication & branding", icon: PenTool, color: "#FCE7F3", category: "Design & Marketing" },
  { title: "Digital Marketing", slug: "digital-marketing", image: "/course-images/dmm.jpeg", desc: "Drive growth with digital strategies", icon: Megaphone, color: "#F0FDF4", category: "Design & Marketing" },
  { title: "SAP Masterclass", slug: "sap-masterclass", image: "/course-images/sapp.jpeg", desc: "Master SAP FICO, MM & S/4HANA", icon: Building2, color: "#FEF3C7", category: "Enterprise" },
];

const CATEGORIES = ["All", "Development", "Design & Marketing", "Data & AI", "Cloud & DevOps", "Enterprise"];

export default function CoursesGrid() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [brochureModal, setBrochureModal] = useState({ open: false, course: "", url: "" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [COURSES, setCourses] = useState(STATIC_COURSES);
  const navigate = useNavigate();

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
          <div className="text-center mb-16">
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

        {/* Course Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {(activeCategory === "All" ? COURSES : COURSES.filter((c) => c.category === activeCategory)).map((course, i) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.title}
                  className={`group bg-white dark:bg-[#0f1117]/60 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[20px] sm:rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_30px_rgba(132,204,22,0.15)] dark:hover:border-[#84CC16]/50 transition-all duration-500 cursor-pointer flex flex-col ${
                    visible ? "animate-float-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${Math.min(i * 80, 400)}ms` }}
                  data-testid={`course-card-${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => navigate(`/course/${course.slug}/`)}
                >
                  {course.image && (
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-[#050505]">
                      <ResponsiveImage src={course.image} alt={`${course.title} course at NexxTechs IT Training Institute Vikaspuri Delhi`} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" priority={i < 3} width={480} height={270} />
                      
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

                      <h4 className="font-bold text-[#111827] dark:text-white text-xl group-hover:text-[#84CC16] transition-colors">
                        {course.title}
                      </h4>
                    </div>
                    <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-6 flex-1 leading-relaxed">{course.desc}</p>
                    <div className="flex items-center gap-3 mt-auto pt-5 border-t border-gray-100 dark:border-white/10">
                    <Button
                      onClick={(e) => { e.stopPropagation(); navigate(`/course/${course.slug}/`); }}
                      variant="outline"
                      className="flex-1 px-4 text-sm h-11 rounded-xl border-[#84CC16]/40 text-[#111827] dark:text-[#84CC16] font-semibold hover:!bg-[#84CC16] hover:!text-black dark:hover:!text-black hover:border-[#84CC16] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(132,204,22,0.2)] min-w-0"
                      data-testid={`view-details-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                    >
                      <span className="truncate">View Details</span>
                      <ArrowRight size={16} className="ml-2 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                      className="h-11 w-11 p-0 shrink-0 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-[#84CC16] transition-all duration-300 border border-transparent dark:hover:border-white/10"
                      data-testid={`brochure-btn-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                      title="Download Syllabus"
                      aria-label={`Download ${course.title} Syllabus`}
                    >
                      <Download size={18} className="shrink-0 group-hover/btn:animate-bounce" />
                    </Button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>


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
