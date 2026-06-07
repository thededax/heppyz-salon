'use strict';
/* ═══════════════════════════════════════════════════════
   HEPPYZ SALON — Main JavaScript
   Lenis Smooth Scroll · Navbar · Mobile Menu · Loader
   ═══════════════════════════════════════════════════════ */

(function () {

// ─── 1. LENIS SMOOTH SCROLL ───
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

function initLenis() {
  if (typeof Lenis === 'undefined' || prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect with GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
}

// Try init immediately, and also on DOMContentLoaded as fallback
initLenis();
document.addEventListener('DOMContentLoaded', () => {
  if (!lenis) initLenis();
});
// Also try on load as final fallback for defer scripts
window.addEventListener('load', () => {
  if (!lenis) initLenis();
});

// ─── 2. NAVBAR SCROLL BEHAVIOR ───
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    // Use plain scroll listener for robustness
    function checkScroll() {
      if (window.scrollY > 80) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // Also use ScrollTrigger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        start: 'top -80px',
        onEnter: () => navbar.classList.add('navbar--scrolled'),
        onLeaveBack: () => navbar.classList.remove('navbar--scrolled'),
      });
    }
  }

  // ─── 3. ACTIVE NAV LINK ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && (href === '/' || href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // ─── 4. MOBILE MENU ───
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
        const firstLink = mobileMenu.querySelector('.mobile-menu__link');
        if (firstLink) firstLink.focus();

        if (!prefersReducedMotion && typeof gsap !== 'undefined') {
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
});

// ─── 5. PAGE LOADER ───
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  if (typeof gsap !== 'undefined') {
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
  } else {
    // Fallback if GSAP not loaded
    loader.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// ─── 6. TESTIMONIAL SLIDER ───
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.testimonial-slider');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slider && prevBtn && nextBtn) {
    const cardWidth = 400;

    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Only auto-scroll on tablet (768–991px), disable on mobile to avoid touch jank
    function shouldAutoScroll() {
      return window.innerWidth >= 768 && window.innerWidth < 992;
    }

    let autoScroll = setInterval(() => {
      if (!shouldAutoScroll()) return;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);

    slider.addEventListener('mouseenter', () => clearInterval(autoScroll));
    slider.addEventListener('mouseleave', () => {
      autoScroll = setInterval(() => {
        if (!shouldAutoScroll()) return;
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 5000);
    });
  }
});

// ─── 7. GALLERY FILTER ───
document.addEventListener('DOMContentLoaded', () => {
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
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(item, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4 });
          }
        } else {
          if (typeof gsap !== 'undefined') {
            gsap.to(item, {
              opacity: 0, scale: 0.95, duration: 0.3,
              onComplete: () => {
                item.setAttribute('data-hidden', 'true');
                item.style.display = 'none';
              }
            });
          } else {
            item.setAttribute('data-hidden', 'true');
            item.style.display = 'none';
          }
        }
      });
    });
  });
});

// ─── 8. LIGHTBOX ───
document.addEventListener('DOMContentLoaded', () => {
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
});

// ─── 9. SERVICE TABS ───
document.addEventListener('DOMContentLoaded', () => {
  const serviceTabs = document.querySelectorAll('.service-tab');
  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = document.querySelector(tab.dataset.target);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -120 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

// ─── 10. MOBILE BOTTOM NAVIGATION ───
document.addEventListener('DOMContentLoaded', () => {
  const bottomNav = document.createElement('div');
  bottomNav.className = 'bottom-nav';

  const path = window.location.pathname.toLowerCase();
  
  const navItems = [
    { href: 'index.html', icon: 'home', label: 'Home' },
    { href: 'services.html', icon: 'content_cut', label: 'Services' },
    { href: 'gallery.html', icon: 'photo_library', label: 'Gallery' },
    { href: 'about.html', icon: 'info', label: 'About' },
    { href: 'contact.html', icon: 'mail', label: 'Contact' }
  ];

  bottomNav.innerHTML = navItems.map(item => {
    let isActive = false;
    const baseHref = item.href.replace('.html', '');
    if (path.indexOf(item.href) !== -1 || path.endsWith('/' + baseHref) || path.endsWith('/' + baseHref + '/')) {
      isActive = true;
    } else if (item.href === 'index.html' && (path === '' || path === '/' || path.endsWith('/index') || path.endsWith('/index/') || path.endsWith('index.html'))) {
      isActive = true;
    }
    const activeClass = isActive ? 'active' : '';
    return `
      <a href="${item.href}" class="bottom-nav__item ${activeClass}">
        <span class="material-symbols-outlined">${item.icon}</span>
        <span class="bottom-nav__label">${item.label}</span>
      </a>
    `;
  }).join('');

  document.body.appendChild(bottomNav);
});

})();

