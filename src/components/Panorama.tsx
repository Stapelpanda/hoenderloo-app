import React from 'react';

interface PanoramaProps {
  imageUrl: string;
  onContinue: () => void;
}

export const Panorama: React.FC<PanoramaProps> = ({ imageUrl, onContinue }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="flex-1 relative">
        <img
          src={imageUrl}
          alt="Panorama view showing next direction"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <div className="p-4 bg-black bg-opacity-75">
        <p className="text-white mb-4 text-center">
          Deze foto toont de richting naar het volgende punt
        </p>
        <button
          onClick={onContinue}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Begrepen, ga verder
        </button>
      </div>
    </div>
  );
};
