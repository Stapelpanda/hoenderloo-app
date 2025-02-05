import React, { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

const TARGET: Location = {
  latitude: 52.1336175,
  longitude: 5.8963765
};

const Map: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string>('');
  const [distance, setDistance] = useState<number | null>(null);
  const [bearing, setBearing] = useState<number | null>(null);

  // Calculate distance between two points in meters
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Calculate bearing between two points in degrees
  const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const λ1 = lon1 * Math.PI / 180;
    const λ2 = lon2 * Math.PI / 180;

    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    const θ = Math.atan2(y, x);

    return (θ * 180 / Math.PI + 360) % 360;
  };

  // Convert bearing to cardinal direction
  const getDirection = (bearing: number): string => {
    const directions = ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW'];
    return directions[Math.round(bearing / 45) % 8];
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setCurrentLocation(newLocation);

        // Calculate distance and bearing
        const dist = calculateDistance(
          newLocation.latitude,
          newLocation.longitude,
          TARGET.latitude,
          TARGET.longitude
        );
        const bear = calculateBearing(
          newLocation.latitude,
          newLocation.longitude,
          TARGET.latitude,
          TARGET.longitude
        );

        setDistance(dist);
        setBearing(bear);
        setError('');
      },
      (err) => {
        setError('Locatie toegang is nodig om de richting te bepalen. ' + err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="page">
      <h1>Waar is het terrein?</h1>
      {error ? (
        <div className="error-message">{error}</div>
      ) : currentLocation ? (
        <div className="location-info">
          <div className="direction-indicator">
            <div 
              className="compass-arrow"
              style={{ transform: `rotate(${bearing}deg)` }}
            />
            <div className="direction-text">
              Loop richting {getDirection(bearing!)}
            </div>
          </div>
          <div className="distance-text">
            Nog {Math.round(distance!)} meter te gaan
          </div>
        </div>
      ) : (
        <div>Locatie bepalen...</div>
      )}
    </div>
  );
};

export default Map;
