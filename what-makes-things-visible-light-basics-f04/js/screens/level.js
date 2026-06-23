import { navigate } from '../app.js';
import { updateState, gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';
import { loadTemplate } from '../utils/template.js';

/* ============================================================
   LEVEL SCREEN — Canvas-based Interactive Simulations
   ============================================================ */

let animFrameId = null;

export async function renderLevel(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  if (!lvl) { navigate('map'); return; }

  // Cancel any previous animation loop
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }

  container.innerHTML = await loadTemplate('level', { lvl });

  generateStarfield('starfield-lvl');

  document.getElementById('btn-back').addEventListener('click', () => {
    if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
    audio.click();
    navigate('map');
  });

  // Setup the canvas simulation for this level
  const canvas = document.getElementById('sim-canvas');
  if (canvas) {
    setupSimulation(canvas, lvl, container);
  }

  document.getElementById('btn-sim-done').addEventListener('click', () => {
    if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
    audio.click();
    const stars = simProgress >= 80 ? 3 : simProgress >= 50 ? 2 : 1;
    updateState({ currentLevel: levelId, simStars: stars });
    navigate('quiz', { levelId });
  });
}

/* ---------- Progress tracking ---------- */
let simProgress = 0;

function updateSimScore(container, pct, lvl) {
  simProgress = Math.max(0, Math.min(100, pct));
  const fill = container.querySelector('#sim-score-fill');
  const text = container.querySelector('#sim-score-text');
  const stars = container.querySelector('#sim-stars');
  if (fill) fill.style.width = simProgress + '%';
  if (text) text.textContent = simProgress + '%';
  if (stars) {
    stars.textContent = simProgress >= 80 ? '⭐⭐⭐' : simProgress >= 50 ? '⭐⭐☆' : '⭐☆☆';
  }
}

/* ---------- Canvas sizing helper ---------- */
function sizeCanvas(canvas) {
  const parent = canvas.parentElement;
  const w = parent.clientWidth;
  const h = Math.max(220, Math.min(320, w * 0.75));
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h, dpr };
}

/* ---------- Pointer helpers ---------- */
function getPointerPos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches ? e.touches[0] : e;
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top
  };
}

/* ---------- Simulation dispatcher ---------- */
function setupSimulation(canvas, lvl, container) {
  simProgress = 0;
  const sims = {
    1: setupLevel1,
    2: setupLevel2,
    3: setupLevel3,
    4: setupLevel4,
    5: setupLevel5,
    6: setupLevel6,
  };
  const setup = sims[lvl.id];
  if (setup) setup(canvas, lvl, container);
}

/* ============================================================
   LEVEL 1 — Dark Room Explorer (Flashlight)
   ============================================================ */
