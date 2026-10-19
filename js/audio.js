/* ==========================================================================
   WEB AUDIO API - SYNTHESIZED MICRO-INTERACTION SOUND EFFECTS
   Lightweight, zero-network-dependency futuristic sci-fi audio feedback
   ========================================================================== */

export class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = localStorage.getItem('portfolioAudioEnabled') === 'true';
    this.initAudioContext();
  }

  initAudioContext() {
    // Lazily create AudioContext on first user interaction to comply with autoplay policy
    const startAudio = () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      window.removeEventListener('click', startAudio);
      window.removeEventListener('keydown', startAudio);
    };
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('keydown', startAudio, { once: true });
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    localStorage.setItem('portfolioAudioEnabled', this.isEnabled);
    if (this.isEnabled) {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      this.playSuccess();
    }
    return this.isEnabled;
  }

  playClick() {
    if (!this.isEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {
      // AudioContext safe fail
    }
  }

  playHover() {
    if (!this.isEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.audioCtx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // AudioContext safe fail
    }
  }

  playSuccess() {
    if (!this.isEnabled || !this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(0.06, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.16);
      });
    } catch (e) {
      // AudioContext safe fail
    }
  }

  playSwitch() {
    if (!this.isEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(240, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {
      // AudioContext safe fail
    }
  }
}
