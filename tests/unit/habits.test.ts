import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '../../src/lib/habits';
import { Habit } from '../../src/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'user1',
    name: 'Test Habit',
    description: '',
    frequency: 'daily',
    createdAt: new Date().toISOString(),
    completions: [],
  };

  it('adds a completion date when the date is not present', () => {
    const date = '2023-10-01';
    const updated = toggleHabitCompletion(mockHabit, date);
    expect(updated.completions).toContain(date);
    expect(updated.completions.length).toBe(1);
  });

  it('removes a completion date when the date already exists', () => {
    const date = '2023-10-01';
    const habitWithCompletion = { ...mockHabit, completions: [date] };
    const updated = toggleHabitCompletion(habitWithCompletion, date);
    expect(updated.completions).not.toContain(date);
    expect(updated.completions.length).toBe(0);
  });

  it('does not mutate the original habit object', () => {
    const date = '2023-10-01';
    toggleHabitCompletion(mockHabit, date);
    expect(mockHabit.completions.length).toBe(0);
  });

  it('does not return duplicate completion dates', () => {
    const date = '2023-10-01';
    const habitWithCompletion = { ...mockHabit, completions: [date] };
    // This is handled by toggleHabitCompletion logic (removing if exists)
    // but the test confirms unique behavior if we were to add logic to prevent duplicates
    const updated = toggleHabitCompletion(habitWithCompletion, '2023-10-02');
    expect(new Set(updated.completions).size).toBe(updated.completions.length);
  });
});
