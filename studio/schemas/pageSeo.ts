import { defineType, defineField } from "sanity"

export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [
    defineField({
      name: "page",
      type: "string",
      title: "Page",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Services", value: "services" },
          { title: "Portfolio", value: "portfolio" },
          { title: "Blog", value: "blog" },
          { title: "Tutorials", value: "tutorials" },
          { title: "Shop", value: "shop" },
          { title: "Contact", value: "contact" },
          { title: "Pricing", value: "pricing" },
        ],
      },
      validation: R => R.required(),
    }),
    defineField({ name: "title", type: "string", title: "SEO Title", validation: R => R.required() }),
    defineField({ name: "description", type: "text", title: "SEO Description", rows: 2, validation: R => R.required() }),
    defineField({ name: "ogImage", type: "image", title: "OG Image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "page", subtitle: "title" } },
})
