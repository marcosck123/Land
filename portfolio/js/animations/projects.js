/* ─── Project Cards — ScrollTrigger + 3D Hover ──────────────── */

function initProjectAnimations() {
  /* ── Scroll-in stagger ───────────────── */
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  if (!prefersReducedMotion()) {
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: .85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 87%',
        },
        delay: i * .08,
      });
    });
  } else {
    cards.forEach(card => {
      card.style.opacity = 1;
      card.style.transform = 'none';
    });
  }

  if (prefersReducedMotion()) return;

  /* ── 3D tilt on hover ────────────────── */
  cards.forEach(card => {
    const STRENGTH = 10; // max degrees

    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2); // -1..1
      const dy     = (e.clientY - cy) / (rect.height / 2); // -1..1
      const rotY   =  dx * STRENGTH;
      const rotX   = -dy * STRENGTH * .7;

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 900,
        duration: .4,
        ease: 'power2.out',
      });

      /* Subtle light glare */
      const glareX = ((e.clientX - rect.left) / rect.width)  * 100;
      const glareY = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: .7,
        ease: 'elastic.out(1, .4)',
      });
    });
  });
}
