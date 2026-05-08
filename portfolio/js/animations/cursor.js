/* ─── Custom Magnetic Cursor ────────────────────────────────── */

class CustomCursor {
  constructor() {
    this.dot   = document.querySelector('.cursor--dot');
    this.ring  = document.querySelector('.cursor--ring');

    if (!this.dot || !this.ring) return;
    if (prefersReducedMotion()) { this._hide(); return; }

    this.mouse = { x: -100, y: -100 };
    this.ring  = { x: -100, y: -100, el: document.querySelector('.cursor--ring') };
    this.dot_el = document.querySelector('.cursor--dot');
    this.ring_el = this.ring.el;

    this.raf   = null;
    this._init();
  }

  _hide() {
    document.querySelector('.cursor--dot')?.remove();
    document.querySelector('.cursor--ring')?.remove();
  }

  _init() {
    /* Track raw mouse position */
    window.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    /* Magnetic targets */
    this._bindMagnetic();

    /* State classes */
    this._bindStates();

    /* Start loop */
    this._loop();

    /* Hide on leave, show on enter */
    document.addEventListener('mouseleave', () => {
      gsap.to([this.dot_el, this.ring_el], { opacity: 0, duration: .25 });
    });
    document.addEventListener('mouseenter', () => {
      gsap.to([this.dot_el, this.ring_el], { opacity: 1, duration: .25 });
    });

    /* Subtle click effect */
    window.addEventListener('mousedown', () => {
      this.ring_el.classList.add('is-click');
    });
    window.addEventListener('mouseup', () => {
      this.ring_el.classList.remove('is-click');
    });
  }

  _loop() {
    /* Dot: follows exactly (via GSAP for sub-pixel smoothness) */
    gsap.set(this.dot_el, { x: this.mouse.x, y: this.mouse.y });

    /* Ring: lagged follow */
    if (this.ring.x === undefined) { this.ring.x = this.mouse.x; this.ring.y = this.mouse.y; }
    this.ring.x = lerp(this.ring.x, this.mouse.x, 0.14);
    this.ring.y = lerp(this.ring.y, this.mouse.y, 0.14);

    gsap.set(this.ring_el, { x: this.ring.x, y: this.ring.y });

    this.raf = requestAnimationFrame(() => this._loop());
  }

  _bindMagnetic() {
    const magnets = document.querySelectorAll('[data-magnetic]');

    magnets.forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;
        const strength = Number(el.dataset.magnetic) || 0.4;

        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: .4,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' });
      });
    });
  }

  _bindStates() {
    /* Links & buttons → bigger ring */
    const hoverEls = document.querySelectorAll('a, button, [data-cursor="hover"]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => this.ring_el.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => this.ring_el.classList.remove('is-hover'));
    });

    /* Text areas → caret cursor */
    const textEls = document.querySelectorAll('input, textarea, [data-cursor="text"]');
    textEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.ring_el.classList.add('is-text');
        this.dot_el.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        this.ring_el.classList.remove('is-text');
        this.dot_el.style.opacity = '';
      });
    });
  }
}
