/**
 * Every superbestawesome product. Each lives on its own subdomain of BRAND_DOMAIN
 * (the library, for now, on the bare domain).
 *
 * Adding a product: add it here, add its accent to css/tokens.css, release a new version.
 */
export declare const BRAND_DOMAIN = "superbestawesome.com";
export type ProductId = 'library' | 'journal';
export interface Product {
    id: ProductId;
    /** Lowercase, as it's written next to the wordmark. */
    name: string;
    url: string;
    /** Brand palette colour that leads this product. */
    accent: 'pink' | 'yellow' | 'teal' | 'coral' | 'violet' | 'sky';
    tone: 'full' | 'calm';
    /** One letter on the app icon. */
    mark: string;
}
export declare const PRODUCTS: Record<ProductId, Product>;
export declare const PALETTE: {
    readonly bg: "#fff8ec";
    readonly ink: "#2b1b3f";
    readonly bgDark: "#1b1228";
    readonly pink: "#ff4f8b";
    readonly yellow: "#ffc93c";
    readonly teal: "#14b8a6";
    readonly coral: "#ff6b5e";
    readonly violet: "#7c3aed";
    readonly sky: "#38bdf8";
};
/** The other two stripe colours behind a product's icon mark, after its own accent. */
export declare function stripeColours(p: Product): [string, string, string];
export declare function parseUsed(cookie: string): ProductId[];
/** Cookie attributes for this host: shared across the brand domain, host-only elsewhere (localhost). */
export declare function cookieScope(hostname: string, secure: boolean): string;
/** Call once a person is signed in to a product. */
export declare function markProductUsed(id: ProductId): void;
export declare function usedProducts(): Product[];
