/* ─── ScrollTrigger Animations ──────────────────────────────── */

function initScrollAnimations() {
  if (prefersReducedMotion()) {
    /* Reveal everything immediately */
    document.querySelectorAll(
      '.section__eyebrow, .section__title, .about__p, .chip, .timeline-item, .contact__inner'
    ).forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  /* ── Shared reveal utility ─────────────── */
  function reveal(trigger, targets, vars = {}) {
    return gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      ...vars,
    });
  }

  /* ── Section eyebrows & titles ────────── */
  document.querySelectorAll('.section__eyebrow').forEach(el => {
    gsap.set(el, { y: 20 });
    reveal(el.closest('.section') || el, el);
  });

  document.querySelectorAll('.section__title').forEach(el => {
    gsap.set(el, { y: 30 });
    reveal(el.closest('.section') || el, el, { duration: 1, delay: .1 });
  });

  /* ─────────────────────────────────────── */
  /* ABOUT                                   */
  /* ─────────────────────────────────────── */
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    /* Paragraphs stagger */
    const paras = aboutSection.querySelectorAll('.about__p');
    gsap.set(paras, { y: 30, opacity: 0 });
    gsap.to(paras, {
      y: 0,
      opacity: 1,
      duration: .8,
      stagger: .18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about__paragraphs',
        start: 'top 80%',
      },
    });

    /* Image parallax */
    const imgWrap = aboutSection.querySelector('.about__img');
    if (imgWrap) {
      gsap.to(imgWrap, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__visual',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    /* Counter stats */
    const counters = aboutSection.querySelectorAll('.counter[data-target]');
    if (counters.length) {
      ScrollTrigger.create({
        trigger: '.about__stats',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          counters.forEach(el => {
            animateCounter(el, 0, parseInt(el.dataset.target), 1.8, el.dataset.suffix || '');
          });
        },
      });
    }
  }

  /* ─────────────────────────────────────── */
  /* SKILLS — chip cascade                   */
  /* ─────────────────────────────────────── */
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsSection.querySelectorAll('.skill-category').forEach((cat, ci) => {
      const chips = cat.querySelectorAll('.chip');
      gsap.to(chips, {
        opacity: 1,
        y: 0,
        duration: .5,
        stagger: .06,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: cat,
          start: 'top 85%',
        },
        delay: ci * .08,
      });
    });
  }

  /* ─────────────────────────────────────── */
  /* EXPERIENCE — timeline line + items      */
  /* ─────────────────────────────────────── */
  const expSection = document.querySelector('.experience');
  if (expSection) {
    /* Growing line (scrub) */
    const track = expSection.querySelector('.timeline__track');
    if (track) {
      const ghost = expSection.querySelector('.timeline__track-ghost');
      const totalHeight = ghost?.offsetHeight || 600;
      gsap.set(track, { height: 0 });
      gsap.to(track, {
        height: totalHeight,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline',
          start: 'top 70%',
          end:   'bottom 70%',
          scrub: 1,
        },
      });
    }

    /* Items appear alternating from right */
    expSection.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.to(item, {
        opacity: 1,
        x: 0,
        duration: .75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 84%',
        },
      });
    });
  }

  /* ─────────────────────────────────────── */
  /* CONTACT                                 */
  /* ─────────────────────────────────────── */
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    const children = contactSection.querySelectorAll(
      '.contact__info > *, .contact__form'
    );
    gsap.set(children, { y: 30, opacity: 0 });
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: .75,
      stagger: .12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactSection,
        start: 'top 78%',
      },
    });
  }
}

/* ── Nav scroll state ──────────────────── */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -60px',
    onUpdate: self => {
      nav.classList.toggle('is-scrolled', self.progress > 0);
    },
  });
}
