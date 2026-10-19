/* ==========================================================================
   MAIN APPLICATION LOGIC & INTERACTIVE ORCHESTRATION
   Orchestrates data rendering, oscilloscope simulator, terminal emulator,
   modal popups, scrollspy, filter tabs, and audio feedback
   ========================================================================== */

import { portfolioData } from './data.js';
import { HeroCanvas } from './canvas-hero.js';
import { CustomCursor } from './cursor.js';
import { AudioEngine } from './audio.js';
import { CommandPalette } from './command-palette.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Subsystems
  const audio = new AudioEngine();
  const heroCanvas = new HeroCanvas('heroCanvas');
  const cursor = new CustomCursor();
  const cmdPalette = new CommandPalette(audio);

  // 2. Load Persisted Theme
  const savedTheme = localStorage.getItem('portfolioTheme') || 'cyan';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // 3. Setup Scroll Progress Bar & Scrollspy
  setupScrollTracking();

  // 4. Typewriter Role Effect
  initTypewriter();

  // 5. Render Dynamic Sections
  renderProjects('all');
  renderSkills();
  renderTimeline();

  // 6. Setup Interactive Oscilloscope
  initOscilloscope();

  // 7. Setup Interactive Terminal
  initTerminal(audio);

  // 8. Setup Global Event Listeners & Modals
  setupNavigation(audio);
  setupThemeSwitcher(audio);
  setupAudioButton(audio);
  setupContactForm(audio);
  setupToastNotifications();
  setupScrollReveals();
});

/* ==========================================================================
   SCROLLSPY & PROGRESS BAR
   ========================================================================== */
function setupScrollTracking() {
  const progressBar = document.getElementById('scrollProgressBar');
  const navbar = document.querySelector('.navbar-island');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Island navbar background effect on scroll
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy active link
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 180;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
}

/* ==========================================================================
   HERO TYPEWRITER
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriterTarget');
  if (!target) return;

  const roles = portfolioData.profile.subRoles;
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2200; // Hold at full text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   PROJECTS SECTION & MODALS
   ========================================================================== */
