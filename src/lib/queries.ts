// ─────────────────────────────────────────────────────────────────
// All GROQ queries in one place.
// Import the ones you need in each .astro page/component.
// ─────────────────────────────────────────────────────────────────

// ── Site Settings (global defaults only) ───────────────────────
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName, tagline, logoUrl, email, phone, whatsappNumber,
    address, ga4Id, gtmId, clarityId,
    defaultSeoTitle, defaultSeoDescription,
    defaultOgImage { asset->{ url } },
    socialLinks { youtube, instagram, tiktok, linkedin, twitter, pinterest },
    enableWhatsapp, enableLiveChat, tawktoId,
    calBooking { calLink },
    footerHours, footerAvailability,
    quoteModal { badge, heading, highlightPhrase, subtitle, serviceOptions, budgetOptions, disclaimer, ctaLabel },
    author { name, role, bio, "avatar": avatar.asset->url }
  }
`

// ── Home Page ────────────────────────────────────────────────────
export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    hero { badge, title, highlight, subtitle, primaryCtaLabel, secondaryCtaLabel, reelThumbnail, reelVideoUrl },
    aboutTeaser { quote, ctaLabel },
    servicesSection { badge, heading, highlightPhrase, subtitle, viewAllLabel, tags },
    pricingSection {
      badge, heading, highlightPhrase, subtitle,
      packages[] { title, description, price, period, customPriceLabel, ctaLabel, featured, features }
    },
    trustStats[] { val, label, description },
    processSection { badge, heading, highlightPhrase, subtitle },
    process[] { icon, "iconImageUrl": iconImage.asset->url, title, description },
    testimonialsSection { badge, heading, highlightPhrase, subtitle, viewAllLabel },
    blogSection { badge, heading, highlightPhrase, subtitle, viewAllLabel },
    newsletterSection { badge, heading, highlightPhrase, subtitle, placeholder, buttonLabel, disclaimer },
    ctaSection { badge, heading, highlightPhrase, subtext, primaryCtaLabel, secondaryCtaLabel },
    faqs[] { question, answer }
  }
`

// ── About Page ───────────────────────────────────────────────────
export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0] {
    hero {
      badge, title, highlightPhrase,
      "imageUrl": image.asset->url,
      imageCaptionName, imageCaptionRole,
      primaryCtaLabel, secondaryCtaLabel
    },
    story,
    trustStats[] { val, label },
    toolsSection { badge, heading, highlightPhrase, subtitle },
    tools[] { icon, name },
    processSection { badge, heading, highlightPhrase, subtitle },
    workflow[] { title, description },
    principlesSection { badge, heading, highlightPhrase, subtitle },
    principles[] { title, description },
    beyondTheTimeline {
      "image1Url": image1.asset->url,
      "image2Url": image2.asset->url,
      title, description
    }
  }
`

// ── Contact Page ─────────────────────────────────────────────────
export const CONTACT_PAGE_QUERY = `
  *[_type == "contactPage"][0] {
    title, highlight, subtitle, responseTime,
    faqs[] { question, answer }
  }
`

// ── Pricing Page ─────────────────────────────────────────────────
export const PRICING_PAGE_QUERY = `
  *[_type == "pricingPage"][0] {
    packages[] { title, price, period, customPriceLabel, description, features, featured },
    addOns[] { name, price, description },
    faqs[] { question, answer }
  }
`

// ── Page SEO ──────────────────────────────────────────────────
export const PAGE_SEO_QUERY = `
  *[_type == "pageSeo" && page == $page][0] {
    title, description,
    ogImage { asset->{ url } }
  }
`

// ── Services ──────────────────────────────────────────────────
export const SERVICES_LIST_QUERY = `
  *[_type == "service" && isActive == true] | order(order asc) {
    _id, title, slug, shortDescription, icon, price,
    "iconImageUrl": iconImage.asset->url,
    "thumbnail": thumbnail.asset->url
  }
`

// Homepage shows only services explicitly toggled on via showOnHomepage,
// capped at 6 max — could be 3, 4, 5, or 6 depending on what's toggled on.
export const SERVICES_HOMEPAGE_QUERY = `
  *[_type == "service" && isActive == true && showOnHomepage == true] | order(order asc) [0...6] {
    _id, title, slug, shortDescription, icon, price,
    "iconImageUrl": iconImage.asset->url,
    "thumbnail": thumbnail.asset->url
  }
`

export const SERVICE_BY_SLUG_QUERY = `
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, icon, shortDescription, fullDescription, price, priceUnit,
    deliverables, process[] { title, description }, stats[] { val, label },
    faqs[] { question, answer },
    seoTitle, seoDescription, videoUrl,
    "thumbnail": thumbnail.asset->url
  }
`

// ── Portfolio ─────────────────────────────────────────────────
export const PORTFOLIO_LIST_QUERY = `
  *[_type == "portfolio" && isActive == true] | order(_createdAt desc) {
    _id, title, slug, industry, platform, "service": service->title,
    "thumbnail": thumbnail.asset->url,
    shortResult
  }
