import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SEOHead from "../components/SEOHead";

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="min-h-[60vh] bg-transparent flex items-center justify-center font-sans">
        <SEOHead
          title="404 - Page Not Found | Nexxtechs"
          description="The page you are looking for does not exist."
        />
        
        <div className="text-center px-4">
          <h1 className="text-6xl sm:text-8xl font-extrabold text-[#84CC16] mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for seems to have gone missing or doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#84CC16] text-black font-bold hover:bg-[#a3e635] transition-colors duration-300 shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
