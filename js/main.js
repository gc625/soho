/* ============================================================
   Soho Printing Press — interactions
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   Portfolio data (transcribed from the listings' description.md)
   Numbers are assigned by position in this list.
   Illustrated maps: add the file under art/maps/ and set map here.
   ------------------------------------------------------------ */
const LISTINGS = [
  {
    folder: '01_staunton_and_aberdeen', photos: 9,
    name: 'Staunton & Aberdeen',
    specs: ['2 Bedroom', '2 Bathroom', 'Communal Roof'],
    map: 'art/maps/staunton-street-listing-map.html',
    mapRatio: '1600 / 1000',
    desc: `When your travels next take you from Soho to PMQ along Staunton Street, take a moment to glance up at the 4/F of the Tong Lau that sits at the intersection of Aberdeen Street. You may notice a vast expanse of old style (but newly built) windows that extend across the front and sides of the building, giving front row views of PMQ and nothing but sky. This may be one of the biggest and sunniest Tong Lau homes available in Soho, with two king size en-suite bedrooms and walk-in closets. Gather your friends for dining and cocktails around the massive granite topped center counter, or go up to the roof to take in the city views.`
  },
  {
    folder: '04_gage_street_market_lofts', photos: 6,
    name: 'Gage Street Market Lofts',
    specs: ['Seven 1 Bedroom', '1 Bathroom', '2 with Roofs'],
    map: 'art/maps/16-gage-street-listing-map.html',
    mapRatio: '1600 / 1000',
    desc: `From the escalator, as you cross Lyndhurst Terrace, look to the west and you will see the banner that identifies the building that is home to the seven flats we call Gage Street Market Lofts. You could not be closer to the escalator, the wet markets, your gym, the airport express and possibly even your office. These seven flats are all open kitchen and living area with a separate enclosed bedroom and bathroom area. All units in the building have been renovated and are now occupied by young professionals who enjoy being in the heart of Central.`
  },
  {
    folder: '02_tank_lane_shop_house', photos: 12,
    name: 'Tank Lane Shop House',
    specs: ['Our Office', 'Base of Operations'],
    map: null,
    desc: `This is our office and base of operations, well situated to respond to tenants' needs as and when they arise. It is right in the middle of all the Soho Printing Press flats, which extend from Po Yan Street in Sheung Wan to Gage Street in Central. Like all the properties in our portfolio, the Soho Printing Press shop house was renovated to retain as much of the original character as possible while upgrading the facilities to meet the standards of a modern lifestyle.`
  },
  {
    folder: '03_hollywood_and_centre_stage', photos: 12,
    name: 'Hollywood & Centre Stage',
    specs: ['1 Bedroom', '1 Bathroom'],
    map: null,
    desc: `The entrance to this lair is accessed via an almost secret alley that connects Hollywood Road and Staunton Street, right near Man Mo temple. You've probably passed it a thousand times as you stop for coffee at Centre Stage Classified but had no idea where it leads. Behind the copper clad door at the entrance of this home on the 4/F, more intrigue awaits: exposed brick walls, enough bookshelves to start your own library, and bathroom and kitchen designs that will make you never want to leave. The wall of windows along the front of the flat offers commanding views of all that happens along Hollywood Road — but the gourmet creations you make on your 4-burner Viking stove will likely be more of a distraction.`
  },
  {
    folder: '05_lantau_beach_bungalow', photos: 12,
    name: 'Lantau Beach Bungalow',
    specs: ['1 Bedroom', '1 Bathroom', '1 Balcony'],
    map: null,
    desc: `If you ever dreamed of running away to the furthest corner of Hong Kong where no one could ever find you — where you could find deserted beaches and hiking trails, but still go home to soak in your two-person bathtub jacuzzi — this is the home for you. Keep going along the main road till you pass two prisons, a reservoir, and just before you start heading up to the Big Buddha, make a left down a winding road to a fishing village that most people in Hong Kong have no idea exists. Here you will find the tranquility that you thought could never have existed in Hong Kong. Wake up to birds singing on your balcony as you watch the sun rise over the China Sea.`
  },
  {
    folder: '06_lower_peel_street', photos: 7,
    name: 'Lower Peel Street',
    specs: ['2 Bedroom', '2 Bathroom', '1 Long Balcony'],
    map: null,
    desc: `For those who love fresh ingredients from Hong Kong's Gage Street market, this is the home to discover. Just half a block up from the markets is this recently restored classic. Embrace the openness of the vast living room separating the two bedroom spaces, or step out onto the open-air balcony to enjoy the sunset over the Hong Kong low-rise buildings across the street. Take special note of the classic tiles on the balcony, salvaged from a Wanchai demolition, or the well-worn antique pine flooring imported from the States.`
  },
  {
    folder: '07_po_hing_fong_shop_house', photos: 7,
    name: 'Po Hing Fong Shop House',
    specs: ['1 Bedroom', '1 Bathroom', '1 Front Porch'],
    map: null,
    desc: `Saunter a few steps past the basketball courts of Po Hing Fong, down the hill leading towards Po Yan Street and Tung Wah Hospital, and you will find a row of well-preserved shop houses on the steps of Po Hing Fong. Behind one of these facades is one of the closest restorations you will find to a real New York Soho loft in Hong Kong. With ceiling heights — and bookshelves — approaching sixteen feet, there is no shortage of drama in this downtown loft design.`
  },
  {
    folder: '08_circular_pathway', photos: 8,
    name: 'Circular Pathway',
    specs: ['2 Bedrooms', '2.5 Bathrooms', '2 Terraces'],
    map: null,
    desc: `Tucked away on a quiet lane below Hollywood Road, near Man Mo Temple, lies this classic Tong Lau home with views through a line of trees to the classic stretch of Cat Street. As you pass the shops that dot Circular Pathway and ascend to the second floor, you will feel as though you have been transported back to a simpler, quieter time in Hong Kong — with all the modern amenities you could ask for, including a wine fridge and a gas BBQ.`
  },
  {
    folder: '09_ulam_penthouses_a_and_b', photos: 4,
    name: 'Ulam Penthouses A & B',
    specs: ['Two 2 Bedroom', '2 Bathroom', 'Terrace-Roof'],
    map: null,
    desc: `Between Caine and Bridges Street, just above the YMCA on Bridges Street, lies the pedestrian-only Ulam Terrace and our two penthouse flats, each with 2 bedrooms and 2 bathrooms. The building has great light and great views over the low-rise Sheung Wan neighborhood and the classic medical museum at the rear of the building. Step out onto either balcony from the living or master bedroom to have your breakfast in the morning, or a glass of wine at the end of the day. The roof offers incredible options to entertain your friends — or even cool off in the rain shower.`
  }
];

