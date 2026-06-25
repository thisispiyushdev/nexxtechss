import React from "react";
import { getProjectsForCourse } from "../data/courseProjectsData";
import ResponsiveImage from "./ResponsiveImage";

export default function CourseProjects({ courseSlug, courseTitle }) {
  const projects = getProjectsForCourse(courseSlug);

  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-20 bg-transparent border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Build with <span className="text-[#84CC16]">AI</span> like never before
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Master {courseTitle} by building these industry-grade, AI-integrated projects that you can showcase in your portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl p-6 flex flex-col group hover:border-[#84CC16]/30 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#84CC16]/0 to-[#84CC16]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#0A0A0A] mb-6 flex items-center justify-center overflow-hidden relative shadow-inner">
                {/* 
                  If the image is the nexxtechs logo, we format it nicely in the center.
                  Otherwise, it fills the container. 
                */}
                {project.image.includes('logo.jpeg') ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-16 h-16 object-contain z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(132,204,22,0.3)]"
                  />
                ) : (
                  <ResponsiveImage 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                )}
                
                {/* Overlay for non-logo images */}
                {!project.image.includes('logo.jpeg') && (
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#84CC16] transition-colors leading-snug">
                  {project.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
