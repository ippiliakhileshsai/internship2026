// Spidey Civics Guardian - Vanilla Client Engine
// Implements custom synthesizers, particle physics, speech guides, and suit themes.

// Global Action State
let gameState = {
  score: parseInt(localStorage.getItem('spidey_score') || '0', 10),
  badges: JSON.parse(localStorage.getItem('spidey_badges') || '[]'),
  currentScenarioIndex: null, // null means onboarding screen
  spideySuit: 'classic',
  appState: 'onboarding', // 'onboarding', 'gameplay', 'success_modal', 'game_over'
  spideyActionState: 'idle', // 'idle', 'shooting', 'disapprove', 'celebrate'
  spideySenseTriggered: false,
  wrongStreak: false,
  particles: []
};

// 1. SOUND GENERATOR (Uses Web Audio API dynamically for standalone instant running)
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    if (type === 'web_shot') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } 
    else if (type === 'sense_tingle') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
    else if (type === 'moral_buzz') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(75, ctx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    }
    else if (type === 'epic_success') {
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      
      const playChime = (freq, start) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        osc.connect(gain);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + 0.22);
      };
      playChime(392.00, 0);       // G4
      playChime(523.25, 0.08);    // C5
      playChime(659.25, 0.16);    // E5
      playChime(783.99, 0.24);    // G5
      playChime(1046.50, 0.32);   // C6
    }
    else if (type === 'level_complete') {
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      
      const playNote = (freq, start, duration, oscType = 'triangle') => {
        const osc = ctx.createOscillator();
        osc.type = oscType;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        osc.connect(gain);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      playNote(523.25, 0, 0.12);     // C5
      playNote(659.25, 0.12, 0.12);  // E5
      playNote(783.99, 0.24, 0.12);  // G5
      playNote(1046.50, 0.36, 0.35, 'sine'); // C6 hero hold!
    }
  } catch (e) {
    console.warn("AudioContext blocked or uninitialized", e);
  }
}

// 2. SPEECH SYNTH UTILITY - Custom pitched to sound like energetic adolescent Peter Parker
// function speakHeroText(text) {
//   if ('speechSynthesis' in window) {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.pitch = 1.35; // friendly, enthusiastic hero pitch
//     utterance.rate = 0.95; // highly scannable speed for students
//     window.speechSynthesis.speak(utterance);
//   }
// }

