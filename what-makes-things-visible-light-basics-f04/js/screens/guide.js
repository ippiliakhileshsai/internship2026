import { navigate } from '../app.js';
import { audio } from '../utils/audio.js';

export function renderGuide(container) {
  container.innerHTML = `
    <div class="screen guide-screen">
      <div class="starfield" id="starfield-guide"></div>

      <div class="guide-header">
        <div class="label-tag">📖 Story</div>
        <h2 class="guide-title">The Lost Light</h2>
      </div>

      <div class="guide-wizard">
        <div class="wizard-avatar glow-pulse">🧙‍♂️</div>
        <div class="wizard-name">Luminus the Wise</div>
      </div>

      <div class="guide-dialog">
        <div class="dialog-box" id="dialog-text">
          <p id="typed-text"></p>
        </div>
      </div>

      <div class="guide-story-cards">
        <div class="story-card">
          <span class="story-icon">🌑</span>
          <div>
            <div class="story-card-title">The Shadow Curse</div>
            <div class="story-card-desc">An evil shadow wizard has stolen 6 magical crystals, plunging the kingdom into darkness.</div>
          </div>
        </div>
        <div class="story-card">
          <span class="story-icon">💡</span>
          <div>
            <div class="story-card-title">Your Mission</div>
            <div class="story-card-desc">Learn about Light through 6 missions. Each mission restores one crystal and reveals its secrets.</div>
          </div>
        </div>
        <div class="story-card">
          <span class="story-icon">🏰</span>
          <div>
            <div class="story-card-title">Save the Kingdom</div>
            <div class="story-card-desc">Complete all 6 levels to become the Guardian of Light and restore the kingdom to its glory!</div>
          </div>
        </div>
      </div>

      <div class="guide-buttons">
        <button class="btn-secondary" id="btn-skip">Skip Intro</button>
        <button class="btn-primary shimmer-btn" id="btn-continue">
          <div class="shimmer-sweep"></div>
          Continue →
        </button>
      </div>
    </div>
  `;

  generateStarfield('starfield-guide');

  // Typewriter effect
  const message = "Greetings, Young Explorer! Our Kingdom of Light is in grave danger. The Shadow Wizard has stolen the six magical Light Crystals. Without them, darkness reigns. You must embark on the Quest for the Lost Light!";
  typeWriter('typed-text', message, 28);

  document.getElementById('btn-skip').addEventListener('click', () => {
    audio.click();
    navigate('map');
  });
  document.getElementById('btn-continue').addEventListener('click', () => {
    audio.click();
    navigate('basics');
  });
}

function typeWriter(id, text, speed) {
  const el = document.getElementById(id);
  if (!el) return;
  let i = 0;
  const timer = setInterval(() => {
    if (!document.getElementById(id)) { clearInterval(timer); return; }
    el.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(timer);
  }, speed);
}
