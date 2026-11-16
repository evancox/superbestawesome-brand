import { type ProductId } from './products.js';
/**
 * Jump to the other superbestawesome products this browser has signed in to.
 * Renders nothing until there is at least one other product to go to, so it never
 * advertises products a person doesn't use.
 */
export declare function AppSwitcher({ current }: {
    current: ProductId;
}): import("react").JSX.Element | null;
