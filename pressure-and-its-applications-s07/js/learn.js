/* =====================================================
   learn.js — Pressure Playground: Learn Module
   Pure vanilla JS + SVG animations. No frameworks.
   ===================================================== */
'use strict';

/* ── HELPERS ─────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const svg = (tag, attrs) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
  return el;
};

let audioCtx = null;
let lastSliderSound = 0;

function getAudioContext() {
  if (!window.AudioContext && !window.webkitAudioContext) return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  return audioCtx;
}

function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'running') return;
  ctx.resume().catch(() => {});
}

function playTone({ frequency = 440, duration = 0.07, type = 'sine', gain = 0.035, slideTo = null } = {}) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const amp = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  if (slideTo !== null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), ctx.currentTime + duration);
  }

  amp.gain.setValueAtTime(0.0001, ctx.currentTime);
  amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration + 0.03);
}

function playButtonSound() {
  playTone({ frequency: 520, slideTo: 390, duration: 0.08, type: 'triangle', gain: 0.028 });
}

function playSliderSound(value, min, max) {
  const now = performance.now();
  if (now - lastSliderSound < 35) return;
  lastSliderSound = now;
  const ratio = (value - min) / Math.max(1, (max - min));
  const freq = 240 + ratio * 420;
  playTone({ frequency: freq, slideTo: freq * 1.12, duration: 0.05, type: 'sine', gain: 0.02 });
}

function playCorrectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  playTone({ frequency: 660, slideTo: 880, duration: 0.08, type: 'triangle', gain: 0.03 });
  setTimeout(() => playTone({ frequency: 990, slideTo: 1320, duration: 0.06, type: 'triangle', gain: 0.022 }), 70);
}

function playWrongSound() {
  playTone({ frequency: 220, slideTo: 150, duration: 0.12, type: 'sawtooth', gain: 0.02 });
}

function initSoundEffects() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (isReducedMotion) return;

  document.addEventListener('pointerdown', event => {
    const target = event.target.closest('button');
    if (!target) return;
    playButtonSound();
  }, { passive: true });

  document.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
  document.addEventListener('keydown', unlockAudio, { passive: true, once: true });

  document.addEventListener('click', event => {
    const option = event.target.closest('.quiz-opt');
    if (!option) return;
    if (option.classList.contains('opt-correct')) {
      playCorrectSound();
    } else if (option.classList.contains('opt-wrong')) {
      playWrongSound();
    }
  }, { passive: true });

  document.addEventListener('input', event => {
    const range = event.target.closest('input[type=range]');
    if (!range) return;
    const min = Number(range.min || 0);
    const max = Number(range.max || 100);
    const value = Number(range.value || 0);
    playSliderSound(value, min, max);
  }, { passive: true });

  document.addEventListener('change', event => {
    const range = event.target.closest('input[type=range]');
    if (!range) return;
    const min = Number(range.min || 0);
    const max = Number(range.max || 100);
    const value = Number(range.value || 0);
    playSliderSound(value, min, max);
  }, { passive: true });
}

/* ── INIT ON DOM READY ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTOC();
  initReveal();
  initFlipCards();
  initTabs();
  initSoundEffects();
  initAreaAnim();
  initHydroTank();
  initAltitudeAnim();
  initPascalAnim();
  initArchimedes();
  initBernoulli();
  initBoyle();
  initExamples();
  initQuiz();
});

/* ════════════════════════════════════════════════════════
   NAV PILL — slides to highlight the active tab
   ════════════════════════════════════════════════════════ */
function initNav() {
  const inner = document.querySelector('.nav-inner');
  const pill  = document.querySelector('.nav-pill');
  if (!inner || !pill) return;

  function positionPill() {
    const active = inner.querySelector('.nav-tab.active');
    if (!active) return;
    const iRect = inner.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    pill.style.left  = (aRect.left - iRect.left) + 'px';
    pill.style.width = aRect.width + 'px';
  }

  positionPill();
  window.addEventListener('resize', positionPill);
}

/* ════════════════════════════════════════════════════════
   TABLE OF CONTENTS — scroll-spy with IntersectionObserver
   ════════════════════════════════════════════════════════ */
