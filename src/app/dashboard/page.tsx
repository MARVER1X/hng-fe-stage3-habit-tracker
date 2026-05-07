'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitList from '@/components/habits/HabitList';
import HabitForm from '@/components/habits/HabitForm';
import { Habit } from '@/types/habit';
import { storage } from '@/lib/storage';
import { auth } from '@/lib/auth';
import { toggleHabitCompletion } from '@/lib/habits';

/**
 * Dashboard Page.
 * Main hub for habit management and tracking.
 * Complies with Section 12 of the TRD.
 */
export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);
  const [user, setUser] = useState<{ email: string; userId: string } | null>(null);

  // Load initial data
  useEffect(() => {
    const session = auth.getCurrentUser();
    if (session) {
      setUser(session);
      const allHabits = storage.getHabits();
      // Filter habits for the current user
      const userHabits = allHabits.filter(h => h.userId === session.userId);
      setHabits(userHabits);
    }
  }, []);

  const saveAndRefresh = (updatedHabits: Habit[]) => {
    // We must merge with habits from other users in storage
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
      // Update existing
      const updated = habits.map(h => 
        h.id === editingHabit.id ? { ...h, ...data } : h
      );
      saveAndRefresh(updated);
    } else {
      // Create new
      const newHabit: Habit = {
        id: crypto.randomUUID(),
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
      <main 
        className="min-h-screen bg-white flex flex-col items-center"
        data-testid="dashboard-page"
      >
        <div className="w-full max-w-3xl px-4 py-6 sm:py-8">
          <header className="flex justify-between items-center mb-6 sm:mb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">My Habits</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Hello, {user?.email}</p>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => setShowForm(true)}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-2xl text-sm sm:text-base font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-1 sm:gap-2"
                data-testid="create-habit-button"
              >
                <span className="text-lg sm:text-xl">+</span>
                New Habit
              </button>
              
              <button 
                onClick={handleLogout}
                className="p-2 sm:p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                title="Logout"
                data-testid="auth-logout-button"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </header>

          <HabitList 
            habits={habits} 
            onToggle={handleToggle} 
            onDelete={handleDelete}
            onEdit={(h) => {
              setEditingHabit(h);
              setShowForm(true);
            }}
          />

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

