import React, { useEffect, useState } from 'react';
import { calculateDistance, watchPosition } from '../utils/location';
import type { Waypoint } from '../types';
import { ARRIVAL_THRESHOLD, MAX_DISTANCE_FEEDBACK } from '../data/route';

interface NavigationProps {
  currentWaypoint: Waypoint;
  onArrival: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentWaypoint, onArrival }) => {
  const [distance, setDistance] = useState<number | null>(null);
  const [lastDistance, setLastDistance] = useState<number | null>(null);

  useEffect(() => {
    let watchId: number;

    const startWatching = () => {
      watchId = watchPosition(
        (position) => {
          const newDistance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            currentWaypoint.latitude,
            currentWaypoint.longitude
          );

          setLastDistance(distance);
          setDistance(newDistance);

          if (newDistance <= ARRIVAL_THRESHOLD) {
            onArrival();
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    };

    startWatching();

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [currentWaypoint, onArrival]);

  const getDirectionFeedback = () => {
    if (!distance || !lastDistance || distance > MAX_DISTANCE_FEEDBACK) {
      return '';
    }

    return distance < lastDistance ? 'Je komt dichterbij!' : 'Je gaat er vanaf!';
  };

  if (!distance) {
    return <div className="p-4">Locatie bepalen...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Afstand tot volgende punt</h2>
      <div className="text-2xl mb-2">{Math.round(distance)} meter</div>
      <div className="text-lg text-blue-600">{getDirectionFeedback()}</div>
    </div>
  );
};
