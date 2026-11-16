import { useEffect, useRef, useState } from 'react';
import { AppsIcon } from './Icons.js';
import { usedProducts, type Product, type ProductId } from './products.js';

/**
 * Jump to the other superbestawesome products this browser has signed in to.
 * Renders nothing until there is at least one other product to go to, so it never
 * advertises products a person doesn't use.
 */
export function AppSwitcher({ current }: { current: ProductId }) {
  const [others, setOthers] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOthers(usedProducts().filter((p) => p.id !== current)), [current]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  if (others.length === 0) return null;
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Other superbestawesome apps"
        className="grid size-11 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink"
        onClick={() => setOpen((o) => !o)}
      >
        <AppsIcon />
      </button>
      {open && (
        <div role="menu" className="card absolute right-0 z-30 mt-2 w-56 p-2">
          {others.map((p) => (
            <a
              key={p.id}
              role="menuitem"
              href={p.url}
              className="flex min-h-11 items-center gap-3 rounded-xl px-3 font-bold hover:bg-soft"
            >
              <span aria-hidden className="size-3 rounded-full border-2 border-line" style={{ background: `var(--${p.accent})` }} />
              {p.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