function initTOC() {
  const links    = [...document.querySelectorAll('.toc-body a[data-section]')];
  const sections = links.map(l => document.getElementById(l.dataset.section)).filter(Boolean);
  if (!sections.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('toc-active'));
        const match = links.find(l => l.dataset.section === e.target.id);
        if (match) match.classList.add('toc-active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => io.observe(s));

  /* mobile toggle */
  const btn  = document.querySelector('.toc-toggle-btn');
  const body = document.querySelector('.toc-body');
  if (btn && body) {
    btn.addEventListener('click', () => {
      const open = body.classList.toggle('open');
      btn.textContent = open ? '▲' : '▼';
      btn.setAttribute('aria-expanded', open);
    });
  }
}

/* ════════════════════════════════════════════════════════
   SCROLL REVEAL — fade/slide sections in
   ════════════════════════════════════════════════════════ */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  items.forEach(el => io.observe(el));
}

/* ════════════════════════════════════════════════════════
   FLIP CARDS
   ════════════════════════════════════════════════════════ */
function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    const flip = () => card.classList.toggle('flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
    });
  });
}

/* ════════════════════════════════════════════════════════
   TABS
   ════════════════════════════════════════════════════════ */
function initTabs() {
  document.querySelectorAll('[data-tabgroup]').forEach(group => {
    const buttons = [...group.querySelectorAll('.tab-btn')];
    const panels  = [...group.querySelectorAll('.tab-panel')];

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('tab-active'));
        panels.forEach(p => p.classList.remove('tab-open'));
        btn.classList.add('tab-active');
        const target = group.querySelector(`.tab-panel[data-tab="${btn.dataset.tab}"]`);
        if (target) target.classList.add('tab-open');
      });
    });
  });
}

/* ════════════════════════════════════════════════════════
   ANIMATION 1 — P = F/A Area Toggle
   SVG: block pressing on surface; toggle large/small area;
   pressure dots + heatmap change.
   ════════════════════════════════════════════════════════ */
function initAreaAnim() {
  const svgEl = $('area-anim-svg');
  if (!svgEl) return;

  const FORCE = 100;   /* fixed force in N */
  let isSmall = true;  /* small = sharp; large = blunt */

  const blockEl    = svgEl.querySelector('#aa-block');
  const arrowGroup = svgEl.querySelector('#aa-arrows');
  const heatRect   = svgEl.querySelector('#aa-heat');
  const pressLabel = svgEl.querySelector('#aa-press-label');
  const forceLabel = svgEl.querySelector('#aa-force-label');

  function render(small) {
    const area     = small ? 20 : 100;   /* px^2 metaphor (visual) */
    const pressure = FORCE / (small ? 1 : 10);   /* N/cm² */
    const blockW   = small ? 40 : 120;
    const blockX   = 160 - blockW / 2;

    blockEl.setAttribute('x', blockX);
    blockEl.setAttribute('width', blockW);

    /* heat colour: high pressure = red, low = green */
    heatRect.setAttribute('fill', small ? '#FF5A4E' : '#58B368');
    heatRect.setAttribute('x', blockX);
    heatRect.setAttribute('width', blockW);
    heatRect.setAttribute('opacity', '0.38');

    /* pressure arrows — more arrows for smaller area */
    while (arrowGroup.firstChild) arrowGroup.removeChild(arrowGroup.firstChild);
    const count = small ? 6 : 2;
    const spacing = blockW / (count + 1);
    for (let i = 1; i <= count; i++) {
      const x = blockX + spacing * i;
      const line = svg('line', { x1: x, y1: 142, x2: x, y2: 162,
        stroke: small ? '#FF5A4E' : '#58B368',
        'stroke-width': small ? 3 : 2.5,
        'marker-end': 'url(#arrowhead)' });
      arrowGroup.appendChild(line);
    }

    pressLabel.textContent = `P = ${pressure} N/cm²`;
    pressLabel.style.fill  = small ? '#A04EF6' : '#58B368';
    forceLabel.textContent = `F = ${FORCE} N`;
  }

  render(isSmall);

  document.querySelectorAll('.area-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      isSmall = btn.dataset.area === 'small';
      document.querySelectorAll('.area-toggle').forEach(b => b.classList.remove('tog-active'));
      btn.classList.add('tog-active');
      render(isSmall);
    });
  });
}

