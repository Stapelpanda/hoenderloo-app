export interface Waypoint {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageNumber: string; // Matches with assets/[number].jpg
  type: 'question' | 'task';
  content: string;
  solution?: string; // Only for questions
}

export interface WaypointWithDistance extends Waypoint {
  distance: number;
  bearing: number;
}