function speakHeroText(text) {
  if (!window.speechSynthesis) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Natural male voice settings
  utterance.pitch = 0.9;
  utterance.rate = 0.9;
  utterance.volume = 1;
  utterance.lang = "en-US";

  const voices = speechSynthesis.getVoices();

  // Prefer male voices
  const maleVoice =
    voices.find(v => v.name.includes("Microsoft David")) ||
    voices.find(v => v.name.includes("Google UK English Male")) ||
    voices.find(v => v.name.includes("Daniel")) ||
    voices.find(v => v.name.includes("Alex")) ||
    voices.find(v => v.name.includes("Male")) ||
    voices.find(v => v.lang === "en-US");

  if (maleVoice) {
    utterance.voice = maleVoice;
  }

  speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

// 3. SUIT THEMES STYLE DESCRIPTOR
const SUIT_THEMES = {
  classic: {
    bgClass: 'bg-slate-900',
    textColor: 'text-amber-400',
    subText: 'Primary Comics Red',
    accentColor: 'bg-amber-400 text-slate-950 hover:bg-amber-300 border-amber-350',
    maskColor: '#DC2626',
    eyeFill: '#FFFFFF'
  },
  iron: {
    bgClass: 'bg-rose-950',
    textColor: 'text-amber-400',
    subText: 'Gold Core Armor',
    accentColor: 'bg-amber-400 text-rose-950 hover:bg-amber-300 border-amber-300',
    maskColor: '#991B1B',
    eyeFill: '#FBBF24'
  },
  stealth: {
    bgClass: 'bg-zinc-950',
    textColor: 'text-lime-400',
    subText: 'Neon Stealth Matrix',
    accentColor: 'bg-lime-500 text-slate-950 hover:bg-lime-400 border-lime-300',
    maskColor: '#18181B',
    eyeFill: '#84CC16'
  },
  cosmic: {
    bgClass: 'bg-violet-950',
    textColor: 'text-cyan-300',
    subText: 'Cosmic Star Web',
    accentColor: 'bg-cyan-400 text-violet-950 hover:bg-cyan-305 border-cyan-200',
    maskColor: '#5B21B6',
    eyeFill: '#22D3EE'
  }
};

// 4. ANIMATED WEB PARTICLES PHYSICS ENGINE
const particlesContainer = document.getElementById('particles-overlay');

function spawnExplosion(startX, startY) {
  const emojis = ['🕸️', '✨', '⭐', '💥', '🕸️', '🎯'];
  
  for (let i = 0; i < 16; i++) {
    const angle = (i * (360 / 16) * Math.PI) / 180;
    const speed = 4 + Math.random() * 8;
    const particle = {
      id: Math.random() + i,
      x: startX,
      y: startY,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: 20 + Math.random() * 25,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2, // lift bias
      rotation: Math.random() * 360,
      opacity: 1
    };
    gameState.particles.push(particle);
    
    // Create DOM element for particle
    const el = document.createElement('div');
    el.id = `p-${particle.id}`;
    el.className = 'absolute pointer-events-none select-none font-sans drop-shadow-xl z-50';
    el.innerText = particle.emoji;
    el.style.left = `${particle.x}px`;
    el.style.top = `${particle.y}px`;
    el.style.transform = `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.size / 30})`;
    el.style.opacity = `${particle.opacity}`;
    el.style.fontSize = `${particle.size}px`;
    particlesContainer.appendChild(el);
  }
}

// Particle Physics Loop (Runs at 60fps)
function updateParticles() {
  const toRemove = [];
  
  gameState.particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.25; // mild gravity pull
    p.rotation += 12;
    p.opacity -= 0.035;
    
    const el = document.getElementById(`p-${p.id}`);
    if (el) {
      if (p.opacity <= 0) {
        el.remove();
        toRemove.push(index);
      } else {
        el.style.left = `${p.x}px`;
        el.style.top = `${p.y}px`;
        el.style.transform = `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.size / 30})`;
        el.style.opacity = `${p.opacity}`;
      }
    } else {
      toRemove.push(index);
    }
  });
  
  // Clean arrays
  for (let idx = toRemove.length - 1; idx >= 0; idx--) {
    gameState.particles.splice(toRemove[idx], 1);
  }
  
  requestAnimationFrame(updateParticles);
}
requestAnimationFrame(updateParticles);

// 5. GAMESTATE HANDLERS
function startGame() {
  gameState.appState = 'gameplay';
  gameState.currentScenarioIndex = 0;
  gameState.badges = [];
  saveGameState();
  
  playSound('sense_tingle');
  speakHeroText("Welcome future heroic guardian! Tap the flashing spider-web buttons at any time to hear my Spidey Sense speak! Look at each visual challenge and select the correct helper card. Let's defend our core rights and duties together!");
  triggerTingleAnimation();
  render();
}

function replayVoice() {
  playSound('sense_tingle');
  triggerTingleAnimation();
  
  if (gameState.appState === 'gameplay' && gameState.currentScenarioIndex !== null) {
    const scenario = window.SCENARIOS[gameState.currentScenarioIndex];
    speakHeroText(scenario.voiceGuide);
  } else {
    speakHeroText("Welcome to the Spidey Civics Training Portal! Choose your superhero suit and tap the golden launch button to begin your missions!");
  }
}

function triggerTingleAnimation() {
  gameState.spideySenseTriggered = true;
  const mascot = document.getElementById('mascot-icon');
  if (mascot) {
    mascot.classList.add('animate-tingling');
    const tingleLabels = document.querySelectorAll('.tingle-indicator');
    tingleLabels.forEach(el => el.classList.remove('hidden'));
  }
  
  setTimeout(() => {
    gameState.spideySenseTriggered = false;
    const mascot = document.getElementById('mascot-icon');
    if (mascot) {
      mascot.classList.remove('animate-tingling');
      const tingleLabels = document.querySelectorAll('.tingle-indicator');
      tingleLabels.forEach(el => el.classList.add('hidden'));
    }
  }, 1200);
}

