import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { X, Send, Download, FileText, CheckCircle, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";
import { API_ROOT } from "../lib/apiConfig";

const API = API_ROOT;

export default function BrochureModal({ isOpen, onClose, courseName, brochureUrl }) {
  const location = useLocation();
  const isNoida = location.pathname.includes('noida');
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
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

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setLoading(true);
    try {
      // Attempt to store data in Supabase backend
      const response = await axios.post(`${API}/brochure-download`, {
        ...form,
        course: courseName,
        branch: isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi"
      });

      // Handle successful DB storage
      if (response.status === 201 || response.status === 200) {
        console.log("Lead stored successfully");
      } else {
        throw new Error("Backend storage failed");
      }
    } catch (err) {
      console.error("Backend error:", err);
      // We don't block the user, but we log the issue.
      // The priority is the brochure download and WhatsApp redirect.
    } finally {
      setLoading(false);
      
      // Prepare WhatsApp URL and redirect
      const branchName = isNoida ? "Nexxtechs Noida" : "Nexxtechs Delhi";
      const msg = `Brochure Download Lead:%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email)}%0ACourse: ${encodeURIComponent(courseName)}%0ABranch: ${encodeURIComponent(branchName)}`;
      const waPhone = isNoida ? "919217179764" : "919217179762";
      const waUrl = `https://wa.me/${waPhone}?text=${msg}`;
      
      window.open(waUrl, "_blank");
      
      // Reset form and close modal
      setForm({ name: "", phone: "", email: "" });
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" data-testid="brochure-modal">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0 animate-in fade-in duration-300" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
        {/* Decorative background blob */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#84CC16] to-[#65A30D] rounded-3xl blur opacity-20 animate-pulse"></div>
        
        <div className="relative z-10 bg-white/95 dark:bg-[#1a1d27]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          data-testid="brochure-modal-close"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-500 dark:text-gray-400" />
        </button>

        {/* Content */}
        <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F4FCE3] flex items-center justify-center">
              <FileText size={24} className="text-[#84CC16]" />
            </div>
            <div>
              <h3 className="font-bold text-[#111827] dark:text-white text-lg">Get Details on WhatsApp</h3>
              <p className="text-sm text-[#4B5563] dark:text-gray-400">{courseName}</p>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] dark:text-gray-400 mb-5">
            Fill in your details to get the course brochure with syllabus, fees, and batch details on WhatsApp.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="brochure-form">
            <div>
              <label className="block text-sm font-medium text-[#111827] dark:text-gray-300 mb-1.5">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border-gray-200/80 dark:border-gray-700 bg-[#F9FAFB]/80 dark:bg-[#0f1117]/80 text-[#111827] dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                data-testid="brochure-name-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] dark:text-gray-300 mb-1.5">Phone Number</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl border-gray-200/80 dark:border-gray-700 bg-[#F9FAFB]/80 dark:bg-[#0f1117]/80 text-[#111827] dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                data-testid="brochure-phone-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#111827] dark:text-gray-300 mb-1.5">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border-gray-200/80 dark:border-gray-700 bg-[#F9FAFB]/80 dark:bg-[#0f1117]/80 text-[#111827] dark:text-white px-4 py-3 focus:border-[#84CC16] focus:ring-2 focus:ring-[#84CC16]/20 transition-all"
                data-testid="brochure-email-input"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm" data-testid="brochure-error">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#84CC16] text-black font-semibold rounded-full py-6 text-base hover:bg-[#65A30D] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
              data-testid="brochure-submit-btn"
            >
              {loading ? "Processing..." : "Get on WhatsApp"}
              <MessageCircle size={16} className="ml-2" />
            </Button>
          </form>
        </>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;
  
  return createPortal(modalContent, document.body);
}
