// Anti-scraping helper: pair with a span styled
// `direction: rtl; unicode-bidi: bidi-override;` so the reversed text
// still displays correctly to human visitors, but a raw copy/paste or a
// scraper reading textContent gets a garbled, reversed string instead.
export function reverseText(text: string): string {
  return [...text].reverse().join('')
}
