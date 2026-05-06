/**
 * Generates a stable, lowercase, hyphenated slug from a habit name.
 * Rules:
 * - Convert to lowercase
 * - Trim leading/trailing spaces
 * - Replace one or more spaces with a single hyphen
 * - Remove non-alphanumeric characters except hyphens
 */
export function getHabitSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