function changeSuit(suitId) {
  gameState.spideySuit = suitId;
  playSound('sense_tingle');
  
  const currentSuitObj = SUIT_THEMES[suitId];
  speakHeroText(`${suitId.charAt(0).toUpperCase() + suitId.slice(1)} Suit equipped!`);
  
  render();
}

function selectOption(isRightChoice, cardIndex, clickEvent) {
  const rect = clickEvent.currentTarget.getBoundingClientRect();
  const clickX = clickEvent.clientX || (rect.left + rect.width / 2);
  const clickY = clickEvent.clientY || (rect.top + rect.height / 2);
  
  spawnExplosion(clickX, clickY);

  if (isRightChoice) {
    playSound('web_shot');
    gameState.spideyActionState = 'shooting';
    gameState.wrongStreak = false;
    
    // Draw dynamic web lines targeting the chosen card visually!
    const svgWebOverlay = document.getElementById('web-vector-overlay');
    if (svgWebOverlay) {
      svgWebOverlay.innerHTML = '';
      
      // spidey mascot center point
      const spideyEl = document.getElementById('spidey-sense-trigger');
      if (spideyEl) {
        const smRect = spideyEl.getBoundingClientRect();
        const startX = smRect.left + smRect.width / 2;
        const startY = smRect.top + smRect.height / 2;
        
        // Midpoint and target point
        const targetX = rect.left + rect.width / 2;
        const targetY = rect.top + rect.height / 2;
        
        // Create line strand 1 (white bold animation)
        const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line1.setAttribute("x1", startX);
        line1.setAttribute("y1", startY);
        line1.setAttribute("x2", targetX);
        line1.setAttribute("y2", targetY);
        line1.setAttribute("stroke", "white");
        line1.setAttribute("stroke-width", "8");
        line1.setAttribute("stroke-linecap", "round");
        line1.setAttribute("class", "web-line-draw");
        
        // Create line strand 2 (contrast core grey)
        const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line2.setAttribute("x1", startX);
        line2.setAttribute("y1", startY);
        line2.setAttribute("x2", targetX);
        line2.setAttribute("y2", targetY);
        line2.setAttribute("stroke", "#e2e8f0");
        line2.setAttribute("stroke-width", "3");
        line2.setAttribute("stroke-linecap", "round");
        
        svgWebOverlay.appendChild(line1);
        svgWebOverlay.appendChild(line2);
      }
    }
    
    render();

    // After animation delay, proceed to victory and complete state Change!
    setTimeout(() => {
      playSound('epic_success');
      gameState.spideyActionState = 'celebrate';
      gameState.score += 15;
      
      const currentScenario = window.SCENARIOS[gameState.currentScenarioIndex];
      if (!gameState.badges.includes(currentScenario.badge)) {
        gameState.badges.push(currentScenario.badge);
      }
      
      saveGameState();
      speakHeroText(currentScenario.congratsVoice);
      
      gameState.appState = 'success_modal';
      
      // Clear web line overlay
      const svgWebOverlay = document.getElementById('web-vector-overlay');
      if (svgWebOverlay) svgWebOverlay.innerHTML = '';
      
      render();
    }, 1000);
    
  } else {
    // Wrong moral choice
    playSound('moral_buzz');
    gameState.spideyActionState = 'disapprove';
    gameState.wrongStreak = true;
    speakHeroText("Whoa! A true hero has strict principles. That option ignores vital civic integrity! Let's rethink this, hero!");
    
    render();
    
    setTimeout(() => {
      gameState.spideyActionState = 'idle';
      render();
    }, 1800);
  }
}

function nextScenario() {
  gameState.spideyActionState = 'idle';
  gameState.wrongStreak = false;
  
  if (gameState.currentScenarioIndex !== null && gameState.currentScenarioIndex < window.SCENARIOS.length - 1) {
    gameState.currentScenarioIndex += 1;
    gameState.appState = 'gameplay';
    render();
    
    // Play voice tingle guide for next scene
    setTimeout(() => {
      playSound('sense_tingle');
      triggerTingleAnimation();
      const nextScene = window.SCENARIOS[gameState.currentScenarioIndex];
      speakHeroText(nextScene.voiceGuide);
    }, 200);
  } else {
    // Game is fully solved!
    playSound('level_complete');
    speakHeroText(`Congratulations, ultimate citizens guardian! You finished all of Spidey's training missions! You accumulated ${gameState.score} points and secured a complete suit of civic badges! Always remember to keep protecting your country's values and rights! You are amazing!`);
    gameState.appState = 'game_over';
    render();
  }
}