/* ════════════════════════════════════════════════════════
   ANIMATION 2 — Hydrostatic Tank (depth slider)
   P = ρgh; wall arrows scale with depth.
   ════════════════════════════════════════════════════════ */
function initHydroTank() {
  const sliderEl  = $('hydro-depth');
  const pressOut  = $('hydro-press-val');
  const svgEl     = $('hydro-svg');
  if (!sliderEl || !svgEl) return;

  const RHO = 1000, G = 9.8;

  function update() {
    const depth = parseFloat(sliderEl.value);
    const P = (RHO * G * depth).toFixed(0);
    if (pressOut) pressOut.textContent = `P = ${P} Pa`;

    /* move diver */
    const diver = svgEl.querySelector('#ht-diver');
    if (diver) diver.setAttribute('cy', 60 + depth * 14);

    /* scale wall arrows */
    svgEl.querySelectorAll('.ht-arrow').forEach(a => {
      const base = parseFloat(a.dataset.base) || 1;
      const len = Math.min(4 + depth * base * 3, 38);
      const x1 = parseFloat(a.getAttribute('x1'));
      a.setAttribute('x2', x1 + len);
      a.style.opacity = 0.5 + depth * 0.05;
    });

    /* label */
    const label = svgEl.querySelector('#ht-depth-label');
    if (label) label.textContent = `Depth: ${depth} m`;
  }

  sliderEl.addEventListener('input', update);
  update();
}

/* ════════════════════════════════════════════════════════
   ANIMATION 3 — Altitude / Atmospheric Pressure
   Balloon slides up; pressure reading drops.
   ════════════════════════════════════════════════════════ */
