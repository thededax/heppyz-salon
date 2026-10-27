'use strict';
/* ═══════════════════════════════════════════════════════
   HEPPYZ SALON — Main Architectural JavaScript
   State Management · Interactive Rate Card · Appointment Estimator
   ═══════════════════════════════════════════════════════ */

(function () {

// ─── 1. SERVICES CATALOG DATA ───
const SERVICES_DATA = [
  {
    id: 'haircut',
    name: 'Precision Haircut',
    category: 'hair',
    gender: 'unisex',
    duration: 35,
    durationText: '⏱ 35 mins',
    price: 299,
    priceText: '₹299',
    desc: 'Consultation, precision wash, cut & style tailored to your face shape.',
    popular: true
  },
  {
    id: 'hair-color',
    name: 'Global Hair Color & Highlights',
    category: 'hair',
    gender: 'unisex',
    duration: 90,
    durationText: '⏱ 90 mins',
    price: 799,
    priceText: '₹799+',
    desc: 'Rich vibrant ammonia-free color, root touch-up, highlights or balayage.',
    popular: false
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Smoothing Therapy',
    category: 'hair',
    gender: 'unisex',
    duration: 60,
    durationText: '⏱ 60 mins',
    price: 599,
    priceText: '₹599+',
    desc: 'Intense smoothing treatment eliminating frizz for silky, glossy hair.',
    popular: false
  },
  {
    id: 'hair-spa',
    name: 'Deep Nourish Hair Spa',
    category: 'hair',
    gender: 'unisex',
    duration: 60,
    durationText: '⏱ 60 mins',
    price: 399,
    priceText: '₹399+',
    desc: 'Scalp detox, deep conditioning masque & relaxing head steam.',
    popular: true
  },
  {
    id: 'beard-styling',
    name: 'Beard Craft & Precision Shape',
    category: 'beard',
    gender: 'men',
    duration: 20,
    durationText: '⏱ 20 mins',
    price: 149,
    priceText: '₹149',
    desc: 'Sharp blade edging, trim, hot towel wrap & nourishing beard oil.',
    popular: true
  },
  {
    id: 'head-massage',
    name: 'Herbal Oil Head Massage',
    category: 'hair',
    gender: 'unisex',
    duration: 30,
    durationText: '⏱ 30 mins',
    price: 199,
    priceText: '₹199',
    desc: 'Traditional pressure point acupressure relief with warm herbal oils.',
    popular: false
  },
  {
    id: 'facial-glow',
    name: 'Heppyz Signature Glow Facial',
    category: 'skin',
    gender: 'unisex',
    duration: 60,
    durationText: '⏱ 60 mins',
    price: 599,
    priceText: '₹599+',
    desc: 'Deep multi-layer cleansing, steam extraction, radiance serum & soothing pack.',
    popular: true
  },
  {
    id: 'detox-cleanup',
    name: 'Detox Pore-Deep Cleanup',
    category: 'skin',
    gender: 'unisex',
    duration: 45,
    durationText: '⏱ 45 mins',
    price: 499,
    priceText: '₹499',
    desc: 'Targeted blackhead extraction, pore tightening & instant skin hydration.',
    popular: false
  },
  {
    id: 'de-tan',
    name: 'Active Radiance De-Tan',
    category: 'skin',
    gender: 'unisex',
    duration: 30,
    durationText: '⏱ 30 mins',
    price: 349,
    priceText: '₹349',
    desc: 'Reverses sun tan and hyperpigmentation with safe milk peptides.',
    popular: true
  },
  {
    id: 'anti-acne',
    name: 'Anti-Acne Purifying Facial',
    category: 'skin',
    gender: 'unisex',
    duration: 45,
    durationText: '⏱ 45 mins',
    price: 449,
    priceText: '₹449+',
    desc: 'Tea-tree & salicylic clarifying therapy to calm breakouts and control sebum.',
    popular: false
  },
  {
    id: 'express-cleanup',
    name: 'Express Refresh Cleanup',
    category: 'skin',
    gender: 'unisex',
    duration: 30,
    durationText: '⏱ 30 mins',
    price: 249,
    priceText: '₹249',
    desc: 'Quick cleanse, gentle walnut scrub & moisture boost for busy schedules.',
    popular: false
  },
  {
    id: 'party-makeup',
    name: 'Glamour Party Makeup',
    category: 'makeup',
    gender: 'women',
    duration: 60,
    durationText: '⏱ 60 mins',
    price: 699,
    priceText: '₹699+',
    desc: 'Long-wear glowing evening makeup, contouring, eye glam & lashes styling.',
    popular: true
  },
  {
    id: 'pro-makeup',
    name: 'HD Professional Makeup',
    category: 'makeup',
    gender: 'women',
    duration: 90,
    durationText: '⏱ 90 mins',
    price: 999,
    priceText: '₹999+',
    desc: 'High-definition waterproof finish for portraits, photo shoots & events.',
    popular: false
  },
  {
    id: 'engagement-look',
    name: 'Engagement Complete Look',
    category: 'makeup',
    gender: 'women',
    duration: 120,
    durationText: '⏱ 2 hrs',
    price: 1499,
    priceText: '₹1499+',
    desc: 'Hair styling, saree/lehenga draping, and flawless radiant trial glam.',
    popular: false
  },
  {
    id: 'bridal-makeover',
    name: 'Complete Royal Bridal Makeover',
    category: 'makeup',
    gender: 'women',
    duration: 210,
    durationText: '⏱ 3.5 hrs',
    price: 2499,
    priceText: '₹2499+',
    desc: 'HD airbrush waterproof bridal base, luxury eye craft, draping & accessory styling.',
    popular: true
  }
];

const COMBOS_DATA = [
  {
    id: 'combo-sharp',
    name: 'The Everyday Sharp Combo',
    badge: 'SAVE 23%',
    audience: "MEN'S GROOMING",
    regularPrice: 647,
    comboPrice: 499,
    duration: 60,
    durationText: '~60 Mins',
    desc: 'Precision haircut, beard craft edging, and a revitalizing herbal oil head massage.',
    items: ['Precision Haircut', 'Beard Styling / Clean Shave', 'Herbal Oil Head Massage']
  },
  {
    id: 'combo-glow',
    name: 'Weekend Glow & De-Tan Pack',
    badge: 'SAVE 24%',
    audience: 'UNISEX FAVORITE',
    regularPrice: 1047,
    comboPrice: 799,
    duration: 75,
    durationText: '~75 Mins',
    desc: 'Haircut, instant brightness sun-tan removal, and deep nourishing hair spa.',
    popular: true,
    items: ['Precision Haircut', 'Active Radiance De-Tan', 'Deep Nourish Hair Spa']
  },
  {
    id: 'combo-event',
    name: 'Pre-Event Complete Makeover',
    badge: 'SAVE 23%',
    audience: 'PARTY & FESTIVE',
    regularPrice: 1697,
    comboPrice: 1299,
    duration: 120,
    durationText: '~120 Mins',
    desc: 'Comprehensive glam prep: Hair spa therapy, detox glow facial, and party styling.',
    items: ['Deep Nourish Hair Spa', 'Heppyz Signature Glow Facial', 'Glamour Party Styling / Makeup']
  }
];

// ─── 2. REACTIVE STATE (SESSION STORAGE SYNC) ───
let selectedServices = [];

try {
  const saved = sessionStorage.getItem('heppyz_selected_services');
  if (saved) {
    selectedServices = JSON.parse(saved);
  }
} catch (e) {
  selectedServices = [];
}

function saveState() {
  try {
    sessionStorage.setItem('heppyz_selected_services', JSON.stringify(selectedServices));
  } catch (e) {}
}

function getTotals() {
  let count = selectedServices.length;
  let duration = 0;
  let price = 0;

  selectedServices.forEach(item => {
    duration += Number(item.duration) || 0;
    price += Number(item.price) || 0;
  });

  return { count, duration, price };
}

// ─── 3. STATE MUTATIONS ───
window.heppyzSelectService = function (id) {
  const service = SERVICES_DATA.find(s => s.id === id);
  if (!service) return;

  const existingIndex = selectedServices.findIndex(s => s.id === id);
  if (existingIndex >= 0) {
    selectedServices.splice(existingIndex, 1);
  } else {
    selectedServices.push({
      id: service.id,
      name: service.name,
      duration: service.duration,
      durationText: service.durationText,
      price: service.price,
      priceText: service.priceText
    });
  }

  saveState();
  updateUI();
};

window.heppyzRemoveService = function (id) {
  selectedServices = selectedServices.filter(s => s.id !== id);
  saveState();
  updateUI();
};

window.heppyzClearServices = function () {
  selectedServices = [];
  saveState();
  updateUI();
};

window.heppyzSelectCombo = function (comboId) {
  const combo = COMBOS_DATA.find(c => c.id === comboId);
  if (!combo) return;

  // Add combo as bundled item
  const existing = selectedServices.find(s => s.id === combo.id);
  if (!existing) {
    selectedServices.push({
      id: combo.id,
      name: combo.name + ' (Combo Package)',
      duration: combo.duration,
      durationText: combo.durationText,
      price: combo.comboPrice,
      priceText: '₹' + combo.comboPrice
    });
    saveState();
    updateUI();
  }

  // Scroll smoothly to appointment booking hub
  const bookingHub = document.getElementById('book-slot') || document.getElementById('whatsapp-booking-form');
  if (bookingHub) {
    bookingHub.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ─── 4. UI UPDATE & RENDERING ───
function updateUI() {
  const { count, duration, price } = getTotals();

  // 1. Update Navbar Cart Pill
  document.querySelectorAll('.nav-cart-pill').forEach(pill => {
    pill.classList.toggle('has-items', count > 0);
    const countEl = pill.querySelector('.nav-cart-pill__count');
    if (countEl) countEl.textContent = count;
  });

  // 2. Update Rate Card buttons & card styles
  document.querySelectorAll('.service-row-card').forEach(card => {
    const id = card.dataset.serviceId;
    const isSelected = selectedServices.some(s => s.id === id);
    card.classList.toggle('is-selected', isSelected);

    const btn = card.querySelector('.service-select-btn');
    if (btn) {
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      btn.innerHTML = isSelected
        ? '<span class="material-symbols-outlined" style="font-size:16px;">check</span> Selected'
        : '<span class="material-symbols-outlined" style="font-size:16px;">add</span> Select';
    }
  });

  // 3. Update Floating Summary Bar
  const floatBar = document.getElementById('floating-summary');
  if (floatBar) {
    const isVisible = count > 0;
    floatBar.classList.toggle('is-visible', isVisible);
    document.body.classList.toggle('has-floating-summary', isVisible);
    const countEl = floatBar.querySelector('.floating-summary-count');
    const durEl = floatBar.querySelector('.floating-summary-duration');
    const totEl = floatBar.querySelector('.floating-summary-total');

    if (countEl) countEl.textContent = `${count} ${count === 1 ? 'Service' : 'Services'} Selected`;
    if (durEl) durEl.textContent = `~${duration} Mins`;
    if (totEl) totEl.textContent = `₹${price}`;
  }

  // 4. Update Booking Hub Summary Box
  document.querySelectorAll('.selected-services-box').forEach(box => {
    const listEl = box.querySelector('.selected-services-list');
    const emptyEl = box.querySelector('.selected-services-empty');
    const durEl = box.querySelector('.totals-duration');
    const totEl = box.querySelector('.totals-amount');
    const summaryCard = box.closest('.booking-hub-form-col') || box;

    if (count === 0) {
      if (listEl) listEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      if (durEl) durEl.textContent = '0 Mins';
      if (totEl) totEl.textContent = '₹0';
    } else {
      if (emptyEl) emptyEl.style.display = 'none';
      if (durEl) durEl.textContent = `~${duration} Mins Est.`;
      if (totEl) totEl.textContent = `₹${price}`;

      if (listEl) {
        listEl.innerHTML = selectedServices.map(item => `
          <div class="selected-service-pill">
            <span>${item.name}</span>
            <span class="pill-price">${item.priceText}</span>
            <button type="button" class="pill-remove" onclick="window.heppyzRemoveService('${item.id}')" aria-label="Remove ${item.name}">✕</button>
          </div>
        `).join('');
      }
    }
  });

  // 5. Update Sidebar Estimator on Services Page
  document.querySelectorAll('.sticky-estimator-sidebar').forEach(sidebar => {
    const listEl = sidebar.querySelector('.selected-services-list');
    const emptyEl = sidebar.querySelector('.sticky-estimator-empty');
    const contentEl = sidebar.querySelector('.sticky-estimator-content');
    const durEl = sidebar.querySelector('.totals-duration');
    const totEl = sidebar.querySelector('.totals-amount');

    if (count === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      if (contentEl) contentEl.style.display = 'none';
    } else {
      if (emptyEl) emptyEl.style.display = 'none';
      if (contentEl) contentEl.style.display = 'block';
      if (durEl) durEl.textContent = `~${duration} Mins`;
      if (totEl) totEl.textContent = `₹${price}`;

      if (listEl) {
        listEl.innerHTML = selectedServices.map(item => `
          <div class="selected-service-pill" style="width:100%; justify-content:space-between; margin-bottom:6px;">
            <span>${item.name}</span>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="pill-price">${item.priceText}</span>
              <button type="button" class="pill-remove" onclick="window.heppyzRemoveService('${item.id}')" aria-label="Remove ${item.name}">✕</button>
            </div>
          </div>
        `).join('');
      }
    }
  });

  // Announce polite live status for accessibility
  const liveRegion = document.getElementById('a11y-live-announcer');
  if (liveRegion) {
    liveRegion.textContent = count > 0
      ? `Appointment estimator updated: ${count} services selected, total duration ${duration} minutes, total price ₹${price}`
      : 'All services cleared from appointment estimator';
  }
}

// ─── 5. RATE CARD DYNAMIC FILTERING ───
function initRateCardFilters() {
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const genderPills = document.querySelectorAll('.gender-pill-btn');
  const searchInput = document.querySelector('.service-search-input');
  const serviceCards = document.querySelectorAll('.service-row-card');

  if (!serviceCards.length) return;

  let activeCategory = 'all';
  let activeGender = 'all';
  let searchQuery = '';

  function filterCards() {
    serviceCards.forEach(card => {
      const cat = card.dataset.category || '';
      const gen = card.dataset.gender || 'unisex';
      const name = (card.querySelector('.service-row-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.service-row-desc')?.textContent || '').toLowerCase();

      const matchCat = activeCategory === 'all' || cat === activeCategory;
      const matchGen = activeGender === 'all' || gen === activeGender || gen === 'unisex';
      const matchSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery);

      if (matchCat && matchGen && matchSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.dataset.category || 'all';
      filterCards();
    });
  });

  genderPills.forEach(pill => {
    pill.addEventListener('click', () => {
      genderPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeGender = pill.dataset.gender || 'all';
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }
}

// ─── 6. APPOINTMENT TIME SLOT PICKER ───
function initTimeSlotPills() {
  document.querySelectorAll('.time-slot-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const parent = pill.closest('.time-slot-pills');
      if (parent) {
        parent.querySelectorAll('.time-slot-pill').forEach(p => p.classList.remove('active'));
      }
      pill.classList.add('active');

      const hiddenInput = document.getElementById('selected-time-slot');
      if (hiddenInput) {
        hiddenInput.value = pill.dataset.slot || pill.innerText.trim();
      }
    });
  });
}

// ─── 7. NAVBAR SCROLL & MOBILE MENU ───
function initNav() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }, { passive: true });
  }

  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      menuBtn.classList.toggle('is-active');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        menuBtn.classList.remove('is-active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link highlight
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && (href === '/' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });
}

// ─── 8. GALLERY FILTER & LIGHTBOX ───
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  const lightboxPrev = lightbox.querySelector('.lightbox__prev');
  const lightboxNext = lightbox.querySelector('.lightbox__next');
  let images = [];
  let currentIndex = 0;

  galleryCards.forEach((card, idx) => {
    const img = card.querySelector('img');
    if (img) {
      images.push(img.src);
      card.addEventListener('click', () => {
        currentIndex = idx;
        openLightbox(img.src);
      });
    }
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex];
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
    if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
  });
}

// ─── 9. PAGE LOADER ───
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }, 200);
  }
});

// ─── 10. INITIALIZATION ON DOM READY ───
document.addEventListener('DOMContentLoaded', () => {
  // Create accessibility live announcer if missing
  if (!document.getElementById('a11y-live-announcer')) {
    const announcer = document.createElement('div');
    announcer.id = 'a11y-live-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
    document.body.appendChild(announcer);
  }

  initNav();
  initRateCardFilters();
  initTimeSlotPills();
  initGallery();
  updateUI();
});

})();
