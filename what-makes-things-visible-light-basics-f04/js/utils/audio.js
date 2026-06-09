// Audio utility using Web Audio API
let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function playTone(frequency, type, duration, gainVal = 0.3) {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ac.currentTime);
    gain.gain.setValueAtTime(gainVal, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch (e) { /* silent fail */ }
}

export const audio = {
  correct() {
    playTone(523, 'sine', 0.1);
    setTimeout(() => playTone(659, 'sine', 0.12), 80);
    setTimeout(() => playTone(784, 'sine', 0.2), 160);
  },
  wrong() {
    playTone(200, 'sawtooth', 0.15, 0.2);
    setTimeout(() => playTone(180, 'sawtooth', 0.2, 0.15), 150);
  },
  levelUp() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 'sine', 0.25), i * 120));
  },
  click() {
    playTone(440, 'sine', 0.06, 0.15);
  },
  star() {
    playTone(880, 'sine', 0.12, 0.2);
    setTimeout(() => playTone(1108, 'sine', 0.15, 0.18), 100);
  }
};
