import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Use simpler animation on mobile to avoid layout jank
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div
      key={location.pathname}
      className={isMobile
        ? "animate-in fade-in duration-300 ease-out fill-mode-both"
        : "animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
      }
    >
      {children}
    </div>
  );
}
