import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(false);
    // Request animation frame for better performance than setTimeout
    const frameId = requestAnimationFrame(() => {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(frameId);
  }, [location.pathname]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0"
      } ${!isVisible && isMobile ? "translate-y-2" : !isVisible ? "translate-y-4" : ""}`}
    >
      {children}
    </div>
  );
};

export default PageTransitionWrapper;
