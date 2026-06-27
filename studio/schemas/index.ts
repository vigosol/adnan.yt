import siteSettings from './siteSettings'
import service from './service'
import { blogSchema, tutorialSchema, featuredVideoSchema } from './content'

export const schemaTypes = [
  siteSettings,
  service,
  blogSchema,
  tutorialSchema,
  featuredVideoSchema,
]