function setupLevel1(canvas, lvl, container) {
  const { ctx, w, h } = sizeCanvas(canvas);
  const objects = lvl.simObjects.map(o => ({
    ...o,
    px: o.x * w,
    py: o.y * h,
    revealed: false,
    classified: false,
    correct: false,
    radius: 22
  }));

  let mouseX = w / 2, mouseY = h / 2;
  const flashRadius = 60;
  let correctCount = 0;
  const totalLuminous = objects.filter(o => o.luminous).length;
  const totalObjects = objects.length;
  let classifiedCount = 0;

  // Show instruction
  const instr = document.getElementById('sim-instruction');
  if (instr) { instr.textContent = '🔦 Move your finger/mouse to explore the dark room!'; instr.style.display = 'block'; }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Dark room background
    ctx.fillStyle = '#080412';
    ctx.fillRect(0, 0, w, h);

    // Flashlight glow
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, flashRadius);
    gradient.addColorStop(0, 'rgba(255,245,200,0.45)');
    gradient.addColorStop(0.5, 'rgba(255,215,0,0.15)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Draw objects
    objects.forEach(obj => {
      const dist = Math.hypot(obj.px - mouseX, obj.py - mouseY);
      const isLit = dist < flashRadius + obj.radius;

      if (isLit) obj.revealed = true;

      let alpha = 0;
      if (obj.classified) {
        alpha = 1;
      } else if (isLit) {
        alpha = Math.max(0, 1 - dist / (flashRadius + obj.radius));
      } else if (obj.revealed) {
        alpha = 0.15;
      }

      if (alpha > 0) {
        ctx.save();
        ctx.globalAlpha = alpha;

        // Glow for classified correct
        if (obj.classified && obj.correct) {
          const glow = ctx.createRadialGradient(obj.px, obj.py, 0, obj.px, obj.py, 30);
          glow.addColorStop(0, 'rgba(52,211,153,0.4)');
          glow.addColorStop(1, 'rgba(52,211,153,0)');
          ctx.fillStyle = glow;
          ctx.fillRect(obj.px - 30, obj.py - 30, 60, 60);
        }

        // Emoji
        ctx.font = '28px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.emoji, obj.px, obj.py - 4);

        // Name
        ctx.font = '10px Nunito, sans-serif';
        ctx.fillStyle = obj.classified
          ? (obj.correct ? '#34d399' : '#ef4444')
          : '#e9d5ff';
        ctx.fillText(obj.name, obj.px, obj.py + 18);

        // Status badge
        if (obj.classified) {
          const badge = obj.correct ? '✓ Luminous' : (obj.luminous ? '✗ Wrong' : '✓ Non-Luminous');
          const badgeColor = (obj.correct || (!obj.luminous && obj.classified)) ? '#34d399' : '#ef4444';
          // Determine final correctness for non-luminous
          const wasRight = (obj.luminous && obj.answeredLuminous) || (!obj.luminous && !obj.answeredLuminous);
          ctx.font = 'bold 8px Nunito, sans-serif';
          ctx.fillStyle = wasRight ? '#34d399' : '#ef4444';
          const label = wasRight ? '✓' : '✗';
          ctx.fillText(label, obj.px, obj.py + 28);
        }

        ctx.restore();
      }
    });

    // Border glow
    ctx.strokeStyle = lvl.color + '40';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    animFrameId = requestAnimationFrame(draw);
  }

  // Pointer move
  function onMove(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    mouseX = pos.x;
    mouseY = pos.y;
  }
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('touchmove', onMove, { passive: false });

  // Tap to classify
  function onTap(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e.changedTouches ? e : e);
    const px = pos.x, py = pos.y;

    for (const obj of objects) {
      if (obj.classified) continue;
      const dist = Math.hypot(obj.px - px, obj.py - py);
      if (dist < obj.radius + 10 && obj.revealed) {
        // Show classification popup
        showClassificationPopup(obj, container, lvl, () => {
          classifiedCount++;
          const pct = Math.round(correctCount / totalLuminous * 100);
          updateSimScore(container, pct, lvl);
          if (classifiedCount >= totalObjects) {
            audio.levelUp();
            if (instr) instr.textContent = '🎉 All objects classified! Great job!';
          }
        });
        break;
      }
    }
  }
  canvas.addEventListener('click', onTap);
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const pos = getPointerPos(canvas, e.changedTouches[0] ? { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY } : e);
    for (const obj of objects) {
      if (obj.classified) continue;
      const dist = Math.hypot(obj.px - pos.x, obj.py - pos.y);
      if (dist < obj.radius + 10 && obj.revealed) {
        showClassificationPopup(obj, container, lvl, () => {
          classifiedCount++;
          const pct = Math.round(correctCount / totalLuminous * 100);
          updateSimScore(container, pct, lvl);
          if (classifiedCount >= totalObjects) {
            audio.levelUp();
            if (instr) instr.textContent = '🎉 All objects classified! Great job!';
          }
        });
        break;
      }
    }
  }, { passive: false });

  function showClassificationPopup(obj, container, lvl, callback) {
    const overlay = document.getElementById('sim-overlay');
    if (!overlay) return;
    overlay.innerHTML = `
      <div class="classify-popup">
        <div class="classify-emoji">${obj.emoji}</div>
        <div class="classify-name">${obj.name}</div>
        <div class="classify-question">Is this object luminous?</div>
        <div class="classify-btns">
          <button class="classify-btn classify-yes" data-answer="true">💡 Luminous</button>
          <button class="classify-btn classify-no" data-answer="false">🌑 Non-Luminous</button>
        </div>
      </div>
    `;
    overlay.style.display = 'flex';

    overlay.querySelectorAll('.classify-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const answered = btn.dataset.answer === 'true';
        obj.answeredLuminous = answered;
        const isCorrect = (obj.luminous && answered) || (!obj.luminous && !answered);
        obj.classified = true;
        obj.correct = isCorrect;
        if (isCorrect && obj.luminous) {
          correctCount++;
          audio.correct();
        } else if (isCorrect) {
          audio.correct();
          // Non-luminous correct also counts for progress
          correctCount += 0; // luminous ratio only
        } else {
          audio.wrong();
        }
        // Actually let's count all correct answers
        const allCorrect = objects.filter(o => o.classified && o.correct).length;
        const pct = Math.round(allCorrect / totalObjects * 100);
        updateSimScore(container, pct, lvl);
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        callback();
      });
    });
  }

  draw();
}

/* ============================================================
   LEVEL 2 — Straight Line Lab (Rectilinear Propagation)
   ============================================================ */
