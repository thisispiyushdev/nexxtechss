import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cachedFetch, API } from "@/lib/apiCache";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919217179762";

const DEFAULT_BANNERS = {
  noida: {
    title: "🔥 Flat 50% OFF – Limited Time!",
    text: "🚀 Upgrade Your Skills with NexxTechs Noida! 💻 Get FLAT 50% OFF on Professional IT Courses 🎓 Limited-Time Offer ⏰ Enroll Now! 🔥",
    link_url: "/contact-noida",
    link_text: "🎁 Claim 50% OFF",
    bg_color: "#84CC16",
    text_color: "#000000",
  },
  home: {
    title: "🔥 Flat 50% OFF – Limited Time!",
    text: "🔥 Limited Time Offer! Flat 50% Discount On All Master Programs 🔥 Free Demo Classes Available! ⭐",
    link_url: "/contact",
    link_text: "🎁 Claim 50% OFF",
    bg_color: "#84CC16",
    text_color: "#000000",
  },
};

export default function PromoBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const rawPath = (location.pathname || "").toLowerCase();
  const cleanPath = rawPath.replace(/\/+$/, "") || "/";
  const isBannerPage = cleanPath === "/" || cleanPath === "/nexxtechs-noida";
  const page = cleanPath === "/nexxtechs-noida" ? "noida" : "home";

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
          setBanner(data);
        } else {
          setBanner(DEFAULT_BANNERS[page] || DEFAULT_BANNERS.home);
        }
      })
      .catch((err) => {
        // Adblockers (like Brave Shields) often block 'banner' endpoints. 
        // We fallback gracefully so the promo banner is always displayed.
        console.debug("Promo banner endpoint blocked or unavailable, using fallback banner.");
        setBanner(DEFAULT_BANNERS[page] || DEFAULT_BANNERS.home);
      })
      .finally(() => setLoading(false));
  }, [page, isBannerPage]);

  const activeBanner = banner || DEFAULT_BANNERS[page];
  if (!isBannerPage || !activeBanner) return null;

  const handleConnectClick = () => {
    if (activeBanner.link_url && activeBanner.link_url.startsWith("http")) {
      window.open(activeBanner.link_url, "_blank");
    } else if (activeBanner.link_url) {
      window.location.href = activeBanner.link_url;
    } else {
      window.dispatchEvent(new CustomEvent("openPopupEnquiry", {
        detail: { bannerTitle: activeBanner.title || activeBanner.text }
      }));
    }
  };

  return (
    <aside 
      role="complementary"
      aria-label="Promotional Announcement"
      className="sticky top-0 z-[90] w-full py-2 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 ease-in-out overflow-hidden flex items-center selection:bg-red-500 selection:text-white"
      style={{ backgroundColor: activeBanner.bg_color || '#84CC16', color: activeBanner.text_color || '#000000' }}
    >
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer hidden sm:block" />

      <div className="max-w-[1440px] w-full mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 relative z-10">
        
        {/* Scrolling Banner Text */}
        <div className="flex-1 overflow-hidden flex items-center mask-image-edges">
          {/* We use a simple CSS animation for marquee effect if the text is long, otherwise it just centers */}
          <div className="whitespace-nowrap flex items-center gap-4 sm:gap-8 animate-marquee font-bold text-xs sm:text-base md:text-lg tracking-wide">
            <span>{activeBanner.text}</span>
            <span aria-hidden="true">★</span>
            <span>{activeBanner.text}</span>
            <span className="hidden sm:inline" aria-hidden="true">★</span>
            <span className="hidden sm:inline" aria-hidden="true">{activeBanner.text}</span>
            <span className="hidden lg:inline" aria-hidden="true">★</span>
            <span className="hidden lg:inline" aria-hidden="true">{activeBanner.text}</span>
          </div>
        </div>

        {/* Connect Button */}
        <div className="flex-shrink-0">
          <button 
            onClick={handleConnectClick}
            className="group relative inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 sm:px-5 sm:py-2 rounded-full overflow-hidden shadow-lg cursor-pointer"
            style={{ color: activeBanner.text_color || '#000000', border: `1px solid ${activeBanner.text_color}40` }}
          >
            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
              {activeBanner.link_text || "Connect Now"}
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
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
