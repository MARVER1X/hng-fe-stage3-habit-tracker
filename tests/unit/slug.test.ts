import { describe, it, expect } from 'vitest';
import { getHabitSlug } from '../../src/lib/slug';

describe('getHabitSlug', () => {
  it('returns lowercase hyphenated slug for a basic habit name', () => {
    expect(getHabitSlug('Morning Run')).toBe('morning-run');
  });

  it('trims outer spaces and collapses repeated internal spaces', () => {
    expect(getHabitSlug('  Study   Hard  ')).toBe('study-hard');
  });

  it('removes non alphanumeric characters except hyphens', () => {
    expect(getHabitSlug('Drink 8! Glasses?')).toBe('drink-8-glasses');
  });
});
