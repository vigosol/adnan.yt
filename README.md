# adnan.yt — Starter Kit
## Day 1: Project Bootstrap + Domain

---

## 🖥️ Terminal Commands — Run in order

```bash
# 1. Create the Astro project in your desired folder
npm create astro@latest adnan-yt

# When prompted:
# ✅ How would you like to start your new project? → Empty
# ✅ Install dependencies? → Yes
# ✅ Do you plan to write TypeScript? → Yes (strict)
# ✅ Initialize a new git repository? → Yes

cd adnan-yt

# 2. Install integrations + Sanity client
# Note: Tailwind v4 uses @tailwindcss/vite — NO @astrojs/tailwind needed
npm install @tailwindcss/vite tailwindcss @astrojs/sitemap @astrojs/vercel
npm install @sanity/client @sanity/image-url

# 3. Copy the starter files from this kit into your project:
#    - astro.config.mjs    → replace the default one
#    - tailwind.config.mjs → new file
#    - tsconfig.json       → replace the default one
#    - vercel.json         → new file
#    - .gitignore          → replace
#    - .env.local.example  → new file (then copy to .env.local and fill in values)
#    - src/styles/global.css        → new folder + file
#    - src/lib/sanity.ts            → new file
#    - src/lib/queries.ts           → new file
#    - src/layouts/MainLayout.astro → new file
#    - src/pages/index.astro        → replace the default one

# 4. Create the Sanity Studio
mkdir studio
cd studio
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production --template clean

# (Create your project first at sanity.io/manage, note the project ID)

# Copy into studio/:
#   studio/sanity.config.ts
#   studio/schemas/index.ts
#   studio/schemas/siteSettings.ts
#   studio/schemas/service.ts
#   studio/schemas/content.ts

cd ..  # back to project root

# 5. Set up env vars
cp .env.local.example .env.local
# Open .env.local and fill in your Sanity project ID + other values

# 6. Start development
npm run dev        # Astro frontend at localhost:4321
npm run studio     # Sanity Studio at localhost:3333
```

---

## 📁 Final Folder Structure After Day 1

```
adnan-yt/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── vercel.json                    ← cron job config
├── .env.local                     ← your secrets (gitignored)
├── .env.local.example             ← template to share
├── package.json
├── src/
│   ├── styles/
│   │   └── global.css             ← full design token system
│   ├── lib/
│   │   ├── sanity.ts              ← Sanity client + urlFor
│   │   └── queries.ts             ← all GROQ queries
│   ├── layouts/
│   │   └── MainLayout.astro       ← master layout (SEO, nav, footer)
│   ├── components/                ← (empty, fill Day 3-4)
│   └── pages/
│       ├── index.astro            ← homepage (scaffold)
│       └── api/                   ← (add sync-views.ts Day 15)
└── studio/
    ├── sanity.config.ts
    └── schemas/
        ├── index.ts
        ├── siteSettings.ts
        ├── service.ts
        └── content.ts             ← blog + tutorial + featuredVideo
```

---

## 🌐 Day 1 — DNS Setup (adnan.yt → Vercel)

After running `git push` and connecting the repo to Vercel:

1. Go to Vercel → your project → Settings → Domains
2. Add `adnan.yt` and `www.adnan.yt`
3. Vercel will show you the DNS records to add:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 76.76.21.21            |
| CNAME | www  | cname.vercel-dns.com   |

4. Add these records in your domain registrar's DNS settings
5. SSL auto-provisions within ~5 minutes ✅

---

## ✅ Day 1 Checklist

- [ ] Astro project created with TypeScript
- [ ] Tailwind CSS installed and `global.css` copied
- [ ] Sanity client (`lib/sanity.ts`) and queries (`lib/queries.ts`) in place
- [ ] `MainLayout.astro` created (master layout)
- [ ] `index.astro` scaffold in place
- [ ] Sanity Studio initialized in `/studio`
- [ ] All 3 starter schemas working in Studio
- [ ] `.env.local` created with Sanity project ID
- [ ] Pushed to GitHub
- [ ] Connected to Vercel — first deploy live
- [ ] adnan.yt DNS pointed to Vercel
