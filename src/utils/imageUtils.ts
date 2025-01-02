/**
 * Utility functions for handling images
 */

// Valid image directories
const VALID_DIRECTORIES = ['logos', 'team'] as const;
type ImageDirectory = typeof VALID_DIRECTORIES[number];

// Image validation
export function isValidImagePath(path: string): boolean {
  if (!path) return false;
  if (path.startsWith('http')) return true;
  return VALID_DIRECTORIES.some(dir => path.startsWith(dir + '/'));
}

// Get public URL for image
export function getImageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `/${path}`;
}

// Get image dimensions
export async function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}