import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const articleUrl = new URL('dist/queen-creek-monsoon-roof-damage-checklist/index.html', root);
const mesaArticleUrl = new URL('dist/mesa-roof-leak-after-monsoon/index.html', root);
const homeUrl = new URL('dist/index.html', root);
const sitemapUrl = new URL('dist/sitemap-0.xml', root);

const articlePath = fileURLToPath(articleUrl);
const mesaArticlePath = fileURLToPath(mesaArticleUrl);
const homePath = fileURLToPath(homeUrl);
const sitemapPath = fileURLToPath(sitemapUrl);

test('production build emits the Queen Creek monsoon article', () => {
  assert.equal(existsSync(articlePath), true, `Missing ${articlePath}`);
});

test('article exposes the required local SEO and conversion signals', {
  skip: !existsSync(articlePath),
}, () => {
  const article = readFileSync(articlePath, 'utf8');

  assert.match(article, /<link rel="canonical" href="https:\/\/questroofing\.com\/queen-creek-monsoon-roof-damage-checklist\/"/);
  assert.match(article, /"@type":"BlogPosting"/);
  assert.match(article, /Queen Creek Monsoon Roof Damage: 9 Signs to Check After a Storm/);
  assert.match(article, /Request a free roof inspection/i);
});

test('production build emits the Mesa monsoon roof leak article', () => {
  assert.equal(existsSync(mesaArticlePath), true, `Missing ${mesaArticlePath}`);
});

test('Mesa article exposes its local SEO and conversion signals', {
  skip: !existsSync(mesaArticlePath),
}, () => {
  const article = readFileSync(mesaArticlePath, 'utf8');

  assert.match(article, /<link rel="canonical" href="https:\/\/questroofing\.com\/mesa-roof-leak-after-monsoon\/"/);
  assert.match(article, /"@type":"BlogPosting"/);
  assert.match(article, /Mesa Roof Leak After a Monsoon: What to Do in the First 24 Hours/);
  assert.match(article, /Request a free roof inspection/i);
  assert.match(article, /mesaaz\.gov\/Public-Safety\/Emergencies\/Severe-Weather-Preparation/);
  assert.match(article, /weather\.gov\/twc\/monsoonsafety/);
});

test('homepage links to the standalone article', () => {
  assert.equal(existsSync(homePath), true, `Missing ${homePath}`);
  const home = readFileSync(homePath, 'utf8');

  assert.match(home, /href="\/queen-creek-monsoon-roof-damage-checklist\/"/);
  assert.match(home, /href="\/mesa-roof-leak-after-monsoon\/"/);
});

test('sitemap includes the standalone article', {
  skip: !existsSync(sitemapPath),
}, () => {
  const sitemap = readFileSync(sitemapPath, 'utf8');

  assert.match(sitemap, /https:\/\/questroofing\.com\/queen-creek-monsoon-roof-damage-checklist\//);
  assert.match(sitemap, /https:\/\/questroofing\.com\/mesa-roof-leak-after-monsoon\//);
});
