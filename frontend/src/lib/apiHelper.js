/**
 * Helper to ensure all API requests directed at our backend include a trailing slash.
 * This is required to satisfy Vercel's trailingSlash: true configuration,
 * preventing Vercel from returning 405 Method Not Allowed on POST/PUT/DELETE requests.
 */
export function addTrailingSlashInterceptor(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.url) {
        try {
          const isRelative = !/^https?:\/\//i.test(config.url);
          const urlObj = new URL(config.url, window.location.origin);

          const isOurDomain =
            isRelative ||
            urlObj.origin === window.location.origin ||
            urlObj.hostname === "nexxtechs.com" ||
            urlObj.hostname === "www.nexxtechs.com" ||
            urlObj.hostname === "vercel.app" ||
            urlObj.hostname.endsWith(".vercel.app");

          if (isOurDomain && urlObj.pathname.startsWith("/api/")) {
            let path = urlObj.pathname;
            const lastSegment = path.split("/").pop();
            // Only append slash if there isn't one already and it's not a static file (no dot in filename)
            if (!path.endsWith("/") && !lastSegment.includes(".")) {
              urlObj.pathname = path + "/";
              config.url = isRelative
                ? urlObj.pathname + urlObj.search + urlObj.hash
                : urlObj.toString();
            }
          }
        } catch (e) {
          console.error("Error in trailing slash interceptor:", e);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
