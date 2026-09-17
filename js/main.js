/* ============================================================
   Soho Printing Press — interactions
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   Portfolio data (transcribed from the listings' description.md)
   ------------------------------------------------------------ */
const LISTINGS = [
  {
    id: '01', folder: '01_staunton_and_aberdeen', photos: 9,
    name: 'Staunton & Aberdeen',
    specs: ['2 Bedroom', '2 Bathroom', 'Communal Roof'],
    map: 'art/maps/staunton-street-listing-map.html',
    desc: `When your travels next take you from Soho to PMQ along Staunton Street, take a moment to glance up at the 4/F of the Tong Lau that sits at the intersection of Aberdeen Street. You may notice a vast expanse of old style (but newly built) windows that extend across the front and sides of the building, giving front row views of PMQ and nothing but sky. This may be one of the biggest and sunniest Tong Lau homes available in Soho, with two king size en-suite bedrooms and walk-in closets. Gather your friends for dining and cocktails around the massive granite topped center counter, or go up to the roof to take in the city views.`
  },
  {
    id: '02', folder: '02_tank_lane_shop_house', photos: 12,
    name: 'Tank Lane Shop House',
    specs: ['Our Office', 'Base of Operations'],
    map: null,
    desc: `This is our office and base of operations, well situated to respond to tenants' needs as and when they arise. It is right in the middle of all the Soho Printing Press flats, which extend from Po Yan Street in Sheung Wan to Gage Street in Central. Like all the properties in our portfolio, the Soho Printing Press shop house was renovated to retain as much of the original character as possible while upgrading the facilities to meet the standards of a modern lifestyle.`
  },
  {
    id: '03', folder: '03_hollywood_and_centre_stage', photos: 12,
    name: 'Hollywood & Centre Stage',
    specs: ['1 Bedroom', '1 Bathroom'],
    map: null,
    desc: `The entrance to this lair is accessed via an almost secret alley that connects Hollywood Road and Staunton Street, right near Man Mo temple. You've probably passed it a thousand times as you stop for coffee at Centre Stage Classified but had no idea where it leads. Behind the copper clad door at the entrance of this home on the 4/F, more intrigue awaits: exposed brick walls, enough bookshelves to start your own library, and bathroom and kitchen designs that will make you never want to leave. The wall of windows along the front of the flat offers commanding views of all that happens along Hollywood Road — but the gourmet creations you make on your 4-burner Viking stove will likely be more of a distraction.`
  },
  {
    id: '04', folder: '04_gage_street_market_lofts', photos: 6,
    name: 'Gage Street Market Lofts',
    specs: ['Seven 1 Bedroom', '1 Bathroom', '2 with Roofs'],
    map: null,
    desc: `From the escalator, as you cross Lyndhurst Terrace, look to the west and you will see the banner that identifies the building that is home to the seven flats we call Gage Street Market Lofts. You could not be closer to the escalator, the wet markets, your gym, the airport express and possibly even your office. These seven flats are all open kitchen and living area with a separate enclosed bedroom and bathroom area. All units in the building have been renovated and are now occupied by young professionals who enjoy being in the heart of Central.`
  },
  {
    id: '05', folder: '05_lantau_beach_bungalow', photos: 12,
    name: 'Lantau Beach Bungalow',
    specs: ['1 Bedroom', '1 Bathroom', '1 Balcony'],
    map: null,
    desc: `If you ever dreamed of running away to the furthest corner of Hong Kong where no one could ever find you — where you could find deserted beaches and hiking trails, but still go home to soak in your two-person bathtub jacuzzi — this is the home for you. Keep going along the main road till you pass two prisons, a reservoir, and just before you start heading up to the Big Buddha, make a left down a winding road to a fishing village that most people in Hong Kong have no idea exists. Here you will find the tranquility that you thought could never have existed in Hong Kong. Wake up to birds singing on your balcony as you watch the sun rise over the China Sea.`
  },
  {
    id: '06', folder: '06_lower_peel_street', photos: 7,
    name: 'Lower Peel Street',
    specs: ['2 Bedroom', '2 Bathroom', '1 Long Balcony'],
    map: null,
    desc: `For those who love fresh ingredients from Hong Kong's Gage Street market, this is the home to discover. Just half a block up from the markets is this recently restored classic. Embrace the openness of the vast living room separating the two bedroom spaces, or step out onto the open-air balcony to enjoy the sunset over the Hong Kong low-rise buildings across the street. Take special note of the classic tiles on the balcony, salvaged from a Wanchai demolition, or the well-worn antique pine flooring imported from the States.`
  },
  {
    id: '07', folder: '07_po_hing_fong_shop_house', photos: 7,
    name: 'Po Hing Fong Shop House',
    specs: ['1 Bedroom', '1 Bathroom', '1 Front Porch'],
    map: null,
    desc: `Saunter a few steps past the basketball courts of Po Hing Fong, down the hill leading towards Po Yan Street and Tung Wah Hospital, and you will find a row of well-preserved shop houses on the steps of Po Hing Fong. Behind one of these facades is one of the closest restorations you will find to a real New York Soho loft in Hong Kong. With ceiling heights — and bookshelves — approaching sixteen feet, there is no shortage of drama in this downtown loft design.`
  },
  {
    id: '08', folder: '08_circular_pathway', photos: 8,
    name: 'Circular Pathway',
    specs: ['2 Bedrooms', '2.5 Bathrooms', '2 Terraces'],
    map: null,
    desc: `Tucked away on a quiet lane below Hollywood Road, near Man Mo Temple, lies this classic Tong Lau home with views through a line of trees to the classic stretch of Cat Street. As you pass the shops that dot Circular Pathway and ascend to the second floor, you will feel as though you have been transported back to a simpler, quieter time in Hong Kong — with all the modern amenities you could ask for, including a wine fridge and a gas BBQ.`
  },
  {
    id: '09', folder: '09_ulam_penthouses_a_and_b', photos: 4,
    name: 'Ulam Penthouses A & B',
    specs: ['Two 2 Bedroom', '2 Bathroom', 'Terrace-Roof'],
    map: null,
    desc: `Between Caine and Bridges Street, just above the YMCA on Bridges Street, lies the pedestrian-only Ulam Terrace and our two penthouse flats, each with 2 bedrooms and 2 bathrooms. The building has great light and great views over the low-rise Sheung Wan neighborhood and the classic medical museum at the rear of the building. Step out onto either balcony from the living or master bedroom to have your breakfast in the morning, or a glass of wine at the end of the day. The roof offers incredible options to entertain your friends — or even cool off in the rain shower.`
  }
];

