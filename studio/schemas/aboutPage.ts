import { defineType, defineField } from "sanity"

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "hero", title: "Hero", type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge", initialValue: "About" },
        { name: "title", type: "string", title: "Title", description: "e.g. Hi, I'm Muhammad Adnan." },
        { name: "highlightPhrase", type: "string", title: "Title — Highlighted Phrase", description: "A word or phrase from the Title above to color in accent red (must match exactly)." },
        { name: "image", type: "image", title: "Photo", options: { hotspot: true } },
        { name: "imageCaptionName", type: "string", title: "Photo Caption — Name" },
        { name: "imageCaptionRole", type: "string", title: "Photo Caption — Role" },
        { name: "primaryCtaLabel", type: "string", title: "Primary Button Label" },
        { name: "secondaryCtaLabel", type: "string", title: "Secondary Button Label" },
      ],
    }),
    defineField({
      name: "story", type: "array", title: "Story Paragraphs",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({
      name: "trustStats", title: "Trust Stats", type: "array",
      description: "Shown in the stats bar under the hero.",
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
      name: "toolsSection", title: "Tools Section — Header", type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge", initialValue: "Toolbox" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "highlightPhrase", type: "string", title: "Heading — Highlighted Phrase" },
        { name: "subtitle", type: "text", title: "Subtitle", rows: 2 },
      ],
    }),
    defineField({
      name: "tools", type: "array", title: "Tools I Use",
      of: [{
        type: "object", name: "tool",
        fields: [
          { name: "icon", type: "string", title: "Icon", description: "An emoji or short abbreviation, e.g. Pr, Ae, DR." },
          { name: "name", type: "string", title: "Tool Name" },
        ],
        preview: { select: { title: "name", subtitle: "icon" } },
      }],
    }),
    defineField({
      name: "processSection", title: "Process Section — Header", type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge", initialValue: "Process" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "highlightPhrase", type: "string", title: "Heading — Highlighted Phrase" },
        { name: "subtitle", type: "text", title: "Subtitle", rows: 2 },
      ],
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
      name: "principlesSection", title: "Principles Section — Header", type: "object",
      fields: [
        { name: "badge", type: "string", title: "Badge", initialValue: "Principles" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "highlightPhrase", type: "string", title: "Heading — Highlighted Phrase" },
        { name: "subtitle", type: "text", title: "Subtitle", rows: 2 },
      ],
    }),
    defineField({
      name: "principles", title: "Principles List", type: "array",
      of: [{
        type: "object", name: "principle",
        fields: [
          { name: "title", type: "string", title: "Title" },
          { name: "description", type: "text", title: "Description", rows: 2 },
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }],
    }),
    defineField({
      name: "beyondTheTimeline", title: "Beyond The Timeline — Callout", type: "object",
      fields: [
        { name: "image1", type: "image", title: "Photo 1", options: { hotspot: true } },
        { name: "image2", type: "image", title: "Photo 2", options: { hotspot: true } },
        { name: "title", type: "string", title: "Title", initialValue: "Beyond the timeline" },
        {
          name: "description", type: "text", title: "Description", rows: 3,
          description: "The word \"blog\" (if present) is automatically linked to /blog.",
        },
      ],
    }),
  ],
  preview: { select: {} },
})
