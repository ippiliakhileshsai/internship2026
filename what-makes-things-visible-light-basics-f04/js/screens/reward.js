import { navigate } from '../app.js';
import { updateState, gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { badgesData } from '../data/badges.js';
import { audio } from '../utils/audio.js';

export function renderReward(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  const stars = gameState.simStars;
  const score = gameState.quizScore;
  const badge = badgesData.find(b => b.level === levelId);
  const xpGain = score * 30 + stars * 50;
  const coinsGain = stars * 50 + score * 20;
  const isLast = levelId === 6;

  container.innerHTML = `
    <div class="screen reward-screen" style="--accent:${lvl.color}">
      <div class="starfield" id="starfield-rew"></div>
      <div class="reward-glow-orb" style="background:radial-gradient(circle,${lvl.color}60,transparent 70%)"></div>

      <!-- Confetti particles -->
      <div class="confetti-container" id="confetti"></div>

      <!-- Level complete banner -->
      <div class="reward-banner">
        <div class="reward-level-tag" style="color:${lvl.color}">LEVEL ${levelId} COMPLETE!</div>
        <h2 class="reward-title">Amazing Work!</h2>
      </div>

      <!-- Stars -->
      <div class="reward-stars" id="reward-stars">
        ${[1,2,3].map(s => `
          <div class="rew-star ${s <= stars ? 'star-earned' : 'star-grey'}" style="--delay:${0.5 + s * 0.15}s">
            <div class="rew-star-emoji" style="${s <= stars ? 'filter:drop-shadow(0 0 10px #ffd700)' : 'opacity:0.3'}">⭐</div>
          </div>
        `).join('')}
      </div>

      <!-- Stats row -->
      <div class="reward-stats">
        <div class="rew-stat" style="border-color:${lvl.color}40">
          <div class="rew-stat-icon">⭐</div>
          <div class="rew-stat-val" style="color:${lvl.color}">${stars * 100}</div>
          <div class="rew-stat-label">Stars</div>
        </div>
        <div class="rew-stat" style="border-color:${lvl.color}40">
          <div class="rew-stat-icon">⚡</div>
          <div class="rew-stat-val" style="color:#c084fc">+${xpGain}</div>
          <div class="rew-stat-label">XP</div>
        </div>
        <div class="rew-stat" style="border-color:${lvl.color}40">
          <div class="rew-stat-icon">🪙</div>
          <div class="rew-stat-val" style="color:#ffd700">+${coinsGain}</div>
          <div class="rew-stat-label">Coins</div>
        </div>
      </div>

      <!-- Badge unlocked -->
      <div class="badge-unlocked-card" style="background:linear-gradient(135deg,${lvl.color}20,rgba(22,13,48,0.9));border-color:${lvl.color}50">
        <div class="badge-card-icon">${badge?.icon || '🏅'}</div>
        <div class="badge-card-info">
          <div class="badge-card-tag" style="color:${lvl.color}">🏅 Badge Unlocked!</div>
          <div class="badge-card-name">${badge?.name}</div>
          <div class="badge-card-desc">${badge?.desc}</div>
        </div>
      </div>

      <!-- Crystal restored -->
      <div class="crystal-row">
        <span class="crystal-label" style="color:${lvl.color}">Crystal Restored:</span>
        <span class="crystal-glow" id="crystal-glow">${lvl.crystal}</span>
        <span style="font-size:12px;color:#a78bca">💎</span>
      </div>

      <!-- CTA Button -->
      <button class="btn-primary shimmer-btn rew-btn" id="btn-next-level">
        <div class="shimmer-sweep"></div>
        ${isLast ? '🏰 Finish Quest!' : '🗺️ Next Level →'}
      </button>
    </div>
  `;

  generateStarfield('starfield-rew');
  spawnConfetti(container);
  audio.levelUp();

  // Animate stars in sequence
  container.querySelectorAll('.rew-star').forEach((star, i) => {
    star.style.opacity = '0';
    star.style.transform = 'scale(0) rotate(-30deg)';
    setTimeout(() => {
      star.style.transition = 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      star.style.opacity = '1';
      star.style.transform = 'scale(1) rotate(0deg)';
      if (i < stars) audio.star();
    }, 600 + i * 180);
  });

  // Animate sections
  ['.reward-banner','.reward-stats','.badge-unlocked-card','.crystal-row','.rew-btn'].forEach((sel, i) => {
    const el = container.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400 + i * 150);
  });

  document.getElementById('btn-next-level').addEventListener('click', () => {
    audio.click();
    const completedLevels = gameState.completedLevels.includes(levelId)
      ? gameState.completedLevels
      : [...gameState.completedLevels, levelId];
    const totalStars = gameState.totalStars + stars;
    const quizScores = [...gameState.quizScores, score];
    updateState({ completedLevels, totalStars, quizScores });
    navigate(isLast ? 'final' : 'map');
  });
}

function spawnConfetti(container) {
  const box = container.querySelector('#confetti');
  if (!box) return;
  const colors = ['#ffd700','#9333ea','#c084fc','#60a5fa','#34d399','#f472b6'];
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div');
    dot.className = 'confetti-dot';
    dot.style.cssText = `
      position:absolute;
      width:${4 + Math.random() * 6}px;
      height:${4 + Math.random() * 6}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:-10px;
      animation:confettiFall ${1.5 + Math.random() * 2}s ${Math.random() * 1}s ease-in forwards;
      opacity:0.9;
    `;
    box.appendChild(dot);
  }
}
