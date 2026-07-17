import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cachedFetch, API } from "@/lib/apiCache";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919217179762";

export default function PromoBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const page = location.pathname === '/nexxtechs-noida' ? 'noida' : 'home';

  useEffect(() => {
    setLoading(true);
    cachedFetch(`${API}/content/banners/active?page=${page}`)
      .then((data) => {
        if (data && data.success !== false) {
          setBanner(data);
        }
      })
      .catch((err) => {
        // Adblockers (like Brave Shields) often block 'banner' endpoints. 
        // We silently ignore this to avoid polluting the console with red errors.
        console.debug("Promo banner blocked or unavailable.");
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading || !banner) return null;

  const handleConnectClick = () => {
    if (banner.link_url && banner.link_url.startsWith('http')) {
      window.open(banner.link_url, '_blank');
    } else {
      window.dispatchEvent(new CustomEvent("openPopupEnquiry", {
        detail: { bannerTitle: banner.title || banner.text }
      }));
    }
  };

  return (
    <aside 
      role="complementary"
      aria-label="Promotional Announcement"
      className="relative z-[60] w-full py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out overflow-hidden flex items-center selection:bg-red-500 selection:text-white"
      style={{ backgroundColor: banner.bg_color || '#84CC16', color: banner.text_color || '#000000' }}
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 relative z-10">
        
        {/* Scrolling Banner Text */}
        <div className="flex-1 overflow-hidden flex items-center mask-image-edges">
          {/* We use a simple CSS animation for marquee effect if the text is long, otherwise it just centers */}
          <div className="whitespace-nowrap flex items-center gap-8 animate-marquee font-bold text-sm sm:text-base md:text-lg tracking-wide">
            <span>{banner.text}</span>
            <span className="hidden sm:inline" aria-hidden="true">★</span>
            <span className="hidden sm:inline" aria-hidden="true">{banner.text}</span>
            <span className="hidden lg:inline" aria-hidden="true">★</span>
            <span className="hidden lg:inline" aria-hidden="true">{banner.text}</span>
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex-shrink-0">
          <button 
            onClick={handleConnectClick}
            className="group relative inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2 rounded-full overflow-hidden shadow-lg cursor-pointer"
            style={{ color: banner.text_color || '#000000', border: `1px solid ${banner.text_color}40` }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {banner.link_text || "Connect Now"}
              <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .mask-image-edges {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
        @keyframes marquee {
          0% { transform: translateX(10%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 15s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }
        /* Mobile: disable shimmer, slow marquee */
        @media (max-width: 768px) {
          .animate-shimmer {
            animation: none;
            display: none;
          }
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}</style>
    </aside>
  );
}
