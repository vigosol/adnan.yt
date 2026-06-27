import { defineType, defineField } from 'sanity'

export default defineType({
  name:  'siteSettings',
  title: 'Site Settings',
  type:  'document',
  // Singleton — only one document exists
  __experimental_actions: ['update', 'publish'],

  fields: [
    // ── Brand ─────────────────────────────────────────────────
    defineField({ name: 'siteName',  type: 'string',  title: 'Site Name',  initialValue: 'adnan.yt' }),
    defineField({ name: 'tagline',   type: 'string',  title: 'Tagline' }),
    defineField({ name: 'logoUrl',   type: 'url',     title: 'Logo URL (if not using Sanity image)' }),

    // ── Contact ───────────────────────────────────────────────
    defineField({ name: 'email',           type: 'string',  title: 'Contact Email' }),
    defineField({ name: 'phone',           type: 'string',  title: 'Phone Number' }),
    defineField({ name: 'whatsappNumber',  type: 'string',  title: 'WhatsApp Number (with country code, no +)', description: 'e.g. 923001234567' }),
    defineField({ name: 'address',         type: 'text',    title: 'Business Address', rows: 2 }),

    // ── Analytics ─────────────────────────────────────────────
    defineField({ name: 'ga4Id',      type: 'string', title: 'GA4 Measurement ID',     description: 'e.g. G-XXXXXXXXXX' }),
    defineField({ name: 'gtmId',      type: 'string', title: 'Google Tag Manager ID',  description: 'e.g. GTM-XXXXXXX' }),
    defineField({ name: 'clarityId',  type: 'string', title: 'Microsoft Clarity ID' }),

    // ── Default SEO ───────────────────────────────────────────
    defineField({ name: 'defaultSeoTitle',       type: 'string', title: 'Default SEO Title',       validation: R => R.max(60) }),
    defineField({ name: 'defaultSeoDescription', type: 'text',   title: 'Default SEO Description', rows: 2, validation: R => R.max(160) }),
    defineField({
      name:  'defaultOgImage',
      type:  'image',
      title: 'Default OG Image (1200×630)',
      options: { hotspot: true },
    }),

    // ── Social links ──────────────────────────────────────────
    defineField({
      name:  'socialLinks',
      title: 'Social Links',
      type:  'object',
      fields: [
        { name: 'youtube',   type: 'url', title: 'YouTube Channel URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
        { name: 'tiktok',    type: 'url', title: 'TikTok URL' },
        { name: 'linkedin',  type: 'url', title: 'LinkedIn URL' },
        { name: 'twitter',   type: 'url', title: 'Twitter / X URL' },
        { name: 'pinterest', type: 'url', title: 'Pinterest URL' },
      ],
    }),

    // ── Chat / WhatsApp ───────────────────────────────────────
    defineField({ name: 'enableWhatsapp', type: 'boolean', title: 'Show WhatsApp Floating Button?', initialValue: true }),
    defineField({ name: 'enableLiveChat', type: 'boolean', title: 'Enable Tawk.to Live Chat?',      initialValue: false }),
    defineField({ name: 'tawktoId',       type: 'string',  title: 'Tawk.to Widget ID' }),

    // ── Verification codes ────────────────────────────────────
    defineField({ name: 'googleVerification', type: 'string', title: 'Google Search Console Verification Code' }),
    defineField({ name: 'bingVerification',   type: 'string', title: 'Bing Webmaster Verification Code' }),
  ],

  preview: {
    select: { title: 'siteName', subtitle: 'email' },
  },
})
