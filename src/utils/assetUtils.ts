/**
 * Utility functions for handling assets and image paths
 */

/**
 * Gets the public asset path for images
 */
export function getPublicAssetPath(path: string): string {
  if (!path) return '';
  
  // If it's an external URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // Remove leading slash if present and ensure proper path structure
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${cleanPath}`;
}

/**
 * Gets the correct path for specific asset types
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  
  // If it's an external URL, return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  return getPublicAssetPath(path);
}

/**
 * Validates if an image exists at the given path
 */
export async function validateImagePath(path: string): Promise<boolean> {
  if (!path) return false;
  if (path.startsWith('http')) return true;
  
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}