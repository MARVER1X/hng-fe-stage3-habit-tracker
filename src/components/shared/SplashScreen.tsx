import React from 'react';

/**
 * Mandatory Splash Screen component.
 * Displays the app name and provides a testable interface for the boot sequence.
 */
const SplashScreen: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      data-testid="splash-screen"
    >
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-4 flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Habit Tracker
        </h1>
        <p className="mt-2 text-gray-500 font-medium">Building better habits...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
