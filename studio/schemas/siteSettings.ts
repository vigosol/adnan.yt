import { defineType, defineField } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  __experimental_actions: ["update", "publish"],
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
  ],
  preview: { select: { title: "siteName", subtitle: "email" } },
})
