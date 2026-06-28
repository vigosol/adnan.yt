import siteSettings from './siteSettings'
import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import pageSeo from './pageSeo'
import service from './service'
import testimonial from './testimonial'
import { blogSchema, tutorialSchema, featuredVideoSchema } from './content'

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  pageSeo,
  service,
  testimonial,
  blogSchema,
  tutorialSchema,
  featuredVideoSchema,
]
