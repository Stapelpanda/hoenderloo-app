import React, { useState, useEffect } from 'react';
import { waypoints } from '../data/waypoints';
import { WaypointWithDistance } from '../types/waypoint';
import PanoramaViewer from '../components/PanoramaViewer';
import { getPanoramaUrl } from '../assets/panoramas';

const RADIUS = 50; // meters

const Treasure: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [waypointsWithDistance, setWaypointsWithDistance] = useState<WaypointWithDistance[]>([]);
  const [error, setError] = useState<string>('');
  const [showPanorama, setShowPanorama] = useState(false);

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

  // Update distances and bearings when location changes
  useEffect(() => {
    if (currentLocation) {
      const updatedWaypoints = waypoints.map(waypoint => ({
        ...waypoint,
        distance: calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          waypoint.coordinates.latitude,
          waypoint.coordinates.longitude
        ),
        bearing: calculateBearing(
          currentLocation.latitude,
          currentLocation.longitude,
          waypoint.coordinates.latitude,
          waypoint.coordinates.longitude
        )
      }));
      setWaypointsWithDistance(updatedWaypoints);
    }
  }, [currentLocation]);

  // Watch location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setError('');
      },
      (err) => {
        setError('Locatie toegang is nodig voor de speurtocht. ' + err.message);
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

  const currentWaypoint = waypointsWithDistance[currentIndex];
  const isWithinRadius = currentWaypoint?.distance && currentWaypoint.distance <= RADIUS;

  return (
    <div className="page treasure-page">
      <h1>Speurtocht</h1>
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : currentWaypoint ? (
        <>
          <div className="navigation-controls">
            <button 
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              Vorige
            </button>
            <span>Punt {currentIndex + 1} van {waypoints.length}</span>
            <button 
              onClick={() => setCurrentIndex(prev => Math.min(waypoints.length - 1, prev + 1))}
              disabled={currentIndex === waypoints.length - 1}
            >
              Volgende
            </button>
          </div>

          <div className="waypoint-content">
            {showPanorama && (
              <PanoramaViewer
                waypointId={currentWaypoint.id}
                onClose={() => setShowPanorama(false)}
              />
            )}
            {!showPanorama && (
              <div className="compass-container">
                <div 
                  className="compass-arrow"
                  style={{ transform: `rotate(${currentWaypoint.bearing}deg)` }}
                />
                <div className="distance-info">
                  <div>Loop richting {getDirection(currentWaypoint.bearing)}</div>
                  <div>Nog {Math.round(currentWaypoint.distance)} meter</div>
                </div>
              </div>
            )}

            {!showPanorama && isWithinRadius && getPanoramaUrl(currentWaypoint.id) && (
              <div className="location-info" onClick={() => setShowPanorama(true)}>
                <img 
                  src={getPanoramaUrl(currentWaypoint.id)} 
                  alt="Preview van panorama"
                  style={{ width: '100%', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                />
              </div>
            )}

            {isWithinRadius && (
              <div className="question-container">
                <div className="question">
                  {currentWaypoint.content}
                </div>
                {currentWaypoint.type === 'question' && (
                  <div className="solution-container">
                    <button onClick={() => setShowSolution(!showSolution)}>
                      {showSolution ? 'Verberg oplossing' : 'Toon oplossing'}
                    </button>
                    {showSolution && (
                      <div className="solution">
                        {currentWaypoint.solution}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div>Locatie bepalen...</div>
      )}
    </div>
  );
};

export default Treasure;
