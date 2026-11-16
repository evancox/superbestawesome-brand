import { type ReactNode } from 'react';
import { type ProductId } from './products.js';
/** "superbestawesome", optionally followed by the product name in its accent colour. */
export declare function Wordmark({ product, className }: {
    product?: ProductId;
    className?: string;
}): import("react").JSX.Element;
/** Soft colour blobs behind everything. Decorative only; the calm tone halves them. */
export declare function Backdrop(): import("react").JSX.Element;
/** Light/dark switch. Pairs with assets/theme-init.js, which applies the choice before first paint. */
export declare function ThemeToggle(): import("react").JSX.Element;
export declare function Spinner({ label }: {
    label?: string;
}): import("react").JSX.Element;
export declare function Empty({ title, children }: {
    title: string;
    children?: ReactNode;
}): import("react").JSX.Element;
export declare function ErrorNote({ message }: {
    message: string | null | undefined;
}): import("react").JSX.Element | null;
/** Big page heading; `accent` renders in italic accent colour after the main words. */
export declare function PageTitle({ children, accent, action }: {
    children: ReactNode;
    accent?: string;
    action?: ReactNode;
}): import("react").JSX.Element;
export type SaveState = 'idle' | 'saving' | 'saved' | 'error';
/** Wraps an async save so every Save button shows saving → saved, or the error. */
export declare function useSaver(describe?: (err: unknown) => string): {
    state: SaveState;
    error: string | null;
    run: (action: () => Promise<unknown>) => Promise<boolean>;
};
export declare function SaveButton({ state, label, className }: {
    state: SaveState;
    label?: string;
    className?: string;
}): import("react").JSX.Element;
