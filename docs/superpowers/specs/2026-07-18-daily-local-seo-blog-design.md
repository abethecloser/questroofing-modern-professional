# Daily Local SEO Blog Design

## Goal

Publish one useful, locally targeted Quest Roofing article per day. Each article must have a crawlable URL, answer a real homeowner question, demonstrate Arizona roofing expertise, and lead readers toward a relevant inspection or estimate request.

The first article will target post-storm searches in Queen Creek during monsoon season:

- Title: `Queen Creek Monsoon Roof Damage: 9 Signs to Check After a Storm`
- Slug: `queen-creek-monsoon-roof-damage-checklist`
- Primary topic: Queen Creek monsoon roof damage
- Supporting topics: roof leak after monsoon, storm roof inspection Queen Creek, slipped roof tiles, exposed underlayment, lifted shingles, foam-roof ponding, flashing damage, and ceiling stains

## Publishing Architecture

Use an Astro content collection for blog posts. Each post lives in one Markdown file with validated frontmatter. A static dynamic route generates a standalone page for every entry during the production build.

Required frontmatter:

- `title`
- `description`
- `publishedAt`
- `category`
- `city`
- `image`
- `imageAlt`
- `keywords`
- `featured`

The article route will preserve the flat URL pattern already indexed for Quest posts:

`https://questroofing.com/<slug>/`

This avoids changing a live pattern that is already attracting long-tail traffic. New Markdown files become new crawlable pages without duplicating page markup.

## Page Design

Create a Quest-specific article layout based on the current site identity: charcoal, white, amber, uppercase display headings, the real Quest logo, business phone number, license, and Queen Creek location. Do not reuse the placeholder Summit Roofing layout.

Each article page contains:

1. Canonical URL, unique title and meta description
2. Publication date, category, and Queen Creek location context
3. Relevant Quest project image with descriptive alt text
4. A concise opening answer for search visitors
5. Scannable sections with one clear homeowner question per heading
6. Safety guidance that does not encourage homeowners to climb onto a wet or damaged roof
7. Contextual internal links to storm repair, tile roofing, free inspection, and contact pages
8. A visible inspection CTA near the middle and end
9. `BlogPosting` structured data naming Quest Roofing as publisher
10. Related-post navigation when more posts are added

The homepage Blog section will read from the same content collection and link each card to its actual article URL. Existing teaser-only cards may remain temporarily, but the new article must be a real link rather than a contact button.

## First Article Content

The first post will cover nine post-monsoon warning signs:

1. Slipped, cracked, or missing tiles
2. Exposed or wind-disturbed underlayment
3. Lifted or missing shingle tabs
4. Bent or separated flashing
5. Debris impact near valleys and penetrations
6. Ponding or coating damage on foam and flat sections
7. New ceiling stains or attic moisture
8. Granules, fragments, or roof material found on the ground
9. Temporary patches that need permanent inspection

The copy will distinguish safe ground-level observations from conditions requiring a roofer. It will avoid unverified promises about insurance coverage, exact damage diagnoses, response times, or guaranteed rankings.

## Discoverability

Configure the Astro site URL as `https://questroofing.com` and generate a sitemap from statically built routes. Expose the sitemap through `robots.txt` and a head link. Every post must be linked from the homepage Blog section so crawlers and visitors can discover it without relying only on the sitemap.

Daily publishing will prioritize original, people-first local guidance. City and keyword variations must not be produced as near-duplicate doorway pages. Each post needs a distinct homeowner problem, local context, useful answer, and internal-link purpose.

## Verification and Deployment

Do not start a local development or preview server.

For each daily post:

1. Install dependencies only when the lockfile requires it.
2. Run the production build and confirm the intended article HTML and sitemap entry are generated.
3. Inspect the working-tree diff and commit only the post-related changes.
4. Push the verified commit to the Git-linked branch.
5. Let Vercel build and deploy the commit to production.
6. Confirm the Vercel deployment reaches `READY`.
7. Open the live canonical article URL and verify its title, main heading, copy, image, internal links, structured data, and CTA.
8. Inspect production deployment errors before reporting completion.

If the production deployment fails, do not publish a replacement article or modify unrelated pages. Inspect the failing deployment, correct the scoped cause, rebuild, and redeploy.

## Success Criteria

- The first article has a unique, crawlable production URL.
- The production build completes without starting a server.
- The article appears in the homepage Blog section and generated sitemap.
- The page contains a canonical URL and valid `BlogPosting` JSON-LD.
- Internal links point to relevant live Quest Roofing pages.
- The Vercel production deployment is `READY` and the canonical URL returns the expected article.
- The repository is clean after the committed and pushed deployment change.

Ranking on page one is a business objective, not a release guarantee. Search performance will be evaluated over time using impressions, queries, clicks, and qualified leads from the published article URLs.
