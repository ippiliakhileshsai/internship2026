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

import { loadTemplate } from '../utils/template.js';

export async function renderBasics(container) {
  container.innerHTML = await loadTemplate('basics', { facts });

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