const num = i => String(i + 1).padStart(2, '0');
const photoSrc = (listing, n) =>
  `listings/${listing.folder}/${String(n).padStart(2, '0')}.jpg`;

/* ------------------------------------------------------------
   The selvedge: cycle through the three salvaged-tile prints,
   so each visit presses a different margin. Starts at random,
   then rotates so consecutive visits never repeat.
   ------------------------------------------------------------ */
/* Each pattern's sheet holds a different number of tiles across it — woven
   ~7, floral ~8, square ~4 — so each gets its own background-size that puts
   a readable number of tiles across the ribbon instead of the whole sheet.
   The square motif reads as mush at three-across, so it runs two-across. */
const RIBBON_TILES = [
  { src: 'assets/tile-woven.jpg',  size: '233% auto' },
  { src: 'assets/tile-floral.jpg', size: '267% auto' },
  { src: 'assets/tile-square.jpg', size: '200% auto' }
];
try {
  const last = localStorage.getItem('spp-ribbon');
  const idx = last === null
    ? Math.floor(Math.random() * RIBBON_TILES.length)
    : (Number(last) + 1) % RIBBON_TILES.length;
  localStorage.setItem('spp-ribbon', String(idx));
  const ribbon = document.querySelector('.ribbon');
  ribbon.style.backgroundImage = `url('${RIBBON_TILES[idx].src}')`;
  ribbon.style.backgroundSize = RIBBON_TILES[idx].size;
} catch { /* storage unavailable — keep the default woven ribbon */ }

