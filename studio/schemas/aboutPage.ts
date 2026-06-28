import { defineType, defineField } from "sanity"

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "story", type: "array", title: "Story Paragraphs",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "tools", type: "array", title: "Tools I Use",
      of: [{
        type: "object", name: "tool",
        fields: [
          { name: "icon", type: "string", title: "Emoji Icon" },
          { name: "name", type: "string", title: "Tool Name" },
        ],
        preview: { select: { title: "name", subtitle: "icon" } },
      }],
    }),
    defineField({
      name: "workflow", title: "How I Work — Steps", type: "array",
      of: [{
        type: "object", name: "workflowStep",
        fields: [
          { name: "title", type: "string", title: "Step Title" },
          { name: "description", type: "text", title: "Step Description", rows: 2 },
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),
    defineField({
      name: "trustStats", title: "Trust Stats", type: "array",
      description: "Shown in the trust signals section near the bottom of the page.",
      of: [{
        type: "object", name: "stat",
        fields: [
          { name: "val", type: "string", title: "Value", description: "e.g. 100+" },
          { name: "label", type: "string", title: "Label", description: "e.g. Videos Edited" },
        ],
        preview: { select: { title: "val", subtitle: "label" } },
      }],
    }),
  ],
  preview: { select: {} },
})
