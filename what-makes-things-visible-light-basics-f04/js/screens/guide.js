import { navigate } from '../app.js';
import { audio } from '../utils/audio.js';

import { loadTemplate } from '../utils/template.js';

export async function renderGuide(container) {
  container.innerHTML = await loadTemplate('guide');

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
