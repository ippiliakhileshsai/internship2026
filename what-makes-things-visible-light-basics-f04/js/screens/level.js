import { navigate } from '../app.js';
import { updateState, gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';

export function renderLevel(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  if (!lvl) { navigate('map'); return; }

  let simScore = 0;
  const simObjects = lvl.id === 1 ? lvl.simObjects : [];

  container.innerHTML = `
    <div class="screen level-screen" style="--accent:${lvl.color}">
      <div class="starfield" id="starfield-lvl"></div>

      <!-- Header -->
      <div class="level-header">
        <button class="back-btn" id="btn-back">←</button>
        <div>
          <div class="label-tag" style="color:${lvl.color}">Level ${lvl.id} · ${lvl.name}</div>
        </div>
        <div class="level-crystal">${lvl.crystal}</div>
      </div>

      <!-- Story card -->
      <div class="story-banner" style="border-color:${lvl.color}40; background:linear-gradient(135deg,${lvl.color}15,rgba(22,13,48,0.9))">
        <div class="story-banner-wizard">🧙‍♂️</div>
        <div class="story-banner-text">
          <div class="story-banner-title" style="color:${lvl.color}">📜 Mission Briefing</div>
          <p class="story-banner-body">${lvl.story}</p>
        </div>
      </div>

      <!-- Simulation area -->
      <div class="sim-box">
        <div class="sim-title">🔬 ${lvl.simTitle}</div>
        <div class="sim-desc">${lvl.simDesc}</div>
        <div class="sim-content" id="sim-content">
          ${lvl.id === 1 ? renderLvl1Sim(lvl.simObjects) : renderGenericSim(lvl)}
        </div>
        <div class="sim-score-bar">
          <span class="sim-score-label">Progress:</span>
          <div class="sim-score-track">
            <div class="sim-score-fill" id="sim-score-fill" style="background:${lvl.color}"></div>
          </div>
          <span id="sim-score-text" style="color:${lvl.color}">0%</span>
        </div>
      </div>

      <div class="level-bottom">
        <div class="sim-stars-preview" id="sim-stars">⭐☆☆</div>
        <button class="btn-primary shimmer-btn" id="btn-sim-done" style="background:linear-gradient(135deg,${lvl.colorDark},#4c1d95)">
          <div class="shimmer-sweep"></div>
          ⚡ Start Quiz →
        </button>
      </div>
    </div>
  `;

  generateStarfield('starfield-lvl');

  document.getElementById('btn-back').addEventListener('click', () => { audio.click(); navigate('map'); });

  if (lvl.id === 1) {
    setupLvl1Sim(container, lvl);
  } else {
    setupGenericSim(container, lvl);
  }

  document.getElementById('btn-sim-done').addEventListener('click', () => {
    audio.click();
    const stars = simScore >= 80 ? 3 : simScore >= 50 ? 2 : 1;
    updateState({ currentLevel: levelId, simStars: stars });
    navigate('quiz', { levelId });
  });
}

function renderLvl1Sim(objects) {
  return `
    <div class="sim-objects-grid">
      ${objects.map((o, i) => `
        <div class="sim-object" data-index="${i}" data-luminous="${o.luminous}">
          <div class="sim-obj-emoji">${o.emoji}</div>
          <div class="sim-obj-name">${o.name}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderGenericSim(lvl) {
  const simContent = {
    2: `<div class="generic-sim">
      <div class="ray-question">
        <div class="ray-source">💡</div>
        <div class="ray-paths">
          <div class="ray-path" data-correct="true">⟶ Straight path</div>
          <div class="ray-path" data-correct="false">↗ Curved upward</div>
          <div class="ray-path" data-correct="false">↘ Curved downward</div>
          <div class="ray-path" data-correct="false">↺ Circular path</div>
        </div>
        <p class="sim-hint">Light always travels in a <strong>straight line</strong>. Tap the correct path!</p>
      </div>
    </div>`,
    3: `<div class="generic-sim">
      <div class="reflection-sim">
        <div class="mirror-diagram">
          <div class="mirror-line">🪞 Mirror</div>
          <div class="angle-question">
            <p>An incident ray hits the mirror at <strong>40°</strong> to the normal.</p>
            <p>What is the angle of reflection?</p>
            <div class="angle-options">
              <div class="angle-opt" data-correct="false">20°</div>
              <div class="angle-opt" data-correct="true">40°</div>
              <div class="angle-opt" data-correct="false">60°</div>
              <div class="angle-opt" data-correct="false">80°</div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
    4: `<div class="generic-sim">
      <div class="refraction-sim">
        <div class="medium-diagram">
          <div class="medium air-medium">AIR 💨</div>
          <div class="medium water-medium">WATER 💧</div>
        </div>
        <p>As light enters water from air, it bends:</p>
        <div class="refr-options">
          <div class="refr-opt" data-correct="true">↘ Towards the normal</div>
          <div class="refr-opt" data-correct="false">↗ Away from the normal</div>
          <div class="refr-opt" data-correct="false">→ Parallel to normal</div>
          <div class="refr-opt" data-correct="false">↺ It does not bend</div>
        </div>
      </div>
    </div>`,
    5: `<div class="generic-sim">
      <p style="color:#a78bca;font-size:13px;margin-bottom:12px;text-align:center">Drag/Tap the colours in the correct VIBGYOR order!</p>
      <div class="vibgyor-sort">
        ${['🟣 Violet','🔵 Indigo','💙 Blue','🟢 Green','🟡 Yellow','🟠 Orange','🔴 Red'].map((c,i)=>`
          <div class="color-chip" data-pos="${i}">${c}</div>
        `).join('')}
      </div>
      <p style="color:${levelsData[4]?.color||'#f472b6'};font-size:11px;margin-top:10px;text-align:center">Tap to select in order from shortest to longest wavelength!</p>
    </div>`,
    6: `<div class="generic-sim">
      <p style="color:#a78bca;font-size:13px;margin-bottom:10px;text-align:center">Match each application to how it uses light energy!</p>
      <div class="energy-matches">
        <div class="match-pair" data-correct="true">
          <span class="match-left">☀️ Solar Panel</span>
          <span class="match-arrow">→</span>
          <span class="match-right">⚡ Electricity</span>
        </div>
        <div class="match-pair" data-correct="true">
          <span class="match-left">🌿 Plant Leaf</span>
          <span class="match-arrow">→</span>
          <span class="match-right">🍃 Photosynthesis</span>
        </div>
        <div class="match-pair" data-correct="false">
          <span class="match-left">🌙 Moon</span>
          <span class="match-arrow">→</span>
          <span class="match-right">🔥 Generates heat</span>
        </div>
      </div>
      <p style="color:#fb923c;font-size:11px;margin-top:10px;text-align:center">Tap each pair — is it TRUE or FALSE?</p>
    </div>`
  };
  return simContent[lvl.id] || `<div class="generic-sim"><p style="color:#a78bca;text-align:center">Interactive simulation for ${lvl.name}</p></div>`;
}

let simProgress = 0;

function updateSimScore(container, pct, lvl) {
  simProgress = Math.min(100, pct);
  const fill = container.querySelector('#sim-score-fill');
  const text = container.querySelector('#sim-score-text');
  const stars = container.querySelector('#sim-stars');
  if (fill) fill.style.width = simProgress + '%';
  if (text) text.textContent = simProgress + '%';
  if (stars) {
    stars.textContent = simProgress >= 80 ? '⭐⭐⭐' : simProgress >= 50 ? '⭐⭐☆' : '⭐☆☆';
  }
}

function setupLvl1Sim(container, lvl) {
  simProgress = 0;
  const objects = container.querySelectorAll('.sim-object');
  const luminousCount = lvl.simObjects.filter(o => o.luminous).length;
  let correctTaps = 0;
  let totalTapped = 0;

  objects.forEach(obj => {
    obj.addEventListener('click', () => {
      if (obj.classList.contains('tapped')) return;
      obj.classList.add('tapped');
      const isLuminous = obj.dataset.luminous === 'true';
      totalTapped++;
      if (isLuminous) {
        correctTaps++;
        obj.classList.add('correct-tap');
        audio.correct();
        showPopup(obj, '✓ Luminous!', '#34d399');
      } else {
        obj.classList.add('wrong-tap');
        audio.wrong();
        showPopup(obj, '✗ Non-Luminous', '#ef4444');
      }
      const pct = Math.round(correctTaps / luminousCount * 100);
      updateSimScore(container, pct, lvl);
      if (totalTapped === objects.length || correctTaps === luminousCount) {
        audio.levelUp();
      }
    });
  });
}

function setupGenericSim(container, lvl) {
  simProgress = 0;

  // Generic option taps
  container.querySelectorAll('[data-correct]').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('[data-correct]').forEach(e => e.classList.remove('selected-opt', 'correct-opt', 'wrong-opt'));
      if (el.dataset.correct === 'true') {
        el.classList.add('correct-opt');
        audio.correct();
        updateSimScore(container, 100, lvl);
        showPopup(el, '✓ Correct!', '#34d399');
      } else {
        el.classList.add('wrong-opt');
        audio.wrong();
        updateSimScore(container, 30, lvl);
        showPopup(el, '✗ Try again!', '#ef4444');
      }
    });
  });

  // VIBGYOR game
  if (lvl.id === 5) {
    setupVibgyorGame(container, lvl);
  }

  // Energy match
  if (lvl.id === 6) {
    setupEnergyMatch(container, lvl);
  }
}

function setupVibgyorGame(container, lvl) {
  const chips = container.querySelectorAll('.color-chip');
  let clickOrder = [];
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.classList.contains('chip-done')) return;
      chip.classList.add('chip-done');
      clickOrder.push(parseInt(chip.dataset.pos));
      const pct = Math.round(clickOrder.length / chips.length * 100);
      const isCorrect = clickOrder.every((v, i) => v === i);
      updateSimScore(container, isCorrect ? pct : Math.max(simProgress - 10, 10), lvl);
      if (isCorrect) { audio.correct(); } else { audio.wrong(); }
    });
  });
}

function setupEnergyMatch(container, lvl) {
  container.querySelectorAll('.match-pair').forEach(pair => {
    pair.addEventListener('click', () => {
      if (pair.classList.contains('pair-done')) return;
      pair.classList.add('pair-done');
      if (pair.dataset.correct === 'true') {
        pair.style.borderColor = '#34d399';
        pair.style.background = '#34d39915';
        audio.correct();
        updateSimScore(container, simProgress + 45, lvl);
      } else {
        pair.style.borderColor = '#ef4444';
        pair.style.background = '#ef444415';
        audio.wrong();
      }
    });
  });
}

function showPopup(el, msg, color) {
  const pop = document.createElement('div');
  pop.className = 'feedback-popup';
  pop.textContent = msg;
  pop.style.cssText = `position:absolute;top:-32px;left:50%;transform:translateX(-50%);background:${color};color:#fff;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;pointer-events:none;z-index:99;white-space:nowrap;`;
  const parent = el.offsetParent || el.parentElement;
  el.style.position = 'relative';
  el.appendChild(pop);
  setTimeout(() => pop.remove(), 1200);
}
