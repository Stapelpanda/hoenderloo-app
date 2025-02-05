declare module 'gpx-parse' {
  export interface GpxWaypoint {
    lat: number;
    lon: number;
    name?: string;
    ele?: number;
    time?: Date;
  }

  export interface GpxData {
    waypoints: GpxWaypoint[];
    tracks: any[];
    routes: any[];
  }

  export function parseGpx(
    gpxContent: string,
    callback: (error: Error | null, data: GpxData) => void
  ): void;
}