function resetGame() {
  gameState.score = 0;
  gameState.badges = [];
  gameState.currentScenarioIndex = 0;
  gameState.appState = 'gameplay';
  gameState.spideyActionState = 'idle';
  gameState.wrongStreak = false;
  saveGameState();
  
  playSound('sense_tingle');
  triggerTingleAnimation();
  
  const currentScenario = window.SCENARIOS[0];
  speakHeroText(currentScenario.voiceGuide);
  
  render();
}

function saveGameState() {
  localStorage.setItem('spidey_score', gameState.score.toString());
  localStorage.setItem('spidey_badges', JSON.stringify(gameState.badges));
}

// 6. MASTER RENDER ENGINE (Writes dynamic state variables directly into HTML templates)
function render() {
  const root = document.getElementById('game-root');
  if (!root) return;
  
  // Set the main adaptive suit parent color styles dynamically
  const suitTheme = SUIT_THEMES[gameState.spideySuit];
  
  // Override outer body background color with dynamic suit theme color smoothly
  document.body.className = `${suitTheme.bgClass} halftone-bg transition-colors duration-500`;
  
  // Main viewport grid parent wrapper
  let html = `
    <div class="relative min-h-screen py-4 px-4 flex flex-col justify-between max-w-5xl mx-auto border-x-8 border-slate-800 transition-colors duration-500 bg-transparent">
  `;
  
  // --- A. HEADER NAVIGATION/COUNTERS BAR ---
  html += `
    <header class="bg-slate-950/90 rounded-2xl p-4 border-4 border-slate-800 shadow-xl relative z-40 flex flex-col md:flex-row gap-4 items-center justify-between transition-all">
      
      <!-- Spidey Mascot Speaker Button -->
      <button 
        onclick="replayVoice()" 
        id="spidey-sense-trigger"
        class="group relative flex items-center gap-3 active:scale-95 transition-all cursor-pointer border-none bg-transparent outline-none focus:outline-none"
      >
        <div class="relative w-16 h-16 rounded-full bg-slate-800 border-3 border-black flex items-center justify-center p-1 shadow-md hover:scale-105 transition-all">
        <img src="../Assets/SVG/Spidey logo.png" alt="Rights Shield">
`;

  // Draw eyes based on mascot mood
  if (gameState.spideyActionState === 'disapprove') {
    html += `
            <path d="M 20,40 L 44,48 L 40,58 Z" fill="${suitTheme.eyeFill}" stroke="#000" stroke-width="3" stroke-linejoin="miter" class="transition-all" />
            <path d="M 80,40 L 56,48 L 60,58 Z" fill="${suitTheme.eyeFill}" stroke="#000" stroke-width="3" stroke-linejoin="miter" class="transition-all" />
    `;
  } else if (gameState.spideyActionState === 'celebrate') {
    html += `
            <path d="M 16,36 Q 36,34 44,54 Q 32,60 16,36 Z" fill="${suitTheme.eyeFill}" stroke="#000" stroke-width="4.5" class="transition-all" />
            <path d="M 84,36 Q 64,34 56,54 Q 68,60 84,36 Z" fill="${suitTheme.eyeFill}" stroke="#000" stroke-width="4.5" class="transition-all" />
    `;
  } else {
    html += `
            <path d="M 15,35 L 45,48 L 38,60 Z" fill="${suitTheme.eyeFill}" stroke="#000" stroke-width="4.5" stroke-linejoin="round" class="transition-all" />
            <path d="M 85,35 L 55,48 L 62,60 Z" fill="${suitTheme.eyeFill}" stroke="#000" stroke-width="4.5" stroke-linejoin="round" class="transition-all" />
    `;
  }

  html += `
          </svg>
          
          <!-- Sense Lightning indicators -->
          <div class="tingle-indicator absolute -inset-4 flex justify-between pointer-events-none transform hidden">
            <span class="text-amber-400 text-xl font-bold animate-bounce">⚡</span>
            <span class="text-amber-400 text-xl font-bold animate-bounce">⚡</span>
          </div>
        </div>
        <div class="text-left hidden sm:block">
          <span class="font-comic text-2xl tracking-wide text-amber-400 comic-shadow">SPIDEY SENSE</span>
          <p class="text-[10px] text-zinc-150 uppercase tracking-widest font-mono font-bold block">TAP TO TALK GUIDELINE</p>
        </div>
      </button>
      
      <!-- Live Suit Customizer Theme Theme Selector -->
      <div class="bg-black/80 border-2 border-slate-800 rounded-xl px-3 py-1.5 flex flex-col items-center gap-1 shadow-md">
        <span class="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-bold">🕸️ SUITS (THEMES) 🕸️</span>
        <div class="flex gap-2">
  `;

  // Dynamic buttons for suit themes
  const suits = [
    { id: 'classic', color: 'bg-red-600 border-blue-600', name: 'Classic' },
    { id: 'iron', color: 'bg-rose-800 border-yellow-500', name: 'Nano Iron' },
    { id: 'stealth', color: 'bg-zinc-950 border-lime-500', name: 'Stealth' },
    { id: 'cosmic', color: 'bg-violet-950 border-cyan-400', name: 'Cosmic' }
  ];

  suits.forEach(suit => {
    const isEquipped = gameState.spideySuit === suit.id;
    html += `
      <button 
        onclick="changeSuit('${suit.id}')"
        class="group relative w-7 h-7 rounded-full border-2 cursor-pointer transition-all active:scale-90 flex items-center justify-center ${suit.color} ${isEquipped ? 'scale-125 ring-2 ring-amber-400 shadow-md shadow-amber-400/60' : 'opacity-60 hover:opacity-100'}"
        title="${suit.name}"
      >
        <span class="text-[9px] drop-shadow">🕷️</span>
      </button>
    `;
  });

  html += `
        </div>
        <span class="text-[9px] text-amber-300 font-mono text-center block uppercase tracking-wider">${suitTheme.subText}</span>
      </div>
      
      <!-- Badges shelves & score counter -->
      <div class="flex gap-4 items-center">
        <!-- Score -->
        <div class="bg-black border-3 border-black rounded-lg px-3 py-1 bg-slate-900 flex items-center gap-2 shadow-inner">
          <span class="text-amber-400 text-lg animate-bounce">⭐</span>
          <p class="font-mono text-xs font-bold uppercase text-zinc-400">SCORE: <span class="text-white font-black text-sm">${gameState.score}</span></p>
        </div>
        <!-- Progress badge shelf -->
        <div class="flex gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-slate-700 items-center">
          <span class="text-[10px] text-neutral-400 uppercase tracking-wider font-mono font-bold">BADGES:</span>
  `;

  if (gameState.badges.length === 0) {
    html += `<span class="text-[10px] text-zinc-500 font-mono">🔒 Empty Shelf</span>`;
  } else {
    gameState.badges.forEach(b => {
      html += `
        <span class="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs border border-amber-400 animate-pulse" title="Civic Badge">
          ${b}
        </span>
      `;
    });
  }

  html += `
        </div>
      </div>
    </header>
  `;

  // --- B. PLAYING STAGES / VIEW SWITCHER ---
  if (gameState.appState === 'onboarding') {
    
    // --- ONBOARDING STAGE ---
    html += `
      <main class="flex-1 flex flex-col items-center justify-center py-10 relative z-30">
        <div class="max-w-xl w-full text-center bg-slate-950/95 border-6 border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden comic-shadow">
          <!-- Geometric web design motif on box -->
          <div class="absolute inset-0 radial-dots-white opacity-10 pointer-events-none"></div>
          
          <div class="w-24 h-24 rounded-full bg-amber-400 border-4 border-slate-950 flex items-center justify-center mx-auto mb-4 animate-bounce shadow">
            <span class="text-5xl">🕸️</span>
          </div>
          
          <h1 class="font-comic text-4xl md:text-5xl text-amber-400 tracking-wider mb-2 comic-shadow">
            SPIDEY CIVICS GUARDIAN
          </h1>
          <h2 class="text-xs uppercase tracking-widest font-black text-rose-500 font-mono mb-6">
            Constitutional Rights & National Duties Training
          </h2>
          
          <div class="p-4 bg-slate-900/90 border-2 border-slate-800 rounded-xl text-left mb-6 font-sans text-sm leading-relaxed text-slate-300">
            <p class="mb-3">
              Greetings, fellow web-slinger! Spiderman here! Our city's greatest power does not come from radioactive spiders or web shooters—sheer safety and justice come from understanding our <strong>Fundamental Rights</strong> and <strong>Civic Duties</strong>!
            </p>
            <p class="mb-3">
              I've built <strong>8 interactive superhero training scenarios</strong> specifically for kids! Use your web shooting abilities to safeguard our public properties, defend equal rights, inclusion, historical monuments, and animal safety!
            </p>
            <p class="font-bold text-amber-300">
              ⚡ Shoot webs from our hand options directly onto the interactive duty challenge cards to complete your citizen quest!
            </p>
          </div>
          
          <button 
            onclick="startGame()"
            class="w-full py-4 px-6 rounded-2xl border-4 border-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-comic text-2xl uppercase tracking-widest hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all shadow-xl comic-shadow"
          >
            🕷️ Launch Training Portal 🕸️
          </button>
        </div>
      </main>
    `;
    
  } else if (gameState.appState === 'gameplay' && gameState.currentScenarioIndex !== null) {
    
    // --- ACTIVE GAMEPLAY STAGE ---
    const scene = window.SCENARIOS[gameState.currentScenarioIndex];
    
    html += `
      <main class="flex-1 flex flex-col justify-between py-6 relative z-30">
        
        <!-- Level progress header bar -->
        <div class="w-full flex justify-between bg-black/60 rounded-xl px-4 py-2 mb-4 border border-slate-800 items-center">
          <span class="font-mono text-xs uppercase tracking-wider text-pink-400 font-black">MISSION ${scene.id} of 8</span>
          <div class="flex gap-1">
    `;
    
    for (let i = 0; i < 8; i++) {
      const isDone = i < gameState.currentScenarioIndex;
      const isCur = i === gameState.currentScenarioIndex;
      html += `
        <div class="w-3 h-3 rounded-full border transition-all duration-300 ${
          isDone ? 'bg-amber-400 border-amber-500' : isCur ? 'bg-rose-500 border-white scale-125 animate-pulse' : 'bg-slate-800 border-slate-700'
        }"></div>
      `;
    }
    
    html += `
          </div>
        </div>

        <!-- TWO COLUMN LAYOUT: Interactive Hero Visual & Options Panels -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          <!-- Column A: Spiderman cartoon mascot panel & Target Node -->
          <section class="md:col-span-4 bg-slate-950/90 border-4 border-slate-905 rounded-2xl p-4 flex flex-col items-center justify-between relative overflow-hidden shadow-xl comic-shadow min-h-[300px]">
            <div class="absolute inset-0 radial-dots-white opacity-5 pointer-events-none"></div>
            
            <div class="w-full flex justify-between mb-4">
              <span class="bg-rose-600/20 text-spidey-accent border-2 border-rose-500/30 font-black rounded-lg text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider py-1">
                Active Scanner
              </span>
              <button onclick="replayVoice()" class="text-xs bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded px-2 py-1 flex items-center gap-1 cursor-pointer">
                🔊 Speak Guide
              </button>
            </div>
            
            <!-- Animated Hero Mascot Body Vector -->
            <div class="relative w-36 h-36 flex items-center justify-center select-none animate-floaty-spidey">
              
              <!-- Core Target Node box containing the scenario's Key Items -->
              <div class="absolute inset-0 border-4 border-dashed border-amber-400/40 rounded-full animate-spin duration-10000"></div>
              
              <div class="text-center z-10">
                <span class="text-4xl block animate-bounce" style="animation-duration: 2s;">🕷️</span>
                <div class="flex items-center justify-center gap-2 mt-1">
                  <span class="text-2xl">${scene.visualIllustration.backgroundEmoji}</span>
                  <span class="text-3xl font-bold animate-pulse">${scene.visualIllustration.targetEmoji}</span>
                </div>
                <div class="mt-2 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-xs text-amber-300 font-mono">
                  Target: ${scene.visualIllustration.keyItemEmoji}
                </div>
              </div>

            </div>

            <!-- Dynamic audio feedback guidance / Warning dialogue box -->
            <div class="mt-4 w-full p-2 text-center rounded-xl border-2 transition-all duration-300 ${gameState.wrongStreak ? 'bg-rose-950 border-rose-500/50 animate-shake' : 'bg-slate-900 border-slate-800'}">
              <p class="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">Spidey Scanner Log</p>
              <p class="text-xs font-bold ${gameState.wrongStreak ? 'text-rose-400' : 'text-slate-200'}">
                ${gameState.wrongStreak ? "Whoa! Stand clear of hazards! Shoot the right web path instead!" : "Shoot web at the right citizen assignment card!"}
              </p>
            </div>

          </section>

          <!-- Column B: The actual challenge choices panels -->
          <section class="md:col-span-8 flex flex-col justify-between gap-4">
            
            <!-- Question Spidey board bubble -->
            <div class="bg-amber-400 text-slate-950 rounded-2xl border-4 border-slate-950 p-4 relative shadow-lg">
              <div class="absolute bottom-[-15px] left-8 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-amber-400 border-r-[15px] border-r-transparent"></div>
              <p class="font-sans text-sm md:text-base font-extrabold leading-relaxed text-slate-950">
                ${scene.voiceGuide}
              </p>
            </div>
            
            <!-- Real Spider Web shot line effect overlay inside options -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
    `;
    
    // Draw choice buttons
    scene.options.forEach((option, idx) => {
      html += `
        <button 
          onclick="selectOption(${option.isRightChoice}, ${idx}, event)"
          class="group relative text-center p-4 md:p-6 border-6 border-slate-950 bg-slate-800 hover:bg-slate-750 rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-all outline-none min-h-[170px] flex flex-col justify-between overflow-hidden shadow-xl comic-shadow border-none"
        >
          <!-- Display big emoji inside screen -->
          <div class="flex-1 flex flex-col items-center justify-center p-2">
            <span class="text-5xl group-hover:scale-110 transition-transform duration-150">
              ${option.illustrativeEmoji}
            </span>
          </div>
          
          <div class="mt-3 w-full">
            <div class="w-full py-2 px-3 rounded-lg border-2 border-slate-950 font-comic text-lg md:text-xl uppercase tracking-widest flex items-center justify-center gap-1.5 shadow duration-150 transition-colors ${suitTheme.accentColor} font-bold">
              <span>🕸️ SHOOT WEB</span>
            </div>
          </div>
          
          <span class="absolute bottom-1 right-2 text-2xl opacity-5 font-sans">🕸️</span>
        </button>
      `;
    });
    
    html += `
            </div>
          </section>
        </div>
      </main>
    `;
    
  } else if (gameState.appState === 'success_modal') {
    
    // --- MORAL EXPLANATION MODAL STAGE ---
    const scene = window.SCENARIOS[gameState.currentScenarioIndex];
    
    html += `
      <main class="flex-1 flex flex-col items-center justify-center py-10 relative z-30">
        <div class="max-w-xl w-full text-center bg-slate-950/95 border-6 border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden comic-shadow">
          <div class="absolute inset-0 radial-dots-white opacity-10 pointer-events-none"></div>

          <div class="inline-flex gap-3 items-center justify-center mb-2">
            <span class="text-4xl animate-bounce">🕸️</span>
            <span class="bg-amber-400 text-slate-950 text-xs font-mono font-black py-1 px-3 rounded-full uppercase tracking-widest">
              WEB SHOT CONNECTED!
            </span>
            <span class="text-4xl animate-bounce">🕸️</span>
          </div>

          <h2 class="font-comic text-3xl md:text-4xl text-amber-400 tracking-wider mb-4 comic-shadow">
            SPECTACULAR CITIZEN ACTION!
          </h2>

          <div class="p-4 bg-slate-900 border-2 border-amber-400/40 rounded-xl mb-6 text-left">
            <p class="text-white text-sm md:text-base font-extrabold leading-relaxed mb-3">
              ${scene.congratsVoice}
            </p>
            <div class="mt-4 pt-4 border-t border-slate-800">
              <span class="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">Constitutional Insight</span>
              <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                Every spectacular citizen who cares for animals, avoids corruption, keeps parks safe, and protects constitutional values is part of our glorious democratic protective guard. You are changing our nation!
              </p>
            </div>
          </div>

          <button 
            onclick="nextScenario()"
            class="w-full py-4 px-6 rounded-2xl border-4 border-black bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-comic text-2xl uppercase tracking-widest hover:scale-[1.02] hover:brightness-115 active:scale-95 transition-all shadow-xl comic-shadow"
          >
            Advance to Next Mission ➡️
          </button>
        </div>
      </main>
    `;
    
  } else if (gameState.appState === 'game_over') {
    
    // --- GAME COMPLETED STAGE ---
    html += `
      <main class="flex-1 flex flex-col items-center justify-center py-10 relative z-30">
        <div class="max-w-xl w-full text-center bg-slate-950/95 border-6 border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden comic-shadow">
          <div class="absolute inset-0 radial-dots-white opacity-10 pointer-events-none"></div>

          <span class="text-6xl mb-2 block animate-pulse">🏆</span>
          
          <h1 class="font-comic text-3xl md:text-4xl text-amber-400 tracking-wider mb-2 comic-shadow">
            ULTIMATE CIVICS GUARDIAN
          </h1>
          <h2 class="text-xs uppercase tracking-widest font-black text-rose-500 font-mono mb-6">
            Spidey training camp fully graduated!
          </h2>

          <div class="mb-6 p-4 bg-slate-900 border-2 border-slate-800 rounded-xl">
            <span class="font-mono text-zinc-400 font-bold uppercase text-[10px] tracking-widest">FINAL SCORE RATING</span>
            <p class="text-5xl font-comic text-white mt-1">${gameState.score} POINTS</p>
            
            <div class="mt-4 pt-4 border-t border-slate-800">
              <span class="font-mono text-zinc-400 font-bold uppercase text-[10px] tracking-widest block mb-2">COMPLETE CIVIC BADGE CABINET</span>
              <div class="flex gap-2 justify-center flex-wrap">
    `;

    const shelfBadges = ["🌱", "🤝", "🏛️", "🗳️", "🎒", "🐾", "🚌", "🗣️"];
    shelfBadges.forEach(badge => {
      const isUnlocked = gameState.badges.includes(badge);
      html += `
        <div class="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all ${
          isUnlocked ? 'bg-slate-850 border-amber-400 scale-105 shadow-md shadow-amber-400/30' : 'bg-slate-900/60 border-slate-850 opacity-30 select-none'
        }" title="${isUnlocked ? 'Unlocked Badge' : 'Locked'}">
          ${isUnlocked ? badge : '🔒'}
        </div>
      `;
    });

    html += `
              </div>
            </div>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto mb-6">
            Spectacular job! You have acquired a rich armor of rights and protective duties. Spread the message, protect democracy, and assist your community!
          </p>

          <button 
            onclick="resetGame()"
            class="w-full py-4 px-6 rounded-2xl border-4 border-black bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-comic text-2xl uppercase tracking-widest hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all shadow-xl comic-shadow"
          >
            🔄 Restart Training Portal
          </button>
        </div>
      </main>
    `;
  }
  
  // // --- C. FOOTER CREDITS ---
  // html += `
  //   <footer class="mt-6 text-center text-[10px] text-zinc-400 font-mono select-none uppercase tracking-widest z-30">
  //     <p>Spidey Civics Portal • Built entirely in Plain HTML, CSS, and JS</p>
  //     <p class="mt-1 text-zinc-500">No frameworks • Instant Double-Click Local Playable Match</p>
  //   </footer>
  // `;
  
  // html += `</div>`; // closes adaptive parent wrap
  
  root.innerHTML = html;
}

// 7. INITIAL LAUNCH ROUTINE
window.addEventListener('DOMContentLoaded', () => {
  render();
});
