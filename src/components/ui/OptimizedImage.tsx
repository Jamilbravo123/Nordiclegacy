import React from 'react';
import { useImageLoader } from '../../hooks/useImageLoader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function OptimizedImage({ src, alt, className = '' }: OptimizedImageProps) {
  const { isLoading, hasError, imagePath } = useImageLoader(src);

  if (hasError) {
    return (
      <div className={`bg-gray-200 ${className}`}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-400">Image not found</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img 
        src={imagePath}
        alt={alt}
        loading="lazy"
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
}