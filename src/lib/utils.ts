import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format GBP price */
export function formatPrice(pence: number | null | undefined, includeSign = true): string {
  if (pence == null) return ''
  const formatter = new Intl.NumberFormat('en-GB', {
    style: includeSign ? 'currency' : 'decimal',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return formatter.format(pence)
}

/** Calculate discount percentage */
export function discountPercent(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100)
}

/** Generate a URL-safe slug */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Truncate text to n characters */
export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

/** Get Cloudinary optimised URL */
export function cloudinaryUrl(
  publicId: string,
  opts: { width?: number; height?: number; quality?: number; format?: string } = {}
): string {
  const base = import.meta.env.VITE_CLOUDINARY_BASE_URL
  const { width = 800, height, quality = 'auto', format = 'webp' } = opts
  const transforms = [
    `f_${format}`,
    `q_${quality}`,
    `w_${width}`,
    height ? `h_${height}` : '',
    'c_fill',
    'g_auto',
  ]
    .filter(Boolean)
    .join(',')
  return `${base}/${transforms}/${publicId}`
}

/** Debounce */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

/** Generate a session ID (stored in sessionStorage) */
export function getSessionId(): string {
  const key = 'mrv_sid'
  let sid = sessionStorage.getItem(key)
  if (!sid) {
    sid = crypto.randomUUID()
    sessionStorage.setItem(key, sid)
  }
  return sid
}
