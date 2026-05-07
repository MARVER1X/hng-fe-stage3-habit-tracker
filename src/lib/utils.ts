/**
 * Generates a unique ID using crypto.randomUUID() with a fallback 
 * for non-secure contexts (like local testing on mobile via HTTP).
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  
  // Fallback for non-secure contexts
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
