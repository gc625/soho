# AGENTS.md — Soho Printing Press

Static site (no build step, no dependencies) for a Hong Kong property portfolio.
Deployed via **GitHub Pages** from `main` at https://gc625.github.io/soho/.
Plain HTML/CSS/JS: `index.html`, `media.html`, `css/style.css`, `js/main.js`.

## Project layout

- `listings/NN_name/NN.jpg` — 77 photos, all uniformly **533×300 JPEG, ~30KB each**.
  `js/main.js` builds galleries from the `LISTINGS` array (`folder` + `photos` count);
  adding a listing = add folder + entry, no other wiring.
- `art/gage-street-living-print-fast.html` — hero "living print": self-contained
  canvas animation in an iframe. Loads `art/gage/plate-*.webp` (6 plates).
- `art/maps/*.html` — **static wrappers** displaying pre-rendered map WebPs.
  The procedural generators live in `art/maps/generators/` (see below).
- `assets/` — tile/ribbon/footer imagery. `fonts/michelle_2/` — Michelle + Michelle Outline OTFs.

## Performance work (done — don't regress)

Lighthouse mobile baseline after fixes: **LCP 2.3s, TBT ~290ms, Speed Index 1.8s**.
The big wins, in order of impact:

1. **Maps are pre-rendered WebP, not live canvas.** The generators ran a per-pixel
   noise loop over 2.5M pixels (~10s main-thread block on throttled CPUs, the cause
   of terrible INP when switching listings). Never serve `generators/*.html` in an
   iframe — re-bake to WebP instead (see "Editing maps" below).
2. **Hero plates recompressed** 5.5MB → 620KB (q80 WebP, visually identical).
   Originals in `art/gage/originals/` (gitignored).
3. **Hero print pauses off-screen** (IntersectionObserver toggles rAF) and renders
   at 820px/24fps (it displays at ≤813px). It shares the main thread with the page —
   keep it cheap.
4. **Listing photos load eagerly + decode off-thread**; an idle preloader streams
   the whole portfolio (nearest listing first) after `load`. Galleries and map
   iframes are **cached as live DOM** across listing switches — do not rebuild them
   per switch (re-decoding images / re-parsing iframes was the INP jank).
5. **All JPEGs are progressive** (q75–q82). If you add photos, encode progressive
   (`PIL: save(..., progressive=True, optimize=True)`).
6. **Scroll handler is rAF-throttled**; morph landing boxes are cached — no
   `getBoundingClientRect` in scroll/animation paths.
7. **Fonts preloaded** in `index.html` (`<link rel="preload" as="font" crossorigin>`).

## ⚠️ Gotchas

- **`sw.js` service worker caches media aggressively** (cache-first for
  `listings/ assets/ art/gage/ art/maps/ fonts/`, network-first for code) because
  GitHub Pages forces `Cache-Control: max-age=600`. **If you replace any media file
  in place, bump `VERSION` in `sw.js`** or returning visitors get stale files.
- **GitHub Pages cannot set response headers.** Don't chase cache-header fixes;
  the service worker is the fix.
- The `.ribbon` tile pattern rotates per visit via `localStorage` — you may need
  reloads to see a specific pattern. Scale tuning is `RIBBON_TILES` in `main.js`.
- The hero title is rendered by a fixed "fly" copy (`body.title-morph` hides the
  real `h1`) that waits on `document.fonts.ready`; the hero h1 is the LCP element.
- Map aspect ratio is **8/5 (1600×1000)** for all maps — the `mapRatio` values in
  `LISTINGS` were once wrong (pre-crop dimensions). Keep new maps at 1600×1000.
- `.gitignore` excludes `chat/`, `*:Zone.Identifier`, `art/gage/originals/`,
  `assets/.originals/`, `C:*/`. **Never `git add -A` blindly** — Lighthouse/Chrome
  writes profile dirs with Windows-style names into the cwd; that's why `C:*/` is
  ignored. Add files explicitly.

## Editing maps

```bash
npm install playwright-core --prefix /tmp --no-save   # chromium binary already at
# ~/.cache/ms-playwright/chromium-1148/chrome-linux/chrome
# then: open generators/<name>.html headless, wait for <canvas>,
# canvas.toDataURL('image/png'), save as art/maps/<name>.webp (q88, method=6)
```

## Measuring performance locally

```bash
python3 -m http.server 8000    # serve first — file:// skews results
CHROME_PATH=$HOME/.cache/ms-playwright/chromium-1148/chrome-linux/chrome \
  npx -y lighthouse http://127.0.0.1:8000 \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --only-categories=performance --view
```

(No system Chrome is installed; use the Playwright-cached binary above.)
WebPageTest.org works against the deployed URL for real-device filmstrips.
