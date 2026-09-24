/**
 * Helper to ensure local public assets resolve correctly with Vite's base path
 * (both in local dev and GitHub Pages subpath deployment).
 */
export const getAssetUrl = (path) => {
  if (!path) return ''
  // Return untouched if already absolute or data URI
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}${cleanPath}`
}
