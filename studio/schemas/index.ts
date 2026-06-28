import siteSettings from './siteSettings'
import pageSeo from './pageSeo'
import service from './service'
import testimonial from './testimonial'
import { blogSchema, tutorialSchema, featuredVideoSchema } from './content'

export const schemaTypes = [
  siteSettings,
  pageSeo,
  service,
  testimonial,
  blogSchema,
  tutorialSchema,
  featuredVideoSchema,
]
