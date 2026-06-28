import { defineType, defineField } from "sanity"

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Headline — line 1" }),
    defineField({ name: "highlight", type: "string", title: "Headline — gradient word" }),
    defineField({ name: "subtitle", type: "text", title: "Subheadline", rows: 2 }),
    defineField({ name: "responseTime", type: "string", title: "Response Time Note" }),
    defineField({
      name: "faqs", title: "FAQs", type: "array",
      of: [{
        type: "object", name: "contactFaq",
        fields: [
          { name: "question", type: "string", title: "Question" },
          { name: "answer", type: "text", title: "Answer", rows: 3 },
        ],
        preview: { select: { title: "question" } },
      }],
    }),
  ],
  preview: { select: { title: "title" } },
})
