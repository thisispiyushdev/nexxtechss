import React, { useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function TextRevealAnimation() {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const { dark } = useTheme();

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-transparent py-24 md:py-32 cursor-default"
      data-testid="text-reveal-section"
    >
      <div className="max-w-[1440px] mx-auto px-6 relative z-10 flex justify-center items-center w-full h-full">
        <h2 
          className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter select-none m-0 text-center text-transparent"
          style={{
            lineHeight: 1,
            WebkitTextStroke: dark ? "1px rgba(255,255,255,0.15)" : "1px rgba(0,0,0,0.25)",
          }}
        >
          NexxTechs
        </h2>
      </div>

      {/* Foreground Solid Text Layer */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 180px at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
          maskImage: `radial-gradient(circle 180px at ${position.x}px ${position.y}px, black 20%, transparent 100%)`,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 relative flex justify-center items-center w-full h-full">
          <h2 
            className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter select-none m-0 text-center text-[#84CC16] drop-shadow-[0_0_30px_rgba(132,204,22,0.5)]"
            style={{
              lineHeight: 1
            }}
          >
            NexxTechs
          </h2>
        </div>
      </div>
    </section>
  );
}
