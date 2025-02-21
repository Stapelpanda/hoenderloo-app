// Import all panorama images
const panoramas = import.meta.glob('./*.jpg', { eager: true });

// Create a mapping from waypoint ID to URL
const panoramaUrls = Object.entries(panoramas).reduce((acc, [path, module]) => {
  const id = path.match(/\/(\d+)\.jpg$/)?.[1];
  if (id) {
    acc[id] = (module as { default: string }).default;
  }
  return acc;
}, {} as Record<string, string>);

export const getPanoramaUrl = (waypointId: string) => {
  return panoramaUrls[waypointId];
};
