# Md Tahir — Futuristic Personal Portfolio Website

A state-of-the-art, minimalist dark-mode personal portfolio tailored for an **Electronics & Communication Engineering (ECE)** graduate skilled in **Software Engineering and Distributed Systems**.

Built with pure Vanilla HTML5, CSS3 (Custom Properties, Glassmorphism, Backdrop Filters), and modular modern ES6+ JavaScript. Zero framework bloat, sub-second load times, 60fps canvas animations, and complete mobile responsiveness.

---

## ⚡ Key Highlights & Features

1. **Futuristic Dark-Mode Glassmorphism Aesthetic**:
   - Deep obsidian background with cinematic multi-layered radial lighting orbs and subtle film grain overlay.
   - Ultra-crisp glass cards with glowing linear-gradient borders, ambient inner reflections, and 3D hover interactions.
   - Multi-theme accent switcher: **Cyber Cyan** (default), **Electric Violet**, **Matrix Emerald**, and **Solar Amber**.

2. **Interactive 3D Particle & Circuit Constellation Hero Canvas**:
   - High-performance HTML5 Canvas rendering dynamic electronic circuit nodes and signal lattice waves.
   - Real-time mouse physics (gentle magnetic repulsion & line connections) and on-click shockwave ripples.
   - Automatic `IntersectionObserver` pause when off-screen to preserve CPU/GPU battery.

3. **Dynamic Typewriter Headline & Real-Time Telemetry Stats**:
   - Animated role swapper showcasing multi-disciplinary capabilities (*Software Systems Engineer*, *Full-Stack Web Architect*, *IoT & Embedded Systems Developer*).
   - Live hardware & software telemetry counters (4+ Yrs XP, 24+ Projects Deployed, 1,850+ Commits, Sub-20ms Latency Mindset).

4. **Live Interactive Cyber Terminal Emulator**:
   - Built-in interactive console (`tahir@terminal:~$`) supporting commands: `help`, `skills`, `projects`, `education`, `status`, `matrix`, `contact`, and `clear`.
   - Clickable suggestion chips and full bash-like arrow key history navigation (`↑` / `↓`).

5. **Real-Time DSP Signal Oscilloscope Widget**:
   - Interactive in-browser signal generator modeling Sine Wave, Square Wave, and Pulse-Width Modulation (PWM) with live frequency oscillation and sampling metrics.

6. **Interactive Project Showcase with Case Studies**:
   - Categorized filter tabs: *All Systems*, *Featured Work*, *IoT & Embedded*, *Full-Stack Web*, *Systems & AI*.
   - Direct demo links on every project card for quick live previews.

7. **Dual Chronological Timeline**:
   - Side-by-side progression showcasing **Engineering Experience** and **Academic Foundation & Honors** with glowing neon nodes.

8. **Interactive CV & Printable Resume**:
   - Recruiter-focused glass preview with key strengths, cloud certifications, and a one-click printable format (`window.print()`).

9. **Command Palette (`Ctrl + K` / `Cmd + K`)**:
   - Global spotlight search dialog to quickly navigate sections, change theme accents, copy email, toggle audio FX, or print resume.

10. **Web Audio API Micro-Interactions**:
    - Synthesized futuristic sound feedback (zero external audio files needed!). Includes persistent mute/unmute control.

11. **Custom Interactive Cursor**:
    - Magnetic trailing dot and expanding glowing ring that snaps to buttons and links (automatically disabled on touch devices and for reduced-motion users).

---

## 📁 Project Architecture

```
d:/TahirPortfolioGemini/
├── index.html                  # Semantic, SEO-optimized markup
├── css/
│   ├── main.css                # Design system tokens, typography, foundation
│   ├── glass.css               # Glassmorphism, cards, modals, terminal styling
│   ├── animations.css          # Keyframes, orb drift, pulses, scroll reveals
│   └── responsive.css          # Breakpoints, mobile drawer, print styles
├── js/
│   ├── data.js                 # Centralized portfolio content & case studies
│   ├── canvas-hero.js          # Interactive 3D particle constellation canvas
│   ├── cursor.js               # Smooth custom cursor with magnetic hover
│   ├── audio.js                # Web Audio API sound generator & mute toggle
│   ├── command-palette.js      # Spotlight Ctrl+K navigation dialog
│   └── main.js                 # App orchestrator, terminal, oscilloscope, scrollspy
└── assets/
    └── images/                 # High-resolution generated project & avatar assets
```

---

## 🚀 Running Locally

You can run this project with any local HTTP server:

### Option 1: Using Node `npx serve`
```bash
npx serve .
```

### Option 2: Using Python
```bash
python -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

---

## 🛠️ Customization Guide

All data (name, bio, skills, projects, case studies, experience) is cleanly isolated in **[`js/data.js`](file:///d:/TahirPortfolioGemini/js/data.js)**.
To customize:
1. Update `portfolioData.profile` with your contact details, social links, and bio.
2. Edit `portfolioData.skills` to adjust your specific proficiencies and percentage levels.
3. Add or modify items in `portfolioData.projects` to showcase your personal work.
4. Update `portfolioData.experience` and `portfolioData.education` for your career trajectory.

---

## 🌐 Deployment

- **GitHub Pages**: Simply push this repo to GitHub and enable GitHub Pages on the root branch.
- **Vercel / Netlify**: Connect the repository and deploy with zero configuration (static site).
