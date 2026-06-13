/* ============================================================
   CosmiCode – Solar System Adventure
   Navigation, drag-and-drop game, one-at-a-time quiz, sounds
   ============================================================ */


// ──────────── NAVIGATION ────────────
function smoothScroll(id) {
  const section = document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// buttons
document.querySelectorAll('[data-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    smoothScroll(btn.dataset.target);
  });
});

// navbar
document.querySelectorAll('#mainNavbar .nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const id = link.getAttribute('href').replace('#', '');

    smoothScroll(id);

    const collapse =
      document.getElementById('navbarContent');

    if (
      collapse &&
      collapse.classList.contains('show') &&
      window.bootstrap
    ) {
      bootstrap
        .Collapse
        .getOrCreateInstance(collapse)
        .hide();
    }
  });
});

// ──────────── FADE-IN ────────────

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ──────────── NAVBAR SCROLL TINT ────────────

window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNavbar');
  if (nav) nav.style.background =
    window.scrollY > 60 ? 'rgba(17,27,94,0.99)' : 'rgba(17,27,94,0.93)';
});

// ──────────── SOUND (Web Audio API) ────────────

// ================= SOUNDS =================

let audioCtx;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  return audioCtx;
}

function playSound(type) {
  const ctx = getAudioContext();

  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'correct') {
    osc.type = 'triangle';

    osc.frequency.setValueAtTime(
      700,
      ctx.currentTime
    );

    osc.frequency.exponentialRampToValueAtTime(
      1200,
      ctx.currentTime + 0.12
    );

    gain.gain.setValueAtTime(
      0.12,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.25
    );

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  else {
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(
      180,
      ctx.currentTime
    );

    osc.frequency.exponentialRampToValueAtTime(
      90,
      ctx.currentTime + 0.2
    );

    gain.gain.setValueAtTime(
      0.07,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.25
    );

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }
}
// ──────────── PLANET ORDER GAME ────────────

const PLANET_ORDER = [
  'Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'
];

const PLANET_ICONS = {
  Mercury: '☀️', Venus: '🔥', Earth: '🌍', Mars: '🔴',
  Jupiter: '👑', Saturn: '💍', Uranus: '🧊', Neptune: '🌊'
};

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initGame() {
  const pool  = document.getElementById('planetPool');
  const zones = document.getElementById('dropZones');
  const msg   = document.getElementById('gameMessage');
  if (!pool || !zones || !msg) return;

  document.getElementById('correctCount').textContent = '0';
  document.getElementById('wrongCount').textContent   = '0';
  document.getElementById('scoreValue').textContent   = '0';
  msg.textContent = '';

  pool.innerHTML  = '';
  zones.innerHTML = '';

  shuffleArray(PLANET_ORDER).forEach(name => {
    const card = document.createElement('div');
    card.className  = 'planet-draggable';
    card.draggable  = true;
    card.dataset.planet = name;
    card.innerHTML  = `${PLANET_ICONS[name]} ${name}`;
    pool.appendChild(card);
  });

  for (let i = 0; i < 8; i++) {
    const zone = document.createElement('div');
    zone.className    = 'drop-zone';
    zone.dataset.index = i;
    zone.innerHTML    = `<span class="zone-number">${i + 1}</span>`;
    zones.appendChild(zone);
  }

  attachDragEvents();
}

let draggedCard = null;

function attachDragEvents() {
  document.querySelectorAll('.planet-draggable').forEach(card => {
    card.addEventListener('dragstart', onDragStart);
    card.addEventListener('dragend',   onDragEnd);
    card.addEventListener('touchstart', onTouchStart, { passive: false });
    card.addEventListener('touchmove',  onTouchMove,  { passive: false });
    card.addEventListener('touchend',   onTouchEnd);
  });

  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover',  onDragOver);
    zone.addEventListener('dragenter', onDragEnter);
    zone.addEventListener('dragleave', onDragLeave);
    zone.addEventListener('drop',      onDrop);
  });

  const pool = document.getElementById('planetPool');
  if (pool) {
    pool.addEventListener('dragover', onDragOver);
    pool.addEventListener('drop',     onPoolDrop);
  }
}

