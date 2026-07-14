import { defineType, defineField } from "sanity"

export default defineType({
  name: "quoteRequest",
  title: "Quote Request",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", title: "Name", validation: R => R.required() }),
    defineField({ name: "email", type: "string", title: "Email", validation: R => R.required() }),
    defineField({ name: "services", title: "Services Needed", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "channel", type: "string", title: "Channel / Brand Link" }),
    defineField({ name: "budget", type: "string", title: "Monthly Budget" }),
    defineField({ name: "message", type: "text", title: "Project Details", rows: 4 }),
    defineField({ name: "submittedAt", type: "datetime", title: "Submitted At" }),
  ],
  preview: {
    select: { title: "name", subtitle: "budget" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `Budget: ${subtitle}` : undefined }
    },
  },
})
