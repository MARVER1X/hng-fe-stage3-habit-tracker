import { describe, it, expect } from 'vitest';
import { getHabitSlug } from '../../src/lib/slug';

/**
 * Unit Tests for the Slug Generator.
 * Complies with Section 16 of the TRD.
 */
describe('Slug Generator', () => {
  it('should convert a habit name into a slug', () => {
    expect(getHabitSlug('Morning Run')).toBe('morning-run');
  });

  it('should handle special characters in habit name', () => {
    expect(getHabitSlug('Drink 8! Glasses?')).toBe('drink-8-glasses');
  });

  it('should handle trailing spaces in habit name', () => {
    expect(getHabitSlug('  Study Hard  ')).toBe('study-hard');
  });

  it('should handle multiple spaces and casing', () => {
    expect(getHabitSlug('Read   More   BOOKS')).toBe('read-more-books');
  });
});