/* ------------------------------------------------------------
   Mobile hero: the scroll 'bubble' stays hidden until the living
   print has loaded, so it never floats over an empty frame
   ------------------------------------------------------------ */
document.getElementById('hero-print').addEventListener('load', () =>
  document.querySelector('.hero').classList.add('art-loaded'));

/* ------------------------------------------------------------
   Scroll reveals
   ------------------------------------------------------------ */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

const observeReveals = root =>
  root.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

/* ------------------------------------------------------------
   Listing viewer
   ------------------------------------------------------------ */
const viewer = document.getElementById('viewer');
const vNum = document.getElementById('viewer-num');
const vName = document.getElementById('viewer-name');
const vChips = document.getElementById('viewer-chips');
const vDesc = document.getElementById('viewer-desc');
const vPos = document.getElementById('viewer-pos');
const vGallery = document.getElementById('viewer-gallery');
const mapLayer = document.getElementById('viewer-map');
const mapIframe = document.getElementById('map-iframe');

let current = 0;
let mapRevealed = false;

/* The map dissolves in once the viewer scrolls into view, then stays. */
const mapIO = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    mapRevealed = true;
    syncMap();
    mapIO.disconnect();
  }
}, { threshold: 0.2 });
mapIO.observe(mapLayer);

/* Each illustrated map is a ~500 KB self-contained page (inline font +
   canvas painting). Resetting iframe.src on every listing switch re-parses
   and re-runs all of that on the main thread — the click jank. Instead,
   parse each map at most once and keep the frames alive; switching
   listings just toggles which one is visible. */
const mapCache = new Map();
const initialMapSrc = mapIframe.getAttribute('src');
if (initialMapSrc) mapCache.set(initialMapSrc, mapIframe);

function syncMap() {
  const L = LISTINGS[current];
  if (L.map) {
    let frame = mapCache.get(L.map);
    if (!frame) {
      frame = document.createElement('iframe');
      frame.src = L.map;
      frame.title = 'Illustrated location map';
      frame.scrolling = 'no';
      frame.tabIndex = -1;
      frame.setAttribute('aria-hidden', 'true');
      mapCache.set(L.map, frame);
      mapLayer.appendChild(frame);
    }
    frame.style.aspectRatio = L.mapRatio || '1600 / 1000';
    mapCache.forEach(f => { f.style.display = f === frame ? '' : 'none'; });
    if (mapRevealed) mapLayer.classList.add('on');
  } else {
    mapLayer.classList.remove('on');
  }
}

/* Galleries are built once per listing and the live nodes are reused on
   every revisit — rebuilding fresh <img> nodes each switch would force
   the browser to re-decode every photo mid-interaction. */
const galleryCache = new Map();
function buildGallery(listing) {
  let nodes = galleryCache.get(listing.folder);
  if (!nodes) {
    nodes = [];
    for (let i = 1; i <= listing.photos; i++) {
      const btn = document.createElement('button');
      btn.className = 'gallery-item';
      btn.type = 'button';
      btn.setAttribute('aria-label', `View photo ${i} of ${listing.name}`);
      const img = document.createElement('img');
      img.src = photoSrc(listing, i);
      img.alt = `${listing.name} — photo ${i}`;
      /* Photos are ~30 KB each: eager loading + async decode keeps the
         gallery painted before it scrolls into view — no pop-in. */
      img.decoding = 'async';
      img.width = 533;
      img.height = 300;
      btn.appendChild(img);
      btn.addEventListener('click', () => openLightbox(listing, i - 1));
      nodes.push(btn);
    }
    galleryCache.set(listing.folder, nodes);
  }
  vGallery.replaceChildren(...nodes);
}

/* ------------------------------------------------------------
   Photo preloading: the whole portfolio is ~2.3 MB of small JPEGs.
   Once the page has loaded, stream them in during idle time —
   nearest listings first — so cycling the viewer, scrolling to the
   cards, and opening the lightbox are all instant.
   ------------------------------------------------------------ */