function onDragStart(e) {
  draggedCard = e.target.closest('.planet-draggable');
  if (!draggedCard) return;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => { if (draggedCard) draggedCard.style.opacity = '0.35'; }, 0);
}
function onDragEnd() {
  if (draggedCard) draggedCard.style.opacity = '1';
  draggedCard = null;
  document.querySelectorAll('.drop-zone').forEach(z => z.classList.remove('drag-over'));
}
function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
function onDragEnter(e) {
  e.preventDefault();
  e.target.closest('.drop-zone')?.classList.add('drag-over');
}
function onDragLeave(e) {
  e.target.closest('.drop-zone')?.classList.remove('drag-over');
}
function onDrop(e) {
  e.preventDefault();
  const zone = e.target.closest('.drop-zone');
  if (!zone || !draggedCard) return;
  zone.classList.remove('drag-over');
  const existing = zone.querySelector('.planet-draggable');
  if (existing) document.getElementById('planetPool').appendChild(existing);
  zone.appendChild(draggedCard);
  draggedCard.style.opacity = '1';
  draggedCard = null;
}
function onPoolDrop(e) {
  e.preventDefault();
  if (!draggedCard) return;
  document.getElementById('planetPool').appendChild(draggedCard);
  draggedCard.style.opacity = '1';
  draggedCard = null;
}

// Touch drag
let touchClone = null;
let touchCard  = null;

function onTouchStart(e) {
  e.preventDefault();
  touchCard = e.target.closest('.planet-draggable');
  if (!touchCard) return;
  const t = e.touches[0];
  touchClone = touchCard.cloneNode(true);
  Object.assign(touchClone.style, {
    position: 'fixed', zIndex: '9999', pointerEvents: 'none',
    opacity: '0.8', left: (t.clientX - 50) + 'px', top: (t.clientY - 22) + 'px'
  });
  document.body.appendChild(touchClone);
  touchCard.style.opacity = '0.3';
}
function onTouchMove(e) {
  e.preventDefault();
  if (!touchClone) return;
  const t = e.touches[0];
  touchClone.style.left = (t.clientX - 50) + 'px';
  touchClone.style.top  = (t.clientY - 22) + 'px';
}
function onTouchEnd(e) {
  if (!touchClone || !touchCard) return;
  touchClone.remove();
  touchCard.style.opacity = '1';
  const t    = e.changedTouches[0];
  const el   = document.elementFromPoint(t.clientX, t.clientY);
  const zone = el?.closest('.drop-zone');
  if (zone) {
    const existing = zone.querySelector('.planet-draggable');
    if (existing) document.getElementById('planetPool').appendChild(existing);
    zone.appendChild(touchCard);
  } else {
    document.getElementById('planetPool').appendChild(touchCard);
  }
  touchClone = null;
  touchCard  = null;
}

function checkGameAnswers() {
  let correct = 0;
  let wrong = 0;

  document
    .querySelectorAll('.planet-draggable')
    .forEach(card => {
      card.classList.remove(
        'correct',
        'wrong'
      );
    });

  document
    .querySelectorAll('.drop-zone')
    .forEach(zone => {
      const card =
        zone.querySelector(
          '.planet-draggable'
        );

      if (!card) return;

      const index =
        Number(zone.dataset.index);

      if (
        card.dataset.planet ===
        PLANET_ORDER[index]
      ) {
        correct++;
        card.classList.add('correct');
      }

      else {
        wrong++;
        card.classList.add('wrong');
      }
    });

  wrong +=
    document.querySelectorAll(
      '#planetPool .planet-draggable'
    ).length;

  document.getElementById(
    'correctCount'
  ).textContent = correct;

  document.getElementById(
    'wrongCount'
  ).textContent = wrong;

  document.getElementById(
    'scoreValue'
  ).textContent = correct;

  const msg =
    document.getElementById(
      'gameMessage'
    );

  if (correct === 8) {
    msg.textContent = 'Amazing!';
    msg.style.color = '#4CAF50';
    playSound('correct');
  }

  else if (correct >= 5) {
    msg.textContent = 'Almost there!';
    msg.style.color = '#FFD700';
    playSound('correct');
  }

  else {
    msg.textContent =
      'Try swapping a few planets!';
    msg.style.color = '#FF8A80';
    playSound('wrong');
  }
}

document.getElementById('resetGameBtn')?.addEventListener('click', initGame);
document.getElementById('checkAnswersBtn')?.addEventListener('click', checkGameAnswers);
initGame();

// ──────────── QUIZ (one question at a time) ────────────

const quizData = [
  { q: 'What is at the center of our Solar System?', opts: ['Earth','The Moon','The Sun','Jupiter'], ans: 'The Sun' },
  { q: 'Which planet is closest to the Sun?',        opts: ['Venus','Mercury','Earth','Mars'],       ans: 'Mercury' },
  { q: 'Which planet is known as the Red Planet?',   opts: ['Venus','Jupiter','Mars','Saturn'],      ans: 'Mars' },
  { q: 'Which planet is our home?',                  opts: ['Mars','Venus','Earth','Mercury'],       ans: 'Earth' },
  { q: 'Which planet is famous for its rings?',      opts: ['Jupiter','Neptune','Uranus','Saturn'],  ans: 'Saturn' },
  { q: 'Which is the largest planet?',               opts: ['Saturn','Neptune','Jupiter','Uranus'],  ans: 'Jupiter' },
  { q: 'Which planet rotates on its side?',          opts: ['Neptune','Uranus','Saturn','Jupiter'],  ans: 'Uranus' },
  { q: 'Which is the farthest planet from the Sun?', opts: ['Uranus','Saturn','Neptune','Jupiter'],  ans: 'Neptune' }
];

