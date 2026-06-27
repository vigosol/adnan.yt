import siteSettings from './siteSettings'
import service from './service'
import { blogSchema, tutorialSchema, featuredVideoSchema } from './content'

// ── Schemas to be wired on Day 3+ ─────────────────────────────
// import portfolio from './portfolio'
// import testimonial from './testimonial'
// import person from './person'
// import product from './product'
// import pageSeo from './pageSeo'

export const schemaTypes = [
  // Core
  siteSettings,
  service,

  // Content
  blogSchema,
  tutorialSchema,
  featuredVideoSchema,

  // Uncomment as you build each phase:
  // portfolio,
  // testimonial,
  // person,
  // product,
  // pageSeo,
]
