/* ─── Hero Entrance Animations ──────────────────────────────── */

function initHeroAnimations() {
  const instant = ['hero__badge','hero__line','hero__role','hero__desc','hero__ctas','hero__scroll','hero__socials'];

  if (prefersReducedMotion()) {
    instant.forEach(c => { const el = document.querySelector('.' + c); if (el) { el.style.opacity = 1; el.style.transform = 'none'; } });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  const nameEl = document.querySelector('.hero__name');
  let chars = [];
  if (nameEl) {
    const split = new SplitText(nameEl, { type: 'chars' });
    chars = split.chars;
    gsap.set(chars, { y: '110%', opacity: 0 });
  }

  gsap.set('.hero__badge',   { y: 20 });
  gsap.set('.hero__role',    { y: 16 });
  gsap.set('.hero__desc',    { y: 16 });
  gsap.set('.hero__ctas',    { y: 16 });
  gsap.set('.hero__socials', { x: -20 });

  tl.to('.hero__badge', { opacity: 1, y: 0, duration: .6, ease: 'back.out(2)' }, 0.1);

  if (chars.length) {
    tl.to(chars, { y: '0%', opacity: 1, duration: .9, stagger: { amount: .5, from: 'start' }, ease: 'power3.out' }, 0.3);
  }

  tl.to('.hero__line',   { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.7)
    .to('.hero__role',   { opacity: 1, y: 0, duration: .7 }, 0.9)
    .to('.hero__desc',   { opacity: 1, y: 0, duration: .7 }, 1.0)
    .to('.hero__ctas',   { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.5)' }, 1.1)
    .to('.hero__socials',{ opacity: 1, x: 0, duration: .8 }, 1.3)
    .to('.hero__scroll', { opacity: 1, duration: .6 }, 1.4);
}