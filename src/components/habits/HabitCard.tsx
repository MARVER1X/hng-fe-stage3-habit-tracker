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
 * HabitCard Component.
 * Displays individual habit progress and controls.
 */
const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete, onEdit }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = React.useState(false);
  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);

  return (
    <div 
      className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between group transition-all hover:shadow-md"
      data-testid={`habit-card-${slug}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">{habit.name}</h3>
          <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
            {habit.frequency}
          </span>
        </div>
        
        {habit.description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-1">{habit.description}</p>
        )}

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-orange-600">
            <span className="text-base sm:text-lg font-bold" data-testid={`habit-streak-${slug}`}>{streak}</span>
            <span className="text-[10px] sm:text-xs font-medium uppercase">Day Streak</span>
          </div>
          
            {isConfirmingDelete ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => onDelete(habit.id)}
                  className="text-xs font-bold text-red-600 hover:underline"
                  data-testid="confirm-delete-button"
                >
                  Confirm Delete
                </button>
                <button 
                  onClick={() => setIsConfirmingDelete(false)}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onEdit(habit)}
                  className="text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                  data-testid={`habit-edit-${slug}`}
                >
                  Edit
                </button>
                <button 
                  onClick={() => setIsConfirmingDelete(true)}
                  className="text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                  data-testid={`habit-delete-${slug}`}
                >
                  Delete
                </button>
              </>
            )}
        </div>
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        data-testid={`habit-complete-${slug}`}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isCompletedToday 
            ? 'bg-green-500 text-white shadow-lg shadow-green-100 dark:shadow-none rotate-0' 
            : 'bg-gray-50 dark:bg-gray-800 text-gray-300 dark:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-400 dark:hover:text-gray-500 -rotate-3'
        }`}
      >
        <svg 
          className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-500 ${isCompletedToday ? 'scale-110' : 'scale-90'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </button>
    </div>
  );
};

export default HabitCard;
