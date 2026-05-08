/* ─── Page Loader Animation ─────────────────────────────────── */

function initLoader(onComplete) {
  const loader = document.getElementById('loader');

  if (!loader) {
    onComplete();
    return;
  }

  if (prefersReducedMotion()) {
    loader.remove();
    document.body.style.overflow = '';
    onComplete();
    return;
  }

  document.body.style.overflow = 'hidden';

  const numEl = loader.querySelector('.loader__num');
  const fill  = loader.querySelector('.loader__bar-fill');
  const obj   = { val: 0 };

  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete() {
      /* ── Slide loader up to reveal site ── */
      gsap.to(loader, {
        yPercent: -100,
        duration: 1.1,
        ease: 'expo.inOut',
        onComplete() {
          loader.style.display = 'none';
          document.body.style.overflow = '';
          onComplete();
        },
      });
    },
  });

  /* Counter + bar in sync */
  tl.to(fill, { width: '100%', duration: 1.7 }, 0);

  tl.to(obj, {
    val: 100,
    duration: 1.7,
    onUpdate() { numEl.textContent = Math.round(obj.val); },
  }, 0);

  /* Brief pause at 100% before reveal */
  tl.to({}, { duration: 0.4 });
}


/* ─── Marquee (infinite scroll strip) ─────────────────────────── */

function initMarquees() {
  document.querySelectorAll('.marquee').forEach(el => {
    const track  = el.querySelector('.marquee__track');
    const group  = el.querySelector('.marquee__group');
    if (!track || !group) return;

    /* Clone group for seamless loop */
    const clone = group.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);

    const dir      = el.classList.contains('marquee--reverse') ? 1 : -1;
    const groupW   = group.offsetWidth;
    const duration = groupW / 60; /* ~60px/s */

    /* Reset position */
    gsap.set(track, { x: dir > 0 ? -groupW : 0 });

    gsap.to(track, {
      x: dir > 0 ? 0 : -groupW,
      duration,
      ease: 'none',
      repeat: -1,
    });
  });
}
