import { useState, useEffect } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

export default function EnquiryForm({
  titleText = "Start Your",
  highlightText = "Journey",
  addressText = "B-54 Krishna Park, Vikaspuri,<br/>New Delhi - 110018",
  addressLink = "https://www.google.com/maps/search/B-54+Krishna+Park+Vikaspuri+New+Delhi+110018",
  defaultBranch = "Nexxtechs Delhi",
  className = "py-24 md:py-32 bg-transparent",
  buttonText = "Submit Enquiry"
}) {
  const [form, setForm] = useState({ name: "", phone: "", course_interested: "", branch: defaultBranch });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API}/content/noida-banners`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setBanners(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch backgrounds", error);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.course_interested || !form.branch) {
      setError("Please fill all fields");
      return;
    }
    
    // Name validation: Only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
      setError("Name should only contain letters");
      return;
    }

    // Phone validation: Only numbers
    if (!/^\d+$/.test(form.phone)) {
      setError("Phone number should only contain numbers");
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Attempt to store data in Supabase backend
      const response = await axios.post(`${API}/enquiry`, form);
      
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setForm({ name: "", phone: "", course_interested: "", branch: defaultBranch });
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      setError("Failed to save to database. Please check Vercel environment variables (SUPABASE_URL, SUPABASE_KEY).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="enquiry"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-[#111827]"
      data-testid="enquiry-section"
    >
      {/* Background Images with Overlay */}
      {banners.length > 0 ? (
        banners.map((banner, idx) => (
          <div 
            key={banner.id || idx}
            className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`} 
            style={{ backgroundImage: `url("${banner.image}")` }} 
          />
        ))
      ) : (
        <>
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80")' }} 
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </>
      )}
      
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Banner Text or Empty Space */}
          {banners.length > 0 ? (
            <div className="hidden lg:block"></div>
          ) : (
            <div className="space-y-6 md:space-y-8 z-10">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white leading-[1.2] tracking-tight">
                Level Up Your <span className="text-[#FFD700]">Skills,</span><br/>
                Invest In Skills For a <span className="text-[#FFD700]">Future-Proof Growth</span>
              </h2>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed tracking-wide">
                  Unlock Your Potential,
                </p>
                <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed tracking-wide">
                  Shape Your Future with<br/>
                  Nexxtechs IT Training School.
                </p>
              </div>
            </div>
          )}
          {/* Form */}
          <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group shadow-2xl dark:shadow-none flex flex-col justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[#84CC16] rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none"></div>
            
            {/* Top glowing edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#84CC16]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <div className="relative z-10">
              {submitted ? (
                <div className="text-center py-12" data-testid="enquiry-success">
                  <div className="w-20 h-20 rounded-full bg-[#84CC16]/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-[#84CC16]" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#111827] dark:text-white mb-3 tracking-tight">Thank You!</h3>
                  <p className="text-[#4B5563] dark:text-gray-400 text-lg font-medium mb-8">Our team will contact you shortly.</p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#84CC16] text-black font-bold rounded-full px-8 py-6 hover:bg-[#65A30D] transition-transform hover:-translate-y-1 shadow-[0_0_20px_rgba(132,204,22,0.3)]"
                    data-testid="submit-another-btn"
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="enquiry-form">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-gray-400 mb-2.5">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-2xl border-gray-200 bg-gray-50 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white px-5 py-4 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-base"
                      data-testid="enquiry-name-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-gray-400 mb-2.5">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-2xl border-gray-200 bg-gray-50 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white px-5 py-4 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-base"
                      data-testid="enquiry-phone-input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-gray-400 mb-2.5">Course Interested</label>
                    <Select
                      value={form.course_interested}
                      onValueChange={(val) => setForm({ ...form, course_interested: val })}
                    >
                      <SelectTrigger aria-label="Course Interested" title="Course Interested" className="rounded-2xl border-gray-200 bg-gray-50 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white px-5 py-4 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-base h-auto" data-testid="enquiry-course-select">
                        <span className="sr-only">Course Interested</span>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#1A1A1A] dark:border-white/10 rounded-xl">
                        {COURSE_OPTIONS.map((course) => (
                          <SelectItem key={course} value={course} data-testid={`course-option-${course.toLowerCase().replace(/[\s/.]+/g, '-')}`} className="dark:focus:bg-[#84CC16]/20 dark:focus:text-[#84CC16] py-3 rounded-lg cursor-pointer">
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4B5563] dark:text-gray-400 mb-2.5">Institute Branch</label>
                    <Select
                      value={form.branch}
                      onValueChange={(val) => setForm({ ...form, branch: val })}
                    >
                      <SelectTrigger aria-label="Institute Branch" title="Institute Branch" className="rounded-2xl border-gray-200 bg-gray-50 dark:bg-[#1A1A1A] dark:border-transparent dark:text-white px-5 py-4 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all text-base h-auto" data-testid="enquiry-branch-select">
                        <span className="sr-only">Institute Branch</span>
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#1A1A1A] dark:border-white/10 rounded-xl">
                        {["Nexxtechs Delhi", "Nexxtechs Noida"].map((branch) => (
                          <SelectItem key={branch} value={branch} data-testid={`branch-option-${branch.toLowerCase().replace(/[\s/.,]+/g, '-')}`} className="dark:focus:bg-[#84CC16]/20 dark:focus:text-[#84CC16] py-3 rounded-lg cursor-pointer">
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm font-medium bg-red-500/10 p-3 rounded-lg" data-testid="enquiry-error">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#84CC16] text-black font-extrabold rounded-2xl py-7 text-lg hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(132,204,22,0.4)] disabled:opacity-50 mt-4"
                    data-testid="enquiry-submit-btn"
                  >
                    {loading ? "Submitting..." : buttonText}
                    <Send size={20} className="ml-3" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
