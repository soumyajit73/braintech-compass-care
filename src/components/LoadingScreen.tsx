
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-8 bg-primary-500 rounded-full animate-brain-pulse opacity-80"></div>
          <div className="absolute inset-0 w-24 h-24 mx-auto bg-secondary-500 rounded-full animate-brain-pulse animation-delay-150 opacity-60"></div>
          <div className="absolute inset-0 w-20 h-20 mx-auto mt-2 ml-2 bg-accent rounded-full animate-brain-pulse animation-delay-300 opacity-40"></div>
        </div>
        <h1 className="text-4xl font-bold text-primary-700 mb-4">BrainTech.Ai</h1>
        <p className="text-lg text-primary-600 mb-8">Loading your smart braincare platform...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
