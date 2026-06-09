// =============================================
//  QUEST FOR THE LOST LIGHT — App Router
// =============================================

import { renderWelcome }    from './screens/welcome.js';
import { renderGuide }      from './screens/guide.js';
import { renderBasics }     from './screens/basics.js';
import { renderMap }        from './screens/map.js';
import { renderLevel }      from './screens/level.js';
import { renderQuiz }       from './screens/quiz.js';
import { renderAnalysis }   from './screens/analysis.js';
import { renderReward }     from './screens/reward.js';
import { renderProfile }    from './screens/profile.js';
import { renderScoreboard } from './screens/scoreboard.js';
import { renderFinal }      from './screens/final.js';

const SCREENS = {
  welcome:    { render: renderWelcome,    transition: 'fade'  },
  guide:      { render: renderGuide,      transition: 'fade'  },
  basics:     { render: renderBasics,     transition: 'slide' },
  map:        { render: renderMap,        transition: 'slide' },
  level:      { render: renderLevel,      transition: 'slide' },
  quiz:       { render: renderQuiz,       transition: 'slide' },
  analysis:   { render: renderAnalysis,   transition: 'slide' },
  reward:     { render: renderReward,     transition: 'slide' },
  profile:    { render: renderProfile,    transition: 'slide' },
  scoreboard: { render: renderScoreboard, transition: 'slide' },
  final:      { render: renderFinal,      transition: 'fade'  },
};

let currentScreen = null;

export function navigate(screenName, params = {}) {
  const screenDef = SCREENS[screenName];
  if (!screenDef) { console.error('Unknown screen:', screenName); return; }

  const app = document.getElementById('app');
  if (!app) return;

  const type = screenDef.transition;
  const isSameType = currentScreen && SCREENS[currentScreen]?.transition === type;

  // Exit animation
  app.classList.add(type === 'fade' ? 'exit-fade' : 'exit-slide');

  setTimeout(() => {
    app.innerHTML = '';
    app.classList.remove('exit-fade', 'exit-slide');

    // Enter animation
    app.classList.add(type === 'fade' ? 'enter-fade' : 'enter-slide');

    // Render the screen
    screenDef.render(app, params);

    // Remove enter class after animation
    setTimeout(() => {
      app.classList.remove('enter-fade', 'enter-slide');
    }, 380);

    currentScreen = screenName;
  }, 220);
}

// Expose generateStarfield globally (used by all screens)
window.generateStarfield = function(id) {
  const container = document.getElementById(id);
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'star-dot';
    const dur  = (2 + Math.random() * 3).toFixed(1) + 's';
    const del  = (Math.random() * 4).toFixed(1) + 's';
    dot.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${dur};
      --del: ${del};
      opacity: 0;
    `;
    container.appendChild(dot);
  }
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  navigate('welcome');
});
