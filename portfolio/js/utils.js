/* ─── Utilities ─────────────────────────────────────────────── */

class SplitText {
  constructor(el, opts = {}) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el;
    if (!this.el) return;
    this.opts = { type: 'chars', wordClass: 'split-word', charClass: 'split-char', ...opts };
    this._original = this.el.innerHTML;
    this.chars = [];
    this.words = [];
    this._run();
  }

  _run() {
    const text = this.el.textContent || '';
    const type = this.opts.type;
    const wordArr = text.split(/(\s+)/);
    this.el.innerHTML = '';

    wordArr.forEach(token => {
      if (/^\s+$/.test(token)) { this.el.appendChild(document.createTextNode(' ')); return; }
      if (!token) return;

      const wordSpan = document.createElement('span');
      wordSpan.className = this.opts.wordClass;
      wordSpan.style.cssText = 'display:inline-block;white-space:nowrap;';

      if (type === 'chars' || type === 'chars,words') {
        [...token].forEach(ch => {
          const charSpan = document.createElement('span');
          charSpan.className = this.opts.charClass;
          charSpan.style.cssText = 'display:inline-block;';
          charSpan.textContent = ch;
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        });
      } else {
        wordSpan.textContent = token;
      }

      this.words.push(wordSpan);
      this.el.appendChild(wordSpan);
    });
  }

  revert() { if (this._original !== undefined) this.el.innerHTML = this._original; }
}

function animateCounter(el, from = 0, to, duration = 1.5, suffix = '') {
  const start = performance.now();
  const range = to - from;
  function step(now) {
    const elapsed  = (now - start) / (duration * 1000);
    const progress = Math.min(elapsed, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + range * eased) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const debounce = (fn, ms) => { let id; return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); }; };
const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const onReady = fn => { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); };