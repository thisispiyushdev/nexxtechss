import React, { useState, useEffect } from "react";
import { API_ROOT } from "../config";

const API = API_ROOT;

export default function NoidaImageCarousel() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API}/content/noida-banners`);
        if (response.ok) {
          const data = await response.json();
          setBanners(data);
        }
      } catch (error) {
        console.error("Failed to fetch Noida Banners", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 seconds per slide
    
    return () => clearInterval(interval);
  }, [banners.length]);

  if (loading || banners.length === 0) {
    return null; // Don't show anything if empty or loading
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg mb-8 aspect-[21/9] sm:aspect-[3/1]">
      {/* Images */}
      {banners.map((banner, idx) => (
        <a 
          key={banner.id}
          href={banner.link_url || "#"}
          target={banner.link_url ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title || "Noida Promo Banner"}
            className="w-full h-full object-cover"
          />
        </a>
      ))}
      
      {/* Navigation Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-[#84CC16] scale-125 shadow-md" : "bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
