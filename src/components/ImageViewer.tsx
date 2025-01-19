import { useEffect, useState } from 'react';
import '../styles/ImageViewer.css';

interface ImageViewerProps {
  waypointId: string;
  onClose: () => void;
}

export function ImageViewer({ waypointId, onClose }: ImageViewerProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const url = `/360/${waypointId}.jpg`;
    // Check if image exists
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Image not found');
        setImageUrl(url);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [waypointId]);

  return (
    <div className="image-viewer">
      {error ? (
        <div className="error-container">
          <div className="error-message">
            <h2>Geen foto beschikbaar</h2>
            <p>Voor dit punt is geen routeaanwijzing beschikbaar.</p>
          </div>
          <button className="close-button" onClick={onClose}>
            Doorgaan naar volgende punt
          </button>
        </div>
      ) : (
        <>
          <div className="image-container">
            {imageUrl && (
              <>
                <img 
                  src={imageUrl} 
                  alt="Routeaanwijzing" 
                  className="direction-image"
                  onError={() => setError(true)}
                />
                <p className="direction-hint">
                  De persoon op de foto wijst de richting aan waar je heen moet voor het volgende punt
                </p>
              </>
            )}
          </div>
          <button className="close-button" onClick={onClose}>
            Volgende punt
          </button>
        </>
      )}
    </div>
  );
}
