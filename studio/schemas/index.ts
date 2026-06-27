import siteSettings from './siteSettings'
import pageSeo from './pageSeo'
import service from './service'
import { blogSchema, tutorialSchema, featuredVideoSchema } from './content'

export const schemaTypes = [
  siteSettings,
  pageSeo,
  service,
  blogSchema,
  tutorialSchema,
  featuredVideoSchema,
]
