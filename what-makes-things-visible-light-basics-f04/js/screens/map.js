import { navigate } from '../app.js';
import { gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';

export function renderMap(container) {
  const completed = gameState.completedLevels;
  const totalStars = gameState.totalStars;
  const xp = gameState.completedLevels.length * 150 + totalStars * 30;

  container.innerHTML = `
    <div class="screen map-screen">
      <div class="starfield" id="starfield-map"></div>

      <!-- Header -->
      <div class="map-header">
        <div>
          <div class="map-label">⚔️ QUEST FOR THE LOST LIGHT</div>
          <h2 class="map-title">Kingdom of Light</h2>
        </div>
        <div class="map-xp-badge">
          <span class="xp-icon">⚡</span>
          <span class="xp-val">${xp} XP</span>
        </div>
      </div>

      <!-- Progress banner -->
      <div class="map-progress-bar-wrap">
        <div class="map-progress-bar-bg">
          <div class="map-progress-bar-fill" style="width:${Math.round(completed.length / 6 * 100)}%"></div>
        </div>
        <span class="map-progress-label">${completed.length}/6 Crystals Restored</span>
      </div>

      <!-- Level nodes -->
      <div class="levels-list">
        ${levelsData.map((lvl, i) => {
          const done = completed.includes(lvl.id);
          const locked = !done && lvl.id > (completed.length + 1);
          const current = lvl.id === completed.length + 1 && !done;
          return `
            <div class="level-row ${done ? 'done' : ''} ${locked ? 'locked' : ''} ${current ? 'current' : ''}"
                 data-level="${lvl.id}" style="--accent:${lvl.color}">
              <div class="level-icon-wrap" style="border-color:${locked ? 'rgba(100,80,180,0.3)' : lvl.color}40; background:${locked ? 'rgba(20,10,40,0.5)' : lvl.color + '15'}">
                <span class="level-icon">${locked ? '🔒' : lvl.icon}</span>
                ${done ? '<div class="done-tick">✓</div>' : ''}
              </div>
              <div class="level-info">
                <div class="level-name" style="color:${locked ? '#6b5a9e' : '#fff'}">${lvl.name}</div>
                <div class="level-sub" style="color:${locked ? '#4a3870' : lvl.color}">${locked ? 'Complete previous level' : lvl.subtitle}</div>
                ${done ? `<div class="level-stars">${'⭐'.repeat(3)}</div>` : ''}
              </div>
              <div class="level-arrow" style="color:${locked ? '#4a3870' : lvl.color}">
                ${locked ? '🔒' : done ? '↺' : '▶'}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Bottom Nav -->
      <div class="bottom-nav">
        <button class="nav-btn active" id="nav-map">
          <span class="nav-icon">🗺️</span>
          <span class="nav-label">Map</span>
        </button>
        <button class="nav-btn" id="nav-profile">
          <span class="nav-icon">👤</span>
          <span class="nav-label">Profile</span>
        </button>
        <button class="nav-btn" id="nav-score">
          <span class="nav-icon">🏆</span>
          <span class="nav-label">Scores</span>
        </button>
      </div>
    </div>
  `;

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
