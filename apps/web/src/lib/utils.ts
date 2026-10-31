// Format a date string to Portuguese locale
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
