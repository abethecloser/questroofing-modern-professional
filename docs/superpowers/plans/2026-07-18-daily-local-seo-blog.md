# Daily Local SEO Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a reusable Astro blog publishing system, publish the first Queen Creek monsoon article, push it to GitHub, and deploy it to Vercel production.

**Architecture:** Astro's build-time content collection loads one Markdown file per article and validates its SEO fields. A root dynamic route prerenders the flat article URLs already used by Quest Roofing, while a dedicated Quest article layout owns metadata, JSON-LD, navigation, and calls to action. The homepage reads the same collection so each post has one source of truth.

**Tech Stack:** Astro 7, TypeScript, Markdown content collections, Tailwind CSS, Node's built-in test runner, `@astrojs/sitemap`, GitHub, Vercel

## Global Constraints

- Do not start a local development or preview server.
- Preserve flat article URLs in the form `https://questroofing.com/<slug>/`.
- Use real Quest Roofing branding, phone `602-399-6455`, email `info@questroofing.com`, license `AZ ROC #355136`, and Queen Creek location.
- Do not make promises about insurance coverage, response time, exact diagnosis, or search ranking.
- Every post must have a unique title, description, date, local purpose, internal links, canonical URL, and `BlogPosting` structured data.
- Production deployment is the review surface; the prior Vercel deployment is the rollback point.

---

### Task 1: Add a failing production-artifact test

**Files:**
- Create: `tests/blog-production.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: the `npm run build` output directory at `dist/`
- Produces: `npm run test:blog`, which proves the article, sitemap, canonical URL, JSON-LD, heading, CTA, and homepage link exist in the static build

- [ ] **Step 1: Add the test script**

Add `"test:blog": "npm run build && node --test tests/blog-production.test.mjs"` to `scripts` in `package.json`.

- [ ] **Step 2: Write the failing test**

Create a Node test that reads:

```js
const root = new URL('../', import.meta.url);
const articlePath = new URL('dist/queen-creek-monsoon-roof-damage-checklist/index.html', root);
const homePath = new URL('dist/index.html', root);
const sitemapPath = new URL('dist/sitemap-0.xml', root);