const preloadQueue = [];
LISTINGS.forEach((L, idx) => {
  for (let i = 1; i <= L.photos; i++) preloadQueue.push({ L, i, idx });
});
const queueOrder = () =>
  preloadQueue.sort((a, b) =>
    (Math.abs(a.idx - current) - Math.abs(b.idx - current)) || (a.i - b.i));
queueOrder();

const ric = window.requestIdleCallback
  || (cb => setTimeout(() => cb({ timeRemaining: () => 0, didTimeout: false }), 40));
function pumpPreload(deadline) {
  /* Small batches per idle slice, and decode() each image explicitly —
     decoding off the main thread now means no decode storm mid-click
     when a gallery is inserted later. */
  let n = 0;
  while (preloadQueue.length && n < 3 &&
         (deadline.timeRemaining() > 8 || deadline.didTimeout)) {
    const { L, i } = preloadQueue.shift();
    const im = new Image();
    im.decoding = 'async';
    im.src = photoSrc(L, i);
    if (im.decode) im.decode().catch(() => {});
    n++;
  }
  if (preloadQueue.length) ric(pumpPreload, { timeout: 1500 });
}
window.addEventListener('load', () => ric(pumpPreload, { timeout: 1500 }));

function renderListing(idx, { scroll = false } = {}) {
  const next = (idx + LISTINGS.length) % LISTINGS.length;
  const apply = () => {
    current = next;
    const L = LISTINGS[current];
    vNum.textContent = `Nº ${num(current)}`;
    vName.textContent = L.name;
    vChips.innerHTML = L.specs.map(s => `<li>${s}</li>`).join('');
    vDesc.textContent = L.desc;
    vPos.textContent = `${current + 1} / ${LISTINGS.length}`;
    buildGallery(L);
    queueOrder();
    syncMap();
    viewer.classList.remove('swap');
  };
  if (next === current) { apply(); }
  else {
    viewer.classList.add('swap');
    setTimeout(apply, 240);
  }
  if (scroll) viewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('vprev').addEventListener('click', () => renderListing(current - 1));
document.getElementById('vnext').addEventListener('click', () => renderListing(current + 1));

renderListing(0);

/* ------------------------------------------------------------
   "See all listings" cards — clicking loads the listing above
   ------------------------------------------------------------ */
const cardsWrap = document.getElementById('cards');
LISTINGS.forEach((listing, idx) => {
  const card = document.createElement('button');
  card.className = 'card reveal';
  card.type = 'button';
  card.style.transitionDelay = `${(idx % 5) * 60}ms`;
  card.setAttribute('aria-label', `View listing ${listing.name}`);
  card.innerHTML = `
    <span class="card-img"><img src="${photoSrc(listing, 1)}" alt="${listing.name}" loading="lazy" decoding="async" width="533" height="300"></span>
    <span class="card-body">
      <span class="card-num">Nº ${num(idx)}</span>
      <span class="card-name">${listing.name}</span>
      <span class="card-specs">${listing.specs.join(' · ')}</span>
    </span>`;
  card.addEventListener('click', () => renderListing(idx, { scroll: true }));
  cardsWrap.appendChild(card);
});

/* ------------------------------------------------------------
   Lightbox
   ------------------------------------------------------------ */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCount = document.getElementById('lb-count');
let lbListing = null;
let lbIndex = 0;

function preloadAround(listing, index) {
  [1, -1, 2, -2].forEach(d => {
    const n = index + 1 + d;
    if (n >= 1 && n <= listing.photos) {
      const im = new Image();
      im.src = photoSrc(listing, n);
    }
  });
}

function openLightbox(listing, index) {
  lbListing = listing;
  lbIndex = index;
  updateLightbox();
  preloadAround(listing, index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  lbImg.src = photoSrc(lbListing, lbIndex + 1);
  lbImg.alt = `${lbListing.name} — photo ${lbIndex + 1}`;
  lbCount.textContent = `${lbIndex + 1} / ${lbListing.photos}`;
}

function stepLightbox(dir) {
  lbIndex = (lbIndex + dir + lbListing.photos) % lbListing.photos;
  updateLightbox();
  preloadAround(lbListing, lbIndex);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightbox.querySelector('.lb-prev').addEventListener('click', () => stepLightbox(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', e => {
  if (e.target.closest('[data-lb-close]') || e.target === lightbox) closeLightbox();
});

/* Keyboard: arrows step the lightbox when open, otherwise cycle the
   viewer while it is on screen. */
const viewerVisible = () => {
  const r = viewer.getBoundingClientRect();
  return r.top < innerHeight && r.bottom > 0;
};
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('open')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  } else if (viewerVisible()) {
    if (e.key === 'ArrowLeft') renderListing(current - 1);
    if (e.key === 'ArrowRight') renderListing(current + 1);
  }
});

