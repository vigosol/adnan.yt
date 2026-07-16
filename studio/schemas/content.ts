import { defineType, defineField } from "sanity"

export const blogSchema = defineType({
  name: "blog", title: "Blog Post", type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title", validation: R => R.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" }, validation: R => R.required() }),
    defineField({ name: "isPublished", type: "boolean", title: "Published?", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime", title: "Publish Date" }),
    defineField({ name: "category", type: "string", title: "Category", options: { list: ["Premiere Pro","After Effects","DaVinci Resolve","CapCut","YouTube","AI Video Editing","Tips & Tricks","Freelancing"] } }),
    defineField({
      name: "titleHighlight", type: "string", title: "Title — Highlighted Phrase",
      description: "A word or phrase from the Title above to color in accent red on the detail page (must match exactly). Leave blank for no highlight.",
    }),
    defineField({ name: "tags", type: "array", title: "Tags", description: "Topic pills shown at the end of the post.", of: [{ type: "string" }] }),
    defineField({ name: "thumbnail", type: "image", title: "Thumbnail", options: { hotspot: true } }),
    defineField({ name: "imageCaption", type: "string", title: "Featured Image Caption", description: "Small caption shown below the featured image on the detail page." }),
    defineField({ name: "body", type: "array", title: "Body", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "seoTitle", type: "string", title: "SEO Title" }),
    defineField({ name: "seoDescription", type: "text", title: "SEO Description", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "thumbnail" } },
})

export const tutorialSchema = defineType({
  name: "tutorial", title: "Tutorial", type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title", validation: R => R.required() }),
    defineField({ name: "slug", type: "slug", title: "Slug", options: { source: "title" }, validation: R => R.required() }),
    defineField({ name: "isPublished", type: "boolean", title: "Published?", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime", title: "Publish Date" }),
    defineField({ name: "category", type: "string", title: "Category", options: { list: ["Premiere Pro","After Effects","DaVinci Resolve","CapCut","YouTube","AI Video Editing","Tips & Tricks","Freelancing"] } }),
    defineField({ name: "difficulty", type: "string", title: "Difficulty", options: { list: ["Beginner","Intermediate","Advanced"] } }),
    defineField({
      name: "titleHighlight", type: "string", title: "Title — Highlighted Phrase",
      description: "A word or phrase from the Title above to color in accent red on the detail page (must match exactly). Leave blank for no highlight.",
    }),
    defineField({ name: "tags", type: "array", title: "Tags", description: "Topic pills shown at the end of the tutorial.", of: [{ type: "string" }] }),
    defineField({ name: "youtubeVideoId", type: "string", title: "YouTube Video ID" }),
    defineField({ name: "thumbnail", type: "image", title: "Thumbnail", options: { hotspot: true } }),
    defineField({ name: "imageCaption", type: "string", title: "Featured Image Caption", description: "Small caption shown below the video/thumbnail on the detail page." }),
    defineField({ name: "body", type: "array", title: "Content", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "seoTitle", type: "string", title: "SEO Title" }),
    defineField({ name: "seoDescription", type: "text", title: "SEO Description", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "difficulty", media: "thumbnail" } },
})

export const featuredVideoSchema = defineType({
  name: "featuredVideo", title: "Featured Video", type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Video Title", validation: R => R.required() }),
    defineField({ name: "isActive", type: "boolean", title: "Show on website?", initialValue: true }),
    defineField({ name: "displayOrder", type: "number", title: "Display Order" }),
    defineField({ name: "youtubeVideoId", type: "string", title: "YouTube Video ID", validation: R => R.required() }),
    defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
    defineField({ name: "category", type: "string", title: "Category", options: { list: ["Tutorial","Process / BTS","Review","Short","Case Study"] } }),
    defineField({ name: "cachedViewCount", type: "number", title: "Cached View Count", readOnly: true }),
    defineField({ name: "lastSynced", type: "datetime", title: "Last Synced", readOnly: true }),
  ],
  preview: { select: { title: "title", subtitle: "cachedViewCount" } },
})
