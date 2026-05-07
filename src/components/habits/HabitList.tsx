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
        className="mt-20 flex flex-col items-center justify-center text-center p-12 bg-black/5 dark:bg-black/40 rounded-br-[4rem] border-2 border-[var(--surface-border)] cyber-glow-cyan relative overflow-hidden" 
        data-testid="empty-state"
      >
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[var(--neon-magenta)] opacity-30" />
        <div className="w-24 h-24 bg-transparent border-2 border-[var(--neon-cyan)] rounded-2xl flex items-center justify-center mb-8 relative animate-pulse">
          <div className="absolute inset-0 bg-[var(--neon-cyan)] opacity-10" />
          <svg className="w-12 h-12 text-[var(--neon-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Zero Data Detected</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-sm text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
          Success starts with small steps. Add your first habit and start your winning streak today!
        </p>
      </section>
    );
  }

  return (
    // Habit cards are mapped and rendered in a grid layout
    <div className="grid grid-cols-1 gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
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