`

// Lightweight ordered list (just title/slug) used to compute prev/next nav
export const PORTFOLIO_SLUGS_QUERY = `
  *[_type == "portfolio" && isActive == true] | order(_createdAt desc) { title, slug }
`

export const PORTFOLIO_BY_SLUG_QUERY = `
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id, title, slug, client, industry, platform, "service": service->title,
    problem, solution, toolsUsed, results, testimonial,
    videoUrl, "detailImage": detailImage.asset->url,
    seoTitle, seoDescription
  }
`

// ── Case Studies ──────────────────────────────────────────────
export const CASE_STUDY_LIST_QUERY = `
  *[_type == "caseStudy" && isActive == true] | order(_createdAt desc) {
    _id, title, slug, industry, platform, service,
    "thumbnail": thumbnail.asset->url,
    shortResult
  }
`

export const CASE_STUDY_SLUGS_QUERY = `
  *[_type == "caseStudy" && isActive == true] | order(_createdAt desc) { title, slug }
`

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title, slug, client, industry, platform, service,
    problem, solution, toolsUsed, results, testimonial,
    videoUrl, "detailImage": detailImage.asset->url,
    seoTitle, seoDescription
  }
`

// ── Blog ──────────────────────────────────────────────────────
// bodyText is the full plain-text body — sliced into an excerpt in JS at the
// call site, since GROQ string-slicing a pt::text() function result (e.g.
// pt::text(body)[0..200]) silently returns null on this API version.
export const BLOG_HOMEPAGE_QUERY = `
  *[_type == "blog" && isPublished == true] | order(publishedAt desc) [0...4] {
    _id, title, slug, publishedAt, category,
    "bodyText": pt::text(body),
    "thumbnail": thumbnail.asset->url
  }
`

export const BLOG_LIST_QUERY = `
  *[_type == "blog" && isPublished == true] | order(publishedAt desc) [$from..$to] {
    _id, title, slug, publishedAt, category,
    "bodyText": pt::text(body),
    "thumbnail": thumbnail.asset->url
  }
`

export const BLOG_SLUGS_QUERY = `
  *[_type == "blog" && isPublished == true] | order(publishedAt desc) { title, slug }
`

export const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, category, titleHighlight, tags, imageCaption,
    body, "bodyText": pt::text(body), seoTitle, seoDescription,
    "thumbnail": thumbnail.asset->url,
    "relatedPosts": *[_type == "blog" && isPublished == true && category == ^.category && slug.current != $slug] | order(publishedAt desc) [0...4] {
      _id, title, slug, publishedAt, category,
      "bodyText": pt::text(body),
      "thumbnail": thumbnail.asset->url
    }
  }
`

// ── Tutorials ─────────────────────────────────────────────────
export const TUTORIAL_LIST_QUERY = `
  *[_type == "tutorial" && isPublished == true] | order(publishedAt desc) [$from..$to] {
    _id, title, slug, publishedAt, category, difficulty,
    "bodyText": pt::text(body),
    "thumbnail": thumbnail.asset->url,
    youtubeVideoId
  }
`

export const TUTORIAL_SLUGS_QUERY = `
  *[_type == "tutorial" && isPublished == true] | order(publishedAt desc) { title, slug }
`

export const TUTORIAL_BY_SLUG_QUERY = `
  *[_type == "tutorial" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, category, difficulty, titleHighlight, tags, imageCaption,
    body, "bodyText": pt::text(body), youtubeVideoId, seoTitle, seoDescription,
    "thumbnail": thumbnail.asset->url,
    "relatedTutorials": *[_type == "tutorial" && isPublished == true && category == ^.category && slug.current != $slug] | order(publishedAt desc) [0...4] {
      _id, title, slug, publishedAt, category, difficulty,
      "bodyText": pt::text(body),
      "thumbnail": thumbnail.asset->url,
      youtubeVideoId
    }
  }
`

// ── Featured Videos ───────────────────────────────────────────
export const FEATURED_VIDEOS_QUERY = `
  *[_type == "featuredVideo" && isActive == true] | order(displayOrder asc) {
    _id, title, youtubeVideoId, description, category, cachedViewCount, lastSynced
  }
`

// ── Shop / Affiliates ─────────────────────────────────────────
export const SHOP_LIST_QUERY = `
  *[_type == "product" && isActive == true] | order(_createdAt desc) [$from..$to] {
    _id, title, slug, category, affiliateUrl, price,
    "thumbnail": images[0].asset->url,
    shortDescription, rating
  }
`

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id, title, slug, fullDescription, category, affiliateUrl, price,
    pros[], cons[], bestFor, alternatives[], faqs[],
    "images": images[].asset->url,
    seoTitle, seoDescription, "ogImage": ogImage.asset->url
  }
`

// ── Testimonials ──────────────────────────────────────────────
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && isActive == true] | order(order asc) {
    _id, reviewType, name, company, role, quote, rating,
    "avatar": avatar.asset->url,
    videoUrl, duration,
    "videoThumbnail": videoThumbnail.asset->url
  }
`
