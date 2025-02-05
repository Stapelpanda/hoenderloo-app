import { parseGpx } from 'gpx-parse';
import type { Waypoint } from '../types';

export const parseGpxFile = (file: File): Promise<Waypoint[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target?.result) {
        reject(new Error('Failed to read GPX file'));
        return;
      }

      const gpxContent = event.target.result as string;
      
      parseGpx(gpxContent, (error: Error | null, data: any) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          // Convert GPX waypoints to our Waypoint format
          const waypoints: Waypoint[] = data.waypoints.map((wpt: any) => ({
            latitude: wpt.lat,
            longitude: wpt.lon,
            name: wpt.name || 'Unnamed Point',
            action: {
              type: 'task', // Default type, should be overridden by actual data
              content: 'Placeholder task', // Should be overridden by actual data
            },
            panoramaUrl: '', // Should be overridden by actual data
          }));

          resolve(waypoints);
        } catch (err) {
          reject(new Error('Failed to parse GPX data'));
        }
      });
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const loadGpxWithActions = async (
  gpxFile: File,
  actionsData: { [key: string]: { type: 'question' | 'task'; content: string; answer?: string } }
): Promise<Waypoint[]> => {
  const waypoints = await parseGpxFile(gpxFile);
  
  return waypoints.map((waypoint) => ({
    ...waypoint,
    action: actionsData[waypoint.name] || {
      type: 'task',
      content: 'Placeholder task',
    },
  }));
};
