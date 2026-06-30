import { optimizePexelsUrl, getPexelsSrcSet } from "@/lib/imgUtils";
import { cn } from "@/lib/utils";

/**
 * A responsive image component that optimizes Pexels images
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {string} className - Additional classes
 * @param {object} pexelsOptions - Options for pexels optimization
 * @param {boolean} lazy - Whether to lazy load
 * @param {boolean} priority - If true, loads eagerly with high fetchpriority (for LCP)
 * @param {number} width - Explicit width for layout stability
 * @param {number} height - Explicit height for layout stability
 */
export default function ResponsiveImage({ 
  src, 
  alt, 
  className, 
  pexelsOptions = { w: 800 }, 
  lazy = true,
  priority = false,
  width,
  height,
  ...props 
}) {
  const isPexels = src && src.includes("pexels.com");
  const loadingAttr = priority ? "eager" : (lazy ? "lazy" : "eager");
  const fetchPriorityAttr = priority ? "high" : undefined;
  
  // Map local png paths that were converted to jpeg
  let finalSrc = src;
  if (src && !isPexels) {
    const lowerSrc = src.toLowerCase();
    if (
      lowerSrc.endsWith(".png") &&
      (lowerSrc.includes("course-images/") ||
       lowerSrc.includes("/ngo.png") ||
       lowerSrc.includes("/aura-chat-bot.png"))
    ) {
      finalSrc = src.replace(/\.png$/i, ".webp");
    }
  }

  if (!isPexels) {
    return (
      <img 
        src={finalSrc} 
        alt={alt} 
        className={className} 
        loading={loadingAttr}
        fetchPriority={fetchPriorityAttr}
        decoding="async"
        width={width}
        height={height}
        {...props} 
      />
    );
  }

  const optimizedSrc = optimizePexelsUrl(src, pexelsOptions);
  const srcSet = getPexelsSrcSet(src);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
      alt={alt}
      className={cn("transition-opacity duration-300 img-smooth", className)}
      loading={loadingAttr}
      fetchPriority={fetchPriorityAttr}
      decoding="async"
      width={width}
      height={height}
      {...props}
    />
  );
}
