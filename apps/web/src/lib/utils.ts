// Format a date string to Portuguese locale
/** A heading's anchor: lower case, no accents, words joined by hyphens. */
export function headingId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function formatDate(dateString: string): string {
  // A bare YYYY-MM-DD is read at noon, so no time zone moves it to the day before.
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateString) ? new Date(`${dateString}T12:00:00`) : new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Build a reading time label
export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`
}

// Clamp a string to n characters with ellipsis
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}…`
}


// cx is provided by @my-world/ui
export { cx } from '@my-world/ui'
