import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from 'react';
import { MoonIcon, SunIcon } from './Icons.js';
import { PRODUCTS } from './products.js';
/** "superbestawesome", optionally followed by the product name in its accent colour. */
export function Wordmark({ product, className = '' }) {
    return (_jsxs("span", { className: `inline-flex items-baseline gap-1.5 ${className}`, children: [_jsx("span", { className: "wordmark", children: "superbestawesome" }), product && product !== 'library' && (_jsx("span", { className: "font-display font-bold text-accent italic", children: PRODUCTS[product].name }))] }));
}
/** Soft colour blobs behind everything. Decorative only; the calm tone halves them. */
export function Backdrop() {
    return (_jsxs("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", style: { opacity: 'var(--backdrop-opacity)' }, children: [_jsx("div", { className: "absolute -top-40 -right-40 size-[34rem] rounded-full blur-3xl", style: { background: 'var(--blob-a)' } }), _jsx("div", { className: "absolute -bottom-48 -left-40 size-[38rem] rounded-full blur-3xl", style: { background: 'var(--blob-b)' } }), _jsx("div", { className: "absolute top-1/3 left-1/2 size-[22rem] -translate-x-1/2 rounded-full blur-3xl", style: { background: 'var(--blob-c)' } })] }));
}
/** Light/dark switch. Pairs with assets/theme-init.js, which applies the choice before first paint. */
export function ThemeToggle() {
    const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
    return (_jsx("button", { type: "button", className: "grid size-11 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink", "aria-label": dark ? 'Use light theme' : 'Use dark theme', onClick: () => {
            const next = !dark;
            document.documentElement.classList.toggle('dark', next);
            try {
                localStorage.setItem('theme', next ? 'dark' : 'light');
            }
            catch {
                /* private mode */
            }
            setDark(next);
        }, children: dark ? _jsx(SunIcon, {}) : _jsx(MoonIcon, {}) }));
}
export function Spinner({ label = 'Loading' }) {
    return (_jsxs("div", { role: "status", className: "flex items-center justify-center py-16", children: [_jsx("span", { className: "size-7 animate-spin rounded-full border-[3px] border-line/20 border-t-accent" }), _jsx("span", { className: "sr-only", children: label })] }));
}
export function Empty({ title, children }) {
    return (_jsxs("div", { className: "mx-auto max-w-sm py-16 text-center", children: [_jsx("p", { className: "font-display text-2xl font-bold", children: title }), children && _jsx("div", { className: "muted mt-2 text-sm", children: children })] }));
}
export function ErrorNote({ message }) {
    if (!message)
        return null;
    return (_jsx("p", { role: "alert", className: "rounded-xl border-2 border-coral bg-coral/10 px-4 py-3 text-sm font-semibold", children: message }));
}
/** Big page heading; `accent` renders in italic accent colour after the main words. */
export function PageTitle({ children, accent, action }) {
    return (_jsxs("div", { className: "mb-7 flex flex-wrap items-end justify-between gap-4", children: [_jsxs("h1", { className: "font-display text-4xl leading-[0.95] font-black tracking-tight sm:text-5xl", children: [children, accent && _jsxs("span", { className: "text-accent italic", children: [" ", accent] })] }), action] }));
}
function messageOf(err) {
    if (err instanceof Error && err.message)
        return err.message;
    if (typeof err === 'string' && err)
        return err;
    return 'Something went wrong. Try again.';
}
/** Wraps an async save so every Save button shows saving → saved, or the error. */
export function useSaver(describe = messageOf) {
    const [state, setState] = useState('idle');
    const [error, setError] = useState(null);
    const timer = useRef(undefined);
    useEffect(() => () => clearTimeout(timer.current), []);
    const run = useCallback(async (action) => {
        clearTimeout(timer.current);
        setState('saving');
        setError(null);
        try {
            await action();
            setState('saved');
            timer.current = setTimeout(() => setState('idle'), 2200);
            return true;
        }
        catch (err) {
            setState('error');
            setError(describe(err));
            return false;
        }
    }, [describe]);
    return { state, error, run };
}
export function SaveButton({ state, label = 'Save', className = '' }) {
    return (_jsx("button", { type: "submit", disabled: state === 'saving', className: `btn-primary ${state === 'saved' ? '!bg-teal' : ''} ${className}`, children: state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved ✓' : label }));
}
