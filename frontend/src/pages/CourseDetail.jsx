import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft, Clock, BarChart, Users, Award, BookOpen, CheckCircle,
  Download, Phone, ChevronDown, ChevronUp, Calendar, Zap
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import BrochureModal from "../components/BrochureModal";
import COURSES_DATA from "../data/coursesData";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import axios from "axios";
import { PlayCircle, Send } from "lucide-react";
import CERTIFICATION_IMAGES from "../data/certificationData";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import ResponsiveImage from "../components/ResponsiveImage";
import CourseHiringPartners from "../components/CourseHiringPartners";
import CourseNews from "../components/CourseNews";
import CourseComparison from "../components/CourseComparison";
import CoursePlacementStats from "../components/CoursePlacementStats";
import CourseProjects from "../components/CourseProjects";
import CourseFAQ from "../components/CourseFAQ";
import { API_ROOT } from "../lib/apiConfig";

const API = API_ROOT;

const COURSE_SEO = {
  "java-full-stack": {
    title: "Best Java Full Stack Course in Delhi | Nexxtechs",
    description: "Join the best Java Full Stack Development Course in Delhi at Nexxtechs. Learn Java, Spring Boot, React & projects in just 6 months."
  },
  "python-full-stack": {
    title: "Best Full-Stack Web Development training institute in Delhi",
    description: "Join the best Full Stack Web Development training institute in Delhi at Nexxtechs. Learn MERN, frontend, backend & live projects."
  },
  "mern-stack": {
    title: "MERN Stack Development Course in Delhi | NexxTechs",
    description: "Learn MongoDB, Express, React & Node.js with live projects at NexxTechs. Join the best MERN Stack Development Course in Delhi."
  },
  "data-science": {
    title: "Master Data Science & GenAI Course in Delhi | NexxTechs",
    description: "Master Data Science, Machine Learning & Generative AI with practical training at NexxTechs, Delhi. Learn with real-world projects."
  },
  "data-analytics": {
    title: "Top Data Analytics Course in Delhi | NexxTechs",
    description: "Join NexxTechs Data Analytics Course in Delhi and learn Excel, SQL, Power BI & analytics skills through practical training."
  },
  "cloud-computing": {
    title: "Cloud Computing Course in Delhi | NexxTechs",
    description: "Learn AWS, Azure & GCP with hands-on training at NexxTechs. Build cloud computing skills with real-time projects in Delhi."
  },
  "cyber-security": {
    title: "Best Cyber Security Course in Delhi | NexxTechs",
    description: "Master ethical hacking, network security & cyber defense with NexxTechs Cyber Security course in Delhi. Practical learning included."
  },
  "devops": {
    title: "DevOps Engineering Course in Delhi | NexxTechs",
    description: "Learn Docker, Kubernetes, Jenkins & CI/CD tools with practical DevOps training at NexxTechs in Delhi. Build industry-ready skills."
  },
  "web-development": {
    title: "Full Stack Web Development Course | NexxTechs",
    description: "Become a Full Stack Web Developer with practical frontend & backend training at NexxTechs. Learn MERN with live projects."
  },
  "ui-ux-design": {
    title: "Best UI/UX Design Course in Delhi | NexxTechs",
    description: "Learn UI/UX design, wireframing, prototyping & Figma tools at NexxTechs. Build creative design skills with practical projects."
  },
  "graphic-design": {
    title: "Best Graphic Design Course in Delhi | NexxTechs",
    description: "Master Photoshop, Illustrator & CorelDRAW with NexxTechs Graphic Design training in Delhi. Learn through live creative projects."
  },
  "digital-marketing": {
    title: "Digital Marketing Course in Delhi | NexxTechs",
    description: "Learn SEO, Google Ads, Meta Ads & social media marketing with practical Digital Marketing training at NexxTechs Delhi."
  },
  "sap-masterclass": {
    title: "SAP Course in Delhi (FICO, MM & S/4HANA)",
    description: "Join SAP training at NexxTechs and learn FICO, MM & S/4HANA modules with practical sessions and industry-focused projects."
  },
  "dsa": {
    title: "DSA Course in Python & C++ | NexxTechs",
    description: "Master Data Structures & Algorithms in Python and C++ for coding interviews, placements & FAANG preparation at NexxTechs."
  },
  "dsa-with-java": {
    title: "Best DSA with Java Course | NexxTechs",
    description: "Learn Data Structures & Algorithms with Java at NexxTechs. Prepare for technical interviews with coding practice & projects."
  }
};

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openModule, setOpenModule] = useState(0);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [demoPopupOpen, setDemoPopupOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: "", phone: "", course_interested: slug || "", branch: "Nexxtechs Delhi" });
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoError, setDemoError] = useState("");

  // Start with static data, then try API
  const staticCourse = COURSES_DATA.find((c) => c.slug === slug);
  const [course, setCourse] = useState(staticCourse);
  const certImages = CERTIFICATION_IMAGES[slug] || CERTIFICATION_IMAGES["web-development"];

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    axios.get(`${API}/content/courses/${slug}`, { signal: controller.signal })
      .then(res => {
        if (res.data) {
          setCourse({
            ...res.data,
            batchTimings: res.data.batch_timings || res.data.batchTimings || [],
            trendingTools: res.data.trending_tools || res.data.trendingTools || [],
            brochureUrl: res.data.brochure_url || res.data.brochureUrl || "",
          });
        }
      })
      .catch(() => {}); // keep static fallback

    return () => { clearTimeout(timeout); controller.abort(); };
  }, [slug]);

  useEffect(() => {
    // Reset to static data immediately when slug changes for instant feedback
    const newStaticCourse = COURSES_DATA.find((c) => c.slug === slug);
    setCourse(newStaticCourse);
    
    window.scrollTo(0, 0);
    if (newStaticCourse) document.title = `${newStaticCourse.title} Course | NexxTechs – Best IT Training Vikaspuri Delhi`;
    
    setDemoPopupOpen(false);
    setDemoSubmitted(false);
    setDemoForm({ name: "", phone: "", course_interested: newStaticCourse?.title || "", branch: "Nexxtechs Delhi" });
    
    const timer = setTimeout(() => {
      setDemoPopupOpen(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [slug]);

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.phone) {
      setDemoError("Please fill all fields");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(demoForm.name)) {
      setDemoError("Name should only contain letters");
      return;
    }
    if (!/^\d+$/.test(demoForm.phone)) {
      setDemoError("Phone number should only contain numbers");
      return;
    }
    setDemoError("");
    setDemoLoading(true);
    try {
      const payload = { ...demoForm, branch: `${demoForm.branch} | Page: ${window.location.pathname}` };
      const response = await axios.post(`${API}/enquiry`, payload);
      if (response.status === 201 || response.status === 200) {
        setDemoSubmitted(true);
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      setDemoError("Failed to submit enquiry. Please try again.");
      setDemoSubmitted(true);
    } finally {
      setDemoLoading(false);
      if (!demoError) {
        setTimeout(() => setDemoPopupOpen(false), 3000);
      }
    }
  };

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center" data-testid="course-not-found">
        <SEOHead
          title="Loading Course | NexxTechs IT Training"
          description="Loading the course curriculum, projects, and details at NexxTechs IT Training Delhi."
        />
        <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-4">Course Not Found</h2>
        <Button onClick={() => navigate("/")} className="bg-[#84CC16] text-black rounded-full px-6">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Button>
      </div>
    );
  }

  const seoInfo = COURSE_SEO[slug] || {
    title: `${course.title} Course in Delhi | NexxTechs Vikaspuri`,
    description: `Learn ${course.title} at NexxTechs Vikaspuri Delhi. ${course.duration} course with 100% placement assistance, real-world projects & industry certification. Enroll today!`
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-[#050505] text-gray-900 dark:text-white selection:bg-[#84CC16]/30 transition-colors duration-300" data-testid="course-detail-page">
        {/* Subtle Background Glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#84CC16]/5 dark:bg-[#84CC16]/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          {/* SEO Head with Course Schema */}
        <SEOHead
          title={seoInfo.title}
          description={seoInfo.description}
          canonical={`/course/${slug}`}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Course",
            "name": `${course.title} Training in Delhi`,
            "description": course.overview || course.tagline,
            "url": `https://www.nexxtechs.com/course/${slug}`,
            "provider": {
              "@type": "Organization",
              "name": "NexxTechs",
              "sameAs": "https://www.nexxtechs.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "B-54 Krishna Park",
                "addressLocality": "Vikaspuri, New Delhi",
                "postalCode": "110018",
                "addressCountry": "IN"
              }
            },
            "timeRequired": course.duration,
            "educationalLevel": course.level,
            "offers": {
              "@type": "Offer",
              "category": "Fee-based",
              "priceCurrency": "INR",
              "price": "0",
              "url": `https://www.nexxtechs.com/course/${slug}`
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Blended",
              "instructor": { "@type": "Organization", "name": "NexxTechs" }
            }
          }}
        />
        <Breadcrumbs items={[
          { name: "Courses", path: "/courses" },
          { name: course.title, path: `/course/${slug}` }
        ]} />
        {/* Hero Banner */}
        <section className="bg-[#0A0A0A] text-white py-16 md:py-20">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-[#84CC16] transition-colors mb-8 text-sm"
              data-testid="back-to-home"
            >
              <ArrowLeft size={16} /> Back to All Courses
            </button>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <Badge className="bg-[#84CC16] text-black font-semibold px-3 py-1">
                  {course.level}
                </Badge>
                <h1 className="text-4xl sm:text-5xl font-black leading-tight" data-testid="course-title">
                  {course.title}
                </h1>
                <p className="text-gray-400 text-lg">{course.tagline}</p>

                <div className="flex flex-wrap gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-[#84CC16]" />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart size={18} className="text-[#84CC16]" />
                    <span className="text-sm">{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-[#84CC16]" />
                    <span className="text-sm">Batch Starting Soon</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    onClick={() => setDemoPopupOpen(true)}
                    className="bg-[#84CC16] text-black font-semibold rounded-full px-8 py-6 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-1"
                    data-testid="course-enquire-btn"
                  >
                    Enquire Now
                    <Phone size={16} className="ml-2" />
                  </Button>
                  <Button
                    onClick={() => setDemoPopupOpen(true)}
                    className="bg-white text-[#111827] font-extrabold rounded-full px-8 py-6 text-base transition-all duration-300 shadow-[0_4px_20px_rgba(132,204,22,0.4)] hover:shadow-[0_8px_30px_rgba(132,204,22,0.6)] hover:-translate-y-1 border-2 border-[#84CC16]/50"
                  >
                    <PlayCircle size={18} className="mr-2 text-[#84CC16]" /> Book Free Demo
                  </Button>
                  <Button
                    onClick={() => setBrochureOpen(true)}
                    variant="outline"
                    className="border-gray-600 text-white font-semibold rounded-full px-8 py-6 text-base hover:bg-white hover:text-black transition-all duration-300"
                    data-testid="course-brochure-btn"
                  >
                    <Download size={16} className="mr-2" /> Download Brochure
                  </Button>
                </div>
              </div>

              {/* Image & Stats Cards */}
              <div className="flex flex-col gap-6">
                {course.image && (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white">
                    <ResponsiveImage src={course.image} alt={`${course.title} Course in Delhi | NexxTechs IT Training Institute Vikaspuri`} width={600} height={400} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {course.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#84CC16]/30 transition-colors"
                    data-testid={`highlight-${i}`}
                  >
                    <CheckCircle size={22} className="text-[#84CC16] mb-3" />
                    <span className="text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Overview */}
        <section className="py-16 md:py-20 bg-transparent border-t border-white/5">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4" data-testid="course-overview-heading">
                    Course Overview
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{course.overview}</p>
                </div>

                {/* Detailed SEO About Content */}
                {course.aboutContent && (
                  <div className="bg-[#84CC16]/5 border border-[#84CC16]/10 rounded-3xl p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6">
                      About this <span className="text-[#84CC16]">Course</span>
                    </h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {course.aboutContent.split('\n\n').map((para, i) => (
                        <p key={i} className="text-[#4B5563] dark:text-gray-300 text-lg leading-relaxed mb-6 last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending Tools */}
                {course.trendingTools && course.trendingTools.length > 0 && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#111827] dark:text-white mb-4 flex items-center gap-2">
                      <Zap size={24} className="text-[#84CC16]" />
                      Trending Tech & AI Tools
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {course.trendingTools.map((tool, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 text-sm font-medium text-[#111827] dark:text-gray-200 shadow-sm hover:border-[#84CC16]/50 transition-colors cursor-default"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Syllabus */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6" data-testid="course-syllabus-heading">
                    <BookOpen size={28} className="inline mr-2 text-[#84CC16]" />
                    Course Syllabus
                  </h2>
                  <div className="space-y-3">
                    {course.modules.map((mod, i) => (
                      <div
                        key={i}
                        className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
                        data-testid={`module-${i}`}
                      >
                        <button
                          onClick={() => setOpenModule(openModule === i ? -1 : i)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F4FCE3] dark:hover:bg-[#84CC16]/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-[#84CC16] text-black text-sm font-bold flex items-center justify-center">
                              {i + 1}
                            </span>
                            <span className="font-semibold text-[#111827] dark:text-white">{mod.name}</span>
                          </div>
                          {openModule === i ? <ChevronUp size={18} className="text-[#84CC16]" /> : <ChevronDown size={18} className="text-gray-400" />}
                        </button>
                        {openModule === i && (
                          <div className="px-5 pb-5 pt-0">
                            <div className="grid sm:grid-cols-2 gap-2 pl-11">
                              {mod.topics.map((topic, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-400">
                                  <CheckCircle size={14} className="text-[#84CC16] shrink-0" />
                                  {topic}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Info Card */}
                <div className="bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 rounded-2xl p-6 sticky top-24">
                  <h3 className="font-bold text-[#111827] dark:text-white text-lg mb-5">Course Details</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#4B5563] dark:text-gray-400 flex items-center gap-2">
                        <Clock size={16} className="text-[#84CC16]" /> Duration
                      </span>
                      <span className="font-semibold text-[#111827] dark:text-white">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#4B5563] dark:text-gray-400 flex items-center gap-2">
                        <BarChart size={16} className="text-[#84CC16]" /> Level
                      </span>
                      <span className="font-semibold text-[#111827] dark:text-white">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#4B5563] dark:text-gray-400 flex items-center gap-2">
                        <BookOpen size={16} className="text-[#84CC16]" /> Modules
                      </span>
                      <span className="font-semibold text-[#111827] dark:text-white">{course.modules.length} Modules</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#4B5563] dark:text-gray-400 flex items-center gap-2">
                        <Award size={16} className="text-[#84CC16]" /> Certificate
                      </span>
                      <span className="font-semibold text-[#111827] dark:text-white">Yes</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-white/10 pt-5 mb-5">
                    <div className="text-sm text-[#4B5563] dark:text-gray-400 mb-1">Fees</div>
                    <div className="text-lg font-bold text-[#84CC16]">Contact for Pricing</div>
                  </div>

                  <Button
                    onClick={() => setDemoPopupOpen(true)}
                    className="w-full bg-white text-[#111827] font-extrabold rounded-xl py-5 transition-all mb-3 shadow-[0_4px_15px_rgba(132,204,22,0.3)] hover:shadow-[0_8px_25px_rgba(132,204,22,0.5)] hover:-translate-y-1 border border-[#84CC16]/50"
                  >
                    <PlayCircle size={16} className="mr-2 text-[#84CC16]" /> Book Free Demo
                  </Button>

                  <Button
                    onClick={() => setDemoPopupOpen(true)}
                    className="w-full bg-[#84CC16] text-black font-semibold rounded-xl py-5 hover:bg-[#65A30D] transition-all mb-3"
                    data-testid="sidebar-enquire-btn"
                  >
                    <Phone size={16} className="mr-2" /> Enquire Now
                  </Button>

                  <a href="tel:+919217179762" className="block text-center text-sm text-[#4B5563] dark:text-gray-400 hover:text-[#84CC16] transition-colors">
                    Or call: +91 9217179762
                  </a>

                  {/* Batch Timings */}
                  <div className="mt-6 border-t border-gray-100 dark:border-white/10 pt-5">
                    <h4 className="font-semibold text-[#111827] dark:text-white text-sm mb-3 flex items-center gap-2">
                      <Calendar size={16} className="text-[#84CC16]" /> Batch Timings
                    </h4>
                    <div className="space-y-2">
                      {course.batchTimings.map((bt, i) => (
                        <div key={i} className="text-xs text-[#4B5563] dark:text-gray-400 bg-[#F9FAFB] dark:bg-[#0f1117] rounded-lg px-3 py-2">
                          {bt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CourseHiringPartners />
        <CourseComparison courseTitle={course.title} />
        <CourseProjects courseSlug={course.slug} courseTitle={course.title} />
        <CoursePlacementStats />

        {/* Certification Section */}
        {certImages && certImages.length > 0 && (
          <section className="py-10 md:py-12 bg-transparent overflow-hidden border-t border-white/5 transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3">
                Industry-Recognized <span className="text-[#84CC16]">Certification</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                Our institute prepares the certification in the proper method. Earn a valuable credential that validates your expertise and accelerates your career growth.
              </p>
            </div>
            
            <div className="relative flex overflow-hidden group">
              <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap shrink-0 min-w-full pr-6">
                {certImages.concat(certImages).map((img, i) => (
                  <div key={i} className="flex-none w-[220px] md:w-[280px] h-[160px] md:h-[200px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#84CC16]/50 dark:hover:border-[#84CC16]/50 transition-all duration-300 hover:scale-105 bg-[#F9FAFB] dark:bg-white/5 flex items-center justify-center p-3">
                    <img src={img} alt={`${course.title} Certification from NexxTechs IT Training Institute Delhi`} width={280} height={200} className="max-w-full max-h-full object-contain rounded-lg mix-blend-multiply dark:mix-blend-normal" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap shrink-0 min-w-full pr-6" aria-hidden="true">
                {certImages.concat(certImages).map((img, i) => (
                  <div key={`second-${i}`} className="flex-none w-[220px] md:w-[280px] h-[160px] md:h-[200px] rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#84CC16]/50 dark:hover:border-[#84CC16]/50 transition-all duration-300 hover:scale-105 bg-[#F9FAFB] dark:bg-white/5 flex items-center justify-center p-3">
                    <img src={img} alt={`${course.title} Certification from NexxTechs IT Training Institute Delhi`} width={280} height={200} className="max-w-full max-h-full object-contain rounded-lg mix-blend-multiply dark:mix-blend-normal" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

            {(() => {
              const topModules = course.modules?.slice(0, 3).map(m => m.name.replace(/^Module \d+:\s*/, '')) || [];
              const topTools = course.trendingTools?.slice(0, 4).join(', ') || 'industry-standard tools';
              const topHighlights = course.highlights?.join(', ') || course.tagline;

              const faqs = [
                // 3 General FAQs
                { q: `What is the fee for ${course.title} course at NexxTechs?`, a: `The fee for our ${course.title} course is competitive and includes study material, lab access, project work, and certification. Contact us at +91 9217179762 or visit our Vikaspuri Delhi campus for exact pricing and ongoing offers.` },
                { q: `Is placement guaranteed after completing ${course.title}?`, a: `NexxTechs provides 100% placement assistance with a 95% placement rate. We have tie-ups with 500+ companies including MNCs. Our dedicated placement cell helps with resume building, mock interviews, and interview scheduling.` },
                { q: `Do I get a certificate after completing ${course.title}?`, a: `Yes! You receive an industry-recognized certification upon course completion. Our certifications are valued by top employers across India and globally.` },
                // 3 Technical FAQs
                { q: `What topics are covered in the ${course.title} course syllabus?`, a: `Our ${course.title} course covers ${course.modules?.length || 6}+ comprehensive modules including ${topModules.join(', ')}${course.modules?.length > 3 ? ' and more' : ''}. Each module includes hands-on projects, real-world case studies, and assessments to ensure deep understanding.` },
                { q: `What tools and technologies will I learn in ${course.title}?`, a: `You will get hands-on experience with trending industry tools like ${topTools}. Our curriculum is regularly updated to include the latest technologies that employers demand in 2026.` },
                { q: `What are the key skills I will gain from the ${course.title} course?`, a: `After completing this ${course.duration} program, you will master: ${topHighlights}. The course is designed for ${course.level} level learners and includes live project work to build a strong professional portfolio.` },
                // 4 Additional FAQs
                { q: `What is the teaching methodology at NexxTechs?`, a: `We follow a 100% practical, project-based learning approach. You'll work on real-world industry scenarios, case studies, and live projects to gain hands-on experience that mirrors the actual IT industry.` },
                { q: `Can I attend a demo class before enrolling?`, a: `Absolutely! We offer free demo sessions for all our courses. This allows you to experience our teaching style, interact with our expert mentors, and understand the course depth before making a commitment.` },
                { q: `Are there weekend batches for working professionals?`, a: `Yes, we offer flexible batch timings including weekend and late-evening sessions specifically designed for working professionals and college students to balance their schedule effectively.` },
                { q: `What are the prerequisites for joining this course?`, a: `Our courses are designed to be beginner-friendly. While a basic understanding of computers is helpful, we teach everything from scratch. No prior coding or technical background is required for most of our programs.` },
              ];

              return <CourseFAQ faqs={faqs} courseTitle={course.title} />;
            })()}

        {/* Related Courses & Cross-Links */}
        <section className="py-16 bg-transparent border-t border-white/5 transition-colors duration-300">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Explore More <span className="text-[#84CC16]">Courses</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {COURSES_DATA.filter(c => c.slug !== slug).slice(0, 4).map(rc => (
                <a key={rc.slug} href={`/course/${rc.slug}/`} className="group bg-[#F9FAFB] dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-2xl p-5 hover:border-[#84CC16]/40 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#84CC16] transition-colors mb-2">{rc.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{rc.tagline}</p>
                  <span className="text-xs font-bold text-[#84CC16]">Explore Course →</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>

      <BrochureModal
        isOpen={brochureOpen}
        onClose={() => setBrochureOpen(false)}
        courseName={course.title}
        brochureUrl={course.brochureUrl}
      />

      <Dialog open={demoPopupOpen} onOpenChange={setDemoPopupOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white dark:bg-[#1a1d27] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-2xl">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl font-bold text-[#111827] dark:text-white">
              Book a <span className="text-[#84CC16]">Free Demo</span>
            </DialogTitle>
            <DialogDescription className="text-sm text-[#4B5563] dark:text-gray-400">
              Experience our {course.title} course for free.
            </DialogDescription>
          </DialogHeader>

          {demoSubmitted && !demoError ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#F4FCE3] flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-[#84CC16]" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Awesome!</h3>
              <p className="text-[#4B5563] dark:text-gray-400">We will connect with you shortly to schedule your demo.</p>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B5563] dark:text-gray-300 mb-2">Branch</label>
                <Select
                  value={demoForm.branch}
                  onValueChange={(value) => setDemoForm({ ...demoForm, branch: value })}
                >
                  <SelectTrigger className="w-full rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 h-12">
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#1a1d27] border-gray-200 dark:border-gray-700">
                    <SelectItem value="Nexxtechs Delhi">Nexxtechs Delhi</SelectItem>
                    <SelectItem value="Nexxtechs Noida">Nexxtechs Noida</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {demoError && <p className="text-red-500 text-xs font-medium mt-1">{demoError}</p>}
              {demoSubmitted && demoError && <p className="text-[#84CC16] text-xs font-medium mt-1">Request successfully redirected.</p>}

              <Button
                type="submit"
                disabled={demoLoading}
                className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 mt-4 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 shadow-[0_0_15px_rgba(132,204,22,0.4)]"
              >
                {demoLoading ? "Submitting..." : "Book Demo Now"}
                <Send size={16} className="ml-2" />
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
