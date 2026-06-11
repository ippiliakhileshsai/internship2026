import { navigate } from '../app.js';
import { gameState, getXP } from '../utils/state.js';
import { badgesData } from '../data/badges.js';
import { audio } from '../utils/audio.js';

const AVATARS = ['🧙‍♂️','🧝‍♀️','🦸','🧚','🔮','⭐'];

import { loadTemplate } from '../utils/template.js';

export async function renderProfile(container) {
  const { completedLevels, totalStars } = gameState;
  const xp = getXP();
  const level = Math.max(1, completedLevels.length);
  const avatar = AVATARS[Math.min(completedLevels.length, AVATARS.length - 1)];
  const xpToNext = level * 300;
  const xpPct = Math.min((xp % 300) / 300 * 100, 100);

  container.innerHTML = await loadTemplate('profile', { completedLevels, totalStars, xp, level, avatar, xpToNext, xpPct, badgesData });

  generateStarfield('starfield-prof');

  // Animate XP bar
  setTimeout(() => {
    const bar = container.querySelector('.xp-bar-fill');
    if (bar) bar.style.transition = 'width 0.8s ease';
  }, 300);

  // Pop in badges
  container.querySelectorAll('.badge-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.5)';
    setTimeout(() => {
      el.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    }, 100 + i * 70);
  });

  document.getElementById('btn-back').addEventListener('click', () => { audio.click(); navigate('map'); });
}
