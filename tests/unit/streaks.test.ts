/* MENTOR_TRACE_STAGE3_HABIT_A91 */
import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '../../src/lib/streaks';

/**
 * Unit Tests for the Streak Calculator.
 * Complies with Section 16 of the TRD.
 * Includes the mandatory Mentor Trace Audit Marker.
 */
describe('Streak Calculator', () => {
  it('should calculate the correct streak for consecutive days', () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    const completions = [
      today.toISOString().split('T')[0],
      yesterday.toISOString().split('T')[0]
    ];
    
    expect(calculateCurrentStreak(completions)).toBe(2);
  });

  it('should handle a broken streak', () => {
    const today = new Date();
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);
    
    // Missing yesterday
    const completions = [
      today.toISOString().split('T')[0],
      twoDaysAgo.toISOString().split('T')[0]
    ];
    
    expect(calculateCurrentStreak(completions)).toBe(1);
  });

  it('should handle an empty completion list', () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });

  it('should return 0 if the last completion was more than 1 day ago', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const completions = [twoDaysAgo.toISOString().split('T')[0]];
    expect(calculateCurrentStreak(completions)).toBe(0);
  });
});
