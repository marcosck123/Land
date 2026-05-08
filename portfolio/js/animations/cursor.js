/* ─── Custom Magnetic Cursor ────────────────────────────────── */

class CustomCursor {
  constructor() {
    this.dot_el  = document.querySelector('.cursor--dot');
    this.ring_el = document.querySelector('.cursor--ring');
    if (!this.dot_el || !this.ring_el) return;
    if (prefersReducedMotion()) { this._hide(); return; }
    this.mouse = { x: -100, y: -100 };
    this.ring  = { x: -100, y: -100 };
    this._init();
  }

  _hide() {
    this.dot_el?.remove();
    this.ring_el?.remove();
  }

  _init() {
    window.addEventListener('mousemove', e => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
    this._bindMagnetic();
    this._bindStates();
    this._loop();
    document.addEventListener('mouseleave', () => gsap.to([this.dot_el, this.ring_el], { opacity: 0, duration: .25 }));
    document.addEventListener('mouseenter', () => gsap.to([this.dot_el, this.ring_el], { opacity: 1, duration: .25 }));
    window.addEventListener('mousedown', () => this.ring_el.classList.add('is-click'));
    window.addEventListener('mouseup',   () => this.ring_el.classList.remove('is-click'));
  }

  _loop() {
    gsap.set(this.dot_el, { x: this.mouse.x, y: this.mouse.y });
    this.ring.x = lerp(this.ring.x, this.mouse.x, 0.14);
    this.ring.y = lerp(this.ring.y, this.mouse.y, 0.14);
    gsap.set(this.ring_el, { x: this.ring.x, y: this.ring.y });
    requestAnimationFrame(() => this._loop());
  }

  _bindMagnetic() {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width  / 2);
        const dy = e.clientY - (rect.top  + rect.height / 2);
        const s  = Number(el.dataset.magnetic) || 0.4;
        gsap.to(el, { x: dx * s, y: dy * s, duration: .4, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' }));
    });
  }

  _bindStates() {
    document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
      el.addEventListener('mouseenter', () => this.ring_el.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => this.ring_el.classList.remove('is-hover'));
    });
    document.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { this.ring_el.classList.add('is-text'); this.dot_el.style.opacity = '0'; });
      el.addEventListener('mouseleave', () => { this.ring_el.classList.remove('is-text'); this.dot_el.style.opacity = ''; });
    });
  }
}