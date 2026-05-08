/* ─── ScrollTrigger Animations ──────────────────────────────── */

function initScrollAnimations() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.section__eyebrow, .section__title, .about__p, .chip, .timeline-item').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    return;
  }

  function reveal(trigger, targets, vars = {}) {
    return gsap.to(targets, { opacity: 1, y: 0, x: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger, start: 'top 82%', toggleActions: 'play none none none' }, ...vars });
  }

  document.querySelectorAll('.section__eyebrow').forEach(el => { gsap.set(el, { y: 20 }); reveal(el.closest('.section') || el, el); });
  document.querySelectorAll('.section__title').forEach(el => { gsap.set(el, { y: 30 }); reveal(el.closest('.section') || el, el, { duration: 1, delay: .1 }); });

  /* About */
  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    const paras = aboutSection.querySelectorAll('.about__p');
    gsap.set(paras, { y: 30, opacity: 0 });
    gsap.to(paras, { y: 0, opacity: 1, duration: .8, stagger: .18, ease: 'power3.out', scrollTrigger: { trigger: '.about__paragraphs', start: 'top 80%' } });

    const img = aboutSection.querySelector('.about__img');
    if (img) gsap.to(img, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.about__visual', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });

    const counters = aboutSection.querySelectorAll('.counter[data-target]');
    if (counters.length) {
      ScrollTrigger.create({ trigger: '.about__stats', start: 'top 85%', once: true,
        onEnter: () => counters.forEach(el => animateCounter(el, 0, parseInt(el.dataset.target), 1.8, el.dataset.suffix || '')) });
    }
  }

  /* Skills */
  document.querySelector('.skills')?.querySelectorAll('.skill-category').forEach((cat, ci) => {
    gsap.to(cat.querySelectorAll('.chip'), { opacity: 1, y: 0, duration: .5, stagger: .06, ease: 'back.out(1.4)', delay: ci * .08, scrollTrigger: { trigger: cat, start: 'top 85%' } });
  });

  /* Experience */
  const expSection = document.querySelector('.experience');
  if (expSection) {
    const track = expSection.querySelector('.timeline__track');
    if (track) {
      const totalHeight = expSection.querySelector('.timeline__track-ghost')?.offsetHeight || 600;
      gsap.set(track, { height: 0 });
      gsap.to(track, { height: totalHeight, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 70%', scrub: 1 } });
    }
    expSection.querySelectorAll('.timeline-item').forEach(item => {
      gsap.to(item, { opacity: 1, x: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 84%' } });
    });
  }

  /* Contact */
  const contactSection = document.querySelector('.contact');
  if (contactSection) {
    const children = contactSection.querySelectorAll('.contact__info > *, .contact__form');
    gsap.set(children, { y: 30, opacity: 0 });
    gsap.to(children, { y: 0, opacity: 1, duration: .75, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: contactSection, start: 'top 78%' } });
  }
}

function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  ScrollTrigger.create({ start: 'top -60px', onUpdate: self => nav.classList.toggle('is-scrolled', self.progress > 0) });
}