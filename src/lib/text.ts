// Truncates plain text to a max length on a word boundary, appending an
// ellipsis — used for card excerpts derived from a post's full pt::text(body).
export function excerpt(bodyText?: string, maxLen = 200): string | undefined {
  if (!bodyText) return undefined
  const trimmed = bodyText.trim()
  if (trimmed.length <= maxLen) return trimmed
  return trimmed.slice(0, maxLen).replace(/\s+\S*$/, '') + '…'
}
