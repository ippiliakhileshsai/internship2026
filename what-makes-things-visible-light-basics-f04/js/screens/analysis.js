import { navigate } from '../app.js';
import { gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';

export function renderAnalysis(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  const score = gameState.quizScore;
  const simStars = gameState.simStars;
  const total = 5;
  const pct = Math.round(score / total * 100);
  const stars = simStars;

  const grade = pct === 100 ? { label: 'Perfect!', icon: '🏆', color: '#ffd700' }
              : pct >= 80  ? { label: 'Great Job!', icon: '⭐', color: '#c084fc' }
              : pct >= 60  ? { label: 'Good Work!', icon: '👍', color: '#60a5fa' }
              :               { label: 'Keep Going!', icon: '💪', color: '#fb923c' };

  container.innerHTML = `
    <div class="screen analysis-screen" style="--accent:${lvl.color}">
      <div class="starfield" id="starfield-ana"></div>

      <div class="analysis-header">
        <div class="label-tag" style="color:${lvl.color}">${lvl.icon} ${lvl.name} · Results</div>
        <div class="analysis-grade-icon">${grade.icon}</div>
        <h2 class="analysis-grade-label" style="color:${grade.color}">${grade.label}</h2>
      </div>

      <div class="analysis-cards">
        <!-- Quiz score -->
        <div class="ana-card" style="border-color:${lvl.color}30">
          <div class="ana-card-header">
            <span class="ana-card-icon">📝</span>
            <span class="ana-card-title">Quiz Score</span>
          </div>
          <div class="ana-big-score" style="color:${lvl.color}">${score}<span class="ana-total">/${total}</span></div>
          <div class="ana-pct-bar-bg">
            <div class="ana-pct-bar-fill" style="width:${pct}%;background:${lvl.color}"></div>
          </div>
          <div class="ana-pct-label" style="color:${lvl.color}">${pct}% Accuracy</div>
        </div>

        <!-- Simulation stars -->
        <div class="ana-card" style="border-color:#ffd70030">
          <div class="ana-card-header">
            <span class="ana-card-icon">🔬</span>
            <span class="ana-card-title">Simulation</span>
          </div>
          <div class="sim-stars-display">
            ${[1,2,3].map(s => `<span class="star-big ${s <= stars ? 'star-lit' : 'star-dim'}" style="${s <= stars ? 'filter:drop-shadow(0 0 8px #ffd700)' : ''}">⭐</span>`).join('')}
          </div>
          <div class="ana-pct-label" style="color:#ffd700">${stars}/3 Stars Earned</div>
        </div>
      </div>

      <!-- Q by Q breakdown -->
      <div class="ana-breakdown-label">Question Breakdown</div>
      <div class="ana-breakdown" id="ana-breakdown">
        ${Array.from({length: total}).map((_, i) => `
          <div class="ana-q-dot" title="Q${i+1}" style="background:rgba(100,80,180,0.3)">Q${i+1}</div>
        `).join('')}
      </div>

      <!-- Stats row -->
      <div class="ana-stats">
        <div class="ana-stat">
          <span class="ana-stat-icon">⚡</span>
          <span class="ana-stat-val" style="color:#c084fc">+${score * 30} XP</span>
          <span class="ana-stat-label">Quiz XP</span>
        </div>
        <div class="ana-stat">
          <span class="ana-stat-icon">🪙</span>
          <span class="ana-stat-val" style="color:#ffd700">+${stars * 50}</span>
          <span class="ana-stat-label">Coins</span>
        </div>
        <div class="ana-stat">
          <span class="ana-stat-icon">${lvl.crystal}</span>
          <span class="ana-stat-val" style="color:${lvl.color}">1</span>
          <span class="ana-stat-label">Crystal</span>
        </div>
      </div>

      <button class="btn-primary shimmer-btn" id="btn-reward" style="background:linear-gradient(135deg,${lvl.colorDark},#4c1d95); margin:0 20px">
        <div class="shimmer-sweep"></div>
        🏅 Claim Reward →
      </button>
    </div>
  `;

  generateStarfield('starfield-ana');

  // Animate pct bars
  setTimeout(() => {
    const bar = container.querySelector('.ana-pct-bar-fill');
    if (bar) bar.style.transition = 'width 0.8s ease';
  }, 200);

  // Simulate Q breakdown (random for demo — would be tracked in production)
  const dots = container.querySelectorAll('.ana-q-dot');
  let correct = 0;
  dots.forEach((dot, i) => {
    const isCorrect = i < score;
    setTimeout(() => {
      dot.style.background = isCorrect ? '#34d399' : '#ef4444';
      dot.style.color = '#fff';
      dot.style.transition = 'background 0.3s ease';
      if (isCorrect) correct++;
    }, 300 + i * 120);
  });

  document.getElementById('btn-reward').addEventListener('click', () => {
    audio.click();
    navigate('reward', { levelId });
  });
}
