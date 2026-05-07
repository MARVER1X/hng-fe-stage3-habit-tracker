import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '../../src/lib/habits';
import { Habit } from '../../src/types/habit';

/**
 * Unit Tests for the Habit Logic.
 * Complies with Section 16 of the TRD.
 */
describe('Habit Toggle Logic', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'user1',
    name: 'Test Habit',
    description: '',
    frequency: 'daily',
    createdAt: new Date().toISOString(),
    completions: [],
  };

  it('should add completion if not exists for a given date', () => {
    const date = '2023-10-01';
    const updated = toggleHabitCompletion(mockHabit, date);
    expect(updated.completions).toContain(date);
    expect(updated.completions.length).toBe(1);
  });

  it('should remove completion if it already exists for a given date', () => {
    const date = '2023-10-01';
    const habitWithCompletion = { ...mockHabit, completions: [date] };
    const updated = toggleHabitCompletion(habitWithCompletion, date);
    expect(updated.completions).not.toContain(date);
    expect(updated.completions.length).toBe(0);
  });

  it('should not mutate the original habit object', () => {
    const date = '2023-10-01';
    toggleHabitCompletion(mockHabit, date);
    expect(mockHabit.completions.length).toBe(0);
  });
});
