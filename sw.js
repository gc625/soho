/* ============================================================
   Soho Printing Press — service worker
   GitHub Pages caps Cache-Control at max-age=600 for everything,
   so repeat visits re-fetch the whole site. This worker keeps a
   long-lived local cache instead:
     - media (photos, plates, maps, fonts, tiles): cache-first —
       they change rarely, and the cache makes them instant
     - code (html/css/js): network-first, cache as fallback —
       deploys show up on the next visit, never stale
   Bump VERSION whenever cached media is replaced in place.
   ============================================================ */
const VERSION = 'spp-v1';
const MEDIA = /\/(listings|assets|art\/gage|art\/maps|fonts)\//;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  const store = res => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
    }
    return res;
  };

  if (MEDIA.test(url.pathname)) {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(store))
    );
  } else {
    e.respondWith(
      fetch(e.request).then(store).catch(() => caches.match(e.request))
    );
  }
});
