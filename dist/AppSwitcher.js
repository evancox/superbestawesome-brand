import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { AppsIcon } from './Icons.js';
import { usedProducts } from './products.js';
/**
 * Jump to the other superbestawesome products this browser has signed in to.
 * Renders nothing until there is at least one other product to go to, so it never
 * advertises products a person doesn't use.
 */
export function AppSwitcher({ current }) {
    const [others, setOthers] = useState([]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => setOthers(usedProducts().filter((p) => p.id !== current)), [current]);
    useEffect(() => {
        if (!open)
            return;
        const close = (e) => {
            if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', close);
        document.addEventListener('keydown', close);
        return () => {
            document.removeEventListener('mousedown', close);
            document.removeEventListener('keydown', close);
        };
    }, [open]);
    if (others.length === 0)
        return null;
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsx("button", { type: "button", "aria-haspopup": "menu", "aria-expanded": open, "aria-label": "Other superbestawesome apps", className: "grid size-11 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink", onClick: () => setOpen((o) => !o), children: _jsx(AppsIcon, {}) }), open && (_jsx("div", { role: "menu", className: "card absolute right-0 z-30 mt-2 w-56 p-2", children: others.map((p) => (_jsxs("a", { role: "menuitem", href: p.url, className: "flex min-h-11 items-center gap-3 rounded-xl px-3 font-bold hover:bg-soft", children: [_jsx("span", { "aria-hidden": true, className: "size-3 rounded-full border-2 border-line", style: { background: `var(--${p.accent})` } }), p.name] }, p.id))) }))] }));
}
