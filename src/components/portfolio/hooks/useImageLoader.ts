import { useState, useEffect } from 'react';
import { getPublicAssetPath, validateImagePath } from '../../../utils/assetUtils';

interface UseImageLoaderResult {
  isLoading: boolean;
  hasError: boolean;
  imagePath: string;
}

export function useImageLoader(path: string): UseImageLoaderResult {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imagePath = getPublicAssetPath(path);

  useEffect(() => {
    if (!path) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const loadImage = async () => {
      try {
        const exists = await validateImagePath(imagePath);
        if (!exists) {
          throw new Error(`Image not found: ${imagePath}`);
        }

        const img = new Image();
        img.onload = () => {
          setIsLoading(false);
          setHasError(false);
        };
        img.onerror = () => {
          setIsLoading(false);
          setHasError(true);
          console.error(`Failed to load image: ${imagePath}`);
        };
        img.src = imagePath;
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
        console.error(error);
      }
    };

    loadImage();
  }, [path, imagePath]);

  return { isLoading, hasError, imagePath };
}