/* ------------------------------------------------------------
   Nav: solid after the fold, hides scrolling down, returns on scroll up
   ------------------------------------------------------------ */
const nav = document.getElementById('nav');
const heroTitle = document.querySelector('.hero-text h1');
const hamburger = document.getElementById('hamburger');

/* ------------------------------------------------------------
   The hero title lifts off the sheet and lands in the header.
   A fixed copy of the title (the "fly") is driven by scroll: it
   starts exactly over the real title, and as that title nears the
   top the outlined "Printing Press" rises to sit beside "Soho",
   inks in solid black, and everything shrinks to header size —
   then the real brand in the nav takes over, pixel-for-pixel.
   ------------------------------------------------------------ */
const fly = document.getElementById('title-fly');
const tfSoho = fly.querySelector('.tf-soho');
const tfOutline = fly.querySelector('.tf-press-outline');
const tfSolid = fly.querySelector('.tf-press-solid');
const h1Soho = document.querySelector('.h1-solid');
const h1Press = document.querySelector('.h1-outline');
const nbSoho = document.querySelector('.nb-soho');
const nbPress = document.querySelector('.nb-press');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;

let morphOn = false;
let natSoho, natPress, natSolid;        // fly boxes at hero size
let sohoLeft, sohoDocTop, pressLeft, pressDocTop;
let brandSohoBox, brandPressBox;        // cached header landing boxes
let morphStart = 0, morphEnd = 0, morphDist = 1;

/* Measure once per layout change: the fly's natural boxes, the hero
   lines' document positions, and the header's landing line. */
function measureMorph() {
  const units = [tfSoho, tfOutline, tfSolid];
  const saved = units.map(el => el.style.transform);
  units.forEach(el => { el.style.transform = 'none'; });

  const rs = tfSoho.getBoundingClientRect();
  const rp = tfOutline.getBoundingClientRect();
  const rl = tfSolid.getBoundingClientRect();
  natSoho = { w: rs.width, h: rs.height };
  natPress = { w: rp.width, h: rp.height };
  natSolid = { w: rl.width, h: rl.height };

  units.forEach((el, i) => { el.style.transform = saved[i]; });

  const hs = h1Soho.getBoundingClientRect();
  const hp = h1Press.getBoundingClientRect();
  sohoLeft = hs.left;   sohoDocTop = hs.top + scrollY;
  pressLeft = hp.left;  pressDocTop = hp.top + scrollY;

  /* Measure the landing line with the header revealed, so a resize while
     the nav is scrolled away doesn't fold a negative value into the maths. */
  const wasHidden = nav.classList.contains('hidden');
  if (wasHidden) { nav.style.transition = 'none'; nav.classList.remove('hidden'); }
  /* Cache the landing boxes so the scroll handler never forces a
     synchronous layout — the nav sits fixed at the top throughout the
     morph, so these stay valid until the next resize. */
  const bs = nbSoho.getBoundingClientRect();
  const bp = nbPress.getBoundingClientRect();
  brandSohoBox = { left: bs.left, top: bs.top, width: bs.width, height: bs.height };
  brandPressBox = { left: bp.left, top: bp.top, width: bp.width, height: bp.height };
  const brandTop = bs.top;
  if (wasHidden) {
    nav.classList.add('hidden');
    void nav.offsetHeight;
    nav.style.transition = '';
  }
  morphEnd = sohoDocTop - brandTop;            // natural reach of the line
  const startTop = Math.min(innerHeight * 0.34, sohoDocTop - 80);
  /* Keep the whole morph safely between page top and the landing line,
     so a short (mobile) hero never starts the animation mid-flight. */
  morphStart = Math.max(0, Math.min(sohoDocTop - startTop, morphEnd - 60));
  morphDist = Math.max(1, morphEnd - morphStart);
}

