// Cal.com's data-cal-link attribute wants just "username/event-slug", not a
// full URL — accept either so pasting the browser address bar link still works.
export function normalizeCalLink(raw?: string | null): string | undefined {
  if (!raw) return undefined
  const trimmed = raw.replace(/^https?:\/\/(www\.)?cal\.com\//i, '').replace(/^\/+|\/+$/g, '')
  return trimmed || undefined
}

// Cal.com's own generated embed snippet initializes a namespace matching the
// event type slug (e.g. "15min") and every trigger element must declare that
// same namespace via data-cal-namespace — without it, clicks silently fall
// through to the element's normal href instead of opening the popup.
export function getCalNamespace(calLink?: string | null): string | undefined {
  if (!calLink) return undefined
  const slug = calLink.split('/').pop()
  return slug || undefined
}
