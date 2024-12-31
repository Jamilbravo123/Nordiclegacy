export function getOptimizedImagePath(path: string): string {
  // If it's an external URL (like unsplash), return as is
  if (path.startsWith('http')) {
    return path;
  }

  // For local images, ensure they're properly referenced from public
  const basePath = path.startsWith('/') ? path : `/${path}`;
  
  // Add cache busting and optimization hint
  return `${basePath}?v=1&optimize=true`;
}