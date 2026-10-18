// Format a date string to Portuguese locale
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Build a reading time label
export function formatReadingTime(minutes: number): string {
  return `${minutes} min de leitura`
}

// Resolve Strapi image URL to absolute
export function resolveMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337'}${url}`
}

// Clamp a string to n characters with ellipsis
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}…`
}


// cx is provided by @my-world/ui
export { cx } from '@my-world/ui'
