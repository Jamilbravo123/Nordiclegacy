/**
 * Utility for optimized image loading
 */

// Image cache
const imageCache = new Map<string, Promise<void>>();

// Preload image
export function preloadImage(src: string): Promise<void> {
  if (!src) return Promise.reject('No source provided');
  
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(`Failed to load image: ${src}`);
    img.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}

// Clear cache
export function clearImageCache() {
  imageCache.clear();
}