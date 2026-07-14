import { defineType, defineField } from "sanity"

export default defineType({
  name: "portfolio",
  title: "Portfolio",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Project Title", validation: R => R.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" }, validation: R => R.required() }),
    defineField({ name: "client", type: "string", title: "Client Name" }),
    defineField({ name: "industry", type: "string", title: "Industry", description: "e.g. SaaS, Real Estate, Coaching" }),
    defineField({
      name: "platform", type: "string", title: "Platform",
      options: { list: ["YouTube", "Instagram", "TikTok", "LinkedIn", "Podcast", "Website"] },
    }),
    defineField({
      name: "service", type: "reference", title: "Service",
      to: [{ type: "service" }],
      description: "Which service this project showcases — shown as the badge on the portfolio card.",
    }),
    defineField({ name: "shortResult", type: "string", title: "Short Result", description: "e.g. \"+47% watch time\" — shown on the listing card" }),
    defineField({ name: "problem", type: "text", title: "Problem", rows: 3 }),
    defineField({ name: "solution", type: "text", title: "Solution", rows: 3 }),
    defineField({ name: "toolsUsed", type: "array", title: "Tools Used", of: [{ type: "string" }] }),
    defineField({ name: "results", type: "text", title: "Results", rows: 3 }),
    defineField({
      name: "testimonial", type: "object", title: "Client Testimonial",
      fields: [
        { name: "quote", type: "text", title: "Quote", rows: 3 },
        { name: "name", type: "string", title: "Name" },
        { name: "role", type: "string", title: "Role / Company" },
      ],
    }),
    defineField({ name: "videoUrl", type: "url", title: "Video URL", description: "YouTube/Vimeo link or embed URL" }),
    defineField({ name: "thumbnail", type: "image", title: "Card Thumbnail", options: { hotspot: true }, description: "Shown on the portfolio grid/listing cards." }),
    defineField({ name: "detailImage", type: "image", title: "Detail Page Image", options: { hotspot: true }, description: "Shown on the project's own detail page (used when there's no video)." }),
    defineField({ name: "isActive", type: "boolean", title: "Show on website?", initialValue: true }),
    defineField({ name: "seoTitle", type: "string", title: "SEO Title" }),
    defineField({ name: "seoDescription", type: "text", title: "SEO Description", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "client", media: "thumbnail" } },
})
