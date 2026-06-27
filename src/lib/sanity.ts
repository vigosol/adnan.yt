import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// ── Read-only client (used in all Astro components) ────────────
export const sanityClient = createClient({
  projectId:  import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset:    import.meta.env.PUBLIC_SANITY_DATASET     || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn:     import.meta.env.PROD,   // CDN in prod, live in dev
})

// ── Write client (used only in API routes / server functions) ──
// NEVER import this in .astro files — it exposes the write token
export const sanityWriteClient = createClient({
  projectId:  import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset:    import.meta.env.PUBLIC_SANITY_DATASET     || 'production',
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token:      import.meta.env.SANITY_WRITE_TOKEN,
  useCdn:     false,
})

// ── Image URL builder ──────────────────────────────────────────
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// ── Typed fetch helper ─────────────────────────────────────────
export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return sanityClient.fetch<T>(query, params)
}
