import { defineType, defineField } from "sanity"

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Service Name", validation: R => R.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" }, validation: R => R.required() }),
    defineField({ name: "icon", type: "string", title: "Emoji Icon", description: "Used in the Services nav dropdown." }),
    defineField({
      name: "iconImage", type: "image", title: "Icon Image",
      description: "SVG/PNG icon shown on the homepage Services showcase. Falls back to a generic icon if not set.",
    }),
    defineField({ name: "order", type: "number", title: "Display Order" }),
    defineField({ name: "isActive", type: "boolean", title: "Active?", initialValue: true }),
    defineField({
      name: "showOnHomepage", type: "boolean", title: "Show on Homepage?",
      description: "Only services with this toggled on appear on the homepage, up to a maximum of 6.",
      initialValue: true,
    }),
    defineField({ name: "shortDescription", type: "text", title: "Short Description", rows: 2 }),
    defineField({ name: "fullDescription", type: "text", title: "Full Description", rows: 4 }),
    defineField({ name: "price", type: "string", title: "Starting Price", description: "e.g. $49" }),
    defineField({ name: "priceUnit", type: "string", title: "Price Unit", description: "e.g. \"video\" or \"month\" — shown as /unit next to the price." }),
    defineField({ name: "deliverables", type: "array", title: "Deliverables (What's Included)", of: [{ type: "string" }] }),
    defineField({
      name: "process", title: "How We'll Work — Steps", type: "array",
      of: [{
        type: "object", name: "step",
        fields: [
          { name: "title", type: "string", title: "Step Title" },
          { name: "description", type: "text", title: "Step Description", rows: 2 },
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),
    defineField({
      name: "stats", title: "Stats Row", type: "array",
      description: "Shown below the page title, e.g. \"120+ Shorts delivered\".",
      of: [{
        type: "object", name: "serviceStat",
        fields: [
          { name: "val", type: "string", title: "Value", description: "e.g. 120+" },
          { name: "label", type: "string", title: "Label", description: "e.g. Shorts delivered" },
        ],
        preview: { select: { title: "val", subtitle: "label" } },
      }],
    }),
    defineField({
      name: "faqs", type: "array", title: "FAQs",
      of: [{ type: "object", fields: [
        { name: "question", type: "string", title: "Question" },
        { name: "answer", type: "text", title: "Answer", rows: 3 },
      ]}],
    }),
    defineField({ name: "videoUrl", type: "url", title: "Showreel Video URL", description: "YouTube/Vimeo link — shown embedded at the top of the detail page. Falls back to the Thumbnail image if not set." }),
    defineField({ name: "thumbnail", type: "image", title: "Thumbnail", options: { hotspot: true } }),
    defineField({ name: "seoTitle", type: "string", title: "SEO Title" }),
    defineField({ name: "seoDescription", type: "text", title: "SEO Description", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "shortDescription", media: "thumbnail" } },
})
