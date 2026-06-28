import siteSettings from './siteSettings'
import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import pricingPage from './pricingPage'
import pageSeo from './pageSeo'
import service from './service'
import testimonial from './testimonial'
import { blogSchema, tutorialSchema, featuredVideoSchema } from './content'

export const schemaTypes = [
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  pricingPage,
  pageSeo,
  service,
  testimonial,
  blogSchema,
  tutorialSchema,
  featuredVideoSchema,
]
