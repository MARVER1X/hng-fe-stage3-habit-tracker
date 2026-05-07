'use client';

import React, { useState } from 'react';
import { Habit } from '@/types/habit';
import { validateHabitName } from '@/lib/validators';

interface HabitFormProps {
  initialData?: Habit;
  onSubmit: (data: Partial<Habit>) => void;
  onCancel: () => void;
}

/**
 * HabitForm component handles the creation and modification of habits.
 */
const HabitForm: React.FC<HabitFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
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
    // Modal overlay and form container are rendered
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-md">
      <form 
        onSubmit={handleSubmit}
        className="cyber-card w-full max-w-md animate-in fade-in zoom-in duration-300"
        data-testid="habit-form"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          {/* Header section displays the form intent */}
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter">
            {initialData ? 'Edit Habit' : 'New Habit'}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Form fields for habit name, description, and frequency are rendered */}
          {error && (
            <div className="p-3 bg-red-950/20 border border-red-500 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
              {error}
            </div>
          )}

          <div>
            <label 
              htmlFor="habit-name"
              className="block text-[10px] font-black text-[var(--neon-cyan)] uppercase tracking-widest mb-2"
            >
              Habit Name
            </label>
            <input
              id="habit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-[var(--neon-cyan)] focus:cyber-glow-cyan outline-none transition-all rounded-none font-mono text-sm"
              placeholder="e.g., MORNING_ROUTINE"
              data-testid="habit-name-input"
              maxLength={60}
            />
            <p className="mt-1 text-[8px] text-gray-400 font-black uppercase tracking-widest text-right">
              {name.length} / 60 characters
            </p>
          </div>

          <div>
            <label 
              htmlFor="habit-description"
              className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"
            >
              Description (Optional)
            </label>
            <textarea
              id="habit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-gray-500 outline-none transition-all rounded-none font-mono text-sm resize-none h-24"
              placeholder="Why is this habit important?"
              data-testid="habit-description-input"
            />
          </div>

          <div>
            <label 
              htmlFor="habit-frequency"
              className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2"
            >
              Frequency
            </label>
            <select
              id="habit-frequency"
              className="w-full px-4 py-3 bg-black/5 border border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-700 outline-none cursor-not-allowed rounded-none font-mono text-sm"
              data-testid="habit-frequency-select"
              disabled
              value="daily"
            >
              <option value="daily">Daily</option>
            </select>
          </div>
        </div>

        <div className="p-6 bg-black/5 dark:bg-black/20 flex gap-3">
          {/* Form action buttons are provided */}
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-transparent border border-gray-300 dark:border-gray-800 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-black text-[var(--neon-cyan)] border border-[var(--neon-cyan)] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--neon-cyan)] hover:text-black transition-all hover:cyber-glow-cyan"
            data-testid="habit-save-button"
          >
            {initialData ? 'Save Changes' : 'Create Habit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;