function setupLevel2(canvas, lvl, container) {
  const { ctx, w, h } = sizeCanvas(canvas);
  const cards = lvl.simCards;
  const numCards = cards.length;
  
  // Create card state
  const obstacles = cards.map((c, i) => ({
    x: c.x * w,
    y: c.y * h, // center of the hole
    holeSize: c.holeSize,
    width: 24
  }));

  const sourceX = w * 0.15;
  const sourceY = lvl.sourceY * h;
  const targetX = w * 0.85;
  const targetY = sourceY;

  let dragging = null;
  let dragOffset = 0;
  let hitTarget = false;
  let simProgress = 0;

  const instr = document.getElementById('sim-instruction');
  if (instr) { instr.textContent = '📦 Drag the cards up or down to align the holes in a straight line!'; instr.style.display = 'block'; }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Background
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0c0820');
    bg.addColorStop(1, '#080412');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(147,51,234,0.08)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 30) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 30) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Check light ray collision
    let rayEndX = targetX;
    hitTarget = true;
    let alignedCount = 0;

    for (let i = 0; i < obstacles.length; i++) {
      const card = obstacles[i];
      // Does ray hit the card or pass through hole?
      // Ray is horizontal at sourceY
      const holeTop = card.y - card.holeSize / 2;
      const holeBottom = card.y + card.holeSize / 2;

      if (sourceY >= holeTop && sourceY <= holeBottom) {
        // Passes through
        alignedCount++;
      } else {
        // Blocked by this card
        rayEndX = card.x - card.width / 2;
        hitTarget = false;
        break;
      }
    }

    // Draw Light Source
    ctx.font = '28px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔦', sourceX - 25, sourceY);

    // Draw Target
    ctx.font = '24px serif';
    ctx.fillText(hitTarget ? '✨' : '💎', targetX + 20, targetY);
    if (hitTarget) {
      const tg = ctx.createRadialGradient(targetX + 20, targetY, 0, targetX + 20, targetY, 35);
      tg.addColorStop(0, 'rgba(255,215,0,0.5)');
      tg.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.arc(targetX + 20, targetY, 35, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Ray
    if (rayEndX > sourceX) {
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.lineTo(rayEndX, sourceY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Draw Cards
    for (let i = 0; i < obstacles.length; i++) {
      const card = obstacles[i];
      
      const leftX = card.x - card.width / 2;
      
      // Top half
      const topHeight = card.y - card.holeSize / 2;
      ctx.fillStyle = '#6b4c2a'; // Wood/cardboard color
      ctx.strokeStyle = '#4a3219';
      ctx.lineWidth = 2;
      ctx.fillRect(leftX, 0, card.width, topHeight);
      ctx.strokeRect(leftX, 0, card.width, topHeight);
      
      // Bottom half
      const bottomY = card.y + card.holeSize / 2;
      const bottomHeight = h - bottomY;
      ctx.fillRect(leftX, bottomY, card.width, bottomHeight);
      ctx.strokeRect(leftX, bottomY, card.width, bottomHeight);

      // Drag handles / grips
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.fillRect(leftX, topHeight - 24, card.width, 24);
      ctx.fillRect(leftX, bottomY, card.width, 24);
      
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let j = 0; j < 3; j++) {
        ctx.fillRect(leftX + 4, topHeight - 18 + j*6, card.width - 8, 2);
        ctx.fillRect(leftX + 4, bottomY + 6 + j*6, card.width - 8, 2);
      }
    }

    // Update progress
    const targetScore = hitTarget ? 100 : Math.round((alignedCount / numCards) * 80);
    if (targetScore > simProgress) simProgress = targetScore;
    updateSimScore(container, simProgress, lvl);

    if (hitTarget && instr) {
      instr.textContent = '🎉 Perfect alignment! You proved light travels in straight lines!';
    }

    // Border
    ctx.strokeStyle = lvl.color + '40';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    animFrameId = requestAnimationFrame(draw);
  }

  // Drag logic
  function onDown(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    // Find which card is clicked
    for (const card of obstacles) {
      if (Math.abs(pos.x - card.x) < card.width * 1.5) {
        dragging = card;
        dragOffset = pos.y - card.y;
        break;
      }
    }
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    // Move card vertically
    dragging.y = Math.max(dragging.holeSize, Math.min(h - dragging.holeSize, pos.y - dragOffset));
  }

  function onUp() {
    if (dragging && hitTarget) {
      audio.levelUp();
    }
    dragging = null;
  }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  draw();
}

/* ============================================================
   LEVEL 3 — Mirror Lab (Reflection / Protractor)
   ============================================================ */
function setupLevel3(canvas, lvl, container) {
  const { ctx, w, h } = sizeCanvas(canvas);
  const mirrorY = h * 0.65;
  const mirrorX = w * 0.5;
  const mirrorLen = w * 0.7;
  const normalLen = h * 0.5;

  let incidentAngle = 45; // degrees from normal
  let isDragging = false;
  let challengeIdx = 0;
  const challenges = lvl.simChallenges;
  let completedChallenges = 0;

  const instr = document.getElementById('sim-instruction');
  if (instr) {
    instr.textContent = challenges[0].label;
    instr.style.display = 'block';
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0c0820';
    ctx.fillRect(0, 0, w, h);

    // Mirror surface
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(mirrorX - mirrorLen / 2, mirrorY);
    ctx.lineTo(mirrorX + mirrorLen / 2, mirrorY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Mirror label
    ctx.font = '10px Nunito, sans-serif';
    ctx.fillStyle = '#60a5fa';
    ctx.textAlign = 'center';
    ctx.fillText('🪞 Mirror Surface', mirrorX, mirrorY + 16);

    // Hatching below mirror
    ctx.strokeStyle = 'rgba(96,165,250,0.2)';
    ctx.lineWidth = 1;
    for (let x = mirrorX - mirrorLen / 2; x < mirrorX + mirrorLen / 2; x += 8) {
      ctx.beginPath();
      ctx.moveTo(x, mirrorY + 2);
      ctx.lineTo(x - 6, mirrorY + 10);
      ctx.stroke();
    }

    // Normal line (dashed)
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(167,139,202,0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mirrorX, mirrorY);
    ctx.lineTo(mirrorX, mirrorY - normalLen);
    ctx.stroke();
    ctx.setLineDash([]);

    // Normal label
    ctx.font = '9px Nunito, sans-serif';
    ctx.fillStyle = '#a78bca';
    ctx.textAlign = 'center';
    ctx.fillText('Normal', mirrorX + 24, mirrorY - normalLen + 12);

    // Incident ray
    const incRad = incidentAngle * Math.PI / 180;
    const rayLen = normalLen * 0.9;
    const incX = mirrorX - rayLen * Math.sin(incRad);
    const incY = mirrorY - rayLen * Math.cos(incRad);

    // Incident ray line
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(incX, incY);
    ctx.lineTo(mirrorX, mirrorY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Arrow on incident ray
    drawArrow(ctx, incX, incY, mirrorX, mirrorY, '#ffd700');

    // Reflected ray
    const refX = mirrorX + rayLen * Math.sin(incRad);
    const refY = mirrorY - rayLen * Math.cos(incRad);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#34d399';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(mirrorX, mirrorY);
    ctx.lineTo(refX, refY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Arrow on reflected ray
    drawArrow(ctx, mirrorX, mirrorY, refX, refY, '#34d399');

    // Protractor arcs
    const arcRadius = 50;
    // Incident angle arc
    ctx.strokeStyle = 'rgba(255,215,0,0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(mirrorX, mirrorY, arcRadius, -Math.PI / 2, -Math.PI / 2 + incRad, false);
    ctx.stroke();

    // Reflected angle arc
    ctx.strokeStyle = 'rgba(52,211,153,0.5)';
    ctx.beginPath();
    ctx.arc(mirrorX, mirrorY, arcRadius, -Math.PI / 2 - incRad, -Math.PI / 2, false);
    ctx.stroke();

    // Angle labels
    const angleLabelRad = arcRadius + 12;
    const incLabelA = -Math.PI / 2 + incRad / 2;
    ctx.font = 'bold 12px Nunito, sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(incidentAngle)}°`, mirrorX + angleLabelRad * Math.cos(incLabelA), mirrorY + angleLabelRad * Math.sin(incLabelA));

    const refLabelA = -Math.PI / 2 - incRad / 2;
    ctx.fillStyle = '#34d399';
    ctx.fillText(`${Math.round(incidentAngle)}°`, mirrorX + angleLabelRad * Math.cos(refLabelA), mirrorY + angleLabelRad * Math.sin(refLabelA));

    // Labels
    ctx.font = '10px Nunito, sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'left';
    ctx.fillText('Incident Ray', incX - 10, incY - 8);
    ctx.fillStyle = '#34d399';
    ctx.textAlign = 'right';
    ctx.fillText('Reflected Ray', refX + 10, refY - 8);

    // Drag handle on incident ray endpoint
    ctx.fillStyle = 'rgba(255,215,0,0.3)';
    ctx.beginPath();
    ctx.arc(incX, incY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Law text
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.fillStyle = '#c084fc';
    ctx.textAlign = 'center';
    ctx.fillText('∠i = ∠r  (Law of Reflection)', mirrorX, h - 10);

    // Border
    ctx.strokeStyle = lvl.color + '40';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    // Check challenge completion
    if (challengeIdx < challenges.length) {
      const diff = Math.abs(Math.round(incidentAngle) - challenges[challengeIdx].targetAngle);
      if (diff <= 2) {
        completedChallenges++;
        challengeIdx++;
        audio.correct();
        const pct = Math.round(completedChallenges / challenges.length * 100);
        updateSimScore(container, pct, lvl);
        if (challengeIdx < challenges.length) {
          if (instr) instr.textContent = '✓ ' + challenges[challengeIdx].label;
        } else {
          if (instr) instr.textContent = '🎉 All challenges complete! ∠i always equals ∠r!';
          audio.levelUp();
        }
      }
    }

    animFrameId = requestAnimationFrame(draw);
  }

  // Drag the incident ray endpoint
  function onDown(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    const incRad = incidentAngle * Math.PI / 180;
    const rayLen = normalLen * 0.9;
    const incX = mirrorX - rayLen * Math.sin(incRad);
    const incY = mirrorY - rayLen * Math.cos(incRad);
    if (Math.hypot(pos.x - incX, pos.y - incY) < 25) {
      isDragging = true;
    }
  }
  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    // Calculate angle from mirror point
    const dx = pos.x - mirrorX;
    const dy = mirrorY - pos.y; // Inverted Y
    let angle = Math.atan2(-dx, dy) * 180 / Math.PI;
    angle = Math.max(5, Math.min(85, angle));
    incidentAngle = angle;
  }
  function onUp() { isDragging = false; }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  draw();
}

/* ============================================================
   LEVEL 4 — Bending Light Pool (Refraction / Snell's Law)
   ============================================================ */
function setupLevel4(canvas, lvl, container) {
  const { ctx, w, h } = sizeCanvas(canvas);
  const boundary = h * 0.45;
  let incidentAngle = 40; // degrees from normal
  let isDragging = false;
  let mediaIdx = 0;
  const media = lvl.simMedia;

  const instr = document.getElementById('sim-instruction');
  if (instr) { instr.textContent = '✋ Drag the ray to change the angle of incidence!'; instr.style.display = 'block'; }

  // Add medium toggle button
  const overlay = document.getElementById('sim-overlay');
  if (overlay) {
    overlay.innerHTML = `<button class="medium-toggle-btn" id="btn-medium-toggle">${media[0].name}</button>`;
    overlay.style.display = 'flex'; // Use flex so justify-content works
    overlay.style.justifyContent = 'flex-end';
    overlay.style.alignItems = 'flex-start';
    overlay.style.padding = '6px';
    overlay.style.background = 'none';
    overlay.style.backdropFilter = 'none'; // Remove the blur effect
    overlay.style.webkitBackdropFilter = 'none';
    overlay.style.pointerEvents = 'none';
    const btn = document.getElementById('btn-medium-toggle');
    btn.style.pointerEvents = 'auto';
    btn.addEventListener('click', () => {
      mediaIdx = (mediaIdx + 1) % media.length;
      btn.textContent = media[mediaIdx].name;
      audio.click();
    });
  }

  function getRefractedAngle(theta1Deg, n1, n2) {
    const theta1 = theta1Deg * Math.PI / 180;
    const sinTheta2 = (n1 / n2) * Math.sin(theta1);
    if (Math.abs(sinTheta2) > 1) return null; // Total internal reflection
    return Math.asin(sinTheta2) * 180 / Math.PI;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const m = media[mediaIdx];

    // Air region (top)
    ctx.fillStyle = m.color1 + '30';
    ctx.fillRect(0, 0, w, boundary);

    // Water/glass region (bottom)
    ctx.fillStyle = m.color2 + '40';
    ctx.fillRect(0, boundary, w, h - boundary);

    // Boundary line
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, boundary);
    ctx.lineTo(w, boundary);
    ctx.stroke();

    // Wave pattern on boundary
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 12) {
      ctx.beginPath();
      ctx.arc(x, boundary, 3, 0, Math.PI);
      ctx.stroke();
    }

    // Medium labels
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#87CEEB';
    ctx.fillText(`💨 AIR (n = ${m.n1.toFixed(2)})`, 8, 18);
    ctx.fillStyle = m.color2;
    ctx.fillText(`💧 ${m.name.split('→ ')[1]} (n = ${m.n2.toFixed(2)})`, 8, h - 10);

    // Normal line
    const normalX = w * 0.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(167,139,202,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(normalX, boundary - boundary * 0.85);
    ctx.lineTo(normalX, boundary + (h - boundary) * 0.85);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = '9px Nunito, sans-serif';
    ctx.fillStyle = '#a78bca';
    ctx.textAlign = 'center';
    ctx.fillText('Normal', normalX + 26, boundary - boundary * 0.8 + 10);

    // Incident ray (comes from top-left to boundary center)
    const incRad = incidentAngle * Math.PI / 180;
    const rayLenInc = boundary * 0.8;
    const incX = normalX - rayLenInc * Math.sin(incRad);
    const incY = boundary - rayLenInc * Math.cos(incRad);

    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(incX, incY);
    ctx.lineTo(normalX, boundary);
    ctx.stroke();
    ctx.shadowBlur = 0;
    drawArrow(ctx, incX, incY, normalX, boundary, '#ffd700');

    // Refracted ray
    const refAngle = getRefractedAngle(incidentAngle, m.n1, m.n2);
    if (refAngle !== null) {
      const refRad = refAngle * Math.PI / 180;
      const rayLenRef = (h - boundary) * 0.8;
      const refX = normalX + rayLenRef * Math.sin(refRad);
      const refY = boundary + rayLenRef * Math.cos(refRad);

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(normalX, boundary);
      ctx.lineTo(refX, refY);
      ctx.stroke();
      ctx.shadowBlur = 0;
      drawArrow(ctx, normalX, boundary, refX, refY, '#34d399');

      // Angle arcs
      const arcR = 35;
      // Incident angle arc (from normal upward, going to ray)
      ctx.strokeStyle = 'rgba(255,215,0,0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(normalX, boundary, arcR, -Math.PI / 2, -Math.PI / 2 + incRad, false);
      ctx.stroke();

      // Refracted angle arc
      ctx.strokeStyle = 'rgba(52,211,153,0.5)';
      ctx.beginPath();
      ctx.arc(normalX, boundary, arcR, Math.PI / 2 - refRad, Math.PI / 2, false);
      ctx.stroke();

      // Angle labels
      ctx.font = 'bold 11px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffd700';
      const incLabelAng = -Math.PI / 2 + incRad / 2;
      ctx.fillText(`θ₁=${Math.round(incidentAngle)}°`, normalX + (arcR + 18) * Math.cos(incLabelAng), boundary + (arcR + 18) * Math.sin(incLabelAng));

      ctx.fillStyle = '#34d399';
      const refLabelAng = Math.PI / 2 - refRad / 2;
      ctx.fillText(`θ₂=${Math.round(refAngle)}°`, normalX + (arcR + 18) * Math.cos(refLabelAng), boundary + (arcR + 18) * Math.sin(refLabelAng));

      // Bending direction info
      ctx.font = '10px Nunito, sans-serif';
      ctx.fillStyle = '#c084fc';
      ctx.textAlign = 'center';
      const bendDir = refAngle < incidentAngle ? 'towards' : 'away from';
      ctx.fillText(`Light bends ${bendDir} the normal`, w / 2, h - 26);
      ctx.font = '9px Nunito, sans-serif';
      ctx.fillStyle = '#a78bca';
      ctx.fillText(`n₁ sin θ₁ = n₂ sin θ₂  (Snell's Law)`, w / 2, h - 12);
    }

    // Ray label
    ctx.font = '10px Nunito, sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'left';
    ctx.fillText('Incident Ray', incX - 5, incY - 6);

    // Drag handle
    ctx.fillStyle = 'rgba(255,215,0,0.3)';
    ctx.beginPath();
    ctx.arc(incX, incY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Progress based on how much they've explored
    const explored = Math.min(100, Math.round(Math.abs(incidentAngle - 20) / 60 * 100));
    if (explored > simProgress) {
      updateSimScore(container, explored, lvl);
    }

    // Border
    ctx.strokeStyle = lvl.color + '40';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    animFrameId = requestAnimationFrame(draw);
  }

  // Drag the incident ray
  function onDown(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    const incRad = incidentAngle * Math.PI / 180;
    const rayLenInc = boundary * 0.8;
    const incX = w * 0.5 - rayLenInc * Math.sin(incRad);
    const incY = boundary - rayLenInc * Math.cos(incRad);
    if (Math.hypot(pos.x - incX, pos.y - incY) < 30) {
      isDragging = true;
    }
  }
  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    const dx = pos.x - w * 0.5;
    const dy = boundary - pos.y;
    let angle = Math.atan2(-dx, dy) * 180 / Math.PI;
    angle = Math.max(5, Math.min(80, angle));
    incidentAngle = angle;
  }
  function onUp() { isDragging = false; }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  draw();
}

/* ============================================================
   LEVEL 5 — Prism Rainbow (Dispersion)
   ============================================================ */
function setupLevel5(canvas, lvl, container) {
  const { ctx, w, h } = sizeCanvas(canvas);
  const spectrum = lvl.simSpectrum;

  // Prism position (draggable)
  let prismX = w * 0.45;
  let prismY = h * 0.48;
  const prismSize = 50;
  let isDragging = false;
  let dragOffset = { x: 0, y: 0 };
  let beamHitsPrism = false;
  let labelRevealProgress = 0;

  const instr = document.getElementById('sim-instruction');
  if (instr) { instr.textContent = '🔺 Drag the prism into the white light beam!'; instr.style.display = 'block'; }

  // White light beam Y position
  const beamY = h * 0.48;
  const beamStartX = 0;
  const beamWidth = 4;

  function drawPrism(x, y, size) {
    const h60 = size * Math.sin(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(x, y - h60 * 0.6);
    ctx.lineTo(x - size / 2, y + h60 * 0.4);
    ctx.lineTo(x + size / 2, y + h60 * 0.4);
    ctx.closePath();

    const pg = ctx.createLinearGradient(x - size / 2, y - h60 * 0.6, x + size / 2, y + h60 * 0.4);
    pg.addColorStop(0, 'rgba(200,200,255,0.25)');
    pg.addColorStop(0.5, 'rgba(255,255,255,0.15)');
    pg.addColorStop(1, 'rgba(200,200,255,0.25)');
    ctx.fillStyle = pg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Glass shine
    ctx.beginPath();
    ctx.moveTo(x - 5, y - h60 * 0.3);
    ctx.lineTo(x - 2, y + h60 * 0.15);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function isBeamHittingPrism() {
    // Check if beam Y is within prism triangle
    const h60 = prismSize * Math.sin(Math.PI / 3);
    const top = prismY - h60 * 0.6;
    const bot = prismY + h60 * 0.4;
    const leftEdge = prismX - prismSize / 2;
    return beamY > top && beamY < bot && leftEdge < w * 0.7;
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Background — dark with subtle gradient
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, '#0c0818');
    bg.addColorStop(1, '#080412');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    beamHitsPrism = isBeamHittingPrism();

    // White light beam (from left)
    const beamEndX = beamHitsPrism ? prismX - prismSize / 2 + 5 : w;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = beamWidth;
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(beamStartX, beamY);
    ctx.lineTo(beamEndX, beamY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // White light label
    ctx.font = '10px Nunito, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'left';
    ctx.fillText('White Light ➜', 8, beamY - 12);

    // Draw dispersion if prism is hit
    if (beamHitsPrism) {
      labelRevealProgress = Math.min(1, labelRevealProgress + 0.02);

      const exitX = prismX + prismSize / 2;
      const spreadFactor = 1.8;

      spectrum.forEach((color, i) => {
        const angle = color.angle * spreadFactor * Math.PI / 180;
        const rayLen = w - exitX + 20;
        const endX = exitX + rayLen * Math.cos(angle);
        const endY = beamY + rayLen * Math.sin(angle);

        // Color ray
        ctx.strokeStyle = color.color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(exitX, beamY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label (revealed progressively)
        if (labelRevealProgress > (i / spectrum.length)) {
          ctx.font = 'bold 9px Nunito, sans-serif';
          ctx.fillStyle = color.color;
          ctx.textAlign = 'left';
          const labelX = Math.min(w - 45, exitX + rayLen * 0.6 * Math.cos(angle));
          const labelY = beamY + rayLen * 0.6 * Math.sin(angle);
          ctx.fillText(color.name, labelX, labelY);
        }
      });

      // VIBGYOR label
      ctx.font = 'bold 10px Nunito, sans-serif';
      ctx.fillStyle = '#f472b6';
      ctx.textAlign = 'center';
      ctx.fillText('V I B G Y O R', w * 0.75, h - 10);

      updateSimScore(container, 100, lvl);
      if (instr && labelRevealProgress >= 0.9) {
        instr.textContent = '🌈 White light disperses into 7 colours — VIBGYOR!';
      }
    } else {
      labelRevealProgress = 0;
      updateSimScore(container, 20, lvl);
    }

    // Draw prism
    drawPrism(prismX, prismY, prismSize);

    // Drag hint
    if (!beamHitsPrism) {
      ctx.font = '10px Nunito, sans-serif';
      ctx.fillStyle = 'rgba(167,139,202,0.6)';
      ctx.textAlign = 'center';
      ctx.fillText('↕ Drag prism here', prismX, prismY + prismSize * 0.6 + 14);
    }

    // Border
    ctx.strokeStyle = lvl.color + '40';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    animFrameId = requestAnimationFrame(draw);
  }

  // Drag prism
  function onDown(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    if (Math.hypot(pos.x - prismX, pos.y - prismY) < prismSize) {
      isDragging = true;
      dragOffset.x = pos.x - prismX;
      dragOffset.y = pos.y - prismY;
    }
  }
  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    prismX = Math.max(prismSize, Math.min(w - prismSize, pos.x - dragOffset.x));
    prismY = Math.max(prismSize, Math.min(h - prismSize, pos.y - dragOffset.y));
  }
  function onUp() {
    if (isDragging && beamHitsPrism) {
      audio.levelUp();
    }
    isDragging = false;
  }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  draw();
}

/* ============================================================
   LEVEL 6 — Solar Power Lab (Light Energy)
   ============================================================ */
function setupLevel6(canvas, lvl, container) {
  const { ctx, w, h } = sizeCanvas(canvas);

  // Sun position (top right)
  const sunX = w * 0.78;
  const sunY = h * 0.12;

  // Solar panel
  const panelCenterX = w * 0.35;
  const panelCenterY = h * 0.65;
  const panelWidth = 70;
  const panelHeight = 6;
  let panelAngle = 30; // degrees from horizontal
  let isDragging = false;

  // Appliances
  const appliances = lvl.simAppliances.map((a, i) => ({
    ...a,
    x: w * 0.7 + i * 32 - 20,
    y: h * 0.75 + (i % 2 === 0 ? 0 : 15),
    powered: false
  }));

  let energy = 0;
  let maxEnergyReached = 0;

  const instr = document.getElementById('sim-instruction');
  if (instr) { instr.textContent = '☀️ Drag the solar panel to angle it towards the sun!'; instr.style.display = 'block'; }

  function calculateEnergy() {
    // Angle between sun direction and panel normal
    const sunDirX = sunX - panelCenterX;
    const sunDirY = sunY - panelCenterY;
    const sunAngle = Math.atan2(-sunDirY, sunDirX);

    // Panel normal (perpendicular to panel surface, pointing up)
    const panelRad = panelAngle * Math.PI / 180;
    const normalAngle = panelRad + Math.PI / 2;

    // Dot product gives cos of angle between sun direction and panel normal
    const diff = Math.abs(sunAngle - normalAngle);
    const cosA = Math.cos(diff);
    return Math.max(0, Math.round(cosA * 100));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    sky.addColorStop(0, '#0c1445');
    sky.addColorStop(1, '#1a0940');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.7);

    // Ground
    ctx.fillStyle = '#0d1a0a';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);
    ctx.fillStyle = 'rgba(52,211,153,0.08)';
    ctx.fillRect(0, h * 0.7, w, 3);

    // Sun
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 50);
    sunGlow.addColorStop(0, 'rgba(255,215,0,0.5)');
    sunGlow.addColorStop(0.5, 'rgba(255,165,0,0.15)');
    sunGlow.addColorStop(1, 'rgba(255,165,0,0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('☀️', sunX, sunY);

    // Sun rays to panel
    energy = calculateEnergy();
    maxEnergyReached = Math.max(maxEnergyReached, energy);

    const numRays = 6;
    const panelRad = panelAngle * Math.PI / 180;
    for (let i = 0; i < numRays; i++) {
      const t = (i + 0.5) / numRays;
      const px = panelCenterX + (t - 0.5) * panelWidth * Math.cos(panelRad);
      const py = panelCenterY - (t - 0.5) * panelWidth * Math.sin(panelRad);

      ctx.strokeStyle = `rgba(255,215,0,${0.15 + energy / 300})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Solar panel
    ctx.save();
    ctx.translate(panelCenterX, panelCenterY);
    ctx.rotate(-panelRad);

    // Panel body
    const panelGrad = ctx.createLinearGradient(-panelWidth / 2, -panelHeight, panelWidth / 2, panelHeight);
    panelGrad.addColorStop(0, '#1e3a5f');
    panelGrad.addColorStop(0.5, '#2563eb');
    panelGrad.addColorStop(1, '#1e3a5f');
    ctx.fillStyle = panelGrad;
    ctx.fillRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1;
    ctx.strokeRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);

    // Grid lines on panel
    ctx.strokeStyle = 'rgba(96,165,250,0.4)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i < 6; i++) {
      const x = -panelWidth / 2 + (panelWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, -panelHeight / 2);
      ctx.lineTo(x, panelHeight / 2);
      ctx.stroke();
    }

    // Glow when energy is high
    if (energy > 50) {
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = energy / 5;
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 1;
      ctx.strokeRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight);
      ctx.shadowBlur = 0;
    }

    ctx.restore();

    // Panel stand
    ctx.strokeStyle = '#4a4a4a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(panelCenterX, panelCenterY);
    ctx.lineTo(panelCenterX, panelCenterY + 20);
    ctx.stroke();

    // Drag handle (at end of panel)
    const handleX = panelCenterX + (panelWidth / 2) * Math.cos(panelRad);
    const handleY = panelCenterY - (panelWidth / 2) * Math.sin(panelRad);
    ctx.fillStyle = 'rgba(255,215,0,0.3)';
    ctx.beginPath();
    ctx.arc(handleX, handleY, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = '8px Nunito, sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('↻', handleX, handleY + 1);

    // Energy meter
    const meterX = w * 0.06;
    const meterY = h * 0.2;
    const meterH = h * 0.45;
    const meterW = 14;

    // Meter background
    ctx.fillStyle = 'rgba(30,15,60,0.8)';
    ctx.strokeStyle = 'rgba(147,51,234,0.4)';
    ctx.lineWidth = 1;
    roundedRect(ctx, meterX - meterW / 2, meterY, meterW, meterH, 4);
    ctx.fill();
    ctx.stroke();

    // Meter fill
    const fillH = (energy / 100) * meterH;
    const meterGrad = ctx.createLinearGradient(0, meterY + meterH, 0, meterY);
    meterGrad.addColorStop(0, '#ef4444');
    meterGrad.addColorStop(0.4, '#ffd700');
    meterGrad.addColorStop(1, '#34d399');
    ctx.fillStyle = meterGrad;
    roundedRect(ctx, meterX - meterW / 2 + 2, meterY + meterH - fillH + 2, meterW - 4, Math.max(0, fillH - 4), 2);
    ctx.fill();

    // Meter label
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.fillStyle = '#fb923c';
    ctx.textAlign = 'center';
    ctx.fillText(`${energy}%`, meterX, meterY - 8);
    ctx.font = '8px Nunito, sans-serif';
    ctx.fillStyle = '#a78bca';
    ctx.fillText('Energy', meterX, meterY + meterH + 14);

    // Angle display
    ctx.font = '10px Nunito, sans-serif';
    ctx.fillStyle = '#60a5fa';
    ctx.textAlign = 'center';
    ctx.fillText(`Panel: ${Math.round(panelAngle)}°`, panelCenterX, panelCenterY + 34);

    // Appliances
    appliances.forEach(app => {
      app.powered = energy >= app.threshold;
      ctx.font = '22px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (app.powered) {
        // Powered glow
        const glow = ctx.createRadialGradient(app.x, app.y, 0, app.x, app.y, 18);
        glow.addColorStop(0, 'rgba(255,215,0,0.3)');
        glow.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(app.x, app.y, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = app.powered ? 1 : 0.3;
      ctx.fillText(app.emoji, app.x, app.y);
      ctx.globalAlpha = 1;

      // Label
      ctx.font = '8px Nunito, sans-serif';
      ctx.fillStyle = app.powered ? '#ffd700' : '#666';
      ctx.fillText(app.name, app.x, app.y + 18);
      ctx.fillText(`${app.threshold}%`, app.x, app.y + 26);
    });

    // Wire from panel to appliances
    ctx.strokeStyle = energy > 0 ? 'rgba(255,215,0,0.2)' : 'rgba(100,100,100,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(panelCenterX + 20, panelCenterY + 20);
    ctx.lineTo(appliances[0].x - 15, appliances[0].y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Update score
    const pct = Math.round(maxEnergyReached);
    updateSimScore(container, pct, lvl);

    if (energy >= 80 && instr) {
      instr.textContent = '🎉 Maximum energy! All devices powered! Light = Energy!';
    }

    // Border
    ctx.strokeStyle = lvl.color + '40';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, w - 1, h - 1);

    animFrameId = requestAnimationFrame(draw);
  }

  // Drag to rotate panel
  function onDown(e) {
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    const panelRad = panelAngle * Math.PI / 180;
    const handleX = panelCenterX + (panelWidth / 2) * Math.cos(panelRad);
    const handleY = panelCenterY - (panelWidth / 2) * Math.sin(panelRad);
    if (Math.hypot(pos.x - handleX, pos.y - handleY) < 25 ||
        Math.hypot(pos.x - panelCenterX, pos.y - panelCenterY) < panelWidth / 2) {
      isDragging = true;
    }
  }
  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const pos = getPointerPos(canvas, e);
    const dx = pos.x - panelCenterX;
    const dy = panelCenterY - pos.y;
    let angle = Math.atan2(dy, dx) * 180 / Math.PI;
    // Allow panel to tilt downwards to face the sun on the right
    angle = Math.max(-80, Math.min(90, angle));
    panelAngle = angle;
  }
  function onUp() {
    if (isDragging && energy >= 80) {
      audio.levelUp();
    }
    isDragging = false;
  }

  canvas.addEventListener('mousedown', onDown);
  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseup', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove', onMove, { passive: false });
  canvas.addEventListener('touchend', onUp);

  draw();
}

/* ============================================================
   Shared Drawing Helpers
   ============================================================ */
function drawArrow(ctx, fromX, fromY, toX, toY, color) {
  const mx = (fromX + toX) / 2;
  const my = (fromY + toY) / 2;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.save();
  ctx.translate(mx, my);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(6, 0);
  ctx.lineTo(-4, -4);
  ctx.lineTo(-4, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
