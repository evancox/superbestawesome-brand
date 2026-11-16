import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BRAND_DOMAIN, PALETTE, PRODUCTS, cookieScope, parseUsed, stripeColours } from '../src/products';

const tokens = readFileSync(new URL('../css/tokens.css', import.meta.url), 'utf8');

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe('palette', () => {
  it('body text reads on the background in both themes', () => {
    expect(contrast(PALETTE.ink, PALETTE.bg)).toBeGreaterThan(7);
    expect(contrast('#fff3e2', PALETTE.bgDark)).toBeGreaterThan(7);
  });

  it('the journal primary button text reads on its accent (WCAG AA)', () => {
    expect(tokens).toMatch(/data-product='journal'\][^}]*--accent: var\(--teal\)[^}]*--accent-ink: #2b1b3f/s);
    expect(contrast(PALETTE.teal, PALETTE.ink)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('products', () => {
  it('every product but the library declares its accent in tokens.css', () => {
    for (const p of Object.values(PRODUCTS)) {
      if (p.id === 'library') continue;
      expect(tokens).toContain(`data-product='${p.id}'`);
      expect(tokens).toContain(`--accent: var(--${p.accent})`);
    }
  });

  it('lives on the brand domain', () => {
    for (const p of Object.values(PRODUCTS)) expect(new URL(p.url).hostname.endsWith(BRAND_DOMAIN)).toBe(true);
  });

  it('icon stripes lead with the product accent and never repeat', () => {
    const s = stripeColours(PRODUCTS.journal);
    expect(s[0]).toBe(PALETTE.teal);
    expect(new Set(s).size).toBe(3);
    expect(stripeColours(PRODUCTS.library)).toEqual([PALETTE.pink, PALETTE.yellow, PALETTE.teal]);
  });
});

describe('used-products cookie', () => {
  it('reads known ids and ignores anything else', () => {
    expect(parseUsed('a=1; sba_products=library%2Cjournal%2Cnope; b=2')).toEqual(['library', 'journal']);
    expect(parseUsed('a=1')).toEqual([]);
  });

  it('is shared across subdomains on the brand domain only', () => {
    expect(cookieScope('journal.superbestawesome.com', true)).toContain('Domain=superbestawesome.com');
    expect(cookieScope('superbestawesome.com', true)).toContain('Secure');
    expect(cookieScope('localhost', false)).not.toContain('Domain=');
    expect(cookieScope('evil-superbestawesome.com', true)).not.toContain('Domain=');
  });
});
