import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Action } from '../components/Action';
import { Panorama } from '../components/Panorama';
import { routeData } from '../data/route';
import type { GameState } from '../types';

export const RoutePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentWaypointIndex: 0,
    waypoints: routeData,
    completed: false,
    currentPosition: null,
  });
  const [showingPanorama, setShowingPanorama] = useState(false);

  const currentWaypoint = gameState.waypoints[gameState.currentWaypointIndex];
  const isLastWaypoint = gameState.currentWaypointIndex === gameState.waypoints.length - 1;

  const handleArrival = () => {
    // When player arrives at waypoint, we don't automatically show the action
    // They need to be at the location to see and complete the action
  };

  const handleActionComplete = () => {
    setShowingPanorama(true);
  };

  const handlePanoramaContinue = () => {
    setShowingPanorama(false);
    if (isLastWaypoint) {
      setGameState(prev => ({ ...prev, completed: true }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentWaypointIndex: prev.currentWaypointIndex + 1,
      }));
    }
  };

  if (gameState.completed) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold mb-4">Gefeliciteerd!</h1>
          <p>Je hebt de speurtocht voltooid!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {showingPanorama ? (
        <Panorama
          imageUrl={currentWaypoint.panoramaUrl}
          onContinue={handlePanoramaContinue}
        />
      ) : (
        <>
          <div className="flex-1 overflow-auto">
            <div className="bg-white shadow-sm p-4 mb-4">
              <h1 className="text-xl font-bold">Post {gameState.currentWaypointIndex + 1}</h1>
              <p className="text-gray-600">{currentWaypoint.name}</p>
            </div>
            <Navigation
              currentWaypoint={currentWaypoint}
              onArrival={handleArrival}
            />
            <Action
              action={currentWaypoint.action}
              onComplete={handleActionComplete}
            />
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Post {gameState.currentWaypointIndex + 1} van {gameState.waypoints.length}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
