import React, { useEffect, useRef } from 'react';
import { getPanoramaUrl } from '../assets/panoramas';

declare global {
  interface Window {
    pannellum: any;
  }
}

interface PanoramaViewerProps {
  imageNumber: string;
  onClose: () => void;
}

const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ imageNumber, onClose }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const pannellumRef = useRef<any>(null);

  useEffect(() => {
    if (viewerRef.current && window.pannellum) {
      pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        panorama: getPanoramaUrl(imageNumber.padStart(3, '0')),
        autoLoad: true,
        compass: false,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        vaov: 150,
        autoRotate: -2,
        draggable: true,
      });
    }

    return () => {
      if (pannellumRef.current) {
        pannellumRef.current.destroy();
      }
    };
  }, [imageNumber]);

  return (
    <div className="panorama-viewer">
      <div className="panorama-close" onClick={onClose}>×</div>
      <div 
        ref={viewerRef}
        style={{ 
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default PanoramaViewer;
