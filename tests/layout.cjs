/* Run against the local static server; see tests/README.md. */
const assert = require('node:assert/strict');
const { mkdir } = require('node:fs/promises');
const { chromium, webkit } = require('playwright');

const base = process.env.BASE_URL || 'http://127.0.0.1:8765';
const screenshots = process.env.SCREENSHOT_DIR;
const sizes = [
  [320, 568], [390, 844], [520, 900], [680, 1000],
  [768, 1024], [820, 1180], [834, 1194], [860, 1180], [861, 1180],
  [1024, 1366], [1100, 900], [1101, 900], [1180, 820], [1440, 900],
];

async function checkLayout(page, label) {
  const issues = await page.evaluate(() => {
    const errors = [];
    const visible = el => {
      for (let p = el; p; p = p.parentElement) {
        const s = getComputedStyle(p);
        if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false;
      }
      return true;
    };
    const overlaps = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 &&
      a.top < b.bottom - 1 && a.bottom > b.top + 1;
    if (document.documentElement.scrollWidth > innerWidth + 1) errors.push('Document scrolls sideways');
    for (const el of document.querySelectorAll('body *')) {
      if (!visible(el) || el.closest('.viewer-gallery, .title-fly')) continue;
      const r = el.getBoundingClientRect();
      if (r.width && (r.left < -1 || r.right > innerWidth + 1)) errors.push(`Outside viewport: ${el.className || el.tagName}`);
    }
    // Check actual glyph boxes, not just the width of their block container.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const el = node.parentElement;
      if (!node.textContent.trim() || !visible(el) || el.closest('script, style, .viewer-gallery')) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) {
        if (r.width && (r.left < -1 || r.right > innerWidth + 1)) errors.push(`Text outside viewport: ${node.textContent.trim().slice(0, 55)}`);
      }
    }
    for (const el of document.querySelectorAll('.tagline, .media-title, .media-src, .card-name, .card-specs, .chips li, .footer-contact a')) {
      if (!visible(el)) continue;
      const bounds = el.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(el);
      for (const r of range.getClientRects()) {
        if (r.left < bounds.left - 1 || r.right > bounds.right + 1) errors.push(`Text escapes its column: ${el.className || el.tagName}`);
      }
    }
    const map = document.querySelector('.viewer-map');
    if (map && !map.hidden) {
      const mr = map.getBoundingClientRect();
      for (const selector of ['.viewer-head', '.viewer-body', '.viewer-gallery']) {
        // Desktop intentionally lets only the faint left edge underlap the copy.
        const protectedMap = { left: innerWidth > 1100 ? mr.left + mr.width * .2 : mr.left,
          right: mr.right, top: mr.top, bottom: mr.bottom };
        if (overlaps(selector === '.viewer-gallery' ? mr : protectedMap,
          document.querySelector(selector).getBoundingClientRect())) errors.push(`Map detail overlaps ${selector}`);
      }
      const frame = [...map.querySelectorAll('iframe')].find(el => getComputedStyle(el).display !== 'none');
      const fr = frame.getBoundingClientRect();
      if (Math.abs(fr.height - fr.width / 1.6) > 1) errors.push('Map is cropped or distorted');
    }
    const photo = document.querySelector('.about-photo');
    if (photo && overlaps(photo.getBoundingClientRect(), document.querySelector('.about-inner').getBoundingClientRect())) errors.push('About photo overlaps text');
    return [...new Set(errors)];
  });
  assert.deepEqual(issues, [], label);
}

