# Working on this repo

The shared look and voice of every superbestawesome product. It is **public**, so nothing
private goes in here: no product data, no keys, no internal URLs beyond the public product domains.

## Rules
- The library (the original product) must look exactly the same with no `data-product` or
  `data-tone` set. Changing a default changes the live library; do it deliberately.
- Products pin this package to a commit or tag. Never rewrite history on `main`.
- `dist/` is committed so products can install from GitHub without a build step. Run
  `npm run build` after changing `src/`; `npm run check` fails if `dist/` is stale.
- A new product: add it to `src/products.ts` and its accent to `css/tokens.css` (a test checks both).
- Generated graphics only. No photos or other media.

## Checks before pushing
```sh
npm run check     # typecheck, tests, build (dist must be up to date), preview build
npm run preview   # eyeball every token and component, both products, light and dark
```

## Brand
- The name is written `superbestawesome`, never with a period after it. See VOICE.md.