const photoSrc = (listing, n) =>
  `listings/${listing.folder}/${String(n).padStart(2, '0')}.jpg`;

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

function syncMap() {
  const L = LISTINGS[current];
  if (L.map) {
    if (mapIframe.getAttribute('src') !== L.map) mapIframe.src = L.map;
    if (mapRevealed) mapLayer.classList.add('on');
  } else {
    mapLayer.classList.remove('on');
  }
}

function buildGallery(listing) {
  vGallery.innerHTML = '';
  for (let i = 1; i <= listing.photos; i++) {
    const btn = document.createElement('button');
    btn.className = 'gallery-item reveal';
    btn.type = 'button';
    btn.setAttribute('aria-label', `View photo ${i} of ${listing.name}`);
    const img = document.createElement('img');
    img.src = photoSrc(listing, i);
    img.alt = `${listing.name} — photo ${i}`;
    img.loading = 'lazy';
    btn.appendChild(img);
    btn.addEventListener('click', () => openLightbox(listing, i - 1));
    vGallery.appendChild(btn);
  }
  observeReveals(vGallery);
}

function renderListing(idx, { scroll = false } = {}) {
  const next = (idx + LISTINGS.length) % LISTINGS.length;
  const apply = () => {
    current = next;
    const L = LISTINGS[current];
    vNum.textContent = `Nº ${L.id}`;
    vName.textContent = L.name;
    vChips.innerHTML = L.specs.map(s => `<li>${s}</li>`).join('');
    vDesc.textContent = L.desc;
    vPos.textContent = `${current + 1} / ${LISTINGS.length}`;
    buildGallery(L);
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
    <span class="card-img"><img src="${photoSrc(listing, 1)}" alt="${listing.name}" loading="lazy"></span>
    <span class="card-body">
      <span class="card-num">Nº ${listing.id}</span>
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

function openLightbox(listing, index) {
  lbListing = listing;
  lbIndex = index;
  updateLightbox();
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
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 30);
  if (y > 140 && y > lastY) nav.classList.add('hidden');
  else nav.classList.remove('hidden');
  lastY = y;
}, { passive: true });

/* ------------------------------------------------------------
   Initial reveals + footer year
   ------------------------------------------------------------ */
observeReveals(document);
document.getElementById('year').textContent = new Date().getFullYear();
