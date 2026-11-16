# superbestawesome brand

The shared look and voice of superbestawesome products: colour tokens, Tailwind theme, fonts,
the wordmark, a few shared components, the product list, app icons and the voice guide.

## Use it in a product

```sh
npm install https://codeload.github.com/evancox/superbestawesome-brand/tar.gz/<commit>
```

Use the tarball URL, not `github:` shorthand: npm records the shorthand as an SSH address in the
lockfile, and CI and Netlify have no SSH key to fetch it with. This repo must stay public for the
same reason.

```css
/* src/index.css */
@import "tailwindcss";
@import "@superbestawesome/brand/theme.css";
```

```html
<!-- index.html: pick the product; calm products also set the tone -->
<html lang="en" data-product="journal" data-tone="calm">
  <head>
    <script src="/theme.js"></script> <!-- a copy of @superbestawesome/brand/theme-init.js -->
```

```tsx
import { AppSwitcher, Backdrop, PageTitle, ThemeToggle, Wordmark, markProductUsed } from '@superbestawesome/brand';

markProductUsed('journal'); // once signed in, so the app switcher in other products lists it
```

App icons: `npx sba-icons journal public/icons` (needs Playwright with Chromium).

## What's in it

| Path | What |
|---|---|
| `css/tokens.css` | Colours (light and dark), product accents, the calm tone |
| `css/theme.css` | Tailwind v4 theme, fonts, and the utilities: `card`, `btn-primary`, `chip-on`, `input`, `wordmark`, `sticker`… |
| `src/ui.tsx` | `Wordmark`, `Backdrop`, `ThemeToggle`, `PageTitle`, `Spinner`, `Empty`, `ErrorNote`, `SaveButton`, `useSaver` |
| `src/Icons.tsx` | The line-icon style (`iconProps`) and the icons every product uses |
| `src/products.ts` | Every product, its subdomain, accent, tone and icon letter |
| `src/AppSwitcher.tsx` | Menu of the other products *this browser already uses* (never the whole list) |
| `bin/make-icons.mjs` | Renders a product's app icons |
| `VOICE.md` | Naming, tone and copy rules |

## Three switches on `<html>`

- `class="dark"`: dark theme.
- `data-product="journal"`: the product's lead colour (no attribute = library pink).
- `data-tone="calm"`: smaller shadows, half-strength backdrop, straighter headings. The wordmark
  stays at full volume everywhere.

Run `npm run preview` to see every combination.
