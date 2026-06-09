import { navigate } from '../app.js';
import { gameState, getXP } from '../utils/state.js';
import { badgesData } from '../data/badges.js';
import { audio } from '../utils/audio.js';

const AVATARS = ['🧙‍♂️','🧝‍♀️','🦸','🧚','🔮','⭐'];

export function renderProfile(container) {
  const { completedLevels, totalStars } = gameState;
  const xp = getXP();
  const level = Math.max(1, completedLevels.length);
  const avatar = AVATARS[Math.min(completedLevels.length, AVATARS.length - 1)];
  const xpToNext = level * 300;
  const xpPct = Math.min((xp % 300) / 300 * 100, 100);

  container.innerHTML = `
    <div class="screen profile-screen">
      <div class="starfield" id="starfield-prof"></div>

      <!-- Header -->
      <div class="profile-header">
        <button class="back-btn" id="btn-back">←</button>
        <div class="profile-header-title">My Profile</div>
      </div>

      <!-- Avatar -->
      <div class="profile-avatar-section">
        <div class="profile-avatar-ring glow-pulse-gold">
          <span class="profile-avatar-emoji">${avatar}</span>
          <div class="profile-avatar-badge">Lv.${level} Explorer</div>
        </div>
        <h2 class="profile-name">Young Explorer</h2>
        <p class="profile-subtitle">Quest for the Lost Light</p>
      </div>

      <!-- Stats grid -->
      <div class="profile-stats">
        ${[
          { icon: '⚡', label: 'XP Points', val: xp, color: '#c084fc' },
          { icon: '⭐', label: 'Stars', val: totalStars * 100, color: '#ffd700' },
          { icon: '🗺️', label: 'Levels Done', val: `${completedLevels.length}/6`, color: '#60a5fa' }
        ].map(s => `
          <div class="profile-stat-card" style="border-color:${s.color}30">
            <span class="pstat-icon">${s.icon}</span>
            <span class="pstat-val" style="color:${s.color}">${s.val}</span>
            <span class="pstat-label">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <!-- XP progress -->
      <div class="profile-xp-section">
        <div class="xp-labels">
          <span>Level Progress</span>
          <span style="color:#ffd700">${xp} / ${xpToNext} XP</span>
        </div>
        <div class="xp-bar-bg">
          <div class="xp-bar-fill" style="width:${xpPct}%"></div>
        </div>
      </div>

      <!-- Badges -->
      <div class="badges-section">
        <div class="badges-title">🏅 BADGES</div>
        <div class="badges-grid">
          ${badgesData.map((b, i) => {
            const earned = completedLevels.includes(b.level);
            return `
              <div class="badge-item ${earned ? 'badge-earned' : 'badge-locked'}" style="${earned ? `border-color:${b.color}40;background:${b.color}10` : ''}">
                <span class="badge-item-icon" style="${earned ? '' : 'filter:grayscale(1);opacity:0.4'}">${earned ? b.icon : '🔒'}</span>
                <span class="badge-item-name" style="color:${earned ? b.color : '#6b5a9e'}">${b.name}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

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
