import { defineType, defineField } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Client Name", validation: R => R.required() }),
    defineField({ name: "company", type: "string", title: "Company / Channel" }),
    defineField({ name: "role", type: "string", title: "Role / Title" }),
    defineField({ name: "quote", type: "text", title: "Quote", rows: 3, validation: R => R.required() }),
    defineField({ name: "rating", type: "number", title: "Rating (1–5)", initialValue: 5, validation: R => R.min(1).max(5) }),
    defineField({ name: "avatar", type: "image", title: "Avatar", options: { hotspot: true } }),
    defineField({ name: "order", type: "number", title: "Display Order" }),
    defineField({ name: "isActive", type: "boolean", title: "Show on website?", initialValue: true }),
  ],
  preview: { select: { title: "name", subtitle: "company", media: "avatar" } },
})
