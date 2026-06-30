import React from 'react';
import { Star } from 'lucide-react';

export default function GoogleReviewBar() {
  return (
    <div className="fixed bottom-4 left-4 z-50 pointer-events-none flex">
      <div className="pointer-events-auto bg-white/95 dark:bg-[#1a1d27]/95 md:bg-white/90 md:dark:bg-[#1a1d27]/90 md:backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-2xl rounded-2xl p-3 flex items-center gap-3 transition-transform duration-300 hover:-translate-y-1">
        
        {/* Placeholder for the Google Review image */}
        <a 
          href="https://www.google.com/search?sxsrf=ANbL-n45_yc12spvUksio-wn-LlD5Lc2UA:1777028613417&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOc9SqY_lxlZiIoLowysDBBoBCTT7gvQ1BJALzlXpz5vWCg6gaY3anoS8sBcRAzB9LGxFfyuMETa4wNBODLZdvh06BXOM&q=Nexxtechs+Reviews" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Review us on Google"
          title="Review us on Google"
          className="flex-shrink-0 w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-[#84CC16] transition-colors relative group"
        >
          <span className="sr-only">Review us on Google</span>
          {/* Replace this div/img with the actual image when provided */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Star className="text-[#84CC16] w-5 h-5 mb-0.5 fill-[#84CC16]" />
          </div>
          {/* Uncomment and update src when image is available */}
          {/* <img src="/path-to-your-image.png" alt="Google Review" className="w-full h-full object-cover z-10 relative" /> */}
        </a>
        
        <div className="flex flex-col pr-2 hidden sm:flex">
          <span className="text-sm font-bold text-[#111827] dark:text-white leading-tight">Review us on Google</span>
          <a 
            href="https://www.google.com/search?sxsrf=ANbL-n45_yc12spvUksio-wn-LlD5Lc2UA:1777028613417&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOc9SqY_lxlZiIoLowysDBBoBCTT7gvQ1BJALzlXpz5vWCg6gaY3anoS8sBcRAzB9LGxFfyuMETa4wNBODLZdvh06BXOM&q=Nexxtechs+Reviews" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-[#4B5563] dark:text-gray-400 hover:text-[#84CC16] dark:hover:text-[#84CC16] transition-colors underline-offset-2 hover:underline"
          >
            Read or write reviews
          </a>
        </div>
      </div>
    </div>
  );
}
