import { defineType, defineField } from "sanity"

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "reviewType", type: "string", title: "Review Type",
      description: "Text reviews appear in the quote slider; video reviews appear in the Video Reviews row. Each testimonial is one or the other.",
      options: {
        list: [
          { title: "Text Review", value: "text" },
          { title: "Video Review", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "text",
      validation: R => R.required(),
    }),
    defineField({ name: "name", type: "string", title: "Client Name", validation: R => R.required() }),
    defineField({ name: "company", type: "string", title: "Company / Channel" }),
    defineField({ name: "role", type: "string", title: "Role / Title" }),

    // ── Text review fields ──────────────────────────────────────
    defineField({
      name: "quote", type: "text", title: "Quote", rows: 3,
      hidden: ({ parent }) => parent?.reviewType !== "text",
      validation: R => R.custom((value, { parent }: any) => {
        if (parent?.reviewType === "text" && !value) return "Required for text reviews"
        return true
      }),
    }),
    defineField({
      name: "rating", type: "number", title: "Rating (1–5)", initialValue: 5,
      hidden: ({ parent }) => parent?.reviewType !== "text",
      validation: R => R.min(1).max(5),
    }),
    defineField({
      name: "avatar", type: "image", title: "Avatar", options: { hotspot: true },
      hidden: ({ parent }) => parent?.reviewType !== "text",
    }),

    // ── Video review fields ─────────────────────────────────────
    defineField({
      name: "videoUrl", type: "url", title: "Video Review URL",
      hidden: ({ parent }) => parent?.reviewType !== "video",
      validation: R => R.custom((value, { parent }: any) => {
        if (parent?.reviewType === "video" && !value) return "Required for video reviews"
        return true
      }),
    }),
    defineField({
      name: "videoThumbnail", type: "image", title: "Video Thumbnail", options: { hotspot: true },
      hidden: ({ parent }) => parent?.reviewType !== "video",
    }),
    defineField({
      name: "duration", type: "string", title: "Video Duration", description: "e.g. 5:56 — shown as a badge on the video thumbnail.",
      hidden: ({ parent }) => parent?.reviewType !== "video",
    }),

    defineField({ name: "order", type: "number", title: "Display Order" }),
    defineField({ name: "isActive", type: "boolean", title: "Show on website?", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "company", media: "avatar", reviewType: "reviewType" },
    prepare({ title, subtitle, media, reviewType }) {
      return {
        title,
        subtitle: `${reviewType === "video" ? "🎥 Video" : "💬 Text"}${subtitle ? ` — ${subtitle}` : ""}`,
        media,
      }
    },
  },
})
