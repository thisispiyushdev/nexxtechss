import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ResponsiveImage from "./ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    url: "/assets/projects/ngo.webp",
    alt: "NGO Full Stack Website",
    title: "NGO Full Stack Website",
    student: "Piyush.",
    description: `An NGO full stack website is a complete web platform built using both frontend and backend technologies to manage and promote an NGO’s activities online.

Frontend (User Side): Built with technologies like HTML, CSS, JavaScript or frameworks (React). It displays information such as mission, projects, donation pages, and contact forms.

Backend (Server Side): Uses Node.js, Java, or Python to handle data, user authentication, and donation processing.

Database: Stores user details, donation records, and event data (e.g., MongoDB or MySQL).

Key Features:
• Online donation system
• Volunteer registration
• Event & campaign management
• Admin dashboard for tracking activities`
  },
  {
    url: "/assets/projects/amazon.webp",
    alt: "Amazon Analytics Dashboard",
    title: "Amazon Analytics Dashboard",
    student: "Priyansh Shrivastav",
    description: `An Amazon Analytics Dashboard on Amazon Web Services is a visual tool that helps users analyze and monitor data in real time. It collects data from sources like databases, APIs, or applications and presents it as charts, graphs, and KPIs.

Using services like Amazon QuickSight, users can create interactive dashboards to track trends, business performance, and insights. It supports features like filtering, drill-down analysis, and real-time updates, helping in better decision-making.`
  },
  {
    url: "/assets/projects/chat.webp",
    alt: "Aura Realtime Chat App",
    title: "Aura Realtime Chat App",
    student: "Sujal Chauhan",
    description: "Aura is a high-performance realtime chat application that integrates a vector database to enable lightning-fast semantic search across conversation histories. It features instant messaging, online presence, and AI-powered message retrieval."
  },
  {
    url: "/assets/projects/cypto.webp",
    alt: "Crypto Price Alert using AWS",
    title: "Crypto Price Alert using AWS",
    student: "Devops batch - Piyush",
    description: `A crypto price alert system on Amazon Web Services automatically tracks cryptocurrency prices and notifies users when a target price is reached.

How it works (simple flow):
• A scheduled trigger (via Amazon CloudWatch) runs periodically
• AWS Lambda fetches live crypto prices from an API
• Prices are stored/checked in Amazon DynamoDB
• If conditions match, alerts are sent using Amazon SNS (SMS/Email)
• Optionally, Amazon API Gateway lets users set alert thresholds

This setup is serverless, scalable, and cost-efficient.`
  },
];

export default function StudentProjects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(el.querySelectorAll(".project-card"), {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 85%",
      }
    });

  }, { scope: sectionRef });

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const modalContent = selectedProject && (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12" data-testid="project-modal">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedProject(null)} />
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-full flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-[#111827] dark:text-white transition-all z-20"
          aria-label="Close project details"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="md:w-1/2 relative bg-gray-50 dark:bg-[#0a0a0a] min-h-[250px] md:min-h-0 flex items-center justify-center p-6 md:p-10 lg:p-14">
          {/* Decorative background element */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#84CC16]/10 to-transparent opacity-50"></div>
          
          <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-[#333]">
            <ResponsiveImage 
              src={selectedProject.url} 
              alt={selectedProject.alt} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-6 md:p-10 lg:p-14 overflow-y-auto flex flex-col bg-white dark:bg-[#111]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#84CC16]/10 text-[#65A30D] dark:text-[#84CC16] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-6 w-fit border border-[#84CC16]/20">
            Project Showcase
          </div>
          
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-white mb-6 leading-tight">
            {selectedProject.title}
          </h3>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#84CC16] to-[#65A30D] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#84CC16]/20">
              {selectedProject.student.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-1">Developed by</p>
              <p className="text-base sm:text-lg font-bold text-[#111827] dark:text-white">{selectedProject.student}</p>
            </div>
          </div>

          <div className="h-px w-full bg-gray-100 dark:bg-[#222] mb-8"></div>

          <div className="prose dark:prose-invert max-w-none text-[#4B5563] dark:text-gray-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
            {selectedProject.description}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent transition-colors duration-300"
      data-testid="student-projects-section"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs tracking-[0.2em] uppercase font-bold text-[#4B5563] dark:text-gray-500 mb-4">
            Student Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-bold text-[#111827] dark:text-white mb-4">
            Our Student Projects & <span className="gradient-text">Designs</span>
          </h2>
          <p className="text-base text-[#4B5563] dark:text-gray-400 max-w-2xl mx-auto">
            See what our students build during their training with real-world applications
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer project-card shadow-md aspect-[4/5] sm:aspect-square md:aspect-auto"
              style={{ willChange: "transform, opacity" }}
              data-testid={`project-card-${i}`}
            >
              <ResponsiveImage
                src={project.url}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                pexelsOptions={{ w: 600, h: 600, fit: 'crop' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/70 transition-all duration-300 flex items-end">
                <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-bold text-lg">{project.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">by {project.student}</p>
                  <span className="text-[#84CC16] text-xs font-semibold">Click to view details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal using Portal */}
      {selectedProject && createPortal(modalContent, document.body)}
    </section>
  );
}
