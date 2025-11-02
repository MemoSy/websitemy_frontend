// تحسين الصور وضغطها
export const optimizeImage = (
  src: string,
  width?: number,
  height?: number,
  quality: number = 80
): string => {
  // إذا كانت الصورة من Pexels، نضيف معاملات التحسين
  if (src.includes('pexels.com')) {
    const url = new URL(src);
    
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    url.searchParams.set('auto', 'compress');
    url.searchParams.set('cs', 'tinysrgb');
    url.searchParams.set('fit', 'crop');
    
    return url.toString();
  }
  
  return src;
};

// إنشاء صور متعددة الأحجام للاستجابة
export const generateResponsiveImageSizes = (src: string) => {
  const sizes = [320, 640, 768, 1024, 1280, 1920];
  
  return sizes.map(size => ({
    src: optimizeImage(src, size),
    width: size,
    media: `(max-width: ${size}px)`
  }));
};

// تحويل الصورة إلى WebP إذا كان المتصفح يدعمها
export const getOptimalImageFormat = (src: string): string => {
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (supportsWebP && src.includes('pexels.com')) {
    const url = new URL(src);
    url.searchParams.set('fm', 'webp');
    return url.toString();
  }

  return src;
};

// ضغط الصورة قبل الرفع
export const compressImage = (
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // حساب الأبعاد الجديدة
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // رسم الصورة المضغوطة
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(resolve, 'image/jpeg', quality);
    };

    img.src = URL.createObjectURL(file);
  });
};