import { useEffect, useState } from 'react';
import { GameView } from './components/GameView';
import { ImageViewer } from './components/ImageViewer';
import { Progress } from './components/Progress';
import { Loading } from './components/Loading';
import { Welcome } from './components/Welcome';
import { Menu } from './components/Menu';
import { parseGpxFile } from './utils/gpxParser';
import { saveGameState, loadGameState } from './utils/storage';
import { GpxData, GameState } from './types';
import './App.css';

function App() {
  const [gpxData, setGpxData] = useState<GpxData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(() => !loadGameState());
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = loadGameState();
    return savedState || {
      currentWaypoint: 0,
      visited: [],
      isViewingImage: false
    };
  });

  // Save game state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Check for geolocation support
    if (!('geolocation' in navigator)) {
      setLocationError('Je browser ondersteunt geen locatiebepaling. De app werkt het beste op een moderne smartphone.');
      return;
    }

    // Request location permission
    navigator.geolocation.getCurrentPosition(
      () => setLocationError(null),
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Je moet locatietoegang toestaan om de app te gebruiken.');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Je locatie kan niet worden bepaald. Controleer of GPS is ingeschakeld.');
            break;
          case error.TIMEOUT:
            setLocationError('Het bepalen van je locatie duurt te lang. Probeer het opnieuw.');
            break;
          default:
            setLocationError('Er is een fout opgetreden bij het bepalen van je locatie.');
        }
      },
      { enableHighAccuracy: true }
    );

    // Load and parse GPX file
    setIsLoading(true);
    parseGpxFile('/Hoenderloo.gpx')
      .then(data => {
        setGpxData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading GPX:', error);
        setIsLoading(false);
        alert('Er is een fout opgetreden bij het laden van de route. Vernieuw de pagina om het opnieuw te proberen.');
      });
  }, []);

  const handleAnswerCorrect = () => {
    setGameState(prev => ({
      ...prev,
      visited: [...prev.visited, gpxData!.waypoints[prev.currentWaypoint].name],
      isViewingImage: true
    }));
  };

  const handleCloseImage = () => {
    const nextWaypoint = gameState.currentWaypoint + 1;
    const isRouteComplete = gpxData && nextWaypoint >= gpxData.waypoints.length;

    setGameState(prev => ({
      ...prev,
      isViewingImage: false,
      currentWaypoint: isRouteComplete ? prev.currentWaypoint : nextWaypoint
    }));

    if (isRouteComplete) {
      alert('Gefeliciteerd! Je hebt de route voltooid!');
    }
  };

  const AppContent = () => (
    <div className="app-container">
      {locationError ? (
        <div className="error-screen">
          <h2>Locatie vereist</h2>
          <p>{locationError}</p>
          <button onClick={() => window.location.reload()}>
            Opnieuw proberen
          </button>
        </div>
      ) : showWelcome ? (
        <Welcome onStart={() => setShowWelcome(false)} />
      ) : isLoading ? (
        <Loading />
      ) : gpxData && (
        <>
          <Progress 
            current={gameState.currentWaypoint} 
            total={gpxData.waypoints.length} 
          />
          <GameView
            waypoints={gpxData.waypoints}
            currentWaypoint={gameState.currentWaypoint}
            onAnswerCorrect={handleAnswerCorrect}
          />
          {gameState.isViewingImage && (
            <ImageViewer
              waypointId={gpxData.waypoints[gameState.currentWaypoint].name}
              onClose={handleCloseImage}
            />
          )}
          <Menu onReset={() => {
            setGameState({
              currentWaypoint: 0,
              visited: [],
              isViewingImage: false
            });
            setShowWelcome(true);
          }} />
        </>
      )}
    </div>
  );

  return <AppContent />;
}

export default App;
