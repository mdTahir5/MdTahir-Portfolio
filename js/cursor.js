/* ==========================================================================
   CUSTOM CURSOR & MAGNETIC MICRO-INTERACTIONS
   Smooth trailing dot, expanding ring, and interactive hover magnetism
   ========================================================================== */

export class CustomCursor {
  constructor() {
    // Only enable if pointer device supports fine hover (desktop/laptop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.dot = document.createElement('div');
    this.dot.className = 'custom-cursor-dot';

    this.ring = document.createElement('div');
    this.ring.className = 'custom-cursor-ring';

    document.body.appendChild(this.dot);
    document.body.appendChild(this.ring);

    this.pos = { x: -100, y: -100 };
    this.target = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.isHovered = false;

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;
      this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });

    // Interactive Hover Elements
    const attachHover = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card-interactive, .project-card, .cmd-item');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          this.ring.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          this.ring.classList.remove('cursor-hover');
        });
      });
    };

    attachHover();
    // Re-attach whenever dynamic items might appear
    window.addEventListener('domUpdated', attachHover);

    this.render();
  }

  render() {
    // Smooth lerp for trailing outer ring
    this.ringPos.x += (this.target.x - this.ringPos.x) * 0.18;
    this.ringPos.y += (this.target.y - this.ringPos.y) * 0.18;

    this.ring.style.transform = `translate(${this.ringPos.x}px, ${this.ringPos.y}px) translate(-50%, -50%)`;

    requestAnimationFrame(() => this.render());
  }
}