let qIndex   = 0;
let qScore   = 0;
let qAnswers = new Array(quizData.length).fill(null);

function renderQuestion(idx) {
  const data      = quizData[idx];
  const container = document.getElementById('quizContainer');
  const bar       = document.getElementById('quizProgressBar');
  const label     = document.getElementById('quizProgressText');
  const nextWrap  = document.getElementById('quizNextWrap');
  if (!container || !data) return;

  // Update progress bar
  const pct = ((idx + 1) / quizData.length) * 100;
  if (bar)   bar.style.width = pct + '%';
  if (label) label.textContent = `Question ${idx + 1} of ${quizData.length}`;

  // Hide next button until answered
  if (nextWrap) nextWrap.style.setProperty('display', 'none', 'important');

  // Build card
  const card = document.createElement('div');
  card.className = 'quiz-question-card';

  const qText = document.createElement('p');
  qText.className = 'quiz-q-text';
  qText.textContent = `${idx + 1}. ${data.q}`;
  card.appendChild(qText);

  const grid = document.createElement('div');
  grid.className = 'quiz-options-grid';

  data.opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className   = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(opt, data.ans, card));
    grid.appendChild(btn);
  });

  card.appendChild(grid);
  container.innerHTML = '';
  container.appendChild(card);
}

function handleAnswer(chosen, correct, card) {
  // Lock all buttons
  card.querySelectorAll('.quiz-option').forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add('correct-answer');
    } else if (btn.textContent === chosen && chosen !== correct) {
      btn.classList.add('wrong-answer');
    }
  });

  const isCorrect = chosen === correct;
  playSound(isCorrect ? 'correct' : 'wrong');
  if (
  qAnswers[qIndex] === null &&
  isCorrect
) {
  qScore++;
}
  qAnswers[qIndex] = chosen;

  // Show next / finish after short delay
  const nextWrap = document.getElementById('quizNextWrap');
  setTimeout(() => {
    if (nextWrap) nextWrap.style.removeProperty('display');
  }, 600);
}

function advanceQuiz() {
  qIndex++;
  if (qIndex >= quizData.length) {
    finishQuiz();
  } else {
    renderQuestion(qIndex);
    const nextWrap = document.getElementById('quizNextWrap');
    if (nextWrap) nextWrap.style.setProperty('display', 'none', 'important');
  }
}

function finishQuiz() {
  // Update progress bar to 100%
  const bar   = document.getElementById('quizProgressBar');
  const label = document.getElementById('quizProgressText');
  if (bar)   bar.style.width = '100%';
  if (label) label.textContent = 'Quiz complete!';

  const container = document.getElementById('quizContainer');
  if (container) {
    container.innerHTML = `
      <div class="quiz-question-card text-center" style="padding:2rem 1.5rem">
        <p style="font-size:1.3rem;font-weight:700;color:#FFD700">You scored ${qScore} out of 8!</p>
        <p style="color:rgba(255,255,255,0.8);font-size:0.95rem">Scroll down to see your full results.</p>
      </div>`;
  }

  const nextWrap = document.getElementById('quizNextWrap');
  if (nextWrap) nextWrap.style.setProperty('display', 'none', 'important');

  document.getElementById('finalQuizScore').textContent = qScore;

  setTimeout(() => {
  smoothScroll('scoreboard');
}, 800);
}

function resetQuiz() {
  qIndex   = 0;
  qScore   = 0;
  qAnswers = new Array(quizData.length).fill(null);

  const bar   = document.getElementById('quizProgressBar');
  const label = document.getElementById('quizProgressText');
  if (bar)   bar.style.width = '0%';
  if (label) label.textContent = 'Question 1 of 8';

  renderQuestion(0);

  const nextWrap = document.getElementById('quizNextWrap');
  if (nextWrap) nextWrap.style.setProperty('display', 'none', 'important');
}

// Wire up next button
document.getElementById('quizNextBtn')?.addEventListener('click', advanceQuiz);

// Remove old submit button (not needed with 1-at-a-time)
const oldSubmit = document.getElementById('submitQuizBtn');
if (oldSubmit) oldSubmit.style.display = 'none';

renderQuestion(0);

// ──────────── PLAY AGAIN / RETURN HOME ────────────

document
.getElementById('playAgainBtn')
?.addEventListener('click', () => {
  resetQuiz();
  initGame();
  smoothScroll('intro');
});

document
.getElementById('returnHomeBtn')
?.addEventListener('click', () => {
  smoothScroll('intro');
});