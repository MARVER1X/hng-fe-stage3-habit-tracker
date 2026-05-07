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
  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions);
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(today);

  return (
    <div 
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group transition-all hover:shadow-md"
      data-testid={`habit-card-${slug}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900">{habit.name}</h3>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {habit.frequency}
          </span>
        </div>
        
        {habit.description && (
          <p className="text-gray-500 text-sm mb-3 line-clamp-1">{habit.description}</p>
        )}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-orange-600">
            <span className="text-lg font-bold">{streak}</span>
            <span className="text-xs font-medium uppercase">Day Streak</span>
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(habit)}
              className="text-xs font-semibold text-gray-400 hover:text-blue-600"
              data-testid={`habit-edit-${slug}`}
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(habit.id)}
              className="text-xs font-semibold text-gray-400 hover:text-red-600"
              data-testid={`habit-delete-${slug}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        data-testid={`habit-complete-${slug}`}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isCompletedToday 
            ? 'bg-green-500 text-white shadow-lg shadow-green-100 rotate-0' 
            : 'bg-gray-50 text-gray-300 hover:bg-gray-100 hover:text-gray-400 -rotate-3'
        }`}
      >
        <svg 
          className={`w-8 h-8 transition-transform duration-500 ${isCompletedToday ? 'scale-110' : 'scale-90'}`} 
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
