import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import type { StructureBuilder } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

// Singletons: exactly one document of this type should ever exist.
const SINGLETON_TYPES = ['siteSettings', 'homePage', 'aboutPage', 'contactPage', 'pricingPage']

const singleton = (S: StructureBuilder, schemaType: string, title: string) =>
  S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))

export default defineConfig({
  name:      'adnan-yt-studio',
  title:     'adnan.yt Studio',

  // ⚠️ Replace these with your actual Sanity project values
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'd54eszpi',
  dataset:   process.env.SANITY_STUDIO_DATASET    ?? 'production',

  // Restrict singletons to publish only (no delete/duplicate/unpublish)
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.includes(context.schemaType)
        ? input.filter(({ action }) => action === 'publish')
        : input,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Page content — each page is its own document, edited separately
            singleton(S, 'homePage', '🏠 Home Page'),
            singleton(S, 'aboutPage', '👤 About Page'),
            singleton(S, 'contactPage', '📞 Contact Page'),
            singleton(S, 'pricingPage', '💰 Pricing Page'),
            S.divider(),

            // Site-wide defaults only (name, contact info, social links, SEO defaults)
            singleton(S, 'siteSettings', '⚙️  Site Settings'),
            S.divider(),

            // Page SEO
            S.documentTypeListItem('pageSeo').title('🔍 Page SEO'),
            S.divider(),

            // Services
            S.documentTypeListItem('service').title('🎬 Services'),
            S.divider(),

            // Testimonials
            S.documentTypeListItem('testimonial').title('⭐ Testimonials'),
            S.divider(),

            // Content
            S.documentTypeListItem('blog').title('📝 Blog Posts'),
            S.documentTypeListItem('tutorial').title('🎓 Tutorials'),
            S.documentTypeListItem('featuredVideo').title('📺 Featured Videos'),
            S.divider(),

            // (uncomment as you add more schemas)
            // S.documentTypeListItem('portfolio').title('🖼️ Portfolio'),
            // S.documentTypeListItem('product').title('🛒 Shop / Affiliates'),
          ]),
    }),
    visionTool(), // GROQ query tester — only in development
  ],

  schema: { types: schemaTypes },
})
