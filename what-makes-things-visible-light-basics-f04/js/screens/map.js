import { navigate } from '../app.js';
import { gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';

import { loadTemplate } from '../utils/template.js';

export async function renderMap(container) {
  const completed = gameState.completedLevels;
  const totalStars = gameState.totalStars;
  const xp = gameState.completedLevels.length * 150 + totalStars * 30;

  container.innerHTML = await loadTemplate('map', { completed, totalStars, xp, levelsData });

  generateStarfield('starfield-map');

  // Level click
  container.querySelectorAll('.level-row:not(.locked)').forEach(row => {
    row.addEventListener('click', () => {
      const lvlId = parseInt(row.dataset.level);
      audio.click();
      navigate('level', { levelId: lvlId });
    });
  });

  document.getElementById('nav-profile').addEventListener('click', () => { audio.click(); navigate('profile'); });
  document.getElementById('nav-score').addEventListener('click', () => { audio.click(); navigate('scoreboard'); });

  // Animate rows
  container.querySelectorAll('.level-row').forEach((row, i) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-30px)';
    setTimeout(() => {
      row.style.transition = 'all 0.4s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    }, 100 + i * 80);
  });

  // Progress bar animate
  setTimeout(() => {
    const bar = container.querySelector('.map-progress-bar-fill');
    if (bar) { bar.style.transition = 'width 0.8s ease'; }
  }, 200);
}
