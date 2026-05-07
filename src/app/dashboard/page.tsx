'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';
import { Habit } from '@/types/habit';
import { storage } from '@/lib/storage';
import { auth } from '@/lib/auth';
import { toggleHabitCompletion } from '@/lib/habits';
import { generateId } from '@/lib/utils';

/**
 * Dashboard page serves as the primary hub for habit management and tracking.
 */
export default function DashboardPage() {
  const [user] = useState<{ email: string; userId: string } | null>(() => auth.getCurrentUser());
  const [habits, setHabits] = useState<Habit[]>(() => {
    const session = auth.getCurrentUser();
    if (session) {
      return storage.getHabits().filter(h => h.userId === session.userId);
    }
    return [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  const saveAndRefresh = (updatedHabits: Habit[]) => {
    // Habits from other users are merged with updated data for persistence
    const allHabits = storage.getHabits();
    const otherUsersHabits = allHabits.filter(h => h.userId !== user?.userId);
    storage.saveHabits([...otherUsersHabits, ...updatedHabits]);
    setHabits(updatedHabits);
  };

  const handleToggle = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = habits.map(h => {
      if (h.id === id) {
        return toggleHabitCompletion(h, today);
      }
      return h;
    });
    saveAndRefresh(updated);
  };

  const handleDelete = (id: string) => {
    const updated = habits.filter(h => h.id !== id);
    saveAndRefresh(updated);
  };

  const handleFormSubmit = (data: Partial<Habit>) => {
    if (editingHabit) {
      // Existing habit is updated
      const updated = habits.map(h => 
        h.id === editingHabit.id ? { ...h, ...data } : h
      );
      saveAndRefresh(updated);
    } else {
      // New habit is initialized and saved
      const newHabit: Habit = {
        id: generateId(),
        userId: user?.userId || '',
        name: data.name || '',
        description: data.description || '',
        frequency: 'daily',
        createdAt: new Date().toISOString(),
        completions: [],
      };
      saveAndRefresh([...habits, newHabit]);
    }
    setShowForm(false);
    setEditingHabit(undefined);
  };

    const handleLogout = () => {
    auth.logout();
    window.location.href = '/login';
  };

  return (
    <ProtectedRoute>
      {/* Dashboard main layout container is rendered */}
      <main 
        className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center relative overflow-hidden"
        data-testid="dashboard-page"
      >
        <div className="w-full max-w-3xl px-4 py-6 sm:py-8 relative z-10">
          {/* Header section includes page title, user info, and primary actions */}
          <header className="flex justify-between items-center mb-10 border-b-2 border-black dark:border-[var(--surface-border)] pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter leading-none">
                My Habits
              </h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
                Hello, {user?.email.split('@')[0]}
              </p>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-black text-[var(--neon-cyan)] border border-[var(--neon-cyan)] rounded-sm text-xs font-black uppercase tracking-widest hover:bg-[var(--neon-cyan)] hover:text-black transition-all hover:cyber-glow-cyan"
                data-testid="create-habit-button"
              >
                + New Habit
              </button>
              
              <button 
                onClick={handleLogout}
                className="p-2 sm:p-3 text-gray-400 dark:text-gray-500 hover:text-[var(--neon-magenta)] hover:bg-black border border-transparent hover:border-[var(--neon-magenta)] rounded-sm transition-all"
                title="Logout"
                data-testid="auth-logout-button"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </header>

          {/* Habit list container is rendered */}
          <HabitList 
            habits={habits} 
            onToggle={handleToggle} 
            onDelete={handleDelete}
            onEdit={(h) => {
              setEditingHabit(h);
              setShowForm(true);
            }}
          />

          {/* Habit creation/editing form modal is conditionally rendered */}
          {showForm && (
            <HabitForm 
              initialData={editingHabit}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingHabit(undefined);
              }}
            />
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}

