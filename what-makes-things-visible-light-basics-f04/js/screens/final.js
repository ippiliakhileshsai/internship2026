import { navigate } from '../app.js';
import { gameState, getTotalScore, getAccuracy, resetState } from '../utils/state.js';
import { badgesData } from '../data/badges.js';
import { audio } from '../utils/audio.js';

export function renderFinal(container) {
  const { totalStars, quizScores } = gameState;
  const score = getTotalScore();
  const accuracy = getAccuracy();

  container.innerHTML = `
    <div class="screen final-screen">
      <div class="starfield" id="starfield-fin"></div>
      <div class="confetti-container" id="final-confetti"></div>

      <!-- Glowing orbs background -->
      <div class="final-orbs">
        ${['#ffd700','#9333ea','#60a5fa','#34d399','#c084fc','#f59e0b'].map((c,i)=>`
          <div class="final-orb" style="background:radial-gradient(circle,${c}40,transparent 70%);width:${100+i*30}px;height:${100+i*30}px;left:${10+i*14}%;top:${20+i*8}%;animation-delay:${i*0.5}s;animation-duration:${3+i}s"></div>
        `).join('')}
      </div>

      <!-- Crystals row -->
      <div class="final-crystals">
        ${['💎','💎','💎','💎','💎','💎'].map((c,i)=>`
          <span class="final-crystal-item" style="animation-delay:${i*0.15}s">${c}</span>
        `).join('')}
      </div>

      <!-- Castle -->
      <div class="final-castle-wrap">
        <div class="final-castle glow-pulse-gold">🏰</div>
        <div class="final-stars-row">
          ${['🌟','✨','💫','⭐','✨'].map((s,i)=>`<span class="bounce-star" style="--d:${i*0.2}s">${s}</span>`).join('')}
        </div>
      </div>

      <!-- Title -->
      <div class="final-kingdom-text">THE KINGDOM GLOWS ONCE MORE!</div>
      <h1 class="final-title">Quest Complete!</h1>
      <p class="final-subtitle">You are the Guardian of Light! 🛡️</p>

      <!-- Certificate -->
      <div class="certificate-card">
        <div class="cert-header">
          <div class="cert-title">🏅 CERTIFICATE OF ACHIEVEMENT</div>
          <div class="cert-sub">Guardian of Light — Quest for the Lost Light</div>
        </div>
        <div class="cert-stats">
          ${[
            { icon:'🏆', label:'Total Score', val:score, color:'#ffd700' },
            { icon:'⭐', label:'Stars',        val:`${totalStars*3}`, color:'#f59e0b' },
            { icon:'📊', label:'Accuracy',     val:`${accuracy}%`,   color:'#60a5fa' }
          ].map(s=>`
            <div class="cert-stat" style="background:${s.color}12;border-color:${s.color}30">
              <span style="font-size:18px">${s.icon}</span>
              <span class="cert-stat-val" style="color:${s.color}">${s.val}</span>
              <span class="cert-stat-label">${s.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- All crystals restored -->
      <div class="all-crystals-section">
        <div class="all-crystals-label">ALL CRYSTALS RESTORED</div>
        <div class="all-badges-row">
          ${badgesData.map((b,i)=>`
            <div class="final-badge-item" style="animation-delay:${1.4+i*0.08}s">
              <div class="final-badge-circle" style="background:${b.color}15;border-color:${b.color}40">
                <span style="font-size:18px">${b.icon}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Play Again -->
      <button class="btn-primary shimmer-btn final-btn" id="btn-play-again">
        <div class="shimmer-sweep"></div>
        🔄 Play Again
      </button>
    </div>
  `;

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
