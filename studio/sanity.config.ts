import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name:      'adnan-yt-studio',
  title:     'adnan.yt Studio',

  // ⚠️ Replace these with your actual Sanity project values
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'd54eszpi',
  dataset:   process.env.SANITY_STUDIO_DATASET    ?? 'production',

  // Restrict the siteSettings singleton to publish only (no delete/duplicate/unpublish)
  document: {
    actions: (input, context) =>
      context.schemaType === 'siteSettings'
        ? input.filter(({ action }) => action === 'publish')
        : input,
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('⚙️  Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),

            // Page SEO
            S.documentTypeListItem('pageSeo').title('🔍 Page SEO'),
            S.divider(),

            // Services
            S.documentTypeListItem('service').title('🎬 Services'),
            S.divider(),

            // Content
            S.documentTypeListItem('blog').title('📝 Blog Posts'),
            S.documentTypeListItem('tutorial').title('🎓 Tutorials'),
            S.documentTypeListItem('featuredVideo').title('📺 Featured Videos'),
            S.divider(),

            // (uncomment as you add more schemas)
            // S.documentTypeListItem('portfolio').title('🖼️ Portfolio'),
            // S.documentTypeListItem('testimonial').title('⭐ Testimonials'),
            // S.documentTypeListItem('product').title('🛒 Shop / Affiliates'),
          ]),
    }),
    visionTool(), // GROQ query tester — only in development
  ],

  schema: { types: schemaTypes },
})
