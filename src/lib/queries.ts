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
    enableWhatsapp, enableLiveChat, tawktoId
  }
`

// ── Home Page ────────────────────────────────────────────────────
export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    hero { badge, title, highlight, subtitle },
    trustStats[] { val, label },
    process[] { icon, title, description },
    faqs[] { question, answer }
  }
`

// ── About Page ───────────────────────────────────────────────────
export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0] {
    story,
    tools[] { icon, name },
    workflow[] { title, description },
    trustStats[] { val, label }
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
    packages[] { title, price, period, description, features, featured },
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
    "thumbnail": thumbnail.asset->url
  }
`

// Homepage shows only services explicitly toggled on via showOnHomepage,
// capped at 6 max — could be 3, 4, 5, or 6 depending on what's toggled on.
export const SERVICES_HOMEPAGE_QUERY = `
  *[_type == "service" && isActive == true && showOnHomepage == true] | order(order asc) [0...6] {
    _id, title, slug, shortDescription, icon, price,
    "thumbnail": thumbnail.asset->url
  }
`

export const SERVICE_BY_SLUG_QUERY = `
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, icon, shortDescription, fullDescription, price,
    deliverables, faqs[] { question, answer },
    seoTitle, seoDescription,
    "thumbnail": thumbnail.asset->url
  }
`

// ── Portfolio ─────────────────────────────────────────────────
export const PORTFOLIO_LIST_QUERY = `
  *[_type == "portfolio" && isActive == true] | order(_createdAt desc) {
    _id, title, slug, industry, platform, service,
    "thumbnail": thumbnail.asset->url,
    shortResult
  }
`

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id, title, slug, client, industry, platform, service,
    problem, solution, toolsUsed[], results, testimonial,
    videoUrl, "thumbnail": thumbnail.asset->url,
    seoTitle, seoDescription, "ogImage": ogImage.asset->url
  }
`

// ── Blog ──────────────────────────────────────────────────────
export const BLOG_LIST_QUERY = `
  *[_type == "blog" && isPublished == true] | order(publishedAt desc) [$from..$to] {
    _id, title, slug, publishedAt, category,
    "excerpt": array::join(string::split((pt::text(body))[0..200], "")[0..200], ""),
    "thumbnail": thumbnail.asset->url,
    "author": author->{ name, "avatar": avatar.asset->url }
  }
`

export const BLOG_BY_SLUG_QUERY = `
  *[_type == "blog" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, updatedAt, category, tags,
    body, seoTitle, seoDescription,
    "ogImage": ogImage.asset->url,
    "author": author->{ name, bio, "avatar": avatar.asset->url },
    "relatedPosts": *[_type == "blog" && category == ^.category && slug.current != $slug][0..2] {
      _id, title, slug, "thumbnail": thumbnail.asset->url
    }
  }
`

// ── Tutorials ─────────────────────────────────────────────────
export const TUTORIAL_LIST_QUERY = `
  *[_type == "tutorial" && isPublished == true] | order(publishedAt desc) [$from..$to] {
    _id, title, slug, publishedAt, category, difficulty,
    "excerpt": array::join(string::split((pt::text(body))[0..200], "")[0..200], ""),
    "thumbnail": thumbnail.asset->url,
    youtubeVideoId
  }
`

export const TUTORIAL_BY_SLUG_QUERY = `
  *[_type == "tutorial" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, category, difficulty, tags,
    body, youtubeVideoId, seoTitle, seoDescription,
    "ogImage": ogImage.asset->url
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
    _id, name, company, role, quote, rating,
    "avatar": avatar.asset->url
  }
`
