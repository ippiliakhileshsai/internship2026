import { navigate } from '../app.js';
import { gameState, getTotalScore, getAccuracy, resetState } from '../utils/state.js';
import { badgesData } from '../data/badges.js';
import { audio } from '../utils/audio.js';

import { loadTemplate } from '../utils/template.js';

export async function renderFinal(container) {
  const { totalStars, quizScores } = gameState;
  const score = getTotalScore();
  const accuracy = getAccuracy();

  container.innerHTML = await loadTemplate('final', { totalStars, score, accuracy, badgesData });

  generateStarfield('starfield-fin');
  spawnConfettiBurst(container);
  audio.levelUp();
  setTimeout(() => audio.levelUp(), 800);
  setTimeout(() => audio.levelUp(), 1600);

  // Animate elements
  const anims = [
    ['.final-crystals', 0],
    ['.final-castle-wrap', 200],
    ['.final-kingdom-text', 400],
    ['.final-title', 500],
    ['.final-subtitle', 600],
    ['.certificate-card', 800],
    ['.all-crystals-section', 1000],
    ['.final-btn', 1200],
  ];
  anims.forEach(([sel, delay]) => {
    const el = container.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay + 300);
  });

  document.getElementById('btn-play-again').addEventListener('click', () => {
    audio.click();
    resetState();
    navigate('welcome');
  });
}

function spawnConfettiBurst(container) {
  const box = container.querySelector('#final-confetti');
  if (!box) return;
  const colors = ['#ffd700','#9333ea','#c084fc','#60a5fa','#34d399','#f472b6','#fff'];
  [400, 1200, 2200].forEach(delay => {
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
          position:absolute;
          width:${5+Math.random()*7}px;
          height:${5+Math.random()*7}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          border-radius:${Math.random()>0.5?'50%':'2px'};
          left:${Math.random()*100}%;
          top:-10px;
          animation:confettiFall ${1.5+Math.random()*2}s ease-in forwards;
        `;
        box.appendChild(dot);
      }
    }, delay);
  });
}
