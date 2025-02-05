export interface Waypoint {
  latitude: number;
  longitude: number;
  name: string;
  action: Action;
  panoramaUrl: string;
}

export interface Action {
  type: 'question' | 'task';
  content: string;
  answer?: string;
}

export interface GameState {
  currentWaypointIndex: number;
  waypoints: Waypoint[];
  completed: boolean;
  currentPosition: {
    latitude: number;
    longitude: number;
  } | null;
}
