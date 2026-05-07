/**
 * Stable, lowercase, hyphenated slugs are generated from habit names.
 * Rules:
 * - Conversion to lowercase
 * - Trimming of leading/trailing spaces
 * - Replacement of spaces with single hyphens
 * - Removal of non-alphanumeric characters (excluding hyphens)
 */
export function getHabitSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
