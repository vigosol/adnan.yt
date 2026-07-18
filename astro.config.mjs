import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://adnan.yt',
  adapter: vercel(),
  integrations: [sitemap()],
  build: {
    // The global stylesheet is ~10.6 KiB, past Astro's default 4 KiB
    // auto-inline cutoff, so it was shipping as a separate render-blocking
    // <link> on every page. Inlining it removes that request from the
    // critical path entirely.
    inlineStylesheets: 'always',
  },
})