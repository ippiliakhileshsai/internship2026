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

import { loadTemplate } from '../utils/template.js';

export async function renderScoreboard(container) {
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

  container.innerHTML = await loadTemplate('scoreboard', { myScore, totalStars, accuracy, completedLevels, board, medalColors, medals });

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
