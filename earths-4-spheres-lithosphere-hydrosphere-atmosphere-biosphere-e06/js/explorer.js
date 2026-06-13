/* ==========================================================================
   Earth's Four Spheres - explorer.js (Learning Lab Logic)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initExplorerTabs();
  initActivity1();
  initActivity2();
  initActivity3();
});

/* ==========================================================================
   1. Tab Controller
   ========================================================================== */
function initExplorerTabs() {
  const tabs = document.querySelectorAll('.explorer-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetPanel = tab.dataset.panel;
      document.querySelectorAll('.activity-panel').forEach(panel => {
        panel.classList.remove('active');
      });
      document.getElementById(targetPanel).classList.add('active');
      
      // Stop speech and clear intervals if switching tabs
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      playTone(440, 0.1);
    });
  });
}

/* ==========================================================================
   2. Activity 1: Build Earth (Concentric Drag & Drop)
   ========================================================================== */
const buildEarthItems = {
  'item-land': 'zone-litho',
  'item-water': 'zone-hydro',
  'item-forest': 'zone-bio',
  'item-clouds': 'zone-atmo'
};

let placedCountAct1 = 0;

function initActivity1() {
  const draggables = document.querySelectorAll('.build-earth-layout .draggable-item');
  const zones = document.querySelectorAll('.ring-zone');

  draggables.forEach(item => {
    // Implement Pointer Dragging for unified mobile/desktop compatibility
    item.addEventListener('pointerdown', (e) => {
      if (item.classList.contains('placed')) return;
      startPointerDrag(item, e);
    });
  });
}

