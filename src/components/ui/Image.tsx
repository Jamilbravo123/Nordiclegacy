import React, { useState, useEffect } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  quality?: 'low' | 'medium' | 'high';
  loading?: 'lazy' | 'eager';
}

export function Image({ 
  src, 
  alt, 
  className = '', 
  quality = 'medium',
  loading = 'lazy',
  style,
  ...props 
}: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const imgElement = new window.Image();
    imgElement.src = src;
    
    imgElement.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    imgElement.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      console.error(`Failed to load image: ${src}`);
    };

    return () => {
      imgElement.onload = null;
      imgElement.onerror = null;
    };
  }, [src]);

  if (hasError) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{
          ...style,
          imageRendering: quality === 'high' ? 'crisp-edges' : 'auto',
          WebkitFontSmoothing: 'antialiased',
        }}
        loading={loading}
        {...props}
      />
    </div>
  );
}