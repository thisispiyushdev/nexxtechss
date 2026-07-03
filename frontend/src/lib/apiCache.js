/**
 * Centralized API cache & prefetch layer
 * - Prefetches homepage data in parallel on first load
 * - Caches responses in memory (sessionStorage backup)
 * - Deduplicates concurrent requests to the same endpoint
 * - Components get data instantly from cache on re-renders
 */
import axios from "axios";

import { API_ROOT } from "./apiConfig";

const API = API_ROOT;

// In-memory cache
const cache = new Map();
// Pending requests (for deduplication)
const pending = new Map();

// Cache TTL: 0 (disabled for immediate updates, was 5 minutes)
const CACHE_TTL = 0;

/**
 * Fetch with caching + deduplication
 * If the same URL is already being fetched, returns the same promise (no duplicate requests)
 */
export async function cachedFetch(url, options = {}) {
  const cacheKey = url;
  
  // 1. Check memory cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // 2. Check sessionStorage as backup
  try {
    const stored = sessionStorage.getItem(`api_cache_${cacheKey}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        // Restore to memory cache
        cache.set(cacheKey, parsed);
        return parsed.data;
      }
    }
  } catch (e) { /* ignore */ }

  // 3. Deduplicate: if this URL is already being fetched, return the same promise
  if (pending.has(cacheKey)) {
    return pending.get(cacheKey);
  }

  // 4. Fetch from network
  // Use a 5-minute cache-buster to allow CDN caching while preventing stale CORS headers
  const separator = url.includes('?') ? '&' : '?';
  const fetchUrl = `${url}${separator}cb=${Math.floor(Date.now() / 300000)}`;
  
  const fetchPromise = axios.get(fetchUrl, {
    timeout: 8000,
    ...options,
  }).then(res => {
    const data = res.data;
    const entry = { data, timestamp: Date.now() };
    
    // Store in memory cache
    cache.set(cacheKey, entry);
    
    // Store in sessionStorage for cross-component access
    try {
      sessionStorage.setItem(`api_cache_${cacheKey}`, JSON.stringify(entry));
    } catch (e) { /* quota exceeded, ignore */ }
    
    pending.delete(cacheKey);
    return data;
  }).catch(err => {
    pending.delete(cacheKey);
    throw err;
  });

  pending.set(cacheKey, fetchPromise);
  return fetchPromise;
}

export function prefetchHomepageData() {
  const urls = [
    `${API}/content/banners/active`,
    `${API}/content/courses`,
    `${API}/content/reviews`,
    `${API}/content/stats`,
  ];

  // Fire all requests in parallel (don't await — fire and forget)
  urls.forEach(url => {
    cachedFetch(url).catch(() => { /* silently fail, components have fallbacks */ });
  });

  // Prefetch blogs list
  cachedFetch(`${API}/content/blogs`).catch(() => {});
}

/**
 * Invalidate a specific cache entry (e.g., after admin updates)
 */
export function invalidateCache(url) {
  cache.delete(url);
  try { sessionStorage.removeItem(`api_cache_${url}`); } catch (e) { /* ignore */ }
}

/**
 * Clear entire cache
 */
export function clearCache() {
  cache.clear();
  try {
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('api_cache_')) sessionStorage.removeItem(key);
    });
  } catch (e) { /* ignore */ }
}

// Convenience endpoint constants
export { API };
