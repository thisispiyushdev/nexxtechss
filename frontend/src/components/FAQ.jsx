import { useState, useRef } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = [
  {
    question: "Are demo classes available?",
    answer: "Yes. Demo sessions are available for selected courses so students can understand the teaching methodology before enrollment."
  },
  {
    question: "Do you help students improve communication skills?",
    answer: "Yes. We also focus on communication skills, interview confidence, and professional development to prepare students for careers."
  },
  {
    question: "What makes NexxTechs different from other institutes?",
    answer: "We combine technical training with practical exposure, mentorship, career support, and real-world learning to help students become job-ready."
  },
  {
    question: "I am from a non-technical background. Can I still join?",
    answer: "Yes. Our courses are designed in a beginner-friendly manner so students from any background can learn comfortably."
  },
  {
    question: "Can beginners learn coding at NexxTechs?",
    answer: "Yes. We teach fundamentals from scratch, making it easier for beginners to start their learning journey."
  },
  {
    question: "How do you track student progress?",
    answer: "Regular assignments, practical work, assessments, and mentor feedback help track improvement and performance."
  },
  {
    question: "Is placement assistance provided?",
    answer: "Yes. We support students with placement assistance, interview preparation, and career counseling."
  },
  {
    question: "How can we contact NexxTechs for admission inquiries?",
    answer: "You can contact us through our website, social media platforms, phone, or by visiting the institute directly for counseling and support."
  },
  {
    question: "Which course is best for getting a high-paying IT job?",
    answer: "Courses like Data Science & AI, Cyber Security, Cloud Computing, and Full Stack Development are among the most in-demand career options today."
  },
  {
    question: "What are the career opportunities after learning Cyber Security?",
    answer: "Students can explore high-paying roles such as Security Analyst, Ethical Hacker, Network Security Engineer, SOC Analyst, and Information Security Manager."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  // Removed entrance animations to ensure items are always rendered and visible
  useGSAP(() => {}, { scope: containerRef });

  return (
    <section id="faq" ref={containerRef} className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84CC16]/10 border border-[#84CC16]/20 text-[#65A30D] dark:text-[#84CC16] text-xs font-bold tracking-widest uppercase mb-4">
            Common Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#111827] dark:text-white mb-4">
            Frequently Asked <span className="text-[#84CC16]">Questions</span>
          </h2>
          <p className="text-[#4B5563] dark:text-gray-400">Everything you need to know about our training programs and career support.</p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, i) => (
            <div 
              key={i} 
              className={`faq-item border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i 
                  ? "border-[#84CC16] bg-white dark:bg-[#1a1d27] shadow-xl shadow-[#84CC16]/5" 
                  : "border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 hover:border-gray-400 dark:hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    openIndex === i ? "bg-[#84CC16] text-black" : "bg-gray-100 dark:bg-white/5 text-gray-500"
                  }`}>
                    <HelpCircle size={18} />
                  </div>
                  <span className={`font-extrabold text-xl transition-colors ${
                    openIndex === i ? "text-[#111827] dark:text-white" : "text-[#111827] dark:text-gray-300 group-hover:text-black dark:group-hover:text-white"
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === i ? "rotate-180 text-[#84CC16]" : ""}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2 ml-12 text-[#4B5563] dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
