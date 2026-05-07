import { Habit } from '../types/habit';

/**
 * Completion dates for habits are toggled.
 * Rules:
 * - Dates are added if absent, removed if present
 * - Uniqueness is maintained in the returned habit
 * - Input mutation is avoided
 */
export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const isCompleted = habit.completions.includes(date);
  
  const newCompletions = isCompleted
    ? habit.completions.filter((d) => d !== date)
    : [...habit.completions, date];

  // Ensure uniqueness and return new object
  return {
    ...habit,
    completions: Array.from(new Set(newCompletions)),
  };
}
