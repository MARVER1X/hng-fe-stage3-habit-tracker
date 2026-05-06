/**
 * Validates a habit name based on length and presence.
 * Rules:
 * - Trim incoming value
 * - Reject empty values
 * - Reject values longer than 60 characters
 */
export function validateHabitName(name: string): {
  valid: boolean;
  value: string;
  error: string | null;
} {
  const trimmed = name.trim();
  
  if (trimmed.length === 0) {
    return {
      valid: false,
      value: trimmed,
      error: 'Habit name is required',
    };
  }
  
  if (trimmed.length > 60) {
    return {
      valid: false,
      value: trimmed,
      error: 'Habit name must be 60 characters or fewer',
    };
  }
  
  return {
    valid: true,
    value: trimmed,
    error: null,
  };
}
