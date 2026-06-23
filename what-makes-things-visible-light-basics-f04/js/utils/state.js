// State management with localStorage persistence
const STATE_KEY = 'quest_light_state';

const defaultState = {
  currentLevel: 1,
  completedLevels: [],
  simStars: 3,
  quizScore: 0,
  quizScores: [],
  totalStars: 0
};

export let gameState = loadState();

function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}

export function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(gameState));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

export function resetState() {
  gameState = { ...defaultState };
  localStorage.removeItem(STATE_KEY);
}

export function updateState(patch) {
  Object.assign(gameState, patch);
  saveState();
}

export function getXP() {
  return gameState.completedLevels.length * 150 + gameState.totalStars * 30;
}

export function getTotalScore() {
  const sum = gameState.quizScores.reduce((a, b) => a + b, 0);
  return gameState.completedLevels.length * 200 + gameState.totalStars * 50 + sum * 30;
}

export function getAccuracy() {
  if (!gameState.quizScores.length) return 0;
  const total = gameState.quizScores.reduce((a, b) => a + b, 0);
  return Math.round(total / (gameState.quizScores.length * 5) * 100);
}
