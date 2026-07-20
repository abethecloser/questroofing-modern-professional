# Mesa Monsoon Roof Leak Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish and deploy the Mesa first-24-hours monsoon roof leak article through the existing Quest Roofing Astro blog system.

**Architecture:** Add one validated Markdown content entry and one public image. Extend the existing production-artifact test so the generated article, homepage link, sitemap entry, canonical metadata, structured data, and CTA are release requirements.

**Tech Stack:** Astro 7, Markdown content collections, Node test runner, GitHub, Vercel

## Global Constraints

- Do not start a local development or preview server.
- Preserve the flat canonical URL `https://questroofing.com/mesa-roof-leak-after-monsoon/`.
- Use the approved title, keywords, Mesa focus, real Quest image, safety boundaries, source links, internal links, and CTAs from the design spec.
- Do not make insurance, diagnosis, response-time, availability, ranking, or roof-safety promises.

---

### Task 1: Add the Mesa production-artifact regression

**Files:**
- Modify: `tests/blog-production.test.mjs`

**Interfaces:**
- Consumes: Astro build output in `dist/`
- Produces: release assertions for `dist/mesa-roof-leak-after-monsoon/index.html`

- [ ] Add `mesaArticlePath` and assertions requiring the new file, canonical URL, `BlogPosting`, approved title, inspection CTA, homepage href, and sitemap URL.
- [ ] Run `npm run test:blog` and require failure because the Mesa article does not exist yet.

### Task 2: Add the article and image

**Files:**
- Create: `src/content/blog/mesa-roof-leak-after-monsoon.md`
- Create: `public/images/blog/mesa-roof-leak-after-monsoon.webp`

**Interfaces:**
- Consumes: the existing `blog` content schema and `src/images/image8.webp`
- Produces: content entry ID `mesa-roof-leak-after-monsoon`

- [ ] Copy `src/images/image8.webp` to the approved public image path.
- [ ] Add frontmatter with the approved title, 70–170 character description, `2026-07-21` publication date, category, city, image, alt text, four keywords, and `featured: true`.
- [ ] Write the direct opening answer, seven first-day action sections, common mistakes, four FAQs, factual City of Mesa and NWS links, the four approved internal links, mid-article CTA, and final phone/contact CTA.
- [ ] Run `npm run test:blog` and require all production-artifact tests and the Astro build to pass.

### Task 3: Verify and publish

**Files:**
- Include the design spec, this plan, test, article, and image in the scoped release commit.

**Interfaces:**
- Consumes: verified local source
- Produces: GitHub `main` commit and Vercel production deployment

- [ ] Run `git diff --check`, inspect the diff/status, and confirm no unrelated files are included.
- [ ] Commit with `feat: publish Mesa monsoon roof leak guide` and push `main`.
- [ ] Require the Git-linked Vercel deployment for the pushed commit to reach `READY`.
- [ ] Verify the live canonical article, homepage link, sitemap entry, metadata, image, source links, internal links, CTA, and deployment errors.
