export type ClassValue = string | false | null | undefined;

/**
 * Minimal class-name joiner. Kept dependency-free on purpose - the design
 * system has no need for conditional-object syntax yet.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}