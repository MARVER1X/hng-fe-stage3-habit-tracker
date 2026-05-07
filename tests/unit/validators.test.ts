import { describe, it, expect } from 'vitest';
import { validateHabitName } from '../../src/lib/validators';

/**
 * Unit Tests for the Habit Name Validator.
 * Complies with Section 16 of the TRD.
 */
describe('Habit Name Validator', () => {
  it('should validate a valid habit name', () => {
    const result = validateHabitName('Healthy Habit');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Healthy Habit');
  });

  it('should reject a habit name that is too long', () => {
    const longName = 'a'.repeat(61);
    const result = validateHabitName(longName);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Habit name must be 60 characters or fewer');
  });

  it('should reject an empty habit name', () => {
    const result = validateHabitName('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Habit name is required');
  });

  it('should trim whitespace from a valid name', () => {
    const result = validateHabitName('  Gym Time  ');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Gym Time');
  });
});
