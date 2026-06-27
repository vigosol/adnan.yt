import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'service',
  title: 'Service',
  type:  'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Service Name', validation: R => R.required() }),
    defineField({ name: 'slug',  type: 'slug',   title: 'Slug', options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'icon',  type: 'string', title: 'Emoji Icon', description: 'e.g. 🎬' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order (1 = first)' }),
    defineField({ name: 'isActive', type: 'boolean', title: 'Active?', initialValue: true }),

    // ── Copy ──────────────────────────────────────────────────
    defineField({ name: 'shortDescription', type: 'text', title: 'Short Description (card)', rows: 2, validation: R => R.max(150) }),
    defineField({ name: 'fullDescription',  type: 'text', title: 'Full Introduction',  rows: 4 }),
    defineField({ name: 'problem',          type: 'text', title: 'The Problem (client pain point)', rows: 3 }),
    defineField({ name: 'solution',         type: 'text', title: 'The Solution (how you solve it)', rows: 3 }),

    // ── Deliverables ──────────────────────────────────────────
    defineField({
      name:  'deliverables',
      type:  'array',
      title: 'Deliverables',
      of:    [{ type: 'string' }],
    }),

    // ── Process steps ─────────────────────────────────────────
    defineField({
      name:  'process',
      type:  'array',
      title: 'Process Steps',
      of: [{
        type:   'object',
        fields: [
          { name: 'step',        type: 'number', title: 'Step #' },
          { name: 'title',       type: 'string', title: 'Step Title' },
          { name: 'description', type: 'text',   title: 'Step Description' },
        ],
        preview: { select: { title: 'title', subtitle: 'step' } },
      }],
    }),

    // ── Benefits ──────────────────────────────────────────────
    defineField({
      name:  'benefits',
      type:  'array',
      title: 'Key Benefits',
      of: [{
        type:   'object',
        fields: [
          { name: 'icon',  type: 'string', title: 'Emoji' },
          { name: 'title', type: 'string', title: 'Benefit Title' },
          { name: 'desc',  type: 'text',   title: 'Description', rows: 2 },
        ],
      }],
    }),

    // ── Pricing tiers ─────────────────────────────────────────
    defineField({
      name:  'pricing',
      type:  'array',
      title: 'Pricing Tiers',
      of: [{
        type:   'object',
        fields: [
          { name: 'name',    type: 'string',  title: 'Package Name', description: 'e.g. Basic, Pro, Premium' },
          { name: 'price',   type: 'string',  title: 'Price',        description: 'e.g. $49, From $99' },
          { name: 'features', type: 'array', title: 'Features', of: [{ type: 'string' }] },
          { name: 'isHighlighted', type: 'boolean', title: 'Highlight (most popular)?', initialValue: false },
        ],
      }],
    }),

    // ── FAQs ──────────────────────────────────────────────────
    defineField({
      name:  'faqs',
      type:  'array',
      title: 'FAQs',
      of: [{
        type:   'object',
        fields: [
          { name: 'question', type: 'string', title: 'Question' },
          { name: 'answer',   type: 'text',   title: 'Answer', rows: 3 },
        ],
      }],
    }),

    // ── Thumbnail ─────────────────────────────────────────────
    defineField({
      name:    'thumbnail',
      type:    'image',
      title:   'Thumbnail / Hero Image',
      options: { hotspot: true },
    }),

    // ── Related portfolio ─────────────────────────────────────
    defineField({
      name:  'relatedPortfolio',
      type:  'array',
      title: 'Related Portfolio Items',
      of:    [{ type: 'reference', to: [{ type: 'portfolio' }] }],
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({ name: 'seoTitle',       type: 'string', title: 'SEO Title',       validation: R => R.max(60) }),
    defineField({ name: 'seoDescription', type: 'text',   title: 'SEO Description', rows: 2, validation: R => R.max(160) }),
    defineField({ name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'thumbnail' },
  },
})
