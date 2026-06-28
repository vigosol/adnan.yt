import { defineType, defineField } from "sanity"

export default defineType({
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  fields: [
    defineField({
      name: "packages", title: "Packages", type: "array",
      of: [{
        type: "object", name: "package",
        fields: [
          { name: "title", type: "string", title: "Package Name" },
          { name: "price", type: "string", title: "Price", description: "e.g. $149" },
          { name: "period", type: "string", title: "Period", description: "e.g. /video" },
          { name: "description", type: "text", title: "Short Description", rows: 2 },
          { name: "features", type: "array", title: "Features", of: [{ type: "string" }] },
          { name: "featured", type: "boolean", title: "Highlight as Most Popular?", initialValue: false },
        ],
        preview: { select: { title: "title", subtitle: "price" } },
      }],
    }),
    defineField({
      name: "addOns", title: "Add-ons", type: "array",
      of: [{
        type: "object", name: "addOn",
        fields: [
          { name: "name", type: "string", title: "Add-on Name" },
          { name: "price", type: "string", title: "Price", description: "e.g. +$25" },
          { name: "description", type: "text", title: "Description", rows: 2 },
        ],
        preview: { select: { title: "name", subtitle: "price" } },
      }],
    }),
    defineField({
      name: "faqs", title: "FAQs", type: "array",
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
  preview: { select: {} },
})
