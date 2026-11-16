/**
 * Every superbestawesome product. Each lives on its own subdomain of BRAND_DOMAIN
 * (the library, for now, on the bare domain).
 *
 * Adding a product: add it here, add its accent to css/tokens.css, release a new version.
 */
export const BRAND_DOMAIN = 'superbestawesome.com';
export const PRODUCTS = {
    library: { id: 'library', name: 'library', url: `https://${BRAND_DOMAIN}`, accent: 'pink', tone: 'full', mark: 's' },
    journal: { id: 'journal', name: 'journal', url: `https://journal.${BRAND_DOMAIN}`, accent: 'teal', tone: 'calm', mark: 'j' },
};
export const PALETTE = {
    bg: '#fff8ec',
    ink: '#2b1b3f',
    bgDark: '#1b1228',
    pink: '#ff4f8b',
    yellow: '#ffc93c',
    teal: '#14b8a6',
    coral: '#ff6b5e',
    violet: '#7c3aed',
    sky: '#38bdf8',
};
/** The other two stripe colours behind a product's icon mark, after its own accent. */
export function stripeColours(p) {
    const order = ['pink', 'yellow', 'teal', 'violet', 'sky', 'coral'];
    const rest = order.filter((c) => c !== p.accent);
    return [PALETTE[p.accent], PALETTE[rest[0]], PALETTE[rest[1]]];
}
// --- Which products this browser has used -------------------------------------------
//
// Subdomains can't read each other's localStorage, so this is a cookie on the parent
// domain. It holds product ids only, nothing about the person, and the app switcher uses
// it to list just the products they already use, never the whole catalogue.
const COOKIE = 'sba_products';
const YEAR = 60 * 60 * 24 * 365;
export function parseUsed(cookie) {
    const raw = cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith(`${COOKIE}=`));
    if (!raw)
        return [];
    const ids = decodeURIComponent(raw.slice(COOKIE.length + 1)).split(',');
    return ids.filter((id) => id in PRODUCTS);
}
/** Cookie attributes for this host: shared across the brand domain, host-only elsewhere (localhost). */
export function cookieScope(hostname, secure) {
    const onBrand = hostname === BRAND_DOMAIN || hostname.endsWith(`.${BRAND_DOMAIN}`);
    return `${onBrand ? `; Domain=${BRAND_DOMAIN}` : ''}; Path=/; Max-Age=${YEAR}; SameSite=Lax${secure ? '; Secure' : ''}`;
}
/** Call once a person is signed in to a product. */
export function markProductUsed(id) {
    if (typeof document === 'undefined')
        return;
    const used = new Set(parseUsed(document.cookie));
    if (used.has(id))
        return;
    used.add(id);
    document.cookie = `${COOKIE}=${encodeURIComponent([...used].join(','))}${cookieScope(location.hostname, location.protocol === 'https:')}`;
}
export function usedProducts() {
    if (typeof document === 'undefined')
        return [];
    return parseUsed(document.cookie).map((id) => PRODUCTS[id]);
}
