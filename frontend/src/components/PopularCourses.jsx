import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, BarChart, ArrowRight, Download } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import BrochureModal from "./BrochureModal";

// Brochure mapping - same as CoursesGrid
const BROCHURES = {
  "Graphic Design": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/5dqm9aj0_Nexxtechs%20Graphic%20Design.pdf",
  "Data Science": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/ahqd4k9j_Data%20Science.pdf",
  "Cyber Security": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/80vqjbz6_Cyber%20Security.pdf%20%282%29.pdf",
  "Data Analytics": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/2imnfg8f_Data%20Analytics%20NEW.pdf%20%282%29.pdf",
  "Digital Marketing": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/qybkbw7c_Nexxtechs%20Digital%20Marketing.pdf",
  "DevOps": "https://customer-assets.emergentagent.com/job_learning-hub-preview-2/artifacts/33kmjfsa_Devops%20brochure.pdf",
};

const POPULAR_COURSES = [
  { title: "DevOps", slug: "devops", duration: "4 Months", level: "Intermediate", tag: "Trending" },
  { title: "Python Full Stack", slug: "python-full-stack", duration: "6 Months", level: "Beginner to Advanced", tag: "Trending" },
  { title: "Web Development", slug: "web-development", duration: "6 Months", level: "Beginner to Advanced", tag: "Trending" },
  { title: "DSA", slug: "dsa", duration: "3 Months", level: "Intermediate", tag: "Trending" },
  { title: "Java Full Stack", slug: "java-full-stack", duration: "6 Months", level: "Beginner to Advanced", tag: "Trending" },
  { title: "MERN Stack", slug: "mern-stack", duration: "4 Months", level: "Beginner to Advanced", tag: "Hot" },
  { title: "UI/UX Design", slug: "ui-ux-design", duration: "4 Months", level: "Beginner to Advanced", tag: "Popular" },
  { title: "Digital Marketing", slug: "digital-marketing", duration: "3 Months", level: "Beginner", tag: "New" },
];

export default function PopularCourses() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [brochureModal, setBrochureModal] = useState({ open: false, course: "", url: "" });
  const navigate = useNavigate();

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
      id="popular-courses"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white dark:bg-[#0f1117] transition-colors duration-300"
      data-testid="popular-courses-section"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-[#4B5563] dark:text-gray-500 mb-4">
            Most Enrolled
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold text-[#111827] mb-4">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-base text-[#4B5563] max-w-2xl mx-auto">
            Our most in-demand programs with guaranteed placement assistance
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POPULAR_COURSES.map((course, i) => {
            const hasBrochure = !!BROCHURES[course.title];
            return (
            <div
              key={course.title}
              className={`group bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative ${
                visible ? "animate-float-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
              data-testid={`popular-course-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
            >
              {course.tag && (
                <Badge className={`absolute top-4 right-4 font-semibold text-[10px] ${
                  course.tag === "Brochure"
                    ? "bg-[#0A0A0A] text-white hover:bg-[#111827]"
                    : "bg-[#84CC16] text-black hover:bg-[#65A30D]"
                }`}>
                  {course.tag === "Brochure" ? "PDF Available" : course.tag}
                </Badge>
              )}

              <div className="w-10 h-10 rounded-lg bg-[#F4FCE3] flex items-center justify-center mb-4">
                <BarChart size={20} className="text-[#84CC16]" />
              </div>

              <h4 className="font-bold text-[#111827] dark:text-white text-lg mb-3 group-hover:text-[#84CC16] transition-colors">
                {course.title}
              </h4>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-400">
                  <Clock size={14} className="text-[#84CC16]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-400">
                  <BarChart size={14} className="text-[#84CC16]" />
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => navigate(`/course/${course.slug}/`)}
                  variant="outline"
                  className="w-full rounded-xl border-gray-200 dark:border-gray-600 text-[#111827] dark:text-white font-medium hover:bg-[#84CC16] hover:text-black hover:border-[#84CC16] transition-all group-hover:bg-[#84CC16] group-hover:text-black group-hover:border-[#84CC16]"
                  data-testid={`view-details-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                >
                  Explore {course.title}
                  <ArrowRight size={14} className="ml-1" />
                </Button>
                {hasBrochure && (
                  <Button
                    onClick={(e) => { e.stopPropagation(); openBrochure(course.title); }}
                    className="w-full rounded-xl bg-[#0A0A0A] text-white font-medium hover:bg-[#1a1a1a] transition-all"
                    data-testid={`popular-brochure-btn-${course.title.toLowerCase().replace(/[\s/.]+/g, '-')}`}
                  >
                    <Download size={14} className="mr-1" />
                    Download Brochure
                  </Button>
                )}
              </div>
            </div>
          )})}
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
