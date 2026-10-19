/* ==========================================================================
   COMMAND PALETTE (CTRL+K / CMD+K)
   Fast, accessible spotlight navigation & action trigger
   ========================================================================== */

export class CommandPalette {
  constructor(audioEngine) {
    this.audio = audioEngine;
    this.overlay = document.getElementById('cmdPaletteOverlay');
    this.input = document.getElementById('cmdPaletteInput');
    this.resultsList = document.getElementById('cmdResultsList');
    this.isOpen = false;
    this.selectedIndex = 0;

    this.commands = [
      { id: 'nav-hero', title: 'Navigate to Hero', category: 'Navigation', icon: '⚡', action: () => this.scrollTo('#hero') },
      { id: 'nav-about', title: 'Navigate to About & ECE Core', category: 'Navigation', icon: '🔬', action: () => this.scrollTo('#about') },
      { id: 'nav-skills', title: 'Navigate to Skills Matrix', category: 'Navigation', icon: '🛠️', action: () => this.scrollTo('#skills') },
      { id: 'nav-projects', title: 'Navigate to Featured Projects', category: 'Navigation', icon: '🚀', action: () => this.scrollTo('#projects') },
      { id: 'nav-timeline', title: 'Navigate to Experience & Education', category: 'Navigation', icon: '📜', action: () => this.scrollTo('#experience') },
      { id: 'nav-resume', title: 'View & Download Resume', category: 'Navigation', icon: '📄', action: () => this.scrollTo('#resume') },
      { id: 'nav-contact', title: 'Navigate to Contact Terminal', category: 'Navigation', icon: '📡', action: () => this.scrollTo('#contact') },
      { id: 'act-email', title: 'Copy Email to Clipboard', category: 'Actions', icon: '📋', action: () => this.copyEmail() },
      { id: 'act-theme-cyan', title: 'Theme: Cyber Cyan (Default)', category: 'Theme', icon: '💎', action: () => this.setTheme('cyan') },
      { id: 'act-theme-violet', title: 'Theme: Electric Violet', category: 'Theme', icon: '🔮', action: () => this.setTheme('violet') },
      { id: 'act-theme-emerald', title: 'Theme: Matrix Emerald', category: 'Theme', icon: '🟢', action: () => this.setTheme('emerald') },
      { id: 'act-theme-amber', title: 'Theme: Solar Amber', category: 'Theme', icon: '☀️', action: () => this.setTheme('amber') },
      { id: 'act-audio', title: 'Toggle Sci-Fi Audio FX', category: 'Actions', icon: '🔊', action: () => this.toggleAudio() },
      { id: 'act-print', title: 'Print / Save Resume as PDF', category: 'Actions', icon: '🖨️', action: () => window.print() }
    ];

    this.filtered = [...this.commands];
    this.init();
  }

  init() {
    if (!this.overlay) return;

    // Keyboard trigger: Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      } else if (this.isOpen) {
        this.handleKeyNavigation(e);
      }
    });

    // Close when clicking overlay backdrop
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Search filter
    this.input.addEventListener('input', () => {
      this.filterResults(this.input.value);
    });

    // Buttons that open palette
    document.querySelectorAll('.cmd-palette-btn').forEach(btn => {
      btn.addEventListener('click', () => this.open());
    });
  }

  open() {
    this.isOpen = true;
    this.overlay.classList.add('open');
    this.input.value = '';
    this.filterResults('');
    setTimeout(() => this.input.focus(), 60);
    if (this.audio) this.audio.playSwitch();
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('open');
    if (this.audio) this.audio.playClick();
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  filterResults(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.filtered = [...this.commands];
    } else {
      this.filtered = this.commands.filter(cmd => 
        cmd.title.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.render();
  }

  render() {
    if (this.filtered.length === 0) {
      this.resultsList.innerHTML = `<li style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">No matching commands found.</li>`;
      return;
    }

    this.resultsList.innerHTML = this.filtered.map((cmd, idx) => `
      <li class="cmd-item ${idx === this.selectedIndex ? 'selected' : ''}" data-index="${idx}">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="font-size: 1.15rem;">${cmd.icon}</span>
          <span>${cmd.title}</span>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-faint); text-transform: uppercase; font-family: var(--font-mono);">${cmd.category}</span>
      </li>
    `).join('');

    this.resultsList.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index, 10);
        this.executeCommand(idx);
      });
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = parseInt(item.dataset.index, 10);
        this.highlightSelected();
      });
    });

    window.dispatchEvent(new CustomEvent('domUpdated'));
  }

  highlightSelected() {
    this.resultsList.querySelectorAll('.cmd-item').forEach((item, idx) => {
      item.classList.toggle('selected', idx === this.selectedIndex);
    });
  }

  handleKeyNavigation(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.filtered.length;
      this.highlightSelected();
      if (this.audio) this.audio.playHover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.filtered.length) % this.filtered.length;
      this.highlightSelected();
      if (this.audio) this.audio.playHover();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.filtered[this.selectedIndex]) {
        this.executeCommand(this.selectedIndex);
      }
    }
  }

  executeCommand(idx) {
    const cmd = this.filtered[idx];
    if (cmd && typeof cmd.action === 'function') {
      this.close();
      if (this.audio) this.audio.playSuccess();
      cmd.action();
    }
  }

  scrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  copyEmail() {
    navigator.clipboard.writeText('tahir.engineering@gmail.com').then(() => {
      window.dispatchEvent(new CustomEvent('showToast', { detail: 'Email copied to clipboard: tahir.engineering@gmail.com' }));
    });
  }

  setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('portfolioTheme', themeName);
    window.dispatchEvent(new CustomEvent('portfolioThemeChanged', { detail: themeName }));
    window.dispatchEvent(new CustomEvent('showToast', { detail: `Theme changed to ${themeName.toUpperCase()}` }));
  }

  toggleAudio() {
    if (this.audio) {
      const active = this.audio.toggle();
      window.dispatchEvent(new CustomEvent('audioToggled', { detail: active }));
      window.dispatchEvent(new CustomEvent('showToast', { detail: active ? 'Sci-Fi Audio FX: Enabled' : 'Audio FX: Muted' }));
    }
  }
}
