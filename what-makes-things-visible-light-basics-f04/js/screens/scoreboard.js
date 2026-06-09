import { navigate } from '../app.js';
import { gameState, getTotalScore, getAccuracy } from '../utils/state.js';
import { audio } from '../utils/audio.js';

const LEADERBOARD = [
  { name: 'StarForge',   avatar: '⭐', baseScore: 4850, stars: 18, rank: 1 },
  { name: 'LightHero',   avatar: '🦸', baseScore: 4200, stars: 16, rank: 2 },
  { name: 'You',         avatar: '🧙‍♂️', isYou: true },
  { name: 'CrystalKid',  avatar: '💎', baseScore: 2900, stars: 12, rank: 4 },
  { name: 'NeonWave',    avatar: '🌟', baseScore: 2400, stars: 10, rank: 5 }
];

export function renderScoreboard(container) {
  const { completedLevels, totalStars, quizScores } = gameState;
  const myScore = getTotalScore();
  const accuracy = getAccuracy();

  const board = LEADERBOARD.map(p => p.isYou
    ? { ...p, baseScore: myScore, stars: totalStars * 3, rank: 0 }
    : p
  ).sort((a, b) => b.baseScore - a.baseScore)
   .map((p, i) => ({ ...p, rank: i + 1 }));

  const medalColors = ['#ffd700', '#c0c0c0', '#cd7f32'];
  const medals = ['🥇', '🥈', '🥉'];

  container.innerHTML = `
    <div class="screen score-screen">
      <div class="starfield" id="starfield-sc"></div>

      <div class="score-header">
        <button class="back-btn" id="btn-back">←</button>
        <div class="score-title">🏆 Scoreboard</div>
      </div>

      <!-- My stats -->
      <div class="score-my-stats">
        ${[
          { icon:'🏆', label:'Total Score',     val: myScore,              color:'#ffd700' },
          { icon:'⭐', label:'Stars Collected',  val:`${totalStars*3} ⭐`,  color:'#f59e0b' },
          { icon:'📊', label:'Quiz Accuracy',    val:`${accuracy}%`,        color:'#60a5fa' },
          { icon:'🗺️', label:'Levels Done',      val:`${completedLevels.length} / 6`, color:'#34d399' }
        ].map(s => `
          <div class="my-stat-card" style="border-color:${s.color}30">
            <span class="my-stat-icon">${s.icon}</span>
            <div>
              <div class="my-stat-val" style="color:${s.color}">${s.val}</div>
              <div class="my-stat-label">${s.label}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="score-list-label">GLOBAL RANKING</div>

      <!-- Leaderboard -->
      <div class="score-list">
        ${board.map((p, i) => `
          <div class="score-row ${p.isYou ? 'score-you' : ''}" style="animation-delay:${i*80}ms">
            <div class="rank-badge" style="background:${p.rank<=3 ? medalColors[p.rank-1]+'25' : 'rgba(100,80,180,0.2)'}; border-color:${p.rank<=3 ? medalColors[p.rank-1] : 'rgba(100,80,180,0.4)'}50">
              <span style="font-size:12px;color:${p.rank<=3 ? medalColors[p.rank-1] : '#a78bca'}">
                ${p.rank<=3 ? medals[p.rank-1] : '#'+p.rank}
              </span>
            </div>
            <span class="score-avatar">${p.avatar}</span>
            <div class="score-player-info">
              <div class="score-player-name" style="color:${p.isYou ? '#ffd700' : '#e9d5ff'}; font-weight:${p.isYou ? 700 : 400}">
                ${p.name}${p.isYou ? ' (You)' : ''}
              </div>
              <div class="score-stars-row">
                ${'⭐'.repeat(Math.min(p.stars, 5))}${'☆'.repeat(Math.max(0,5-p.stars))}
              </div>
            </div>
            <div class="score-points" style="color:${p.rank<=3 ? medalColors[p.rank-1] : '#c084fc'}">
              ${p.baseScore.toLocaleString()}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  generateStarfield('starfield-sc');

  // Slide in rows
  container.querySelectorAll('.score-row').forEach((row, i) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-30px)';
    setTimeout(() => {
      row.style.transition = 'all 0.4s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    }, 200 + i * 80);
  });

  document.getElementById('btn-back').addEventListener('click', () => { audio.click(); navigate('map'); });
}