function renderProjects(filter = 'all') {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  let filtered = portfolioData.projects;
  if (filter === 'featured') {
    filtered = portfolioData.projects.filter(p => p.featured);
  } else if (filter !== 'all') {
    filtered = portfolioData.projects.filter(p => p.category === filter);
  }

  container.innerHTML = filtered.map(p => `
    <article class="project-card reveal-item" data-id="${p.id}">
      <div class="project-media-wrap">
        <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
        <span class="project-category-badge">${p.category.toUpperCase()}</span>
      </div>
      <div class="project-content">
        <div class="project-header-row">
          <h3 class="project-name">${p.title}</h3>
        </div>
        <p class="project-desc">${p.summary}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="project-actions">
          <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-glow" title="Live Demo" aria-label="Live Demo">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <div class="project-links">
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" title="Source Code" aria-label="Source Code">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  window.dispatchEvent(new CustomEvent('domUpdated'));
}

/* ==========================================================================
   SKILLS RENDERING
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skillsGrid');
  if (!container) return;

  container.innerHTML = portfolioData.skills.map(cat => `
    <div class="skill-category-card reveal-item">
      <div class="skill-cat-header">
        <div class="skill-cat-icon">${cat.icon}</div>
        <h3 class="skill-cat-title">${cat.category}</h3>
      </div>
      <div class="skill-items-list">
        ${cat.items.map(s => `
          <div class="skill-bar-row">
            <div class="skill-meta">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-track">
              <div class="skill-fill" style="width: ${s.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   TIMELINE RENDERING (EXPERIENCE & EDUCATION)
   ========================================================================== */
function renderTimeline() {
  const expStream = document.getElementById('experienceTimeline');
  const eduStream = document.getElementById('educationTimeline');

  if (expStream) {
    expStream.innerHTML = portfolioData.experience.map(item => `
      <div class="timeline-item reveal-item">
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <span class="timeline-period">${item.period}</span>
          <h4 class="timeline-role">${item.role}</h4>
          <div class="timeline-institution">${item.institution}</div>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  if (eduStream) {
    eduStream.innerHTML = portfolioData.education.map(item => `
      <div class="timeline-item reveal-item">
        <div class="timeline-node"></div>
        <div class="timeline-card">
          <span class="timeline-period">${item.period}</span>
          <h4 class="timeline-role">${item.role}</h4>
          <div class="timeline-institution">${item.institution}</div>
          <p class="timeline-desc">${item.desc}</p>
        </div>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   ECE SIGNAL OSCILLOSCOPE SIMULATOR WIDGET
   Interactive DSP & Signal waveform generator on canvas
   ========================================================================== */
function initOscilloscope() {
  const canvas = document.getElementById('oscilloscopeCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let waveType = 'sine';
  let freq = 2.5;
  let amp = 35;
  let offset = 0;

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 130;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Control buttons
  document.querySelectorAll('.wave-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wave-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      waveType = btn.dataset.wave;
    });
  });

  function draw() {
    ctx.fillStyle = 'rgba(4, 7, 14, 0.28)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const midY = canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(canvas.width, midY);
    ctx.stroke();

    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Draw active signal
    ctx.beginPath();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary') || '#00f0ff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = ctx.strokeStyle;

    for (let x = 0; x < canvas.width; x++) {
      const t = (x / canvas.width) * Math.PI * 4 * freq + offset;
      let y = midY;

      if (waveType === 'sine') {
        y = midY + Math.sin(t) * amp;
      } else if (waveType === 'square') {
        y = midY + (Math.sin(t) >= 0 ? amp : -amp);
      } else if (waveType === 'pwm') {
        // Pulse width modulation
        const saw = (t % (Math.PI * 2)) / (Math.PI * 2);
        y = midY + (saw < 0.3 ? amp : -amp);
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    offset += 0.08;
    requestAnimationFrame(draw);
  }

  draw();
}

/* ==========================================================================
   INTERACTIVE CYBER TERMINAL EMULATOR
   ========================================================================== */
function initTerminal(audio) {
  const input = document.getElementById('terminalInput');
  const body = document.getElementById('terminalBody');
  if (!input || !body) return;

  const history = [];
  let historyIdx = -1;
 const commands = {
  help: () => `
    <div style="color: var(--accent-primary); font-weight: 600; margin-bottom: 0.3rem;">
      AVAILABLE COMMANDS:
    </div>
    <span style="color: #38bdf8;">bio</span>         - About me and career profile
    <span style="color: #38bdf8;">skills</span>      - Technical skills and proficiencies
    <span style="color: #38bdf8;">projects</span>    - Explore 5 featured projects
    <span style="color: #38bdf8;">experience</span>  - Professional experience
    <span style="color: #38bdf8;">education</span>   - Degree and academic coursework
    <span style="color: #38bdf8;">stats</span>       - Coding and academic statistics
    <span style="color: #38bdf8;">status</span>      - Employment availability
    <span style="color: #38bdf8;">matrix</span>      - Trigger cyber matrix digital rain
    <span style="color: #38bdf8;">contact</span>     - Email, GitHub, and LinkedIn
    <span style="color: #38bdf8;">clear</span>       - Clear the terminal console
  `,

  bio: () => `
    <div style="color: var(--accent-primary);">[ENGINEER PROFILE]</div>
    Electronics & Communication Engineering graduate fusing hardware
    precision with modern software craftsmanship.

    Software and Systems Engineering, Backend Development, Full-Stack Architecture, 
    Distributed Systems, and High-Performance Web Applications.

    <div style="color: #38bdf8; margin-top: 0.5rem;">
      LOCATION: Lucknow, India
    </div>
    Open to full-time opportunities | Remote • Hybrid • On-site
  `,

  skills: () => `
    <div style="color: var(--accent-primary);">[TECHNICAL STACK]</div>

    <div style="color: #38bdf8;">01. PROGRAMMING LANGUAGES</div>
    C / C++ (80%) | Python (70%) | Java (70%)
    JavaScript (40%) | SQL (80%)

    <div style="color: #38bdf8; margin-top: 0.5rem;">02. SOFTWARE ENGINEERING</div>
    Spring Boot & Spring MVC (65%)
    Microservices & REST APIs (70%)
    Debugging & Agile Methodology (60%)
    API Integration & Code Review (70%)
    React.js / Node.js (40%)
    Tailwind CSS / Bootstrap (70%)

    <div style="color: #38bdf8; margin-top: 0.5rem;">03. ECE & CORE ELECTRONICS</div>
    Computer Architecture (75%)
    Combinational & Sequential Circuits (80%)
    Analog Circuits (70%)
    Logic Design & Logic Gates (80%)
    Digital Signal Processing (65%)
    Microcontrollers & Microprocessors (65%)
    CMOS & MOSFET (75%)

    <div style="color: #38bdf8; margin-top: 0.5rem;">04. CLOUD, DEVOPS & TOOLS</div>
    Docker & Containerization (45%)
    IntelliJ IDEA / VS Code (90%)
    Render & Netlify (80%)
    CI/CD — GitHub Actions (80%)
    Postman API (85%)
    Git & GitHub (90%)
  `,

  projects: () => `
    <div style="color: var(--accent-primary);">[PROJECT ARCHIVES: 05]</div>

    <div style="color: #38bdf8;">01. ContactNest</div>
    Full-Stack Contact Management System
    Spring Boot | React | Tailwind CSS | MySQL
    JWT authentication, role-based authorization, dynamic search,
    and CRUD operations.
    <a href="https://phonebookapp01.netlify.app/" target="_blank"
       rel="noopener noreferrer" style="color: #10b981;">[LIVE DEMO]</a>
    <a href="https://github.com/mdTahir5/ContactNest" target="_blank"
       rel="noopener noreferrer" style="color: #38bdf8;">[SOURCE CODE]</a>

    <div style="color: #38bdf8; margin-top: 0.7rem;">02. CogniQuiz</div>
    AI-Powered Assessment Platform
    Spring Boot | Node.js | Chart.js | SQL
    Dynamic quiz generation, JWT authentication, competitive rankings,
    negative marking, and performance analytics.
    <a href="https://cogniquiz.netlify.app/" target="_blank"
       rel="noopener noreferrer" style="color: #10b981;">[LIVE DEMO]</a>
    <a href="https://github.com/mdTahir5/CogniQuiz" target="_blank"
       rel="noopener noreferrer" style="color: #38bdf8;">[SOURCE CODE]</a>

    <div style="color: #38bdf8; margin-top: 0.7rem;">03. ImageReco</div>
    AI Image Analysis & Inventory Inspection
    React | Spring Boot | MySQL | Vision AI
    AI-assisted object detection, condition assessment, and
    automated inventory cataloging.
    <a href="https://ai-image-reco.netlify.app/" target="_blank"
       rel="noopener noreferrer" style="color: #10b981;">[LIVE DEMO]</a>
    <a href="https://github.com/mdTahir5/ImageReco" target="_blank"
       rel="noopener noreferrer" style="color: #38bdf8;">[SOURCE CODE]</a>

    <div style="color: #38bdf8; margin-top: 0.7rem;">04. AIBIS</div>
    AI-Powered Technical Interview Simulator
    JavaScript | Express.js | GPT-4o-mini | Face-API.js
    Voice-based interviews, facial monitoring, and automated
    performance evaluation.
    <a href="https://aibis.netlify.app/" target="_blank"
       rel="noopener noreferrer" style="color: #10b981;">[LIVE DEMO]</a>
    <a href="https://github.com/mdTahir5/AIBIS" target="_blank"
       rel="noopener noreferrer" style="color: #38bdf8;">[SOURCE CODE]</a>

    <div style="color: #38bdf8; margin-top: 0.7rem;">05. IoT Earthing Monitor</div>
    IoT-Based Underground Earthing Monitoring System
    ESP32 | C++ | Wi-Fi | Moisture Sensor | Adafruit IO
    Real-time soil moisture monitoring with wireless sensor
    data collection and transmission.
    <a href="https://drive.google.com/file/d/1UdaC1DuloVN3oJKnu7KFG9tGIAWy5Gu1/view"
       target="_blank" rel="noopener noreferrer" style="color: #10b981;">[PROJECT REPORT]</a>
    <a href="https://github.com/mdTahir5/B.Tech-Final-Year-Project"
       target="_blank" rel="noopener noreferrer" style="color: #38bdf8;">[SOURCE CODE]</a>
  `,

  experience: () => `
    <div style="color: var(--accent-primary);">[PROFESSIONAL EXPERIENCE]</div>

    <div style="color: #38bdf8;">Software Trainee</div>
    ShapeMySkills Pvt Ltd
    July 2024 — August 2024

    Completed intensive Core and Advanced Java training covering:
    - Object-Oriented Programming
    - Java Collections and Exception Handling
    - JDBC, JSP, and Servlets
    - Database-driven CRUD applications
    - Spring Boot and REST APIs
    - Dependency Injection and Annotations
  `,

  education: () => `
    <div style="color: var(--accent-primary);">[ACADEMIC BACKGROUND]</div>

    <div style="color: #38bdf8;">B.Tech — Electronics & Communication Engineering</div>
    Dr. A. P. J. Abdul Kalam Technical University, Lucknow
    2021 — 2025

    CGPA: 7.9 / 10
    First Division with Distinction
    Academic Performance: Top 5 (as provided)

    <div style="color: #38bdf8; margin-top: 0.5rem;">CORE COURSEWORK</div>
    Computer Architecture
    Digital Electronics & Analog Circuits
    Digital Communication
    Microprocessors & Microcontrollers
    Digital Signal Processing
    Data Structures & Algorithms
    Operating Systems
    VLSI Design
  `,

  stats: () => `
    <div style="color: var(--accent-primary);">[PERFORMANCE METRICS]</div>
    <span style="color: #38bdf8;">Coding Experience:</span> 1+ Years
    <span style="color: #38bdf8;">Projects Built:</span> 5+
    <span style="color: #38bdf8;">Coding Problems:</span> 200+
    <span style="color: #38bdf8;">Academic Performance:</span> Top 5
    <span style="color: #38bdf8;">B.Tech CGPA:</span> 7.9 / 10
  `,

  status: () => `
    <span style="color: #10b981;">● STATUS: AVAILABLE</span>

    Available for Software & System Engineering Roles.

    <span style="color: #38bdf8;">Preferred opportunities:</span>
    Software Engineer | Full-Stack Developer
    Java Developer | Backend Engineer

    <span style="color: #38bdf8;">Location:</span>
    Lucknow, India
    Open to full-time opportunities | Remote • Hybrid • On-site
  `,

  contact: () => `
    <div style="color: var(--accent-primary);">[DIRECT COMM CHANNELS]</div>

    <span style="color: #38bdf8;">Email:</span>
    <a href="mailto:mdtahir52025@gmail.com"
       style="color: #38bdf8; text-decoration: underline;">
       mdtahir52025@gmail.com
    </a>

    <span style="color: #38bdf8;">GitHub:</span>
    <a href="https://github.com/mdTahir5"
       target="_blank" rel="noopener noreferrer"
       style="color: #38bdf8; text-decoration: underline;">
       github.com/mdTahir5
    </a>

    <span style="color: #38bdf8;">LinkedIn:</span>
    <a href="https://www.linkedin.com/in/mdtahir05"
       target="_blank" rel="noopener noreferrer"
       style="color: #38bdf8; text-decoration: underline;">
       linkedin.com/in/mdtahir05
    </a>
  `,

  matrix: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("terminal:matrix"));
    }
    return `
      <span style="color: #10b981;">[MATRIX PROTOCOL]</span>
      Digital rain requested...
      <span style="color: #38bdf8;">
        Awaiting matrix animation handler.
      </span>
    `;
  },

  clear: () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("terminal:clear"));
    }
    return "";
  }
};

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      if (!val) return;

      if (audio) audio.playClick();
      history.push(val);
      historyIdx = history.length;

      // Append prompt line
      const line = document.createElement('div');
      line.style.marginBottom = '0.5rem';
      line.innerHTML = `<span style="color: var(--accent-primary);">tahir@terminal:~$</span> <span style="color: #fff;">${escapeHtml(val)}</span>`;
      body.appendChild(line);

      // Execute
      if (val === 'clear') {
        body.innerHTML = '';
      } else if (commands[val]) {
        const responseDiv = document.createElement('div');
        responseDiv.style.marginBottom = '0.85rem';
        responseDiv.innerHTML = commands[val]();
        body.appendChild(responseDiv);
      } else {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = '#ef4444';
        errorDiv.style.marginBottom = '0.85rem';
        errorDiv.textContent = `Command not recognized: "${val}". Type 'help' for valid options.`;
        body.appendChild(errorDiv);
      }

      input.value = '';
      body.scrollTop = body.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx] || '';
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    }
  });

  // Suggestion chips click
  document.querySelectorAll('.term-suggest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      input.value = cmd;
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]));
}

/* ==========================================================================
   NAVIGATION, MOBILE DRAWER, & FILTERS
   ========================================================================== */
function setupNavigation(audio) {
  const mobileToggle = document.getElementById('mobileNavToggle');
  const drawerOverlay = document.getElementById('mobileDrawerOverlay');
  const drawerClose = document.getElementById('mobileDrawerClose');

  if (mobileToggle && drawerOverlay) {
    mobileToggle.addEventListener('click', () => {
      drawerOverlay.classList.add('open');
      if (audio) audio.playSwitch();
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', () => {
        drawerOverlay.classList.remove('open');
        if (audio) audio.playClick();
      });
    }

    drawerOverlay.querySelectorAll('.mobile-drawer-link').forEach(link => {
      link.addEventListener('click', () => {
        drawerOverlay.classList.remove('open');
      });
    });
  }

  // Filter Buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (audio) audio.playClick();
      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });

  // Close Modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('open');
      if (audio) audio.playClick();
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   THEME SWITCHER
   ========================================================================== */
function setupThemeSwitcher(audio) {
  const themes = ['cyan', 'violet', 'emerald', 'amber'];
  const themeBtn = document.getElementById('themeCycleBtn');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'cyan';
      const nextIdx = (themes.indexOf(current) + 1) % themes.length;
      const nextTheme = themes[nextIdx];

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('portfolioTheme', nextTheme);

      if (audio) audio.playSwitch();
      window.dispatchEvent(new CustomEvent('portfolioThemeChanged', { detail: nextTheme }));
      window.dispatchEvent(new CustomEvent('showToast', { detail: `Switched Theme to ${nextTheme.toUpperCase()}` }));
    });
  }
}

/* ==========================================================================
   AUDIO TOGGLE BUTTON
   ========================================================================== */
function setupAudioButton(audio) {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (!audioBtn) return;

  function updateIcon(isActive) {
    audioBtn.classList.toggle('active', isActive);
    audioBtn.title = isActive ? 'Audio FX Enabled (Click to Mute)' : 'Audio FX Muted (Click to Enable)';
  }

  updateIcon(audio.isEnabled);

  audioBtn.addEventListener('click', () => {
    const active = audio.toggle();
    updateIcon(active);
    window.dispatchEvent(new CustomEvent('showToast', { detail: active ? 'Futuristic Audio FX: Active' : 'Audio FX: Muted' }));
  });

  window.addEventListener('audioToggled', (e) => {
    updateIcon(e.detail);
  });
}

/* ==========================================================================
   CONTACT FORM HANDLER
   ========================================================================== */
function setupContactForm(audio) {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const RECIPIENT = 'mdtahir52025@gmail.com';

  /* Build the composed email from the form fields and hand it off to an
     email client. Priority: Gmail → Outlook → Yahoo (web clients, which work
     even when no desktop mail app is installed) → native mailto fallback. */
  const dispatchTransmission = (name, email, subject, message) => {
    const encodedSubject = encodeURIComponent(
      subject || `New Message from ${name} — Portfolio Contact`
    );
    const encodedBody = encodeURIComponent(
      `Name: ${name}\n` +
      `Reply-To: ${email}\n` +
      `----------------------------------------\n\n` +
      `${message}\n\n` +
      `----------------------------------------\n` +
      `Sent from the portfolio contact form`
    );

    const webClients = [
      `https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT}&su=${encodedSubject}&body=${encodedBody}`,
      `https://outlook.live.com/mail/0/deeplink/compose?to=${RECIPIENT}&subject=${encodedSubject}&body=${encodedBody}`,
      `https://compose.mail.yahoo.com/?to=${RECIPIENT}&subject=${encodedSubject}&body=${encodedBody}`
    ];

    /* Detect whether a desktop email application is configured (Windows / Linux / macOS). */
    const isWindows = /Windows/i.test(navigator.userAgent);
    const isLinux = /Linux/i.test(navigator.userAgent) && !/Android/i.test(navigator.userAgent);
    const isMac = /Macintosh|Mac OS X/i.test(navigator.userAgent) && !/iPhone|iPad/i.test(navigator.userAgent);
    const hasNativeMailApp = isWindows || isLinux || isMac;

    if (hasNativeMailApp) {
      /* Try the OS default mail client first; if nothing handles it, fall
         back to the Gmail web client. */
      const mailto = `mailto:${RECIPIENT}?subject=${encodedSubject}&body=${encodedBody}`;
      let fellBack = false;
      const fallbackTimer = setTimeout(() => {
        /* Only fall back if the page is still visible — if the mail app
           took focus, visibility will have changed to 'hidden'. */
        if (document.visibilityState === 'visible') {
          fellBack = true;
          window.open(webClients[0], '_blank', 'noopener');
          window.dispatchEvent(new CustomEvent('showToast', {
            detail: 'No email application found — opened Gmail web client instead.'
          }));
        }
      }, 1500);

      const start = Date.now();
      window.location.href = mailto;

      /* If the page is still visible shortly after (nothing took over),
         trigger the web-client fallback. */
      setTimeout(() => {
        if (!fellBack && Date.now() - start < 2200 && document.visibilityState === 'visible') {
          clearTimeout(fallbackTimer);
          window.open(webClients[0], '_blank', 'noopener');
          window.dispatchEvent(new CustomEvent('showToast', {
            detail: 'No email application detected — opened Gmail web client instead.'
          }));
        }
      }, 2000);
    } else {
      /* Mobile / unknown environment: open Gmail web client in a new tab. */
      window.open(webClients[0], '_blank', 'noopener');
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      window.dispatchEvent(new CustomEvent('showToast', { detail: 'Please fill in all contact fields.' }));
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Opening Email Client...</span>`;
    if (audio) audio.playClick();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      dispatchTransmission(name, email, subject, message);

      if (audio) audio.playSuccess();
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: `Transmission handed off, ${name}! Your email client should open now.`
      }));
    }, 600);
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function setupToastNotifications() {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  window.addEventListener('showToast', (e) => {
    const message = e.detail;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--accent-primary);">âš¡</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutToast 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  });
}

/* ==========================================================================
   REVEAL ON SCROLL OBSERVER
   ========================================================================== */
function setupScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  const attachObserver = () => {
    document.querySelectorAll('.reveal-item:not(.revealed)').forEach(el => {
      observer.observe(el);
    });
  };

  attachObserver();
  window.addEventListener('domUpdated', attachObserver);
}
