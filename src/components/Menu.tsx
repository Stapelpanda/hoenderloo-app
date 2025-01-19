import { useState } from 'react';
import { clearGameState } from '../utils/storage';
import '../styles/Menu.css';

interface MenuProps {
  onReset: () => void;
}

export function Menu({ onReset }: MenuProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    if (showConfirm) {
      clearGameState();
      onReset();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <div className="menu-container">
      <button 
        className={`menu-button ${showConfirm ? 'confirm' : ''}`}
        onClick={handleReset}
      >
        {showConfirm ? 'Klik nogmaals om te bevestigen' : 'Route opnieuw starten'}
      </button>
    </div>
  );
}
