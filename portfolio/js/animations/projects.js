/* ─── Project Cards — ScrollTrigger + 3D Hover ──────────────── */

function initProjectAnimations() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;

  if (!prefersReducedMotion()) {
    cards.forEach((card, i) => {
      gsap.to(card, { opacity: 1, y: 0, duration: .85, ease: 'power3.out', delay: i * .08, scrollTrigger: { trigger: card, start: 'top 87%' } });
    });
  } else {
    cards.forEach(card => { card.style.opacity = 1; card.style.transform = 'none'; });
    return;
  }

  cards.forEach(card => {
    const STRENGTH = 10;
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      gsap.to(card, { rotateX: -dy * STRENGTH * .7, rotateY: dx * STRENGTH, transformPerspective: 900, duration: .4, ease: 'power2.out' });
      card.style.setProperty('--glare-x', ((e.clientX - rect.left) / rect.width  * 100) + '%');
      card.style.setProperty('--glare-y', ((e.clientY - rect.top)  / rect.height * 100) + '%');
    });
    card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: .7, ease: 'elastic.out(1,.4)' }));
  });
}