/* ─── ScrollTrigger Animations ──────────────────────────────── */

function initScrollAnimations() {
  if (prefersReducedMotion()) {
    document.querySelectorAll(
      '.section__eyebrow, .section__title, .about__p, .chip, .timeline-item, .contact__tagline'
    ).forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; el.style.clipPath = 'none'; });
    return;
  }

  /* ── Line reveal: wraps el in overflow:hidden and slides up ── */
  function lineReveal(el, trigger, vars = {}) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'overflow:hidden;display:block;';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);

    return gsap.from(el, {
      yPercent: 105,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: trigger || wrap, start: 'top 88%' },
      ...vars,
    });
  }

  /* ── Clip-path reveal: element sweeps in (wipe effect) ──────── */
  function clipReveal(el, trigger, vars = {}) {
    return gsap.fromTo(el,
      { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: trigger || el, start: 'top 85%' },
        ...vars,
      }
    );
  }

  /* ── Section eyebrows ───────────────────── */
  document.querySelectorAll('.section__eyebrow').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      x: -20,
      duration: .7,
      ease: 'power3.out',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top 85%' },
    });
  });

  /* ── Section titles (line reveal) ──────── */
  document.querySelectorAll('.section__title').forEach(el => {
    lineReveal(el, null, { delay: .1 });
  });

  /* ─────────────────────────────────────── */
  /* ABOUT                                   */
  /* ─────────────────────────────────────── */
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    /* Paragraphs: clip-path wipe */
    aboutSection.querySelectorAll('.about__p').forEach((el, i) => {
      clipReveal(el, '.about__paragraphs', { delay: i * .12 });
    });

    /* Image: clip reveal (wipe down) */
    const imgWrap = aboutSection.querySelector('.about__img-wrap');
    if (imgWrap) {
      gsap.fromTo(imgWrap,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.about__visual', start: 'top 80%' } }
      );
    }

    /* Image parallax */
    const img = aboutSection.querySelector('.about__img');
    if (img) {
      gsap.to(img, {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
    }

    /* Floating tag */
    const tag = aboutSection.querySelector('.about__tag');
    if (tag) {
      gsap.from(tag, {
        opacity: 0, scale: .8, duration: .7, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.about__visual', start: 'top 70%' },
        delay: .6,
      });
    }

    /* Counters */
    const counters = aboutSection.querySelectorAll('.counter[data-target]');
    if (counters.length) {
      ScrollTrigger.create({
        trigger: '.about__stats', start: 'top 85%', once: true,
        onEnter: () => counters.forEach(el =>
          animateCounter(el, 0, parseInt(el.dataset.target), 1.8, el.dataset.suffix || '')
        ),
      });
    }
  }

  /* ─────────────────────────────────────── */
  /* SKILLS — chip cascade                   */
  /* ─────────────────────────────────────── */
  document.querySelector('.skills')?.querySelectorAll('.skill-category').forEach((cat, ci) => {
    gsap.to(cat.querySelectorAll('.chip'), {
      opacity: 1, y: 0, duration: .5, stagger: .055,
      ease: 'back.out(1.6)', delay: ci * .08,
      scrollTrigger: { trigger: cat, start: 'top 85%' },
    });
  });

  /* ─────────────────────────────────────── */
  /* EXPERIENCE — line + items               */
  /* ─────────────────────────────────────── */
  const expSection = document.querySelector('.experience');
  if (expSection) {
    const track = expSection.querySelector('.timeline__track');
    if (track) {
      const totalH = expSection.querySelector('.timeline__track-ghost')?.offsetHeight || 600;
      gsap.set(track, { height: 0 });
      gsap.to(track, {
        height: totalH, ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: 1 },
      });
    }

    expSection.querySelectorAll('.timeline-item').forEach(item => {
      clipReveal(item, item, { duration: .8 });
    });
  }

  /* ─────────────────────────────────────── */
  /* CONTACT                                 */
  /* ─────────────────────────────────────── */
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    /* Tagline: line reveal */
    const tagline = contactSection.querySelector('.contact__tagline');
    if (tagline) lineReveal(tagline);

    /* Everything else */
    const others = contactSection.querySelectorAll(
      '.section__eyebrow, .contact__desc, .contact__email, .contact__socials, .contact__form'
    );
    gsap.set(others, { opacity: 0, y: 24 });
    gsap.to(others, {
      opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out',
      scrollTrigger: { trigger: contactSection, start: 'top 78%' },
      delay: .2,
    });
  }
}

/* ── Nav scroll state ──────────────────── */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  ScrollTrigger.create({
    start: 'top -60px',
    onUpdate: self => nav.classList.toggle('is-scrolled', self.progress > 0),
  });
}
