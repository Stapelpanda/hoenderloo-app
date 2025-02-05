import React from 'react';
import { MapPinIcon, QuestionMarkCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';

export const InfoPage: React.FC = () => {
  const features = [
    {
      icon: MapPinIcon,
      title: 'Navigatie',
      description: 'Volg de route met behulp van GPS en afstandsindicatie',
    },
    {
      icon: QuestionMarkCircleIcon,
      title: 'Opdrachten',
      description: 'Los vragen op en voer opdrachten uit op elke post',
    },
    {
      icon: PhotoIcon,
      title: 'Panorama',
      description: 'Bekijk panoramafoto\'s voor de juiste richting',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Informatie</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Over deze app</h2>
        <p className="text-gray-600">
          Deze app is ontwikkeld om speurtochten interactiever en leuker te maken.
          Volg de route, beantwoord vragen en voer opdrachten uit op verschillende locaties.
        </p>
      </div>

      <div className="space-y-4">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-white rounded-lg shadow-sm p-4 flex items-start">
            <div className="bg-blue-100 rounded-full p-2 mr-4">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-2">Contact</h2>
        <p className="text-gray-600">
          Voor vragen of opmerkingen over de speurtocht, neem contact op met de leiding.
        </p>
      </div>
    </div>
  );
};
