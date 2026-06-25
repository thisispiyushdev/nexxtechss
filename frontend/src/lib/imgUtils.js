/**
 * Utility for Pexels image optimization
 * @param {string} url - The original pexels image URL
 * @param {object} options - Optimization options
 * @param {number} options.w - Width of the image
 * @param {number} options.h - Height of the image
 * @param {string} options.fm - Format (webp, jpeg, png)
 * @param {number} options.q - Quality (1-100)
 * @param {string} options.fit - Fit type (crop, min, max, etc.)
 */
export const optimizePexelsUrl = (url, { w, h, fm = "webp", q = 75, fit = "crop" } = {}) => {
  if (!url || !url.includes("pexels.com")) return url;

  try {
    const urlObj = new URL(url);
    // Standard Pexels params
    if (w) urlObj.searchParams.set("w", w);
    if (h) urlObj.searchParams.set("h", h);
    if (fm) urlObj.searchParams.set("fm", fm);
    if (q) urlObj.searchParams.set("q", q);
    if (fit) urlObj.searchParams.set("fit", fit);
    
    // Ensure compression is always on
    urlObj.searchParams.set("auto", "compress");
    urlObj.searchParams.set("cs", "tinysrgb");

    return urlObj.toString();
  } catch (e) {
    console.warn("Invalid Pexels URL:", url);
    return url;
  }
};

/**
 * Generates a srcset for responsive images
 * @param {string} url - Original URL
 * @returns {string} - Srcset string
 */
export const getPexelsSrcSet = (url) => {
  if (!url || !url.includes("pexels.com")) return "";

  const widths = [400, 600, 800, 1200, 1600];
  return widths
    .map(w => `${optimizePexelsUrl(url, { w, fm: "webp" })} ${w}w`)
    .join(", ");
};