async function run(engine, name) {
  const browser = await engine.launch(name === 'chrome' ? { channel: 'chrome' } : {});
  const context = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height });
      await page.goto(base);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('#about h2').textContent(), 'About us');
      assert.equal(await page.locator('#listings > header .eyebrow').count(), 0);
      await checkLayout(page, `${name} ${width}: home`);
      if (screenshots && [390, 768, 1440].includes(width)) {
        await page.locator('#about').screenshot({ path: `${screenshots}/${name}-${width}-about.png`,
          animations: 'disabled', style: '.nav { visibility: hidden; }' });
        await page.locator('.hero').screenshot({ path: `${screenshots}/${name}-${width}-hero-section.png`,
          animations: 'disabled', style: '.nav { visibility: hidden; }' });
      }
      for (let i = 0; i < 9; i++) {
        if (i) {
          await page.locator('#vnext').click();
          await page.waitForFunction(n => document.querySelector('#viewer-pos').textContent === `${n} / 9`, i + 1);
        }
        await checkLayout(page, `${name} ${width}: listing ${i + 1}`);
        assert.equal(await page.locator('#viewer-map').evaluate(el => el.hidden), i > 1);
        if (i === 0 && width <= 860) {
          await page.locator('#viewer-gallery').evaluate(el => { el.scrollLeft = el.scrollWidth; });
        } else {
          assert.equal(await page.locator('#viewer-gallery').evaluate(el => el.scrollLeft), 0, 'New listing starts at first photo');
        }
      }
      // Both maps must return from the live iframe cache after mapless listings.
      await page.locator('#vnext').click();
      await page.waitForFunction(() => document.querySelector('#viewer-pos').textContent === '1 / 9');
      await page.locator('#viewer-map').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('#viewer-map').classList.contains('on'));
      await page.waitForFunction(() => {
        const frame = [...document.querySelectorAll('#viewer-map iframe')].find(el => el.style.display !== 'none');
        const image = frame.contentDocument?.querySelector('img');
        return image?.complete && image.naturalWidth === 1600;
      });
      assert.equal(await page.locator('#viewer-map iframe').count(), 2);
      await checkLayout(page, `${name} ${width}: restored map`);
      if (screenshots && [390, 768, 1024, 1440].includes(width)) {
        await page.locator('#viewer').screenshot({
          path: `${screenshots}/${name}-${width}-listing.png`, animations: 'disabled',
          style: '.nav { visibility: hidden; }',
        });
      }
      await page.locator('.gallery-item').first().click();
      await page.locator('.lb-next').click();
      assert.equal(await page.locator('#lb-count').textContent(), '2 / 9');
      await checkLayout(page, `${name} ${width}: lightbox`);
      await page.keyboard.press('Escape');
      await page.goto(`${base}/media.html`);
      await page.evaluate(() => document.fonts.ready);
      await checkLayout(page, `${name} ${width}: media`);
      if (width <= 860) {
        await page.locator('#hamburger').click();
        await checkLayout(page, `${name} ${width}: open menu`);
      }
      console.log(`PASS ${name} ${width}x${height}: all listings, maps, gallery, lightbox, media`);
    }
    // Exercise the animated title through rotation, including a narrow phone.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    for (const [width, height] of [[320, 568], [768, 1024], [1024, 768], [834, 1194], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(400);
      await checkLayout(page, `${name} ${width}: animated title after resize`);
      if (screenshots && [768, 1440].includes(width)) await page.screenshot({ path: `${screenshots}/${name}-${width}-hero.png` });
      await page.evaluate(() => window.scrollTo({ top: 60, behavior: 'instant' }));
      await page.waitForTimeout(400);
      await checkLayout(page, `${name} ${width}: title during scroll`);
    }
    assert.deepEqual(errors, [], `${name}: runtime errors`);
    console.log(`PASS ${name}: animated title and orientation changes; no runtime errors`);
    const fallback = await context.newPage();
    await fallback.addInitScript(() => { window.requestIdleCallback = undefined; });
    await fallback.goto(base);
    await fallback.waitForFunction(() => preloadQueue.length === 0);
    await fallback.close();
    console.log(`PASS ${name}: photo preloading completes without requestIdleCallback`);
  } finally {
    await browser.close();
  }
}

(async () => {
  if (screenshots) await mkdir(screenshots, { recursive: true });
  for (const [engine, name] of [[chromium, 'chrome'], [webkit, 'webkit']]) await run(engine, name);
})().catch(error => { console.error(error); process.exitCode = 1; });
