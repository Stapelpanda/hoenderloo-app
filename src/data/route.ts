import type { Waypoint } from '../types';

export const routeData: Waypoint[] = [
  {
    latitude: 52.1234,
    longitude: 4.5678,
    name: "Start Point",
    action: {
      type: "task",
      content: "Zoek de grote eik en tel het aantal hoofdtakken",
      answer: "6"
    },
    panoramaUrl: "/src/assets/panoramas/point1.svg"
  },
  {
    latitude: 52.1235,
    longitude: 4.5680,
    name: "Tweede Post",
    action: {
      type: "question",
      content: "Welk jaartal staat er op de gedenksteen?",
      answer: "1923"
    },
    panoramaUrl: "/src/assets/panoramas/point1.svg"
  },
  {
    latitude: 52.1240,
    longitude: 4.5685,
    name: "Derde Post",
    action: {
      type: "task",
      content: "Maak een groepsfoto bij de picknicktafel",
    },
    panoramaUrl: "/src/assets/panoramas/point1.svg"
  }
];

// Minimum distance in meters to trigger arrival at waypoint
export const ARRIVAL_THRESHOLD = 10;

// Maximum distance in meters to show "Getting warmer/colder" feedback
export const MAX_DISTANCE_FEEDBACK = 100;