function initAltitudeAnim() {
  const svgEl    = $('altitude-svg');
  const replayBtn = $('altitude-replay');
  if (!svgEl) return;

  let raf = null;

  function animate() {
    cancelAnimationFrame(raf);
    const balloon = svgEl.querySelector('#alt-balloon');
    const pressLabel = svgEl.querySelector('#alt-press-label');
    const altLabel = svgEl.querySelector('#alt-label');
    if (!balloon) return;

    let t = 0; const dur = 220;
    const startY = 230, endY = 30;

    function step() {
      t++;
      const progress = Math.min(1, t / dur);
      const ease = 1 - Math.pow(1 - progress, 2);
      const y = startY + (endY - startY) * ease;
      balloon.setAttribute('transform', `translate(0, ${y - 230})`);

      /* pressure: ~101325 Pa at 0m, ~20000 Pa at 10km */
      const P = Math.round(101325 * Math.pow(1 - 0.0000226 * (progress * 10000), 5.256));
      if (pressLabel) pressLabel.textContent = `~${(P / 1000).toFixed(1)} kPa`;
      if (altLabel)   altLabel.textContent   = `Alt: ${Math.round(progress * 10)} km`;

      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  animate();
  if (replayBtn) replayBtn.addEventListener('click', animate);
}

/* ════════════════════════════════════════════════════════
   ANIMATION 4 — Pascal's Law: Hydraulic Press
   Small piston pressed down → car rises on large piston.
   ════════════════════════════════════════════════════════ */
function initPascalAnim() {
  const svgEl    = $('pascal-svg');
  const replayBtn = $('pascal-replay');
  if (!svgEl) return;

  let raf = null;

  function animate() {
    cancelAnimationFrame(raf);
    const smallPiston = svgEl.querySelector('#pa-small-piston');
    const largePiston = svgEl.querySelector('#pa-large-piston');
    const car         = svgEl.querySelector('#pa-car');
    const fluidRect   = svgEl.querySelector('#pa-fluid');
    const label       = svgEl.querySelector('#pa-label');

    /* reset all elements to their original positions before replaying */
    if (smallPiston) smallPiston.setAttribute('transform', 'translate(0, 0)');
    if (largePiston) largePiston.setAttribute('transform', 'translate(0, 0)');
    if (car)         car.setAttribute('transform',         'translate(0, 0)');
    if (fluidRect)   fluidRect.style.opacity = '0.28';
    if (label)       label.textContent = 'Press the small piston to lift the car!';

    let t = 0; const dur = 180;

    function step() {
      t++;
      const p = Math.min(1, t / dur);
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

      /* small piston moves down 25px */
      if (smallPiston) smallPiston.setAttribute('transform', `translate(0, ${ease * 25})`);
      /* large piston + car move up 8px (ratio = area ratio) */
      if (largePiston) largePiston.setAttribute('transform', `translate(0, ${-ease * 8})`);
      if (car)         car.setAttribute('transform', `translate(0, ${-ease * 8})`);
      /* fluid level visible */
      if (fluidRect) fluidRect.style.opacity = 0.6 + ease * 0.35;
      if (label) label.textContent = ease > 0.5
        ? 'Equal pressure — bigger area = bigger force!'
        : 'Pressing small piston…';

      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  animate();
  if (replayBtn) replayBtn.addEventListener('click', animate);
}

/* ════════════════════════════════════════════════════════
   ANIMATION 5 — Archimedes' Principle
   Object lowered into water; level rises; buoyancy arrow grows.
   ════════════════════════════════════════════════════════ */
function initArchimedes() {
  const svgEl    = $('archimedes-svg');
  const replayBtn = $('archimedes-replay');
  const toggleBtn = $('archimedes-toggle');
  if (!svgEl) return;

  let dense = false; /* false = floats, true = sinks */
  let raf = null;

  function animate() {
    cancelAnimationFrame(raf);
    const obj       = svgEl.querySelector('#arch-obj');
    const waterTop  = svgEl.querySelector('#arch-water-top');
    const buoy      = svgEl.querySelector('#arch-buoy');
    const weightArrow = svgEl.querySelector('#arch-weight');
    const label     = svgEl.querySelector('#arch-label');

    const startY = 50, endY = dense ? 195 : 175;
    const waterOrigY = 160;

    let t = 0; const dur = 140;

    function step() {
      t++;
      const p = Math.min(1, t / dur);
      const ease = 1 - Math.pow(1 - p, 3);

      const objY = startY + (endY - startY) * ease;
      if (obj) obj.setAttribute('transform', `translate(0, ${objY - 50})`);

      /* water rises as object submerges */
      const submerge = Math.max(0, (objY - waterOrigY + 20) / 60) * ease;
      const rise = submerge * 8;
      if (waterTop) {
        waterTop.setAttribute('y', waterOrigY - rise);
        waterTop.setAttribute('height', rise + 2);
      }

      /* buoyancy arrow grows opposite gravity */
      const buoyLen = Math.min(40, submerge * 50);
      if (buoy) {
        buoy.setAttribute('y2', 190 - buoyLen);
        buoy.style.opacity = buoyLen > 2 ? '1' : '0';
      }
      if (weightArrow) weightArrow.style.opacity = p > 0.2 ? '1' : '0';

      if (label) label.textContent = p >= 1
        ? (dense ? 'Sinks — weight > buoyant force' : 'Floats — buoyant force ≥ weight')
        : 'Lowering object…';

      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  animate();
  if (replayBtn) replayBtn.addEventListener('click', animate);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      dense = !dense;
      toggleBtn.textContent = dense ? '🪨 Dense object (sinks)' : '🪵 Light object (floats)';
      toggleBtn.classList.toggle('tog-active', dense);
      animate();
    });
  }
}

/* ════════════════════════════════════════════════════════
   ANIMATION 6 — Bernoulli's Principle
   Particles flow through narrow pipe; speed up, pressure drops.
   ════════════════════════════════════════════════════════ */
function initBernoulli() {
  const svgEl    = $('bernoulli-svg');
  const replayBtn = $('bernoulli-replay');
  if (!svgEl) return;

  let particles = [];
  let running   = false;
  let raf = null;

  /* build particle pool once */
  const particleGroup = svgEl.querySelector('#bern-particles');
  const COLORS = ['#3E8BFA', '#58B368', '#FF9F2E'];

  function spawn() {
    if (particles.length > 14) return;
    const el = svg('circle', { r: 5, fill: COLORS[Math.floor(Math.random() * 3)], opacity: 0.85 });
    particleGroup.appendChild(el);
    particles.push({ el, x: -10, y: 60 + Math.random() * 40, speed: 1 + Math.random() * 0.5 });
  }

  function pipePath(x) {
    /* pipe narrows in the middle (x 120-240) */
    if (x < 120) return { y: 50 + Math.random() * 40, r: 5 };
    if (x < 240) {
      const frac = (x - 120) / 120;
      const narrow = 40 - frac * 20;
      return { y: 80 - narrow / 2 + Math.random() * narrow, r: 4 };
    }
    return { y: 50 + Math.random() * 40, r: 5 };
  }

  function tick() {
    if (!running) return;
    if (Math.random() < 0.2) spawn();

    particles = particles.filter(p => {
      /* speed up in narrow zone */
      const inNarrow = p.x >= 110 && p.x <= 250;
      p.speed = inNarrow ? (p.baseSpeed || p.speed) * 1.05 : (p.baseSpeed || p.speed);
      if (!p.baseSpeed) p.baseSpeed = p.speed;
      p.x += inNarrow ? p.speed * 2.2 : p.speed;
      p.y += (Math.random() - 0.5) * (inNarrow ? 1.2 : 1.8);

      /* clamp y to pipe walls */
      const walls = pipePath(p.x);
      p.el.setAttribute('cx', p.x);
      p.el.setAttribute('cy', Math.max(walls.y - 15, Math.min(walls.y + 15, p.y)));
      p.el.setAttribute('r', walls.r);

      if (p.x > 420) { p.el.remove(); return false; }
      return true;
    });

    /* update pressure gauge labels */
    const gWide   = svgEl.querySelector('#bern-p-wide');
    const gNarrow = svgEl.querySelector('#bern-p-narrow');
    if (gWide)   gWide.textContent   = 'HIGH pressure';
    if (gNarrow) gNarrow.textContent = 'LOW pressure';

    raf = requestAnimationFrame(tick);
  }

  function start() {
    running = true;
    particles.forEach(p => p.el.remove());
    particles = [];
    while (particleGroup.firstChild) particleGroup.removeChild(particleGroup.firstChild);
    raf = requestAnimationFrame(tick);
  }

  start();
  if (replayBtn) replayBtn.addEventListener('click', () => {
    cancelAnimationFrame(raf);
    start();
  });
}

/* ════════════════════════════════════════════════════════
   ANIMATION 7 — Boyle's Law Piston Slider
   Drag slider → piston moves → volume changes → P changes.
   ════════════════════════════════════════════════════════ */
function initBoyle() {
  const sliderEl  = $('boyle-slider');
  const svgEl     = $('boyle-svg');
  const pressOut   = $('boyle-press-val');
  const volOut     = $('boyle-vol-val');
  const volLabel   = $('boyle-vol-label');
  if (!sliderEl || !svgEl) return;

  const P0 = 100, V0 = 100;

  function update() {
    const volume = parseInt(sliderEl.value);   /* 20–100 */
    const P = Math.round(P0 * V0 / volume);

    if (pressOut)  pressOut.textContent  = `P = ${P} kPa`;
    if (volOut)    volOut.textContent    = `V = ${volume}%`;
    if (volLabel)  volLabel.textContent  = `${volume}%`;

    /* piston position: chamber goes from x=40 to x=280 wide */
    const chamberW = 240 * volume / 100;
    const pistonX  = 40 + chamberW;

    const piston    = svgEl.querySelector('#boyle-piston');
    const chamberEl = svgEl.querySelector('#boyle-chamber');
    if (piston)    piston.setAttribute('x', pistonX);
    if (chamberEl) chamberEl.setAttribute('width', chamberW);

    /* redistribute gas dots */
    const dotGroup = svgEl.querySelector('#boyle-dots');
    if (!dotGroup) return;
    while (dotGroup.firstChild) dotGroup.removeChild(dotGroup.firstChild);

    const count = Math.round(8 + (V0 - volume) / 10);
    for (let i = 0; i < count; i++) {
      const cx = 50 + Math.random() * (chamberW - 20);
      const cy = 80 + Math.random() * 60;
      const dot = svg('circle', {
        cx, cy, r: 4,
        fill: '#A04EF6', opacity: 0.75
      });
      dotGroup.appendChild(dot);
    }
  }

  sliderEl.addEventListener('input', update);
  update();
}

/* ════════════════════════════════════════════════════════
   SOLVED EXAMPLES — expandable step-by-step solutions
   ════════════════════════════════════════════════════════ */
function initExamples() {
  document.querySelectorAll('.show-sol-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.example-card');
      const sol  = card.querySelector('.example-solution');
      if (!sol) return;
      const isOpen = sol.classList.toggle('sol-open');
      btn.textContent = isOpen ? '▲ Hide Solution' : '▼ Show Solution';
    });
  });
}

