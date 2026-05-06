import { Habit } from '../types/habit';

/**
 * Toggles a completion date for a habit.
 * Rules:
 * - If date doesn't exist, add it
 * - If date exists, remove it
 * - No duplicates in returned habit
 * - No mutation of original input
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
