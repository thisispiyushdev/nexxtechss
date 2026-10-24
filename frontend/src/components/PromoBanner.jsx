import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cachedFetch, API } from "@/lib/apiCache";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919217179762";

const DEFAULT_HOME_BANNER = {
  id: "default-claim-discount",
  title: "🎉 Limited Time Offer! 🔥 Flat 50% OFF",
  text: "🎉 Big Savings Alert! Get FLAT 50% OFF on our professional courses 🚀 Upgrade your skills today and build your career with NexxTechs! 💡",
  link_url: "https://www.nexxtechs.com/contact/",
  link_text: "👉 Claim Discount",
  bg_color: "#16a34a",
  text_color: "#ffffff"
};

export default function PromoBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const isBannerPage = location.pathname === '/' || location.pathname === '/nexxtechs-noida';
  const page = location.pathname === '/nexxtechs-noida' ? 'noida' : 'home';

  useEffect(() => {
    if (!isBannerPage) {
      setBanner(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    cachedFetch(`${API}/content/banners/active?page=${page}`)
      .then((data) => {
        if (data && data.success !== false && data.text) {
          // If banner color is old yellow (#dfbb07), update to green
          if (data.bg_color === "#dfbb07") {
            data.bg_color = "#16a34a";
            data.text_color = "#ffffff";
          }
          setBanner(data);
        } else if (page === 'home') {
          setBanner(DEFAULT_HOME_BANNER);
        }
      })
      .catch((err) => {
        // Adblockers (like Brave Shields) often block 'banner' endpoints. 
        // We silently ignore this to avoid polluting the console with red errors.
        console.debug("Promo banner blocked or unavailable, using fallback.");
        if (page === 'home') {
          setBanner(DEFAULT_HOME_BANNER);
        }
      })
      .finally(() => setLoading(false));
  }, [page, isBannerPage]);

  if (!isBannerPage || loading || !banner) return null;

  const handleConnectClick = () => {
    if (banner.link_url && banner.link_url.startsWith('http')) {
      window.open(banner.link_url, '_blank');
    } else {
      window.dispatchEvent(new CustomEvent("openPopupEnquiry", {
        detail: { bannerTitle: banner.title || banner.text }
      }));
    }
  };

  const bannerBg = (banner.bg_color === '#dfbb07' ? '#16a34a' : banner.bg_color) || '#16a34a';
  const bannerTextColor = banner.text_color || (bannerBg === '#16a34a' ? '#ffffff' : '#000000');

  return (
    <aside 
      role="complementary"
      aria-label="Promotional Announcement"
      className="relative z-[60] w-full py-1.5 sm:py-2 shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-all duration-500 ease-in-out overflow-hidden flex items-center selection:bg-black selection:text-white"
      style={{ backgroundColor: bannerBg, color: bannerTextColor }}
    >
      {/* Decorative Subtle Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer hidden sm:block" />

      <div className="max-w-[1440px] w-full mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        
        {/* Scrolling Banner Text */}
        <div className="flex-1 overflow-hidden flex items-center mask-image-edges">
          {/* Marquee effect */}
          <div className="whitespace-nowrap flex items-center gap-4 sm:gap-6 animate-marquee font-bold text-xs sm:text-sm tracking-normal">
            <span>{banner.text}</span>
            <span aria-hidden="true">★</span>
            <span aria-hidden="true">{banner.text}</span>
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
            className="group relative inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap bg-white/20 hover:bg-white/30 backdrop-blur-sm px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full overflow-hidden shadow cursor-pointer"
            style={{ color: bannerTextColor, border: `1px solid ${bannerTextColor}40` }}
          >
            <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
              {banner.link_text || "Connect Now"}
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:scale-110 transition-transform" />
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
          animation: marquee 25s linear infinite;
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
        /* Mobile adjustments */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 15s; /* Make it faster on mobile */
          }
        }
      `}</style>
    </aside>
  );
}
