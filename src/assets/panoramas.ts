// Import all panorama images
const panoramas = import.meta.glob('./*.jpg', { eager: true });

// Create a mapping from image number to URL
const panoramaUrls = Object.entries(panoramas).reduce((acc, [path, module]) => {
  const number = path.match(/\/(\d+)\.jpg$/)?.[1];
  if (number) {
    acc[number] = (module as { default: string }).default;
  }
  return acc;
}, {} as Record<string, string>);

export const getPanoramaUrl = (imageNumber: string) => {
  return panoramaUrls[imageNumber];
};
