import { navigate } from '../app.js';
import { updateState, gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { badgesData } from '../data/badges.js';
import { audio } from '../utils/audio.js';

import { loadTemplate } from '../utils/template.js';

export async function renderReward(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  const score = gameState.quizScore;
  const stars = score >= 5 ? 3 : score >= 4 ? 2 : score >= 2 ? 1 : 0;
  const badge = badgesData.find(b => b.level === levelId);
  const xpGain = score * 30 + stars * 50;
  const coinsGain = stars * 50 + score * 20;
  const isLast = levelId === 6;

  container.innerHTML = await loadTemplate('reward', { lvl, levelId, stars, score, badge, xpGain, coinsGain, isLast });

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
