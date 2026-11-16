#!/usr/bin/env node
// Render a product's app icons: its one-letter mark in wordmark style on an ink tile,
// with stripes led by the product's accent.
//
//   npx sba-icons journal public/icons
//
// Writes icon-192.png, icon-512.png, maskable-512.png, apple-touch-icon.png, favicon-64.png.
// Needs Playwright with Chromium available (require('playwright')).
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { PALETTE, PRODUCTS, stripeColours } from '../dist/products.js';

const [id, out] = process.argv.slice(2);
const product = PRODUCTS[id];
if (!product || !out) {
  console.error(`usage: sba-icons <${Object.keys(PRODUCTS).join('|')}> <out-dir>`);
  process.exit(1);
}

const require = createRequire(import.meta.url);
const fontDir = join(dirname(require.resolve('@fontsource-variable/fraunces/package.json')), 'files');
const font = readFileSync(join(fontDir, 'fraunces-latin-full-italic.woff2')).toString('base64');
const [a, b, c] = stripeColours(product);

/** `pad` shrinks the mark for maskable icons, which Android crops to a circle. */
const page = (size, pad, rounded) => `<!doctype html><html><head><style>
@font-face { font-family: F; src: url(data:font/woff2;base64,${font}) format('woff2'); font-style: italic; }
html, body { margin: 0; width: ${size}px; height: ${size}px; background: transparent; }
.tile { width: ${size}px; height: ${size}px; border-radius: ${rounded ? size * 0.22 : 0}px; background: ${PALETTE.ink};
  display: grid; place-items: center; overflow: hidden; }
.mark { font: italic 900 ${size * (1 - pad) * 0.78}px/1 F; color: ${PALETTE.bg}; font-variation-settings: "SOFT" 100, "WONK" 1;
  letter-spacing: -0.04em; transform: translate(-${size * 0.03}px, -${size * 0.1}px);
  text-shadow: ${size * 0.018}px ${size * 0.018}px 0 ${a}, ${size * 0.036}px ${size * 0.036}px 0 ${b}, ${size * 0.054}px ${size * 0.054}px 0 ${c}; }
</style></head><body><div class="tile"><span class="mark">${product.mark}</span></div></body></html>`;

const { chromium } = require('playwright');
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const p = await browser.newPage();
for (const [name, size, pad, rounded] of [
  ['icon-192.png', 192, 0, false],
  ['icon-512.png', 512, 0, false],
  ['maskable-512.png', 512, 0.22, false],
  ['apple-touch-icon.png', 180, 0, false],
  ['favicon-64.png', 64, 0, true],
]) {
  await p.setViewportSize({ width: size, height: size });
  await p.setContent(page(size, pad, rounded));
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: join(out, name), omitBackground: rounded });
  console.log('wrote', join(out, name));
}
await browser.close();
