import React, { useState, useEffect } from 'react';
import { preloadImage } from '../../utils/imageLoader';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({ src, alt, className = '', priority = false }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;

    if (priority) {
      // Load immediately for priority images
      loadImage();
    } else {
      // Use IntersectionObserver for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadImage();
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      const element = document.querySelector(`[data-image-src="${src}"]`);
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }
  }, [src, priority]);

  const loadImage = async () => {
    try {
      await preloadImage(src);
      setIsLoaded(true);
      setHasError(false);
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full" data-image-src={src}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      />
    </div>
  );
}