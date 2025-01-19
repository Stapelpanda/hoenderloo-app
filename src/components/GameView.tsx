import { useState, useEffect } from 'react';
import { Waypoint } from '../types';
import { Question, questions } from '../types/questions';
import '../styles/GameView.css';

interface GameViewProps {
  waypoints: Waypoint[];
  currentWaypoint: number;
  onAnswerCorrect: () => void;
}

export function GameView({ waypoints, currentWaypoint, onAnswerCorrect }: GameViewProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [distance, setDistance] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const currentQuestion = questions.find(
    q => q.waypointId === waypoints[currentWaypoint].name
  );

  useEffect(() => {
    // Reset state when waypoint changes
    setUserAnswer('');
    setShowError(false);
  }, [currentWaypoint]);

  useEffect(() => {
    // Watch user's location and calculate distance to current waypoint
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          const waypointLat = waypoints[currentWaypoint].lat;
          const waypointLon = waypoints[currentWaypoint].lon;

          // Calculate distance using Haversine formula
          const R = 6371e3; // Earth's radius in meters
          const φ1 = userLat * Math.PI/180;
          const φ2 = waypointLat * Math.PI/180;
          const Δφ = (waypointLat-userLat) * Math.PI/180;
          const Δλ = (waypointLon-userLon) * Math.PI/180;

          const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

          const distance = R * c;
          setDistance(Math.round(distance));
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [currentWaypoint, waypoints]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion && userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      onAnswerCorrect();
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="game-view">
        <div className="distance-indicator">
          {distance !== null && (
            <p>Afstand tot volgende punt: {distance < 1000 ? `${distance}m` : `${(distance/1000).toFixed(1)}km`}</p>
          )}
        </div>
        <div className="question-container">
          <h2>Ga naar het volgende punt</h2>
          <p>Voor dit punt is geen vraag beschikbaar.</p>
          <button 
            className="skip-button"
            onClick={() => onAnswerCorrect()}
          >
            Doorgaan naar volgende punt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-view">
      <div className="distance-indicator">
        {distance !== null ? (
          <p>Afstand tot volgende punt: {distance < 1000 ? `${distance}m` : `${(distance/1000).toFixed(1)}km`}</p>
        ) : (
          <p>Locatie bepalen...</p>
        )}
      </div>

      <div className="question-container">
        <h2>Vraag {currentWaypoint + 1}</h2>
        <p>{currentQuestion.question}</p>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Jouw antwoord"
            className={showError ? 'error' : ''}
          />
          <button type="submit">Controleer</button>
        </form>

        {showError && (
          <p className="error-message">Dat is niet het juiste antwoord, probeer nog eens!</p>
        )}
      </div>
    </div>
  );
}
