/* ─── Projects — Horizontal Scroll + 3D Hover ───────────────── */

function initProjectAnimations() {
  const section = document.querySelector('.projects');
  const grid    = document.querySelector('.projects__grid');
  const cards   = document.querySelectorAll('.project-card');

  if (!section || !grid || !cards.length) return;

  /* Mobile: vertical fallback */
  if (window.innerWidth <= 768 || prefersReducedMotion()) {
    cards.forEach(card => { card.style.opacity = 1; card.style.transform = 'none'; });
    _bindTilt(cards);
    return;
  }

  /* ── Horizontal pinned scroll ────────── */
  gsap.set(cards, { opacity: 1 });

  /* Distance to travel = total grid width minus visible viewport */
  const getScrollDist = () => grid.scrollWidth - section.clientWidth + 0;

  const hScroll = gsap.to(grid, {
    x: () => -getScrollDist(),
    ease: 'none',
    scrollTrigger: {
      trigger:            section,
      pin:                true,
      scrub:              1.4,
      invalidateOnRefresh: true,
      end: () => '+=' + getScrollDist(),
      onUpdate(self) {
        /* Subtle opacity on cards based on how centred they are */
        const vw = window.innerWidth;
        cards.forEach(card => {
          const rect = card.getBoundingClientRect();
          const cx   = rect.left + rect.width / 2;
          const dist = Math.abs(cx - vw / 2) / (vw / 2); // 0 = centre, 1 = edge
          const op   = gsap.utils.clamp(.5, 1, 1 - dist * .4);
          card.style.opacity = op;
        });
      },
    },
  });

  /* ── 3D tilt on hover ────────────────── */
  _bindTilt(cards);
}

function _bindTilt(cards) {
  if (prefersReducedMotion()) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);

      gsap.to(card, {
        rotateX: -dy * 8,
        rotateY:  dx * 8,
        transformPerspective: 900,
        duration: .4,
        ease: 'power2.out',
      });

      card.style.setProperty('--glare-x', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--glare-y', ((e.clientY - r.top)  / r.height * 100) + '%');
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: .7, ease: 'elastic.out(1,.4)' });
    });
  });
}
