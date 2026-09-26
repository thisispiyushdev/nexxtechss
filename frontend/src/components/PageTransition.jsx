import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isMobile ? -10 : -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
