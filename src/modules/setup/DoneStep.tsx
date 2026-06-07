import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DoneStep: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-green-100 text-green-600 p-4 rounded-full">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">All Set!</h2>
      <p className="text-gray-600">
        ChopCore has been successfully configured. You can now log in and start managing your restaurant.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-orange-700 transition"
      >
        Launch ChopCore
      </button>
    </div>
  );
};