assert.match(article, /<link rel="canonical" href="https:\/\/questroofing\.com\/queen-creek-monsoon-roof-damage-checklist\/"/);
assert.match(article, /"@type":"BlogPosting"/);
assert.match(article, /Queen Creek Monsoon Roof Damage: 9 Signs to Check After a Storm/);
assert.match(article, /Request a free roof inspection/);
assert.match(home, /href="\/queen-creek-monsoon-roof-damage-checklist\/"/);
assert.match(sitemap, /https:\/\/questroofing\.com\/queen-creek-monsoon-roof-damage-checklist\//);
```

- [ ] **Step 3: Install the locked dependencies and run the test to verify failure**

Run: `npm ci && npm run test:blog`

Expected: FAIL because the article route, sitemap, and content entry do not exist yet.

---

### Task 2: Create the validated content collection and first post

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/blog/queen-creek-monsoon-roof-damage-checklist.md`
- Create: `public/images/blog/queen-creek-monsoon-roof-damage.webp` from `src/images/inspection-on-tile-roof.webp`

**Interfaces:**
- Produces: collection `blog` with `title`, `description`, `publishedAt`, `category`, `city`, `image`, `imageAlt`, `keywords`, and `featured`
- Produces: entry ID `queen-creek-monsoon-roof-damage-checklist`

- [ ] **Step 1: Define the content collection**

Use Astro's `glob()` loader against `./src/content/blog` and a Zod schema requiring all fields from the design spec.

- [ ] **Step 2: Add the post image**

Copy the existing real Quest inspection image to the stable public path used by the post and social metadata.

- [ ] **Step 3: Write the article**

The Markdown body must include:

- A direct opening answer for Queen Creek homeowners
- Nine numbered warning-sign sections
- Safe ground-level observation guidance
- A mid-article inspection CTA
- Links to `/services/storm-damage-roof-repair/`, `/services/tile-roofing/`, `/services/roof-inspection/`, and `/#contact`
- A closing explanation of Quest's photo-backed inspection and written-scope process

- [ ] **Step 4: Run the production-artifact test**

Run: `npm run test:blog`

Expected: still FAIL because no article route or sitemap renders the collection yet.

---

### Task 3: Build the Quest article layout and route

**Files:**
- Create: `src/layouts/BlogPostLayout.astro`
- Create: `src/pages/[slug].astro`

**Interfaces:**
- `BlogPostLayout.astro` consumes all collection metadata plus `slug: string` and renders a `<slot />`
- `[slug].astro` loads `getCollection('blog')`, returns every entry from `getStaticPaths()`, calls `render(post)`, and passes metadata to the layout

- [ ] **Step 1: Implement the static dynamic route**

Return `{ params: { slug: post.id }, props: { post } }` for each blog entry, render the entry body, and pass it into the layout.

- [ ] **Step 2: Implement SEO metadata and structured data**

The layout must render:

```astro
<link rel="canonical" href={canonicalUrl} />
<meta property="og:type" content="article" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl} />
<meta property="og:image" content={imageUrl} />
<script type="application/ld+json" set:html={JSON.stringify(blogSchema)} />
```

The `BlogPosting` object must include headline, description, datePublished, image, author, publisher, mainEntityOfPage, keywords, and content location.

- [ ] **Step 3: Implement the article shell**

Use the current Quest logo and charcoal/amber visual language. Include the business identity, top and bottom inspection CTAs, service links, phone link, breadcrumb, publication date, category, city, hero image, readable article typography, and footer.

- [ ] **Step 4: Run the production-artifact test**

Run: `npm run test:blog`

Expected: article assertions PASS; homepage and sitemap assertions still FAIL.

---

### Task 4: Connect the homepage and sitemap

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `astro.config.mjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `public/robots.txt`

**Interfaces:**
- Homepage consumes `getCollection('blog')`, maps entries to card data, sorts newest first, and renders a real article anchor
- Astro config uses `site: 'https://questroofing.com'` and `sitemap()`

- [ ] **Step 1: Add the sitemap integration**

Run: `npm install @astrojs/sitemap`

Configure:

```js
export default defineConfig({
  site: 'https://questroofing.com',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 2: Add sitemap discovery**

Create `public/robots.txt` with an allow rule and `Sitemap: https://questroofing.com/sitemap-index.xml`. Add `<link rel="sitemap" href="/sitemap-index.xml" />` to relevant page heads.

- [ ] **Step 3: Feed collection entries into the Blog cards**

Import `getCollection`, map each entry to its image, category, title, description, and `/${post.id}/` href, then place collection posts before existing teaser cards. Render the new entry's CTA as a real anchor labeled `Read article`.

- [ ] **Step 4: Run the complete production-artifact test**

Run: `npm run test:blog`

Expected: PASS with all assertions successful and Astro build exit code 0.

---

### Task 5: Verify, commit, and publish to GitHub

**Files:**
- Modify: `docs/superpowers/plans/2026-07-18-daily-local-seo-blog.md` only to mark completed checkboxes if useful

**Interfaces:**
- Produces: one verified Git commit on `main` containing only the blog system, first post, tests, sitemap configuration, and planning documents

- [ ] **Step 1: Inspect generated artifacts and source diff**

Run:

```powershell
npm run test:blog
git diff --check
git status --short
git diff --stat
```

Expected: tests pass, no whitespace errors, and only scoped files are modified.

- [ ] **Step 2: Commit**

Run:

```powershell
git add astro.config.mjs package.json package-lock.json public/robots.txt public/images/blog/queen-creek-monsoon-roof-damage.webp src/content.config.ts src/content/blog/queen-creek-monsoon-roof-damage-checklist.md src/layouts/BlogPostLayout.astro src/pages/[slug].astro src/pages/index.astro tests/blog-production.test.mjs docs/superpowers
git commit -m "feat: publish Queen Creek monsoon roof guide"
```

- [ ] **Step 3: Push to GitHub**

Run: `git push origin main`

Expected: GitHub accepts the commit and `origin/main` matches local `HEAD`.

---

### Task 6: Deploy and verify Vercel production

**Files:** None

**Interfaces:**
- Consumes: the GitHub commit pushed to `main`
- Produces: Vercel production deployment and live canonical article URL

- [ ] **Step 1: Capture the current production deployment**

Record the current deployment ID or URL before publishing so it remains the explicit rollback target.

- [ ] **Step 2: Wait for or trigger the production deployment**

Use the Git-linked Vercel deployment for the pushed `main` commit. If Git integration does not trigger, deploy the same source commit directly to production without starting a local server.

- [ ] **Step 3: Confirm deployment readiness**

Inspect the deployment and require `READY` status for the expected commit.

- [ ] **Step 4: Verify the live article**

Open `https://questroofing.com/queen-creek-monsoon-roof-damage-checklist/` and verify HTTP success, canonical URL, unique title, H1, nine warning signs, image, internal links, CTA, and `BlogPosting` JSON-LD.

- [ ] **Step 5: Scan deployment errors**

Inspect production logs for new build or runtime errors associated with the deployment.

- [ ] **Step 6: Report the deployment**

Return the production URL, Vercel status, commit SHA, framework, verification result, and the prior deployment rollback target.
