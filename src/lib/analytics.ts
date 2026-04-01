/**
 * GA4 eCommerce event helpers — only fire when consent is granted.
 * Consent Mode v2 stub is loaded in index.html before this module.
 */

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function gtag(...args: unknown[]) {
  window.gtag?.(...args)
}

/** Grant consent after user accepts cookie banner */
export function grantConsent(opts: { analytics: boolean; marketing: boolean }) {
  gtag('consent', 'update', {
    analytics_storage: opts.analytics ? 'granted' : 'denied',
    ad_storage: opts.marketing ? 'granted' : 'denied',
    personalization_storage: opts.marketing ? 'granted' : 'denied',
    functionality_storage: 'granted',
  })
}

/** Load GA4 script after consent (called from ConsentBanner) */
export function loadGA4(measurementId: string) {
  if (document.getElementById('ga4-script')) return
  const s = document.createElement('script')
  s.id = 'ga4-script'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(s)
  gtag('config', measurementId, { send_page_view: false })
}

/** Page view */
export function trackPageView(path: string, title: string) {
  gtag('event', 'page_view', { page_path: path, page_title: title })
}

/** Product click */
export function trackSelectItem(product: { id: string; name: string; brand?: string; priceGbp: number }) {
  gtag('event', 'select_item', {
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_brand: product.brand,
        price: product.priceGbp,
        currency: 'GBP',
      },
    ],
  })
}

/** Affiliate link click */
export function trackAffiliateClick(linkId: string, productName: string, merchant: string) {
  gtag('event', 'affiliate_click', {
    link_id: linkId,
    product_name: productName,
    merchant,
  })
}

/** Wishlist add */
export function trackAddToWishlist(productId: string, productName: string, priceGbp: number) {
  gtag('event', 'add_to_wishlist', {
    currency: 'GBP',
    value: priceGbp,
    items: [{ item_id: productId, item_name: productName, price: priceGbp }],
  })
}

/** Search */
export function trackSearch(query: string) {
  gtag('event', 'search', { search_term: query })
}