/* ════════════════════════════════════════════════════════
   QUIZ ENGINE
   7 questions: 6 MCQ + 1 easy numerical.
   ════════════════════════════════════════════════════════ */
const QUIZ_DATA = [
  {
    q: 'What is the SI unit of pressure?',
    opts: ['Newton (N)', 'Pascal (Pa)', 'Joule (J)', 'Watt (W)'],
    ans: 1,
    hint: 'It is named after Blaise Pascal.',
    explain: 'The SI unit of pressure is the Pascal (Pa). 1 Pa = 1 N/m².'
  },
  {
    q: 'If the same force acts on a smaller area, the pressure will…',
    opts: [
      'Decreases',
      'Stays the same',
      'Increases',
      'Disappears'
    ],
    ans: 2,
    hint: 'Use the formula P = F ÷ A.',
    explain: 'Pressure increases when the area gets smaller while force stays the same.'
  },
  {
    q: 'Which pressure is shown by a car tyre pressure gauge?',
    opts: ['Atmospheric pressure', 'Gauge pressure', 'Absolute pressure', 'Differential pressure'],
    ans: 1,
    hint: 'It measures pressure relative to the air around us.',
    explain: 'A tyre gauge shows gauge pressure, not absolute pressure.'
  },
  {
    q: 'Pascal\'s law is used in which device?',
    opts: [
      'Hydraulic lift',
      'Thermometer',
      'Compass',
      'Magnifying glass'
    ],
    ans: 1,
    hint: 'It helps lift heavy cars in workshops.',
    explain: 'Hydraulic systems work because pressure applied to a liquid is transmitted equally.'
  },
  {
    q: 'What happens to pressure as you go deeper under water?',
    opts: ['It decreases', 'It stays the same', 'It increases', 'It becomes zero'],
    ans: 2,
    hint: 'More water above you means more weight.',
    explain: 'Water pressure increases with depth because more water presses down from above.'
  },
  {
    q: 'Boyle\'s law says that when the volume of a gas goes down, its pressure…',
    opts: ['Goes down', 'Stays the same', 'Goes up', 'Stops'],
    ans: 2,
    hint: 'More squeezing means more collisions.',
    explain: 'For a trapped gas, less volume means more frequent collisions and higher pressure.'
  },
  {
    q: 'The heart creates pressure to…',
    opts: ['Cool the body', 'Move blood through vessels', 'Make bones grow', 'Stop breathing'],
    ans: 1,
    hint: 'Blood must be pumped all around the body.',
    explain: 'The heart pumps blood by creating pressure inside the blood vessels.'
  }
];

