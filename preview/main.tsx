import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AppsIcon, BackIcon, Backdrop, Empty, ErrorNote, ForwardIcon, HomeIcon, PRODUCTS, PageTitle, PencilIcon,
  SaveButton, SearchIcon, Spinner, ThemeToggle, UserIcon, Wordmark, type ProductId,
} from '../src/index';
import './style.css';

// Settable from the URL too, so screenshots can pick a combination: ?product=journal&dark=1
const q = new URLSearchParams(location.search);

function Preview() {
  const [product, setProduct] = useState<ProductId>((q.get('product') as ProductId) ?? 'library');
  const [dark, setDark] = useState(q.get('dark') === '1');
  const tone = PRODUCTS[product].tone;

  useEffect(() => {
    const html = document.documentElement;
    if (product === 'library') delete html.dataset.product;
    else html.dataset.product = product;
    if (tone === 'calm') html.dataset.tone = 'calm';
    else delete html.dataset.tone;
    html.classList.toggle('dark', dark);
  }, [product, tone, dark]);

  return (
    <div className="min-h-dvh">
      <Backdrop />
      <header className="border-b-2 border-line/10 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center gap-3 px-4">
          <Wordmark product={product} className="text-lg sm:text-2xl" />
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl space-y-10 px-4 py-10">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRODUCTS) as ProductId[]).map((id) => (
            <button key={id} type="button" className={product === id ? 'chip-on' : 'chip-off'} onClick={() => setProduct(id)}>
              {PRODUCTS[id].name} · {PRODUCTS[id].tone}
            </button>
          ))}
          <button type="button" className={dark ? 'chip-on' : 'chip-off'} onClick={() => setDark((d) => !d)}>
            dark
          </button>
        </div>

        <PageTitle accent="today" action={<span className="sticker">sticker</span>}>
          What's going on
        </PageTitle>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="card space-y-4">
            <p className="font-display text-2xl font-bold">A card</p>
            <p className="muted text-sm">Muted supporting text. Body copy is Nunito; headings are Fraunces.</p>
            <div className="flex flex-wrap gap-2">
              <span className="new-badge">New</span>
              <span className="tag-chip">#family</span>
              <span className="tag-chip">#sleep</span>
            </div>
          </div>
          <div className="card pop-accent space-y-3">
            <label className="label" htmlFor="f">A field</label>
            <input id="f" className="input" placeholder="What's on your mind?" />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary">Primary</button>
              <button type="button" className="btn-secondary">Secondary</button>
              <SaveButton state="saved" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-danger">Danger</button>
              <button type="button" className="btn-quiet">Quiet</button>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-4 text-ink">
          <SearchIcon /><BackIcon /><ForwardIcon /><HomeIcon /><UserIcon /><PencilIcon /><AppsIcon />
          {(['pink', 'yellow', 'teal', 'coral', 'violet', 'sky'] as const).map((c) => (
            <span key={c} className="size-8 rounded-full border-2 border-line" style={{ background: `var(--${c})` }} title={c} />
          ))}
        </section>

        <ErrorNote message="An error note, for when a save fails." />
        <div className="card"><Spinner /></div>
        <Empty title="Nothing here yet">The empty state, for a day with no captures.</Empty>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<Preview />);
