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
      name: "servicesSection", title: "Services Section", type: "object",
      description: "The red services showcase block — badge, heading, and the scrolling tag rows beneath the service grid. The service cards themselves come from the Services list (toggle 'Show on homepage' on each service).",
      fields: [
        { name: "badge", type: "string", title: "Badge Text" },
        { name: "heading", type: "text", title: "Heading", rows: 2 },
        { name: "viewAllLabel", type: "string", title: "\"View All\" Link Label" },
        {
          name: "tags", title: "Scrolling Tags", type: "array",
          description: "Auto-splits evenly into 3 horizontally auto-scrolling rows (alternating direction).",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "pricingSection", title: "Pricing Section", type: "object",
      description: "The homepage pricing showcase — badge, heading, subtitle, the two pricing packages, and the 'still deciding?' help panel.",
      fields: [
        { name: "badge", type: "string", title: "Badge Text" },
        { name: "heading", type: "string", title: "Heading" },
        { name: "subtitle", type: "string", title: "Subtitle" },
        {
          name: "packages", title: "Pricing Packages (2 shown side by side)", type: "array",
          of: [{
            type: "object", name: "homePricingPackage",
            fields: [
              { name: "title", type: "string", title: "Package Name" },
              { name: "description", type: "text", title: "Short Description", rows: 2 },
              { name: "price", type: "string", title: "Price", description: "Number only, e.g. 199" },
              { name: "period", type: "string", title: "Period", description: "Just the word, e.g. \"video\" or \"month\" — the slash is added automatically." },
              { name: "ctaLabel", type: "string", title: "Button Label", description: "e.g. Book a Call" },
              { name: "featured", type: "boolean", title: "Highlight as Most Popular?", initialValue: false },
              { name: "features", type: "array", title: "Features", of: [{ type: "string" }] },
            ],
            preview: { select: { title: "title", subtitle: "price" } },
          }],
        },
        {
          name: "helpPanel", title: "Help Panel (3rd column)", type: "object",
          fields: [
            { name: "block1Heading", type: "string", title: "Block 1 — Heading" },
            { name: "block1Subtext", type: "string", title: "Block 1 — Subtext" },
            { name: "block1CtaLabel", type: "string", title: "Block 1 — Button Label" },
            { name: "block2Heading", type: "string", title: "Block 2 — Heading" },
            { name: "block2Subtext", type: "string", title: "Block 2 — Subtext" },
            { name: "block2CtaLabel", type: "string", title: "Block 2 — Button Label" },
          ],
        },
      ],
    }),
    defineField({
      name: "trustStats", title: "Trust Stats", type: "array",
      description: "Shown in the Metrics section below the About teaser.",
      of: [{
        type: "object", name: "stat",
        fields: [
          { name: "val", type: "string", title: "Value", description: "e.g. 400+" },
          { name: "label", type: "string", title: "Label", description: "e.g. Projects delivered" },
          { name: "description", type: "text", title: "Description", rows: 2, description: "Short supporting line shown below the label." },
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
