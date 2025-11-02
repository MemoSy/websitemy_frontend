import { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * Optimized Image Component with WebP support and lazy loading
 * 
 * Features:
 * - Automatic WebP conversion with fallback
 * - Lazy loading by default
 * - Priority loading for above-the-fold images
 * - Responsive images support
 * - Loading placeholder
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = '',
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP source from original image path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Check if original is already WebP
  const isWebP = src.endsWith('.webp');

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <picture className={`block ${className}`}>
      {/* WebP source for modern browsers */}
      {!isWebP && (
        <source
          srcSet={webpSrc}
          type="image/webp"
          sizes={sizes}
        />
      )}
      
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${hasError ? 'opacity-50' : ''}
        `}
        {...props}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{
            width: width || '100%',
            height: height || '100%',
          }}
        />
      )}
    </picture>
  );
};

export default OptimizedImage;
