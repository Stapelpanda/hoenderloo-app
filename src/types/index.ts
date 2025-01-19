export interface Waypoint {
  name: string;
  lat: number;
  lon: number;
  ele: number;
  time: string;
  description: string;
}

export interface GpxData {
  waypoints: Waypoint[];
  bounds: {
    maxlat: number;
    maxlon: number;
    minlat: number;
    minlon: number;
  };
}

export interface GameState {
  currentWaypoint: number;
  visited: string[];
  isViewingImage: boolean;
}
