/* ═══════════════════════════════════════════════════
   HEPPYZ SALON — Scroll Animations (GSAP + ScrollTrigger)
   Universal reveals for ALL pages
   ═══════════════════════════════════════════════════ */

(function () {

document.addEventListener('DOMContentLoaded', () => {

  // ─── GUARD: Skip if GSAP not loaded ───
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Fallback: show everything if GSAP fails
    document.querySelectorAll('[data-reveal], [data-reveal-stagger] > *').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // ─── CHECK REDUCED MOTION ───
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // CSS handles visibility

  gsap.registerPlugin(ScrollTrigger);

  // ═══ UNIVERSAL REVEALS ═══

  // ── [data-reveal] — Fade up on scroll ──
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // ── [data-reveal-stagger] — Children stagger in ──
  gsap.utils.toArray('[data-reveal-stagger]').forEach(container => {
    const children = container.children;
    if (!children.length) return;
    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // ── [data-card] — Individual card pop ──
  gsap.utils.toArray('[data-card]').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // ── .section-title — Clip reveal ──
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // ── .eyebrow — Slide in ──
  gsap.utils.toArray('.eyebrow').forEach(eyebrow => {
    gsap.fromTo(eyebrow,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: eyebrow,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // ── .section-divider — Width grow ──
  gsap.utils.toArray('.section-divider').forEach(div => {
    gsap.fromTo(div,
      { width: '0%' },
      {
        width: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: div,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // ═══ PAGE-SPECIFIC ANIMATIONS ═══

  // ── HERO (Homepage) — Entrance ──
  const hero = document.querySelector('.hero');
  if (hero) {
    const tl = gsap.timeline({ delay: 0.3 });
    const heroTitle = hero.querySelector('.hero__title');
    const heroSub = hero.querySelector('.hero__subtitle');
    const heroCta = hero.querySelector('.hero__cta-row');
    const heroEye = hero.querySelector('.hero__eyebrow');

    if (heroEye) tl.fromTo(heroEye, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 });
    if (heroTitle) tl.fromTo(heroTitle, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2');
    if (heroSub) tl.fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
    if (heroCta) tl.fromTo(heroCta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
  }

  // ── GALLERY — Mosaic cells stagger ──
  const mosaicCells = document.querySelectorAll('.mosaic-cell');
  if (mosaicCells.length) {
    gsap.fromTo(mosaicCells,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.mosaic-grid',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // ── SERVICES — Service items stagger ──
  gsap.utils.toArray('.service-section').forEach(section => {
    const items = section.querySelectorAll('.service-item');
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  // ── ABOUT — Team cards stagger ──
  const teamCards = document.querySelectorAll('.team-card');
  if (teamCards.length) {
    gsap.fromTo(teamCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // ── ABOUT — Stats counter animation ──
  gsap.utils.toArray('.stat-item__number').forEach(stat => {
    const endVal = parseInt(stat.textContent) || 0;
    if (endVal > 0) {
      const obj = { val: 0 };
      const suffix = stat.textContent.replace(/[0-9]/g, '');
      gsap.to(obj, {
        val: endVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => { stat.textContent = Math.round(obj.val) + suffix; },
      });
    }
  });

  // ── PARALLAX — Subtle on hero images ──
  const parallaxBgs = document.querySelectorAll('.hero__bg img, .about-hero__bg img');
  parallaxBgs.forEach(img => {
    gsap.to(img, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('section') || img.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  });

  // ── FOOTER — Fade up ──
  const footer = document.querySelector('.footer');
  if (footer) {
    gsap.fromTo(footer,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 95%',
          once: true,
        },
      }
    );
  }

}); // DOMContentLoaded

})();
