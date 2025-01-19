import { useState } from 'react';
import '../styles/Welcome.css';

interface WelcomeProps {
  onStart: () => void;
}

export function Welcome({ onStart }: WelcomeProps) {
  const [isReady, setIsReady] = useState(false);

  const handleStart = () => {
    if (isReady) {
      onStart();
    } else {
      setIsReady(true);
    }
  };

  return (
    <div className="welcome-container">
      {!isReady ? (
        <>
          <h1>Welkom bij de Hoenderloo Speurtocht</h1>
          <div className="welcome-content">
            <p>Ga op avontuur door Hoenderloo met deze interactieve speurtocht!</p>
            <ul>
              <li>Loop naar het volgende punt (afstand wordt getoond)</li>
              <li>Beantwoord de vraag over wat je ziet</li>
              <li>Bekijk de foto voor aanwijzingen over de route</li>
              <li>Volg de aanwijzingen naar het volgende punt</li>
            </ul>
          </div>
          <button onClick={handleStart}>Start de speurtocht</button>
        </>
      ) : (
        <>
          <h2>Even je locatie aanzetten</h2>
          <div className="welcome-content">
            <p>We hebben je locatie nodig om te zien hoe ver je van het volgende punt bent.</p>
            <p>Klik op 'Toestaan' als je browser erom vraagt.</p>
          </div>
          <button onClick={handleStart}>Begin het avontuur</button>
        </>
      )}
    </div>
  );
}
