export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  // If it's already a full URL, return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // If it's a local image, ensure it starts with /
  const cleanSrc = src.startsWith('/') ? src : `/${src}`;
  
  // Return the optimized path
  return `${cleanSrc}?w=${width}&q=${quality || 75}`;
};