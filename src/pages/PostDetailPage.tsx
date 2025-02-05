import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { routeData } from '../data/route';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postIndex = parseInt(id || '0', 10);
  const post = routeData[postIndex];

  if (!post) {
    return (
      <div className="p-4">
        <p>Post niet gevonden</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="bg-white shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-4 flex items-center text-gray-600"
        >
          <ChevronLeftIcon className="h-6 w-6 mr-2" />
          <span>Terug</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h1 className="text-xl font-bold mb-2">{post.name}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <span>Post {postIndex + 1}</span>
          </div>
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">
              {post.action.type === 'question' ? 'Vraag' : 'Opdracht'}
            </h2>
            <p className="text-gray-600 mb-4">{post.action.content}</p>
            {post.action.answer && (
              <div className="bg-gray-50 rounded p-3">
                <span className="font-semibold">Antwoord: </span>
                <span>{post.action.answer}</span>
              </div>
            )}
          </div>
        </div>

        {post.panoramaUrl && (
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold mb-3">Panorama foto</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img
                src={post.panoramaUrl}
                alt="Panorama view"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
