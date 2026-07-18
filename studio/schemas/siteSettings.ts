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
    defineField({ name: "footerHours", type: "string", title: "Footer — Hours", description: "e.g. \"Mon–Sat, replies within 24h\"" }),
    defineField({ name: "footerAvailability", type: "string", title: "Footer — Availability Note", description: "e.g. \"Working worldwide, remotely\"" }),
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
      name: "calBooking", title: "Cal.com Booking", type: "object",
      description: "Powers the booking popup opened by every \"Book a call\" button on the site.",
      fields: [
        {
          name: "calLink", type: "string", title: "Cal.com Link",
          description: "Your Cal.com username + event type slug, e.g. \"adnan/book-a-call\" (from cal.com/adnan/book-a-call). Leave blank to keep \"Book a call\" buttons linking to the Contact page instead.",
        },
      ],
    }),
    defineField({
      name: "author", title: "Blog Author Profile", type: "object",
      description: "Shown on blog post detail pages — this is a single-author blog, so it's one shared profile rather than a per-post field.",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "role", type: "string", title: "Role / Tagline", description: "e.g. \"Video editor & retention nerd\"" },
        { name: "bio", type: "text", title: "Bio", rows: 3 },
        { name: "avatar", type: "image", title: "Avatar", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "quoteModal", title: "Quote Modal", type: "object",
      description: "The 'Get a Free Quote' popup triggered by quote-related buttons across the site.",
      fields: [
        { name: "badge", type: "string", title: "Badge Text" },
        { name: "heading", type: "string", title: "Heading" },
        {
          name: "highlightPhrase", type: "string", title: "Highlighted Phrase",
          description: "A word or phrase from the Heading above to color in accent red (must match exactly, e.g. \"your project.\").",
        },
        { name: "subtitle", type: "string", title: "Subtitle" },
        {
          name: "serviceOptions", title: "Service Options", type: "array",
          description: "Chips shown under \"What do you need?\" — visitors can pick one or more.",
          of: [{ type: "string" }],
        },
        {
          name: "budgetOptions", title: "Budget Options", type: "array",
          description: "Options shown in the Monthly Budget dropdown.",
          of: [{ type: "string" }],
        },
        { name: "disclaimer", type: "string", title: "Footer Disclaimer", description: "e.g. \"Replies within 24h, Mon-Sat. Your details stay private.\"" },
        { name: "ctaLabel", type: "string", title: "Submit Button Label" },
      ],
    }),
  ],
  preview: { select: { title: "siteName", subtitle: "email" } },
})
