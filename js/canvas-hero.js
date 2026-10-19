/* ==========================================================================
   HERO CANVAS - INTERACTIVE 3D PARTICLE & CIRCUIT LATTICE
   High-performance HTML5 Canvas with mouse physics & responsive shockwaves
   ========================================================================== */

export class HeroCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.ripples = [];
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 160 };
    this.isVisible = true;
    this.animationFrameId = null;
    this.themeRGB = [0, 240, 255]; // default cyber cyan

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.updateThemeColor();
    this.setupIntersectionObserver();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    if (this.particles.length > 0) {
      this.createParticles();
    }
  }

  createParticles() {
    this.particles = [];
    // Number of particles proportional to area, capped for 60fps performance
    const count = Math.min(Math.floor((this.width * this.height) / 12000), 90);

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        baseAlpha: Math.random() * 0.45 + 0.35,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        isLogicNode: Math.random() > 0.8 // special blinking logic node
      });
    }
  }

  updateThemeColor() {
    const computed = getComputedStyle(document.documentElement);
    const rgbStr = computed.getPropertyValue('--accent-primary-rgb').trim();
    if (rgbStr) {
      this.themeRGB = rgbStr.split(',').map(s => parseInt(s.trim(), 10));
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.targetX = e.clientX - rect.left;
      this.mouse.targetY = e.clientY - rect.top;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
    });

    // On-click shockwave ripple
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: Math.min(this.width, this.height) * 0.45,
        alpha: 0.9,
        speed: 4.5
      });
    });

    // Listen to theme change events
    window.addEventListener('portfolioThemeChanged', () => {
      this.updateThemeColor();
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animationFrameId) {
          this.animate();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.canvas);
  }

  animate() {
    if (!this.isVisible) {
      this.animationFrameId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Smooth mouse interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.1;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.1;

    const [r, g, b] = this.themeRGB;
    const time = Date.now() * 0.001;

    // Update and draw ripples
    for (let ri = this.ripples.length - 1; ri >= 0; ri--) {
      const rip = this.ripples[ri];
      rip.radius += rip.speed;
      rip.alpha = (1 - rip.radius / rip.maxRadius) * 0.8;

      if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
        this.ripples.splice(ri, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${rip.alpha})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Connect particles with glowing circuit lines
    const maxDist = 125;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          this.ctx.lineWidth = 0.9;
          this.ctx.stroke();
        }
      }

      // Mouse interactive line
      const mdx = p1.x - this.mouse.x;
      const mdy = p1.y - this.mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < this.mouse.radius) {
        const mouseAlpha = (1 - mdist / this.mouse.radius) * 0.55;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mouseAlpha})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.stroke();

        // Repel gently away from mouse
        const force = (this.mouse.radius - mdist) / this.mouse.radius;
        p1.x += (mdx / mdist) * force * 1.8;
        p1.y += (mdy / mdist) * force * 1.8;
      }

      // Update positions
      p1.x += p1.vx;
      p1.y += p1.vy;

      // Bounce gracefully on borders
      if (p1.x < 0) { p1.x = 0; p1.vx *= -1; }
      if (p1.x > this.width) { p1.x = this.width; p1.vx *= -1; }
      if (p1.y < 0) { p1.y = 0; p1.vy *= -1; }
      if (p1.y > this.height) { p1.y = this.height; p1.vy *= -1; }

      // Draw particle / node
      const currentAlpha = p1.baseAlpha + Math.sin(time * 2 + p1.pulseOffset) * 0.2;
      this.ctx.beginPath();
      this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.1, currentAlpha)})`;
      this.ctx.fill();

      // If logic node, add miniature circuit square/halo
      if (p1.isLogicNode) {
        this.ctx.beginPath();
        this.ctx.arc(p1.x, p1.y, p1.radius * 2.2, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.1, currentAlpha * 0.6)})`;
        this.ctx.lineWidth = 0.75;
        this.ctx.stroke();
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
