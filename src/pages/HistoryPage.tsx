import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { routeData } from '../data/route';

export const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  // In a real app, this would come from persistent storage
  const completedPosts = routeData.slice(0, 2); // Example: first 2 posts are completed

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Geschiedenis</h1>
      <div className="space-y-4">
        {completedPosts.map((post, index) => (
          <button
            key={index}
            onClick={() => navigate(`/post/${index}`)}
            className="w-full bg-white rounded-lg shadow p-4 flex items-center hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-semibold">{post.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {post.action.type === 'question' ? 'Vraag' : 'Opdracht'}: {post.action.content}
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};
