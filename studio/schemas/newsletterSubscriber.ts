import { defineType, defineField } from "sanity"

export default defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string", title: "Email", validation: R => R.required() }),
    defineField({ name: "subscribedAt", type: "datetime", title: "Subscribed At" }),
  ],
  preview: { select: { title: "email", subtitle: "subscribedAt" } },
})
