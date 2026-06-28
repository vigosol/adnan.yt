import { defineType, defineField } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", title: "Site Name", initialValue: "adnan.yt" }),
    defineField({ name: "tagline", type: "string", title: "Tagline" }),
    defineField({ name: "email", type: "string", title: "Contact Email" }),
    defineField({ name: "phone", type: "string", title: "Phone Number" }),
    defineField({ name: "whatsappNumber", type: "string", title: "WhatsApp Number" }),
    defineField({ name: "ga4Id", type: "string", title: "GA4 Measurement ID" }),
    defineField({ name: "defaultSeoTitle", type: "string", title: "Default SEO Title" }),
    defineField({ name: "defaultSeoDescription", type: "text", title: "Default SEO Description", rows: 2 }),
    defineField({ name: "defaultOgImage", type: "image", title: "Default OG Image", options: { hotspot: true } }),
    defineField({
      name: "socialLinks", title: "Social Links", type: "object",
      fields: [
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "tiktok", type: "url", title: "TikTok" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "twitter", type: "url", title: "Twitter / X" },
      ],
    }),
    defineField({ name: "enableWhatsapp", type: "boolean", title: "Show WhatsApp Button?", initialValue: true }),

    defineField({
      name: "hero", title: "Homepage Hero", type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge Text" },
        { name: "title", type: "string", title: "Headline — line 1" },
        { name: "highlight", type: "string", title: "Headline — gradient line 2" },
        { name: "subtitle", type: "text", title: "Subheadline", rows: 2 },
      ],
    }),
    defineField({
      name: "process", title: "Homepage — How It Works Steps", type: "array",
      of: [{
        type: "object", name: "step",
        fields: [
          { name: "icon", type: "string", title: "Emoji Icon" },
          { name: "title", type: "string", title: "Step Title" },
          { name: "description", type: "text", title: "Step Description", rows: 2 },
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),
    defineField({
      name: "faqs", title: "Homepage FAQs", type: "array",
      of: [{
        type: "object", name: "faq",
        fields: [
          { name: "question", type: "string", title: "Question" },
          { name: "answer", type: "text", title: "Answer", rows: 3 },
        ],
        preview: { select: { title: "question" } },
      }],
    }),
  ],
  preview: { select: { title: "siteName", subtitle: "email" } },
})
