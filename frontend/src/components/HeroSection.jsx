import { useRef, useState, useEffect } from "react";
import { ArrowRight, Play, Send, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import axios from "axios";
import { API_ROOT } from "../lib/apiConfig";

const API = API_ROOT;

const COURSE_OPTIONS = [
  "Data Science",
  "Data Analytics",
  "Full Stack AI",
  "Web Dev with Gen AI",
  "Python Full Stack with Gen AI",
  "DevOps with AWS",
  "Diploma in Cloud Computing",
  "Diploma in Cyber Security",
  "Data Structures and Algorithm",
  "Web Development + DevOps",
  "Cyber Security",
  "AI & GenAI",
  "Digital Marketing",
  "UI/UX Design",
  "Java Full Stack",
  "DSA with Java",
  "Graphic Design",
  "SAP Masterclass",
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const gsapLoaded = useRef(false);
  const [form, setForm] = useState({ name: "", phone: "", course_interested: "", branch: "Nexxtechs Delhi" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course_interested || !form.branch) { setError("Please fill all fields"); return; }
    setError(""); setLoading(true);
    try {
      const payload = { ...form, branch: `${form.branch} | Page: ${window.location.pathname}` };
      const response = await axios.post(`${API}/enquiry`, payload);
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setForm({ name: "", phone: "", course_interested: "", branch: "Nexxtechs Delhi" });
      } else { throw new Error("Backend storage failed"); }
    } catch (err) {
      console.error("Backend error:", err);
      setError("Failed to submit enquiry. Please try again."); setSubmitted(true);
    } finally { setLoading(false); }
  };

  const scrollTo = (id) => { const el = document.querySelector(id); if (el) el.scrollIntoView({ behavior: "smooth" }); };

  // Dynamically import GSAP only when section is visible (perf optimization)
  useEffect(() => {
    if (gsapLoaded.current) return;

    // Skip GSAP on mobile — show stats immediately
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      gsapLoaded.current = true;
      if (statsRef.current) {
        statsRef.current.querySelectorAll('.stat-number').forEach(num => {
          const target = num.getAttribute('data-target');
          const suffix = num.getAttribute('data-suffix') || '';
          num.innerText = target + suffix;
        });
      }
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsapLoaded.current = true; observer.disconnect();
        Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapMod, stMod]) => {
          const gsap = gsapMod.default || gsapMod.gsap;
          const ScrollTrigger = stMod.ScrollTrigger;
          gsap.registerPlugin(ScrollTrigger);
          if (!statsRef.current) return;
          const statItems = statsRef.current.querySelectorAll('.stat-item');
          const dividers = statsRef.current.querySelectorAll('.stat-divider');
          const tl = gsap.timeline({ scrollTrigger: { trigger: statsRef.current, start: "top 90%", once: true } });
          tl.from(statItems, { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" })
            .from(dividers, { scaleY: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.4");
          statsRef.current.querySelectorAll('.stat-number').forEach((num) => {
            const target = parseInt(num.getAttribute('data-target'));
            const suffix = num.getAttribute('data-suffix') || "";
            gsap.to(num, { innerText: target, duration: 2, snap: { innerText: 1 }, ease: "power2.out",
              scrollTrigger: { trigger: num, start: "top 90%", once: true },
              onUpdate: function() { num.innerText = Math.floor(this.targets()[0].innerText) + suffix; }
            });
          });
        });
      }
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative overflow-hidden bg-transparent transition-colors duration-300" data-testid="hero-section">
      {/* Dot grid pattern — hidden on mobile for perf */}
      <div className="absolute inset-0 opacity-[0.03] hidden md:block" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#F4FCE3] dark:bg-[#84CC16]/10 text-[#4D7C0F] dark:text-[#84CC16] px-4 py-2 rounded-full text-sm font-semibold" data-testid="hero-badge">
              <span className="w-2 h-2 bg-[#84CC16] rounded-full animate-pulse" />
              The Future of AI & Tech Education
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl tracking-tight font-black text-[#111827] dark:text-white leading-[1.1]" data-testid="hero-heading">
              Best IT Training Institute in{" "}<span className="gradient-text">Vikaspuri, Delhi</span> –{" "}Cloud, DevOps &amp; Full Stack
            </h1>
            <p className="text-base md:text-lg text-[#4B5563] dark:text-gray-400 leading-relaxed max-w-lg" data-testid="hero-subtext">
              Build your future with AI, Data Science, Full Stack Development, Digital Marketing & more at Nexxtechs Institute — the best institute in Vikaspuri. Join 5000+ students with practical training and real-world projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry"))} className="group relative bg-[#84CC16] text-black font-semibold rounded-full px-8 py-6 text-sm md:text-base hover:bg-[#65A30D] transition-all duration-300 md:hover:-translate-y-1.5 active:translate-y-0 hover:shadow-[0_10px_30px_rgba(132,204,22,0.4)] active:shadow-none" data-testid="hero-enroll-btn">
                Enroll Now <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button onClick={() => window.dispatchEvent(new CustomEvent("openPopupEnquiry"))} variant="outline" className="group relative border-2 border-[#0A0A0A] dark:border-gray-600 text-[#0A0A0A] dark:text-white font-semibold rounded-full px-8 py-6 text-sm md:text-base hover:bg-[#0A0A0A] hover:text-white transition-all duration-300 md:hover:-translate-y-1.5 active:translate-y-0 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] active:shadow-none" data-testid="hero-demo-btn">
                <Play size={16} className="mr-2 transition-transform duration-300 group-hover:scale-125" /> Book Free Demo
              </Button>
            </div>
            <div ref={statsRef} className="flex items-center gap-4 xl:gap-8 pt-4">
              <div className="stat-item" data-testid="hero-stat-students">
                <div className="text-2xl font-black text-[#111827] dark:text-white stat-number" data-target="5000" data-suffix="+">0</div>
                <div className="text-xs text-[#4B5563] dark:text-gray-500 font-medium tracking-wide uppercase">Students Trained</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-700 stat-divider" />
              <div className="stat-item" data-testid="hero-stat-placement">
                <div className="text-2xl font-black text-[#111827] dark:text-white stat-number" data-target="95" data-suffix="%">0</div>
                <div className="text-xs text-[#4B5563] dark:text-gray-500 font-medium tracking-wide uppercase">Placement Rate</div>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-700 stat-divider" />
              <div className="stat-item" data-testid="hero-stat-courses">
                <div className="text-2xl font-black text-[#111827] dark:text-white stat-number" data-target="50" data-suffix="+">0</div>
                <div className="text-xs text-[#4B5563] dark:text-gray-500 font-medium tracking-wide uppercase">Courses</div>
              </div>
            </div>
          </div>
          <div className="relative hidden lg:block w-full lg:max-w-[400px] xl:max-w-[480px] mx-auto lg:ml-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#84CC16] to-[#65A30D] rounded-3xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-white/90 dark:bg-[#1a1d27]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
              {submitted && !error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#F4FCE3] flex items-center justify-center mx-auto mb-4"><CheckCircle size={32} className="text-[#84CC16]" /></div>
                  <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Thank You!</h2>
                  <p className="text-[#4B5563] dark:text-gray-400">Our team will contact you shortly.</p>
                  <Button onClick={() => setSubmitted(false)} className="mt-6 bg-[#84CC16] text-black rounded-full px-6 hover:bg-[#65A30D]">Submit Another</Button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Quick <span className="text-[#84CC16]">Enquiry</span></h2>
                    <p className="text-sm text-[#4B5563] dark:text-gray-400">Tell us what you want to learn, and our tech counselors will guide you.</p>
                  </div>
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div><Input type="text" placeholder="Full Name" aria-label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16]" /></div>
                    <div><Input type="tel" placeholder="Phone Number" aria-label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16]" /></div>
                    <div>
                      <Select value={form.course_interested} onValueChange={(val) => setForm({ ...form, course_interested: val })}>
                        <SelectTrigger aria-label="Course Interested" title="Course Interested" className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16]">
                          <span className="sr-only">Course Interested</span>
                          <SelectValue placeholder="Course Interested" />
                        </SelectTrigger>
                        <SelectContent>{COURSE_OPTIONS.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={form.branch} onValueChange={(val) => setForm({ ...form, branch: val })}>
                        <SelectTrigger aria-label="Institute Branch" title="Institute Branch" className="rounded-xl border-gray-200 bg-[#F9FAFB] dark:bg-[#0f1117] dark:border-gray-700 dark:text-white px-4 py-3 focus:border-[#84CC16]">
                          <span className="sr-only">Institute Branch</span>
                          <SelectValue placeholder="Select a branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Nexxtechs Delhi", "Nexxtechs Noida"].map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                    {submitted && error && <p className="text-[#84CC16] text-xs font-medium">Request redirected to WhatsApp.</p>}
                    <Button type="submit" disabled={loading} className="w-full bg-[#84CC16] text-black font-bold rounded-xl py-6 mt-2 text-base hover:bg-[#65A30D] transition-all duration-300">
                      {loading ? "Submitting..." : "Book Free Demo"} <Send size={16} className="ml-2" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
