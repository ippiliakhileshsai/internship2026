import { navigate } from '../app.js';
import { audio } from '../utils/audio.js';

import { loadTemplate } from '../utils/template.js';

export async function renderWelcome(container) {
  container.innerHTML = await loadTemplate('welcome');

  generateStarfield('starfield');

  document.getElementById('btn-start').addEventListener('click', () => {
    audio.click();
    navigate('guide');
  });
}
