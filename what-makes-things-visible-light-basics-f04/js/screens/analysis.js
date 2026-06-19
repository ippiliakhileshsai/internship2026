import { navigate } from '../app.js';
import { gameState } from '../utils/state.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';

import { loadTemplate } from '../utils/template.js';

export async function renderAnalysis(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  const score = gameState.quizScore;
  const simStars = gameState.simStars;
  const total = 5;
  const pct = Math.round(score / total * 100);
  const stars = score >= 5 ? 3 : score >= 4 ? 2 : score >= 2 ? 1 : 0;

  const grade = pct === 100 ? { label: 'Perfect!', icon: '🏆', color: '#ffd700' }
              : pct >= 80  ? { label: 'Great Job!', icon: '⭐', color: '#c084fc' }
              : pct >= 60  ? { label: 'Good Work!', icon: '👍', color: '#60a5fa' }
              :               { label: 'Keep Going!', icon: '💪', color: '#fb923c' };

  container.innerHTML = await loadTemplate('analysis', { lvl, score, simStars, total, pct, stars, grade });

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

  const btn = document.getElementById('btn-reward');
  if (stars === 0) {
    btn.innerHTML = '<div class="shimmer-sweep"></div> 🔄 Retry Level';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #991b1b)';
  }

  btn.addEventListener('click', () => {
    audio.click();
    if (stars === 0) {
      navigate('level', { levelId });
    } else {
      navigate('reward', { levelId });
    }
  });
}
