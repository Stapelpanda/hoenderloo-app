import React, { useState } from 'react';
import type { Action as ActionType } from '../types';

interface ActionProps {
  action: ActionType;
  onComplete: () => void;
}

export const Action: React.FC<ActionProps> = ({ action, onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (action.type === 'question' && action.answer) {
      if (answer.toLowerCase().trim() === action.answer.toLowerCase().trim()) {
        onComplete();
      } else {
        setError('Dat is niet het juiste antwoord. Probeer het nog eens!');
      }
    } else {
      // For tasks, just mark as complete when submitted
      onComplete();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {action.type === 'question' ? 'Vraag' : 'Opdracht'}
      </h2>
      <p className="mb-4">{action.content}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {action.type === 'question' && (
          <div>
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError('');
              }}
              placeholder="Jouw antwoord"
              className="w-full p-2 border rounded"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {action.type === 'question' ? 'Controleer Antwoord' : 'Opdracht Voltooid'}
        </button>
      </form>
    </div>
  );
};
