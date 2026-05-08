/* ─── Entry Point ───────────────────────────────────────────── */

onReady(() => {
  gsap.registerPlugin(ScrollTrigger);

  /* ── Lenis smooth scroll ─────────────── */
  let lenis;
  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      duration:        1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);
  }

  /* ── Loader runs first, then the rest ── */
  initLoader(() => {
    /* Hero animations start right after loader reveals */
    initHeroAnimations();

    /* Small tick so hero timeline is well underway before scroll inits */
    gsap.delayedCall(.2, () => {
      initScrollAnimations();
      initProjectAnimations();
      initMarquees();
    });
  });

  /* These don't need the loader */
  new CustomCursor();
  initNav();
  initNavScroll();
  initContactForm();

  window.addEventListener('beforeunload', () => {
    lenis?.destroy();
    ScrollTrigger.killAll();
  });
});

/* ── Navigation ─────────────────────────── */
function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links  = document.querySelector('.nav__links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ── Contact form (demo) ─────────────────── */
function initContactForm() {
  const form   = document.querySelector('.contact-form');
  const status = document.querySelector('.form__status');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form__submit');
    btn.disabled    = true;
    btn.textContent = 'Enviando…';

    /* Replace with real fetch / EmailJS */
    await new Promise(r => setTimeout(r, 1400));

    if (status) {
      status.textContent = 'Mensagem enviada! Em breve entro em contato.';
      status.className   = 'form__status is-success';
    }
    form.reset();
    btn.disabled    = false;
    btn.textContent = 'Enviar mensagem';
  });
}
