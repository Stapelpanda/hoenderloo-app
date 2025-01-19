import { XMLParser } from 'fast-xml-parser';
import { GpxData, Waypoint } from '../types';

export async function parseGpxFile(filePath: string): Promise<GpxData> {
  try {
    const response = await fetch(filePath);
    const gpxContent = await response.text();
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_'
    });
    
    const result = parser.parse(gpxContent);
    const gpx = result.gpx;

    const bounds = {
      maxlat: parseFloat(gpx.metadata.bounds['@_maxlat']),
      maxlon: parseFloat(gpx.metadata.bounds['@_maxlon']),
      minlat: parseFloat(gpx.metadata.bounds['@_minlat']),
      minlon: parseFloat(gpx.metadata.bounds['@_minlon'])
    };

    // Ensure wpt is always an array
    const wptArray = Array.isArray(gpx.wpt) ? gpx.wpt : [gpx.wpt];

    const waypoints: Waypoint[] = wptArray.map((wpt: any) => ({
      name: wpt.name,
      lat: parseFloat(wpt['@_lat']),
      lon: parseFloat(wpt['@_lon']),
      ele: parseFloat(wpt.ele),
      time: wpt.time,
      description: wpt.desc
    }));

    return {
      waypoints,
      bounds
    };
  } catch (error) {
    console.error('Error parsing GPX file:', error);
    throw error;
  }
}
