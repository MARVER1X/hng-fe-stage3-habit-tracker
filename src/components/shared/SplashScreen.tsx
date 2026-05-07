import React from 'react';

/**
 * SplashScreen component displays the application identity during the boot sequence.
 */
const SplashScreen: React.FC = () => {
  return (
    // Full-screen splash overlay is rendered
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999]"
      data-testid="splash-screen"
    >
      <div className="flex flex-col items-center animate-in fade-in duration-700">
        {/* App identity icon and title are displayed */}
        <div className="w-20 h-20 bg-transparent border-2 border-[var(--neon-cyan)] rounded-xl mb-6 flex items-center justify-center relative cyber-glow-cyan">
          <div className="absolute inset-0 bg-[var(--neon-cyan)] opacity-5 animate-pulse rounded-xl" />
          <svg 
            className="w-12 h-12 text-[var(--neon-cyan)]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
            />
          </svg>
        </div>
        
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">
          Habit <span className="text-[var(--neon-magenta)]">Tracker</span>
        </h1>
        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-pulse" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Initializing // Neural.Link</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
