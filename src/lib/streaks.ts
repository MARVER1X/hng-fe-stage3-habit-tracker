/**
 * Calculates the current streak of consecutive days a habit has been completed.
 * Rules:
 * - Remove duplicates
 * - Sort by date
 * - If today is not completed, streak is 0
 * - If today is completed, count consecutive backwards from today
 */
export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (completions.length === 0) return 0;
  
  const now = today || new Date().toISOString().split('T')[0];
  const uniqueSorted = Array.from(new Set(completions)).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // If today is not in the list, the current streak is broken
  if (!uniqueSorted.includes(now)) return 0;

  let streak = 0;
  let currentDate = new Date(now);

  for (let i = 0; i < uniqueSorted.length; i++) {
    const expectedDateStr = currentDate.toISOString().split('T')[0];
    
    if (uniqueSorted.includes(expectedDateStr)) {
      streak++;
      // Move back one day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
