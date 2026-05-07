'use client';

import React from 'react';
import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { calculateCurrentStreak } from '@/lib/streaks';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (habit: Habit) => void;
}

/**
 * HabitCard component displays progress and management controls for an individual habit.
 */
const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete, onEdit }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);
  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);

  return (
    // Individual habit card is rendered with progress and controls
    <div 
      className="cyber-card p-4 sm:p-6 rounded-br-3xl flex items-center justify-between group transition-all hover:border-[var(--neon-cyan)] hover:cyber-glow-cyan"
      data-testid={`habit-card-${slug}`}
    >
      <div className="flex-1">
        {/* Habit information and metadata are displayed */}
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tighter">
            {habit.name}
          </h3>
          <span className="px-2 py-0.5 bg-black text-[var(--neon-yellow)] text-[10px] font-black rounded-sm border border-[var(--neon-yellow)] uppercase tracking-widest">
            {habit.frequency}
          </span>
        </div>
        
        {habit.description && (
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 line-clamp-1 border-l-2 border-gray-200 dark:border-gray-800 pl-2 italic">
            {habit.description}
          </p>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Streak indicator and management actions are grouped */}
          <div className="flex items-center gap-1.5 text-[var(--neon-magenta)]">
            <span className="text-xl sm:text-2xl font-black italic" data-testid={`habit-streak-${slug}`}>{streak}</span>
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase leading-none">Day Streak</span>
            </div>
          </div>
          
            {isConfirmingDelete ? (
              <div className="flex gap-2">
                {/* Delete confirmation is requested */}
                <button 
                  onClick={() => onDelete(habit.id)}
                  className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-tighter"
                  data-testid="confirm-delete-button"
                >
                  Confirm Delete
                </button>
                <button 
                  onClick={() => setIsConfirmingDelete(false)}
                  className="text-[10px] font-black text-gray-400 hover:text-gray-600 uppercase tracking-tighter"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                {/* Edit and Delete actions are available */}
                <button 
                  onClick={() => onEdit(habit)}
                  className="text-[10px] font-black text-gray-400 hover:text-[var(--neon-cyan)] transition-colors uppercase tracking-tighter"
                  data-testid={`habit-edit-${slug}`}
                  aria-label={`Edit ${habit.name}`}
                >
                  Edit
                </button>
                <button 
                  onClick={() => setIsConfirmingDelete(true)}
                  className="text-[10px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-tighter"
                  data-testid={`habit-delete-${slug}`}
                  aria-label={`Delete ${habit.name}`}
                >
                  Delete
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Completion toggle control is rendered */}
      <button
        onClick={() => onToggle(habit.id)}
        data-testid={`habit-complete-${slug}`}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300 border-2 ${
          isCompletedToday 
            ? 'bg-[var(--neon-cyan)] border-[var(--neon-cyan)] text-black shadow-[0_0_20px_rgba(0,243,255,0.6)]' 
            : 'bg-transparent border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-700 hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]'
        }`}
        aria-label={isCompletedToday ? `Mark ${habit.name} as incomplete` : `Mark ${habit.name} as complete`}
        aria-pressed={isCompletedToday}
      >
        <svg 
          className={`w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-500 ${isCompletedToday ? 'scale-110' : 'scale-90 opacity-40'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={4} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </button>
    </div>
  );
};

export default HabitCard;
