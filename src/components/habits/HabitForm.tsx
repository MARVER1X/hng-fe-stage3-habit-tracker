'use client';

import React, { useState, useEffect } from 'react';
import { Habit } from '@/types/habit';
import { validateHabitName } from '@/lib/validators';
import { getHabitSlug } from '@/lib/slug';

interface HabitFormProps {
  initialData?: Habit;
  onSubmit: (data: Partial<Habit>) => void;
  onCancel: () => void;
}

/**
 * HabitForm Component.
 * Handles creation and editing of habits.
 * Complies with Section 12 of the TRD.
 */
const HabitForm: React.FC<HabitFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateHabitName(name);
    
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onSubmit({
      name: validation.value,
      description: description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        data-testid="habit-form"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Habit' : 'New Habit'}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., Morning Run"
              data-testid="habit-name-input"
              maxLength={60}
            />
            <p className="mt-1 text-xs text-gray-400 text-right">
              {name.length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none h-24"
              placeholder="Why is this habit important?"
              data-testid="habit-description-input"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            data-testid="habit-submit-button"
          >
            {initialData ? 'Save Changes' : 'Create Habit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
