import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { MoonIcon, SunIcon } from './Icons.js';
import { PRODUCTS, type ProductId } from './products.js';

/** "superbestawesome", optionally followed by the product name in its accent colour. */
export function Wordmark({ product, className = '' }: { product?: ProductId; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="wordmark">superbestawesome</span>
      {product && product !== 'library' && (
        <span className="font-display font-bold text-accent italic">{PRODUCTS[product].name}</span>
      )}
    </span>
  );
}

/** Soft colour blobs behind everything. Decorative only; the calm tone halves them. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ opacity: 'var(--backdrop-opacity)' }}>
      <div className="absolute -top-40 -right-40 size-[34rem] rounded-full blur-3xl" style={{ background: 'var(--blob-a)' }} />
      <div className="absolute -bottom-48 -left-40 size-[38rem] rounded-full blur-3xl" style={{ background: 'var(--blob-b)' }} />
      <div className="absolute top-1/3 left-1/2 size-[22rem] -translate-x-1/2 rounded-full blur-3xl" style={{ background: 'var(--blob-c)' }} />
    </div>
  );
}

/** Light/dark switch. Pairs with assets/theme-init.js, which applies the choice before first paint. */
export function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  return (
    <button
      type="button"
      className="grid size-11 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink"
      aria-label={dark ? 'Use light theme' : 'Use dark theme'}
      onClick={() => {
        const next = !dark;
        document.documentElement.classList.toggle('dark', next);
        try {
          localStorage.setItem('theme', next ? 'dark' : 'light');
        } catch {
          /* private mode */
        }
        setDark(next);
      }}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center py-16">
      <span className="size-7 animate-spin rounded-full border-[3px] border-line/20 border-t-accent" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function Empty({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-sm py-16 text-center">
      <p className="font-display text-2xl font-bold">{title}</p>
      {children && <div className="muted mt-2 text-sm">{children}</div>}
    </div>
  );
}

export function ErrorNote({ message }: { message: string | null | undefined }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl border-2 border-coral bg-coral/10 px-4 py-3 text-sm font-semibold">
      {message}
    </p>
  );
}

/** Big page heading; `accent` renders in italic accent colour after the main words. */
export function PageTitle({ children, accent, action }: { children: ReactNode; accent?: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <h1 className="font-display text-4xl leading-[0.95] font-black tracking-tight sm:text-5xl">
        {children}
        {accent && <span className="text-accent italic"> {accent}</span>}
      </h1>
      {action}
    </div>
  );
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

function messageOf(err: unknown): string {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === 'string' && err) return err;
  return 'Something went wrong. Try again.';
}

/** Wraps an async save so every Save button shows saving → saved, or the error. */
export function useSaver(describe: (err: unknown) => string = messageOf) {
  const [state, setState] = useState<SaveState>('idle');
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const run = useCallback(
    async (action: () => Promise<unknown>) => {
      clearTimeout(timer.current);
      setState('saving');
      setError(null);
      try {
        await action();
        setState('saved');
        timer.current = setTimeout(() => setState('idle'), 2200);
        return true;
      } catch (err) {
        setState('error');
        setError(describe(err));
        return false;
      }
    },
    [describe],
  );
  return { state, error, run };
}

export function SaveButton({ state, label = 'Save', className = '' }: { state: SaveState; label?: string; className?: string }) {
  return (
    <button type="submit" disabled={state === 'saving'} className={`btn-primary ${state === 'saved' ? '!bg-teal' : ''} ${className}`}>
      {state === 'saving' ? 'Saving…' : state === 'saved' ? 'Saved ✓' : label}
    </button>
  );
}
