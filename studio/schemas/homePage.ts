import { defineType, defineField } from "sanity"

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "hero", title: "Hero", type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge Text" },
        { name: "title", type: "string", title: "Headline — line 1" },
        { name: "highlight", type: "string", title: "Headline — gradient line 2" },
        { name: "subtitle", type: "text", title: "Subheadline", rows: 2 },
        { name: "primaryCtaLabel", type: "string", title: "Primary Button Label" },
        { name: "secondaryCtaLabel", type: "string", title: "Secondary Button Label" },
        { name: "reelThumbnail", type: "image", title: "Reel Thumbnail", options: { hotspot: true }, description: "Preview image shown in the video showcase below the hero text." },
        { name: "reelVideoUrl", type: "url", title: "Reel Video URL", description: "YouTube/Vimeo link or direct video file opened when the play button is clicked." },
      ],
    }),
    defineField({
      name: "aboutTeaser", title: "About Teaser", type: "object",
      description: "Short bio excerpt shown between the trust stats and the rest of the homepage, linking to the full About page.",
      fields: [
        { name: "quote", type: "text", title: "Quote / Bio Excerpt", rows: 4 },
        { name: "ctaLabel", type: "string", title: "Button Label" },
      ],
    }),
    defineField({
      name: "trustStats", title: "Trust Stats", type: "array",
      description: "Shown beneath the hero CTA buttons.",
      of: [{
        type: "object", name: "stat",
        fields: [
          { name: "val", type: "string", title: "Value", description: "e.g. 100+" },
          { name: "label", type: "string", title: "Label", description: "e.g. Videos Edited" },
        ],
        preview: { select: { title: "val", subtitle: "label" } },
      }],
    }),
    defineField({
      name: "process", title: "How It Works — Steps", type: "array",
      of: [{
        type: "object", name: "step",
        fields: [
          { name: "icon", type: "string", title: "Emoji Icon" },
          { name: "title", type: "string", title: "Step Title" },
          { name: "description", type: "text", title: "Step Description", rows: 2 },
        ],
        preview: { select: { title: "title", subtitle: "description" } },
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
  preview: { select: { title: "hero.title" } },
})
