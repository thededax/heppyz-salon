'use strict';
/* ═══════════════════════════════════════════════════════
   HEPPYZ SALON — GSAP Scroll Animations
   ═══════════════════════════════════════════════════════ */

(function () {

document.addEventListener('DOMContentLoaded', () => {

  // ─── CHECK REDUCED MOTION ───
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // Skip all GSAP animations

  // ─── HERO ENTRANCE (Homepage) ───
  if (document.querySelector('.hero')) {
    const heroTl = gsap.timeline({ delay: 0.8 });
    heroTl
      .from('.hero__eyebrow', { opacity: 0, y: 20, duration: 0.5 })
      .from('.hero__title span', { opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      .from('.hero__subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero__cta-row', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
      .from('.hero__trust-bar', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
      .from('.hero__image-wrap', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.inOut' }, 0.3)
      .from('.hero__divider', { scaleY: 0, transformOrigin: 'top', duration: 0.8 }, 0.8);
  }

  // ─── SECTION FADE-UP ───
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true },
      opacity: 0, y: 50, duration: 0.8, ease: 'power2.out',
    });
  });

  // ─── STAGGERED CARDS ───
  gsap.utils.toArray('[data-reveal-stagger]').forEach(container => {
    const cards = container.querySelectorAll('[data-card]');
    gsap.from(cards, {
      scrollTrigger: { trigger: container, start: 'top 85%', once: true },
      opacity: 0, y: 60, stagger: 0.12, duration: 0.7, ease: 'power2.out',
    });
  });

  // ─── COUNTERS ───
  gsap.utils.toArray('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const suffix = el.dataset.suffix || '+';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo({ val: 0 }, { val: target }, {
          duration: 2, ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.floor(this.targets()[0].val) + suffix;
          }
        });
      },
      once: true,
    });
  });

  // ─── MARQUEE ───
  const marquee = document.querySelector('.marquee__inner');
  if (marquee) {
    gsap.to(marquee, {
      xPercent: -50, duration: 25, ease: 'none', repeat: -1,
    });
  }

  // ─── PARALLAX HERO IMAGE ───
  if (document.querySelector('.hero__image-wrap img')) {
    gsap.to('.hero__image-wrap img', {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // ─── BENTO GRID REVEAL ───
  gsap.utils.toArray('.bento-cell').forEach((cell, i) => {
    gsap.from(cell, {
      scrollTrigger: { trigger: cell, start: 'top 90%', once: true },
      clipPath: 'inset(0 0 100% 0)', duration: 0.8, delay: i * 0.07,
      ease: 'power3.out',
    });
  });

  // ─── PAGE HERO ENTRANCE ───
  if (document.querySelector('.page-hero__content')) {
    gsap.from('.page-hero__content', {
      opacity: 0, y: 40, duration: 0.8, delay: 0.6, ease: 'power2.out',
    });
  }

  // ─── ABOUT HERO ───
  if (document.querySelector('.about-hero__text')) {
    gsap.from('.about-hero__text', {
      opacity: 0, x: 40, duration: 0.8, delay: 0.5, ease: 'power2.out',
    });
  }

  // ─── GALLERY ITEMS ───
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 92%', once: true },
      opacity: 0, y: 30, duration: 0.6, delay: (i % 3) * 0.08,
      ease: 'power2.out',
    });
  });

  // ─── SERVICE ITEMS ───
  gsap.utils.toArray('.service-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 90%', once: true },
      opacity: 0, x: -30, duration: 0.5, delay: (i % 2) * 0.1,
      ease: 'power2.out',
    });
  });

});

})();
