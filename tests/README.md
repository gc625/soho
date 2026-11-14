# Responsive layout checks

The site still has no build step or runtime dependencies. These optional browser
checks use Playwright outside the repository, with installed Chrome and Playwright
WebKit. WebKit covers Safari layout behavior; it does not replace a physical iPad check.

In PowerShell, start the site from the repository root:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

In another terminal, from the same directory:

```powershell
$qaDir = Join-Path $env:TEMP 'soho-layout-qa'
npm.cmd install --prefix $qaDir playwright --no-save
node "$qaDir/node_modules/playwright/cli.js" install webkit
$env:NODE_PATH = "$qaDir/node_modules"
$env:SCREENSHOT_DIR = "$qaDir/screenshots" # optional visual review artifacts
node tests/layout.cjs
```

`BASE_URL` can override the default `http://127.0.0.1:8765`.
Checks cover phone, iPad portrait/landscape, desktop, and breakpoint boundaries:
actual text escaping the viewport, map detail/text/gallery overlap (allowing the
intentional faint desktop map edge behind the copy), complete map aspect
ratio, mapless listings, cached map restoration, gallery reset, lightbox navigation,
the media page/menu, and the animated title after resizing and scrolling.