function startPointerDrag(item, event) {
  event.preventDefault();
  item.releasePointerCapture(event.pointerId);

  const rect = item.getBoundingClientRect();
  const shiftX = event.clientX - rect.left;
  const shiftY = event.clientY - rect.top;

  // Create a absolute clone for dragging representation
  const clone = item.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.zIndex = '2000';
  clone.style.opacity = '0.8';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  item.classList.add('dragging');

  // Highlight corresponding target zone
  const targetZoneId = buildEarthItems[item.id];
  const targetZone = document.getElementById(targetZoneId);
  if (targetZone) targetZone.style.border = '4px solid var(--warning)';

  function onPointerMove(e) {
    clone.style.left = `${e.clientX - shiftX}px`;
    clone.style.top = `${e.clientY - shiftY}px`;
    
    // Check if pointer is hovering over any zone
    const targetUnder = document.elementFromPoint(e.clientX, e.clientY);
    if (targetUnder) {
      const zoneUnder = targetUnder.closest('.ring-zone');
      zonesClearDragOver();
      if (zoneUnder) {
        zoneUnder.classList.add('drag-over');
      }
    }
  }

  function onPointerUp(e) {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    
    item.classList.remove('dragging');
    clone.remove();
    zonesClearDragOver();
    if (targetZone) targetZone.style.border = '';

    // Check where we dropped
    const targetUnder = document.elementFromPoint(e.clientX, e.clientY);
    if (targetUnder) {
      const zoneUnder = targetUnder.closest('.ring-zone');
      if (zoneUnder && zoneUnder.id === targetZoneId) {
        // Success Drop!
        item.classList.add('placed');
        zoneUnder.classList.add('success-filled');
        playTone(523.25, 0.2, 'sine'); // C5 tone
        createSparkleBurst(e.clientX, e.clientY);
        
        placedCountAct1++;
        checkActivity1Completion();
      } else {
        // Rejection / Fail Drop
        playTone(220, 0.25, 'sawtooth'); // lower buzz tone
      }
    }
  }

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function zonesClearDragOver() {
  document.querySelectorAll('.ring-zone').forEach(z => z.classList.remove('drag-over'));
}

function checkActivity1Completion() {
  if (placedCountAct1 === 4) {
    const statusBox = document.getElementById('act1-status');
    statusBox.innerHTML = `
      <div class="kids-info-box example" style="margin-top: 15px;">
        <span class="icon">🎉</span>
        <div>
          <h4 style="margin: 0;">
            <span class="lang-en">Earth Built Successfully!</span>
            <span class="lang-te">భూమిని విజయవంతంగా నిర్మించారు!</span>
          </h4>
          <p style="margin: 0; font-size: 0.95rem;">
            <span class="lang-en">Great job! You positioned the solid crust, the water bodies, the green biosphere, and the sky atmosphere perfectly.</span>
            <span class="lang-te">అద్భుతం! మీరు నేల, నీరు, ఆకుపచ్చని జీవావరణం మరియు ఆకాశాన్ని సరిగ్గా అమర్చారు.</span>
          </p>
        </div>
      </div>
    `;
    unlockBadge('earth_explorer');
  }
}

/* ==========================================================================
   3. Activity 2: Match Sphere Challenge
   ========================================================================== */
const matchPairs = {
  'match-fish': 'basket-hydro',
  'match-tree': 'basket-bio',
  'match-cloud': 'basket-atmo',
  'match-mountain': 'basket-litho',
  'match-worm': 'basket-bio',
  'match-rain': 'basket-hydro',
  'match-eagle': 'basket-atmo',
  'match-rock': 'basket-litho'
};

const matchLabels = {
  'match-fish': { en: "Fish 🐟", te: "చేప 🐟" },
  'match-tree': { en: "Tree 🌲", te: "చెట్టు 🌲" },
  'match-cloud': { en: "Cloud ☁️", te: "మేఘం ☁️" },
  'match-mountain': { en: "Mountain ⛰️", te: "పర్వతం ⛰️" },
  'match-worm': { en: "Worm 🪱", te: "పురుగు 🪱" },
  'match-rain': { en: "Rain 🌧️", te: "వర్షం 🌧️" },
  'match-eagle': { en: "Eagle 🦅", te: "డేగ 🦅" },
  'match-rock': { en: "Rock 🪨", te: "రాయి 🪨" }
};

let selectedMatchCard = null;
let placedCountAct2 = 0;

function initActivity2() {
  const objects = document.querySelectorAll('.match-object-card');
  const baskets = document.querySelectorAll('.match-basket');

  // Setup click-to-match fallback controls for maximum accessibility
  objects.forEach(obj => {
    obj.addEventListener('click', (e) => {
      objects.forEach(o => o.classList.remove('selected'));
      selectedMatchCard = obj;
      obj.classList.add('selected');
      playTone(330, 0.08);
      createSparkleBurst(e.clientX, e.clientY);
    });

    // Also support touch pointer dragging
    obj.addEventListener('pointerdown', (e) => {
      startMatchDrag(obj, e);
    });
  });

  baskets.forEach(basket => {
    basket.addEventListener('click', () => {
      if (selectedMatchCard) {
        attemptMatch(selectedMatchCard, basket);
      }
    });
  });
}

function startMatchDrag(obj, event) {
  event.preventDefault();
  obj.releasePointerCapture(event.pointerId);

  const rect = obj.getBoundingClientRect();
  const shiftX = event.clientX - rect.left;
  const shiftY = event.clientY - rect.top;

  const clone = obj.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.width = `${rect.width}px`;
  clone.style.height = `${rect.height}px`;
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.zIndex = '2000';
  clone.style.opacity = '0.8';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);

  obj.classList.add('dragging');

  function onPointerMove(e) {
    clone.style.left = `${e.clientX - shiftX}px`;
    clone.style.top = `${e.clientY - shiftY}px`;
  }

  function onPointerUp(e) {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    obj.classList.remove('dragging');
    clone.remove();

    const targetUnder = document.elementFromPoint(e.clientX, e.clientY);
    if (targetUnder) {
      const basketUnder = targetUnder.closest('.match-basket');
      if (basketUnder) {
        attemptMatch(obj, basketUnder, e.clientX, e.clientY);
      }
    }
  }

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function attemptMatch(card, basket, clientX, clientY) {
  const correctBasketId = matchPairs[card.id];
  if (basket.id === correctBasketId) {
    // Success Match!
    card.style.display = 'none'; // hide original card
    selectedMatchCard = null;

    // Append badge representation to basket contents container
    const contents = basket.querySelector('.basket-contents');
    const badge = document.createElement('span');
    badge.className = 'matched-item-badge';
    
    const label = matchLabels[card.id];
    badge.innerHTML = `
      <span class="lang-en">${label.en}</span>
      <span class="lang-te">${label.te}</span>
    `;
    contents.appendChild(badge);

    playTone(523.25, 0.2, 'sine');
    if (clientX && clientY) {
      createSparkleBurst(clientX, clientY);
    }
    
    placedCountAct2++;
    checkActivity2Completion();
  } else {
    // Fail Match
    playTone(220, 0.25, 'sawtooth');
    card.classList.remove('selected');
    selectedMatchCard = null;
  }
}

function checkActivity2Completion() {
  if (placedCountAct2 === 8) {
    const statusBox = document.getElementById('act2-status');
    statusBox.innerHTML = `
      <div class="kids-info-box example" style="margin-top: 15px;">
        <span class="icon">🎉</span>
        <div>
          <h4 style="margin: 0;">
            <span class="lang-en">Match Challenge Completed!</span>
            <span class="lang-te">జతపరచడం పూర్తయింది!</span>
          </h4>
          <p style="margin: 0; font-size: 0.95rem;">
            <span class="lang-en">Outstanding! You matched all the nature items to their correct spheres.</span>
            <span class="lang-te">అద్భుతం! మీరు ప్రకృతిలోని అన్ని వస్తువులను వాటి సరైన ఆవరణలతో సరిపోల్చారు.</span>
          </p>
        </div>
      </div>
    `;
    unlockBadge('earth_explorer');
  }
}

/* ==========================================================================
   4. Activity 3: Sphere Interaction Simulator
   ========================================================================== */
const simulatorScenarios = {
  rain: {
    title: { en: "Rain falls on Mountains 🌧️⛰️", te: "పర్వతాలపై కురుస్తున్న వర్షం 🌧️⛰️" },
    desc: {
      en: "<b>Hydrosphere ➔ Lithosphere:</b> Clouds (Atmosphere) condense water, releasing rain (Hydrosphere). The water runs down the rocky mountain (Lithosphere), washing nutrients into the soil and eroding rocks to shape valleys over thousands of years!",
      te: "<b>జలావరణం ➔ శిలావరణం:</b> వాతావరణంలోని మేఘాలు చల్లబడి వర్షాన్ని (జలావరణం) కురిపిస్తాయి. ఈ నీరు కొండలపై నుండి (శిలావరణం) ప్రవహిస్తూ, నేలలోకి పోషకాలను తెస్తుంది మరియు రాళ్ళను క్రమక్షయం చేస్తూ లోయలను ఏర్పరుస్తుంది!"
    }
  },
  grow: {
    title: { en: "Plants sprout in Soil 🌱🪨", te: "మట్టిలో మొలిచే మొక్కలు 🌱🪨" },
    desc: {
      en: "<b>Biosphere ➔ Lithosphere:</b> Seeds of green plants (Biosphere) settle in the rich, organic topsoil (Lithosphere). They grow roots downward to anchor themselves and absorb vital minerals and water, helping the plants stand tall!",
      te: "<b>జీవావరణం ➔ శిలావరణం:</b> మొక్కల గింజలు (జీవావరణం) సారవంతమైన మట్టిలో (శిలావరణం) నాటుకుంటాయి. అవి తమ వేర్లను లోతుగా పంపి ఖనిజాలు, నీటిని గ్రహిస్తాయి, తద్వారా మొక్కలు బలంగా ఎదుగుతాయి!"
    }
  },
  drink: {
    title: { en: "Animals drink Water 🦌🌊", te: "నీరు త్రాగుతున్న జంతువులు 🦌🌊" },
    desc: {
      en: "<b>Biosphere ➔ Hydrosphere:</b> Animals and living things (Biosphere) need hydration. Deer, birds, and insects travel to freshwater rivers and lakes (Hydrosphere) to drink. Water is essential for their cells to stay healthy and active!",
      te: "<b>జీవావరణం ➔ జలావరణం:</b> జంతువులు మరియు సమస్త జీవులకు (జీవావరణం) నీరు అవసరం. జింకలు, పక్షులు మరియు కీటకాలు నదులు లేదా చెరువుల (జలావరణం) వద్దకు వచ్చి నీటిని త్రాగుతాయి. జీవుల కణాలు ఆరోగ్యంగా ఉండటానికి నీరు చాలా ముఖ్యం!"
    }
  },
  wind: {
    title: { en: "Wind blows Sand & Leaves 🌬️🏜️", te: "ఇసుక, ఆకులను కదిలిస్తున్న గాలి 🌬️🏜️" },
    desc: {
      en: "<b>Atmosphere ➔ Lithosphere:</b> Strong winds (Atmosphere) sweep across dry plains. The moving air pushes sand dunes, creates sandstorms, and blows dry leaves, reshaping the face of the land (Lithosphere) over time.",
      te: "<b>వాతావరణం ➔ శిలావరణం:</b> బలమైన ఈదురు గాలులు (వాతావరణం) మైదానాలపై వీస్తాయి. ఈ కదిలే గాలి ఇసుక దిబ్బలను కదిలిస్తుంది మరియు ఆకులను ఎగరవేస్తూ కాలక్రమేణా నేల రూపాన్ని (శిలావరణం) మారుస్తుంది."
    }
  }
};

let simRainInterval = null;
let simLeafInterval = null;

function initActivity3() {
  // Populate initial simulator visuals
  resetSimScreen();
}

function resetSimScreen() {
  const screen = document.getElementById('sim-sandbox');
  screen.innerHTML = ""; // Clear
  
  // Set up a cute base landscape inside using inline SVG
  screen.innerHTML = `
    <svg class="sim-landscape-svg" viewBox="0 0 200 120" style="width:100%; height:100%;">
      <!-- Mountain base (Lithosphere) -->
      <polygon points="10,100 45,40 80,100" fill="#64748b" stroke="#475569" stroke-width="1" />
      <polygon points="38,52 45,40 52,52 45,49" fill="white" />
      
      <!-- Ground base (Lithosphere) -->
      <rect x="0" y="100" width="200" height="20" fill="#78350f" />
      <rect x="0" y="98" width="200" height="2" fill="#22c55e" />
      
      <!-- Lake/River (Hydrosphere) -->
      <path d="M120,100 Q150,96 180,102 T200,100 L200,120 L120,120 Z" fill="#0284c7" />

      <!-- Cloud (Atmosphere) -->
      <path d="M130,25 A5,5 0 0,1 138,21 A6,6 0 0,1 148,23 A5,5 0 0,1 142,30 H130 A3,3 0 0,1 130,25 Z" fill="white" opacity="0.9" />
    </svg>
    
    <!-- Deer entity hidden by default -->
    <div id="sim-deer" class="sim-graphic-element" style="font-size: 2.8rem; bottom: 12px; left: -60px; transition: left 1.5s ease-out;">🦌</div>
    <!-- Sprouting tree container -->
    <div id="sim-sprout-box" class="sim-graphic-element" style="bottom: 20px; left: 90px;"></div>
    <!-- Rain droplet overlay -->
    <div class="rain-overlay" id="sim-rain-overlay"></div>
  `;
}

function triggerInteraction(type) {
  // Reset previous scenario states and intervals
  resetSimScreen();
  clearInterval(simRainInterval);
  if (simLeafInterval) clearInterval(simLeafInterval);

  // Set active buttons
  document.querySelectorAll('.sim-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-sim-${type}`);
  if (activeBtn) activeBtn.classList.add('active');

  const titleEl = document.getElementById('sim-text-title');
  const descEl = document.getElementById('sim-text-desc');

  titleEl.innerHTML = `
    <span class="lang-en">${simulatorScenarios[type].title.en}</span>
    <span class="lang-te">${simulatorScenarios[type].title.te}</span>
  `;
  descEl.innerHTML = `
    <span class="lang-en">${simulatorScenarios[type].desc.en}</span>
    <span class="lang-te">${simulatorScenarios[type].desc.te}</span>
  `;

  // Start animations
  if (type === 'rain') {
    startSimRain();
    playTone(200, 0.4, 'sine');
  } else if (type === 'grow') {
    startSimGrow();
    playTone(392, 0.3, 'triangle');
  } else if (type === 'drink') {
    startSimDrink();
    playTone(329.63, 0.3, 'sine');
  } else if (type === 'wind') {
    startSimWind();
    playTone(293.66, 0.35, 'triangle');
  }

  // Record Explorer completion in local storage
  unlockBadge('earth_explorer');
}

// Scenario 1: Rain
function startSimRain() {
  const rainBox = document.getElementById('sim-rain-overlay');
  
  // Rain droplets falling
  simRainInterval = setInterval(() => {
    if (!rainBox.isConnected) return;
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${10 + Math.random() * 80}%`;
    drop.style.animationDuration = '0.5s';
    rainBox.appendChild(drop);
    setTimeout(() => drop.remove(), 600);
  }, 80);

  // Soft synth rain sound
  setTimeout(() => clearInterval(simRainInterval), 4000);
}

// Scenario 2: Sprout Growing
function startSimGrow() {
  const sproutBox = document.getElementById('sim-sprout-box');
  // Add a cute growing tree
  sproutBox.innerHTML = `<span class="growing-tree" style="display:inline-block; font-size:2.8rem; transform-origin:bottom center;">🌳</span>`;
}

// Scenario 3: Animal drinking water
function startSimDrink() {
  const deer = document.getElementById('sim-deer');
  const screen = document.getElementById('sim-sandbox');

  // Slide deer to the lake edge (left: 120px)
  setTimeout(() => {
    deer.style.left = '105px';
    // Deer drinking hearts
    setTimeout(() => {
      let count = 0;
      const heartInterval = setInterval(() => {
        if (count > 4) {
          clearInterval(heartInterval);
          return;
        }
        const heart = document.createElement('div');
        heart.className = 'heart-bubble';
        heart.textContent = '❤️';
        heart.style.left = '145px';
        heart.style.bottom = '45px';
        screen.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
        count++;
      }, 400);
    }, 1500);
  }, 100);
}

// Scenario 4: Wind blowing leaves
function startSimWind() {
  const screen = document.getElementById('sim-sandbox');
  
  // Spawn blowing wind lines and leaves
  let leavesCount = 0;
  simLeafInterval = setInterval(() => {
    if (leavesCount > 12) {
      clearInterval(simLeafInterval);
      return;
    }
    // Wind streaks
    const wind = document.createElement('div');
    wind.className = 'wind-particle';
    wind.style.top = `${20 + Math.random() * 60}%`;
    wind.style.setProperty('--time', '1.2s');
    wind.style.setProperty('--drift', `${-20 + Math.random() * 40}px`);
    screen.appendChild(wind);
    setTimeout(() => wind.remove(), 1500);

    // Leaves blowing
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    leaf.style.left = '0px';
    leaf.style.top = `${40 + Math.random() * 50}%`;
    leaf.style.setProperty('--time', '1.6s');
    leaf.style.setProperty('--drift', '20px');
    leaf.style.animationName = 'blow-wind'; // horizontal blowing path
    screen.appendChild(leaf);
    setTimeout(() => leaf.remove(), 1800);

    leavesCount++;
  }, 200);
}

/* ==========================================================================
   Synth Tone generator
   ========================================================================== */
function playTone(freq, duration, type = 'sine') {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}
