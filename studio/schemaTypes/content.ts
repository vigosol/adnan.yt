// ─────────────────────────────────────────────────────────────────
// blog.ts
// ─────────────────────────────────────────────────────────────────
import { defineType, defineField } from 'sanity'

const CATEGORIES = [
  'Premiere Pro', 'After Effects', 'DaVinci Resolve',
  'CapCut', 'YouTube', 'Shorts / Reels',
  'AI Video Editing', 'Gear', 'Freelancing', 'Tips & Tricks',
]

export const blogSchema = defineType({
  name:  'blog',
  title: 'Blog Post',
  type:  'document',
  fields: [
    defineField({ name: 'title',        type: 'string',  title: 'Title',       validation: R => R.required() }),
    defineField({ name: 'slug',         type: 'slug',    title: 'Slug',        options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'isPublished',  type: 'boolean', title: 'Published?',  initialValue: false }),
    defineField({ name: 'publishedAt',  type: 'datetime',title: 'Publish Date' }),
    defineField({ name: 'updatedAt',    type: 'datetime',title: 'Last Updated' }),

    defineField({
      name:    'category',
      type:    'string',
      title:   'Category',
      options: { list: CATEGORIES },
    }),
    defineField({
      name:  'tags',
      type:  'array',
      title: 'Tags',
      of:    [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name:    'author',
      type:    'reference',
      title:   'Author',
      to:      [{ type: 'person' }],
    }),

    defineField({
      name:    'thumbnail',
      type:    'image',
      title:   'Thumbnail / OG Image (1200×630)',
      options: { hotspot: true },
    }),

    defineField({
      name:  'body',
      type:  'array',
      title: 'Article Body',
      of:    [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type:   'object',
          name:   'youtubeEmbed',
          title:  'YouTube Video',
          fields: [
            { name: 'videoId', type: 'string', title: 'YouTube Video ID' },
            { name: 'caption', type: 'string', title: 'Caption (optional)' },
          ],
          preview: { select: { title: 'caption', subtitle: 'videoId' } },
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({ name: 'seoTitle',       type: 'string', title: 'SEO Title',       validation: R => R.max(60) }),
    defineField({ name: 'seoDescription', type: 'text',   title: 'SEO Description', rows: 2, validation: R => R.max(160) }),
    defineField({ name: 'ogImage', type: 'image', title: 'OG Image (overrides thumbnail)', options: { hotspot: true } }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'thumbnail' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Draft', media }
    },
  },
})


// ─────────────────────────────────────────────────────────────────
// tutorial.ts
// ─────────────────────────────────────────────────────────────────
export const tutorialSchema = defineType({
  name:  'tutorial',
  title: 'Tutorial',
  type:  'document',
  fields: [
    defineField({ name: 'title',        type: 'string',  title: 'Title',      validation: R => R.required() }),
    defineField({ name: 'slug',         type: 'slug',    title: 'Slug',       options: { source: 'title' }, validation: R => R.required() }),
    defineField({ name: 'isPublished',  type: 'boolean', title: 'Published?', initialValue: false }),
    defineField({ name: 'publishedAt',  type: 'datetime',title: 'Publish Date' }),

    defineField({
      name:    'category',
      type:    'string',
      title:   'Category',
      options: { list: CATEGORIES },
    }),
    defineField({
      name:    'difficulty',
      type:    'string',
      title:   'Difficulty',
      options: { list: ['Beginner', 'Intermediate', 'Advanced'] },
    }),
    defineField({
      name:  'tags',
      type:  'array',
      title: 'Tags',
      of:    [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // YouTube companion video (Phase 8 enhancement)
    defineField({
      name:        'youtubeVideoId',
      type:        'string',
      title:       'YouTube Video ID',
      description: 'The 11-character ID after ?v= in the YouTube URL. This tutorial will embed this video at the top.',
    }),

    defineField({
      name:    'thumbnail',
      type:    'image',
      title:   'Thumbnail',
      options: { hotspot: true },
    }),

    defineField({
      name:  'body',
      type:  'array',
      title: 'Tutorial Content',
      of:    [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type:   'object',
          name:   'codeBlock',
          title:  'Code Block',
          fields: [
            { name: 'language', type: 'string', title: 'Language' },
            { name: 'code',     type: 'text',   title: 'Code' },
          ],
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({ name: 'seoTitle',       type: 'string', title: 'SEO Title',       validation: R => R.max(60) }),
    defineField({ name: 'seoDescription', type: 'text',   title: 'SEO Description', rows: 2, validation: R => R.max(160) }),
    defineField({ name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})


// ─────────────────────────────────────────────────────────────────
// featuredVideo.ts  (Phase 18 — YouTube View Counter)
// ─────────────────────────────────────────────────────────────────
export const featuredVideoSchema = defineType({
  name:  'featuredVideo',
  title: 'Featured Video',
  type:  'document',
  fields: [
    defineField({ name: 'title',       type: 'string',  title: 'Video Title',      validation: R => R.required() }),
    defineField({ name: 'isActive',    type: 'boolean', title: 'Show on website?', initialValue: true }),
    defineField({ name: 'displayOrder',type: 'number',  title: 'Display Order (1 = first)' }),

    defineField({
      name:        'youtubeVideoId',
      type:        'string',
      title:       'YouTube Video ID',
      description: 'The 11-character ID after ?v= — e.g. dQw4w9WgXcQ',
      validation:  R => R.required().length(11),
    }),
    defineField({
      name:        'youtubeUrl',
      type:        'url',
      title:       'Full YouTube URL',
      description: 'Paste the full URL for reference — e.g. https://youtu.be/dQw4w9WgXcQ',
    }),

    defineField({ name: 'description', type: 'text',   title: 'Short Description', rows: 2 }),
    defineField({
      name:    'category',
      type:    'string',
      title:   'Video Category',
      options: { list: ['Tutorial', 'Process / BTS', 'Review', 'Short', 'Case Study'] },
    }),

    // ── Auto-updated by cron — DO NOT edit manually ───────────
    defineField({
      name:        'cachedViewCount',
      type:        'number',
      title:       'Cached View Count',
      description: '⚠️ Auto-updated every 24h by the Vercel cron job. Do not edit.',
      readOnly:    true,
    }),
    defineField({
      name:        'lastSynced',
      type:        'datetime',
      title:       'Last Synced',
      description: 'Timestamp of the last successful API sync.',
      readOnly:    true,
    }),
  ],

  orderings: [{
    title: 'Display Order',
    name:  'displayOrder',
    by:    [{ field: 'displayOrder', direction: 'asc' }],
  }],

  preview: {
    select: { title: 'title', subtitle: 'cachedViewCount' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle != null
          ? `${subtitle.toLocaleString()} views (cached)`
          : 'No views synced yet',
      }
    },
  },
})
