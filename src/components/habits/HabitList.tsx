'use client';

import React from 'react';
import { Habit } from '@/types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (habit: Habit) => void;
}

/**
 * HabitList Component.
 * Manages the display of multiple habits and the empty state.
 */
const HabitList: React.FC<HabitListProps> = ({ habits, onToggle, onDelete, onEdit }) => {
  if (habits.length === 0) {
    return (
      // Empty state is rendered when no habits are available
      <section 
        className="mt-20 flex flex-col items-center justify-center text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800" 
        data-testid="empty-state"
      >
        <div className="w-24 h-24 bg-blue-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-12 h-12 text-blue-200 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-300">No habits tracked yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
          Success starts with small steps. Add your first habit and start your winning streak today!
        </p>
      </section>
    );
  }

  return (
    // Habit cards are mapped and rendered in a grid layout
    <div className="grid grid-cols-1 gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {habits.map((habit) => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          onToggle={onToggle} 
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default HabitList;