function initQuiz() {
  const container = $('quiz-container');
  if (!container) return;

  let current = 0, score = 0, answered = false;

  const progressFill  = container.querySelector('.quiz-progress-fill');
  const metaQ         = container.querySelector('.quiz-meta-q');
  const metaScore     = container.querySelector('.quiz-meta-score');
  const questionWrap  = container.querySelector('.quiz-q-wrap');
  const optionsWrap   = container.querySelector('.quiz-options');
  const hintBtn       = container.querySelector('.hint-btn');
  const hintText      = container.querySelector('.hint-text');
  const feedbackBox   = container.querySelector('.feedback-box');
  const nextBtn       = container.querySelector('.next-btn');
  const resultsEl     = container.querySelector('.quiz-results');
  const resultsScore  = container.querySelector('.results-score');
  const resultsMsg    = container.querySelector('.results-msg');
  const tryAgainBtn   = container.querySelector('.try-again-btn');
  const questionView  = container.querySelector('.quiz-question-view');

  function loadQuestion(idx) {
    answered = false;
    const data = QUIZ_DATA[idx];

    progressFill.style.width = ((idx / QUIZ_DATA.length) * 100) + '%';
    if (metaQ)     metaQ.textContent     = `Question ${idx + 1} of ${QUIZ_DATA.length}`;
    if (metaScore) metaScore.textContent = `Score: ${score}/${QUIZ_DATA.length}`;

    questionWrap.querySelector('h3').textContent = data.q;

    optionsWrap.innerHTML = '';
    data.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt';
      btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + i)}</span>${opt}`;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      optionsWrap.appendChild(btn);
    });

    if (hintText) {
      hintText.textContent = data.hint;
      hintText.classList.remove('hint-open');
    }
    if (feedbackBox) {
      feedbackBox.classList.remove('fb-show', 'fb-correct', 'fb-wrong');
      feedbackBox.textContent = '';
    }
    if (nextBtn) nextBtn.classList.remove('nb-show');
  }

  function selectAnswer(chosenIdx, chosenBtn) {
    if (answered) return;
    answered = true;

    const data = QUIZ_DATA[current];
    const allOpts = optionsWrap.querySelectorAll('.quiz-opt');

    allOpts.forEach(b => b.setAttribute('disabled', 'true'));

    if (chosenIdx === data.ans) {
      score++;
      chosenBtn.classList.add('opt-correct');
      playCorrectSound();
      if (feedbackBox) {
        feedbackBox.textContent = '✅ Correct! ' + data.explain;
        feedbackBox.className = 'feedback-box fb-show fb-correct';
      }
    } else {
      chosenBtn.classList.add('opt-wrong');
      allOpts[data.ans].classList.add('opt-correct');
      playWrongSound();
      if (feedbackBox) {
        feedbackBox.textContent = '❌ Not quite. ' + data.explain;
        feedbackBox.className = 'feedback-box fb-show fb-wrong';
      }
    }

    if (metaScore) metaScore.textContent = `Score: ${score}/${QUIZ_DATA.length}`;
    if (nextBtn) nextBtn.classList.add('nb-show');
    nextBtn.textContent = current < QUIZ_DATA.length - 1 ? 'Next Question →' : 'See Results 🎉';
  }

  if (hintBtn) {
    hintBtn.addEventListener('click', () => {
      if (hintText) {
        const open = hintText.classList.toggle('hint-open');
        hintBtn.setAttribute('aria-expanded', open);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      playButtonSound();
      current++;
      if (current >= QUIZ_DATA.length) {
        showResults();
      } else {
        loadQuestion(current);
      }
    });
  }

  function showResults() {
    if (questionView) questionView.style.display = 'none';
    if (resultsEl)    resultsEl.classList.add('qr-show');
    progressFill.style.width = '100%';

    const pct = score / QUIZ_DATA.length;
    if (resultsScore) resultsScore.textContent = `${score} / ${QUIZ_DATA.length}`;
    if (resultsMsg) {
      if (pct >= 6/7)      resultsMsg.textContent = '🏆 Outstanding! You are a pressure expert!';
      else if (pct >= 4/7) resultsMsg.textContent = '🎉 Great job! A little more practice and you\'ll nail it.';
      else if (pct >= 2/7) resultsMsg.textContent = '📖 Good try! Re-read the sections and try again.';
      else                  resultsMsg.textContent = '💪 Keep going! Every attempt makes you smarter.';
    }
    if (pct >= 6/7) confettiBurst();
  }

  if (tryAgainBtn) {
    tryAgainBtn.addEventListener('click', () => {
      playButtonSound();
      current = 0; score = 0;
      if (questionView) questionView.style.display = '';
      if (resultsEl)    resultsEl.classList.remove('qr-show');
      loadQuestion(0);
    });
  }

  loadQuestion(0);
}

/* ════════════════════════════════════════════════════════
   CONFETTI BURST (same logic as game)
   ════════════════════════════════════════════════════════ */
const CONF_COLORS = ['#FF5A4E','#58B368','#FFC56E','#3E8BFA','#A04EF6'];

function confettiBurst() {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 3;
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.background = CONF_COLORS[i % CONF_COLORS.length];
    document.body.appendChild(el);
    const ang = Math.random() * Math.PI * 2;
    const sp  = 5 + Math.random() * 6;
    let x = cx, y = cy;
    let vx = Math.cos(ang) * sp, vy = Math.sin(ang) * sp - 4;
    let rot = Math.random() * 360, t = 0;
    (function anim() {
      t++; x += vx; vy += 0.35; y += vy; rot += 14;
      el.style.transform = `translate(${x}px,${y}px) rotate(${rot}deg)`;
      el.style.opacity   = Math.max(0, 1 - t / 60).toString();
      if (t < 60) requestAnimationFrame(anim); else el.remove();
    })();
  }
}
