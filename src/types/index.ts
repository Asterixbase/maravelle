// ─── Brand / Retailer ────────────────────────────────────────────────────────

export type AffiliateNetwork = 'awin' | 'rakuten' | 'cj' | 'amazon'

export interface Brand {
  id: string
  slug: string
  name: string
  logoUrl: string | null
  heroImageUrl: string | null
  tagline: string | null
  description: string | null
  network: AffiliateNetwork
  merchantId: string
  isActive: boolean
  featuredRank: number | null
  createdAt: string
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductCategory =
  | 'women-fashion'
  | 'men-fashion'
  | 'beauty'
  | 'homeware'
  | 'accessories'
  | 'footwear'
  | 'jewellery'
  | 'fragrance'

export interface Product {
  id: string
  brandId: string
  brand?: Brand
  slug: string
  name: string
  description: string | null
  category: ProductCategory
  subcategory: string | null
  priceGbp: number
  salePriceGbp: number | null
  currency: 'GBP'
  imageUrls: string[]
  affiliateUrl: string
  linkId: string
  inStock: boolean
  sizes: string[]
  colours: string[]
  material: string | null
  tags: string[]
  isEditorsPick: boolean
  isTrending: boolean
  isNewArrival: boolean
  clickCount: number
  conversionCount: number
  createdAt: string
  updatedAt: string
}

// ─── Wishlist ─────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product?: Product
  createdAt: string
}

// ─── Affiliate click / conversion ────────────────────────────────────────────

export interface AffiliateClick {
  id: string
  linkId: string
  productId: string
  userId: string | null
  sessionId: string
  ipHash: string
  userAgent: string
  referer: string | null
  country: string | null
  clickedAt: string
}

export interface AffiliateConversion {
  id: string
  clickId: string
  network: AffiliateNetwork
  orderId: string
  commissionGbp: number
  saleAmountGbp: number
  status: 'pending' | 'approved' | 'rejected'
  postbackReceivedAt: string
}

// ─── Auth / User ──────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  email: string
  displayName: string | null
  avatarUrl: string | null
  consentAnalytics: boolean
  consentMarketing: boolean
  createdAt: string
}

// ─── Editorial content ────────────────────────────────────────────────────────

export interface EditorialPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  coverImageUrl: string | null
  authorName: string
  tags: string[]
  publishedAt: string
  updatedAt: string
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchResult {
  products: Product[]
  brands: Brand[]
  total: number
}

export interface SearchFilters {
  category?: ProductCategory
  brandId?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  isOnSale?: boolean
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'trending' | 'popular'
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ─── UI state ─────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'error' | 'warning'

export interface ConsentState {
  analytics: boolean
  marketing: boolean
  functionality: boolean
  hasResponded: boolean
}
