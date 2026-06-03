'use strict';
/* ═══════════════════════════════════════════════════════
   HEPPYZ SALON — Main JavaScript
   Lenis Smooth Scroll · Navbar · Mobile Menu · Loader
   ═══════════════════════════════════════════════════════ */

(function () {

// ─── 1. LENIS SMOOTH SCROLL ───
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: !prefersReducedMotion,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ─── 2. GSAP + SCROLLTRIGGER ───
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ─── 3. NAVBAR SCROLL BEHAVIOR ───
const navbar = document.querySelector('.navbar');
if (navbar) {
  ScrollTrigger.create({
    start: 'top -80px',
    onEnter: () => navbar.classList.add('navbar--scrolled'),
    onLeaveBack: () => navbar.classList.remove('navbar--scrolled'),
  });

  // Initial check
  if (window.scrollY > 80) {
    navbar.classList.add('navbar--scrolled');
  }
}

// ─── 4. ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === 'index.html' && (href === '/' || href === 'index.html'))) {
    link.classList.add('active');
  }
});

// ─── 5. MOBILE MENU ───
const menuBtn = document.querySelector('.nav-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelectorAll('.mobile-menu__link');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    menuBtn.classList.toggle('is-active');
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      // Focus trap: focus first link
      const firstLink = mobileMenu.querySelector('.mobile-menu__link');
      if (firstLink) firstLink.focus();

      if (!prefersReducedMotion) {
        gsap.fromTo('.mobile-menu__link',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        document.querySelectorAll('.mobile-menu__link').forEach(link => {
          link.style.opacity = '1';
        });
      }
    }
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuBtn.classList.remove('is-active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      menuBtn.classList.remove('is-active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus();
    }
  });
}

// ─── 6. PAGE LOADER ───
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    gsap.to('.loader-bar__fill', {
      width: '100%', duration: 0.8, ease: 'power2.in',
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0, duration: 0.4, delay: 0.2,
          onComplete: () => {
            loader.style.display = 'none';
            document.body.style.overflow = '';
          }
        });
      }
    });
  }
});

// ─── 7. TESTIMONIAL SLIDER ───
const slider = document.querySelector('.testimonial-slider');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

if (slider && prevBtn && nextBtn) {
  const cardWidth = 344; // 320px card + 24px gap

  nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
  prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  // Auto-scroll
  let autoScroll = setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }, 4000);

  slider.addEventListener('mouseenter', () => clearInterval(autoScroll));
  slider.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);
  });
}

// ─── 8. GALLERY FILTER ───
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.setAttribute('data-hidden', 'false');
        item.style.display = '';
        gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
      } else {
        gsap.to(item, {
          opacity: 0, scale: 0.95, duration: 0.3,
          onComplete: () => {
            item.setAttribute('data-hidden', 'true');
            item.style.display = 'none';
          }
        });
      }
    });
  });
});

// ─── 9. LIGHTBOX ───
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');
let lightboxImages = [];
let lightboxIndex = 0;

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  const img = item.querySelector('img');
  if (img) {
    lightboxImages.push(img.src);
    item.addEventListener('click', () => {
      lightboxIndex = i;
      openLightbox(img.src);
    });
  }
});

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex];
});
if (lightboxNext) lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  lightboxImg.src = lightboxImages[lightboxIndex];
});

document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
  if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
});

// Touch swipe for lightbox
let touchStartX = 0;
if (lightbox) {
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  lightbox.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && lightboxNext) lightboxNext.click();
      else if (lightboxPrev) lightboxPrev.click();
    }
  });
}

// ─── 10. SERVICE TABS ───
const serviceTabs = document.querySelectorAll('.service-tab');
serviceTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    serviceTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = document.querySelector(tab.dataset.target);
    if (target) {
      lenis.scrollTo(target, { offset: -120 });
    }
  });
});

})();