/* Interpolate a fly word from its sheet box (sx,sy,sw,sh) to its
   header box (tx,ty,tw,th). Size and position carry separate
   progress values so the outlined line can wait on the second row
   until "Soho" has shrunk out of its way. */
function place(el, sx, sy, sw, sh, tx, ty, tw, th, pSize, pPos) {
  const x = sx + (tx - sx) * pPos;
  const y = sy + (ty - sy) * pPos;
  const w = sw + (tw - sw) * pSize;
  const h = sh + (th - sh) * pSize;
  el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${w / sw}, ${h / sh})`;
}

function updateMorph() {
  const y = scrollY;
  const p = clamp01((y - morphStart) / morphDist);
  const eff = Math.min(y, morphEnd);          // frozen once the title is home

  /* The second line waits until "Soho" has narrowed, then rises into
     place; both lines shrink together. */
  const pSohoPos = p;
  const pPressPos = clamp01((p - 0.4) / 0.6);

  const tS = brandSohoBox;
  const tP = brandPressBox;

  place(tfSoho, sohoLeft, sohoDocTop - eff, natSoho.w, natSoho.h,
        tS.left, tS.top, tS.width, tS.height, p, pSohoPos);
  place(tfOutline, pressLeft, pressDocTop - eff, natPress.w, natPress.h,
        tP.left, tP.top, tP.width, tP.height, p, pPressPos);
  place(tfSolid, pressLeft, pressDocTop - eff, natSolid.w, natSolid.h,
        tP.left, tP.top, tP.width, tP.height, p, pPressPos);

  const ink = clamp01((p - 0.6) / 0.4);        // outline inks in solid
  tfOutline.style.opacity = String(1 - ink);
  tfSolid.style.opacity = String(ink);

  const landed = p >= 1;
  nav.classList.toggle('brand-on', landed);
  fly.style.visibility = landed ? 'hidden' : 'visible';
}

/* Fallback (reduced motion / no fonts API): fade the brand in as before. */
function updateBrandFallback() {
  nav.classList.toggle('brand-on',
    heroTitle.getBoundingClientRect().top <= nav.offsetHeight);
}

function enableMorph() {
  if (morphOn || reduceMotion) return;
  morphOn = true;
  document.body.classList.add('title-morph');
  measureMorph();
  updateMorph();
}

if (!reduceMotion) {
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(enableMorph);
    setTimeout(enableMorph, 1500);             // in case fonts.ready stalls
  } else {
    enableMorph();
  }
}

let lastY = window.scrollY;
let scrollTicking = false;
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 30);
  /* Keep the header on screen until the title has fully landed in it. */
  const pastMorph = !morphOn || y > morphEnd;
  if (pastMorph && y > 140 && y > lastY) nav.classList.add('hidden');
  else nav.classList.remove('hidden');
  if (morphOn) updateMorph(); else updateBrandFallback();
  lastY = y;
}
/* Coalesce scroll events into one update per frame. */
window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    scrollTicking = false;
    onScroll();
  });
}, { passive: true });

let morphResize;
window.addEventListener('resize', () => {
  clearTimeout(morphResize);
  morphResize = setTimeout(() => {
    if (morphOn) { measureMorph(); updateMorph(); }
  }, 160);
});

if (!morphOn) updateBrandFallback();

/* Hamburger: opens and closes the drop-down menu */
function closeMenu() {
  nav.classList.remove('menu-open');
  hamburger.setAttribute('aria-expanded', 'false');
}
hamburger.addEventListener('click', () => {
  const open = nav.classList.toggle('menu-open');
  hamburger.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', closeMenu));
document.addEventListener('click', e => {
  if (nav.classList.contains('menu-open') && !e.target.closest('#nav'))
    closeMenu();
});

/* ------------------------------------------------------------
   Initial reveals + footer year
   ------------------------------------------------------------ */
observeReveals(document);
document.getElementById('year').textContent = new Date().getFullYear();
