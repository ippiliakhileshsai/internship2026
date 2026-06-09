import { navigate } from '../app.js';
import { audio } from '../utils/audio.js';

const facts = [
  { icon: "⚡", title: "Light is Fast!", body: "Light travels at 3 × 10⁸ m/s — it could go around Earth 7.5 times in just one second!" },
  { icon: "〰️", title: "Light is a Wave", body: "Light travels as electromagnetic waves and can travel through the vacuum of space." },
  { icon: "🎨", title: "White = All Colours", body: "White light is actually a mix of 7 colours: Violet, Indigo, Blue, Green, Yellow, Orange, Red." },
  { icon: "👁️", title: "We See by Reflection", body: "We see objects because they reflect light into our eyes. Luminous objects make their own light." },
  { icon: "📐", title: "Straight Line Travel", body: "Light always travels in straight lines (rectilinear propagation) unless it hits a new medium." },
  { icon: "🌊", title: "Light Bends!", body: "When light passes from air to water or glass, it bends — this is called refraction." }
];

export function renderBasics(container) {
  container.innerHTML = `
    <div class="screen basics-screen">
      <div class="starfield" id="starfield-basics"></div>

      <div class="screen-header">
        <div class="label-tag">💡 Light Basics</div>
        <h2 class="screen-title">Before You Begin...</h2>
        <p class="screen-subtitle">Here are 6 key facts about light you'll use on your quest!</p>
      </div>

      <div class="facts-grid">
        ${facts.map((f, i) => `
          <div class="fact-card pop-in" style="--delay:${i * 80}ms">
            <div class="fact-icon">${f.icon}</div>
            <div class="fact-title">${f.title}</div>
            <div class="fact-body">${f.body}</div>
          </div>
        `).join('')}
      </div>

      <div class="basics-bottom">
        <div class="ready-badge">
          <span>🧙‍♂️</span>
          <span style="font-family:'Cinzel',serif; font-size:12px; color:#c084fc">Luminus says: "Remember these well, young hero!"</span>
        </div>
        <button class="btn-primary shimmer-btn" id="btn-play">
          <div class="shimmer-sweep"></div>
          🗺️ Let's Play! →
        </button>
      </div>
    </div>
  `;

  generateStarfield('starfield-basics');

  document.querySelectorAll('.pop-in').forEach(el => {
    const delay = parseInt(el.style.getPropertyValue('--delay')) || 0;
    el.style.opacity = '0';
    el.style.transform = 'scale(0.7) translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      el.style.opacity = '1';
      el.style.transform = 'scale(1) translateY(0)';
    }, delay + 100);
  });

  document.getElementById('btn-play').addEventListener('click', () => {
    audio.click();
    navigate('map');
  });
}
