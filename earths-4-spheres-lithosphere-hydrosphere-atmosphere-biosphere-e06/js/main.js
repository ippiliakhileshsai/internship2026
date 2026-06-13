/* ==========================================================================
   Earth's Four Spheres - main.js (Global Navigation, Localization & TTS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  injectHeaderFooter();
  initProgressTracker();
  initTextToSpeech();
});

/* ==========================================================================
   1. Localization & Language System
   ========================================================================== */
function initLanguage() {
  // Check localStorage, default to English ('en')
  let currentLang = localStorage.getItem('earth_spheres_lang') || 'en';
  setLanguage(currentLang);
}

function setLanguage(lang) {
  localStorage.setItem('earth_spheres_lang', lang);
  
  if (lang === 'te') {
    document.body.classList.remove('lang-en');
    document.body.classList.add('lang-te');
  } else {
    document.body.classList.remove('lang-te');
    document.body.classList.add('lang-en');
  }

  // Update language switch controls if they exist in DOM
  const toggles = document.querySelectorAll('.lang-toggle-input');
  toggles.forEach(toggle => {
    toggle.checked = (lang === 'te');
  });

  // Stop any reading in progress when switching language
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    updateTTSWidgetState(false, false);
  }
}

window.toggleLanguage = function() {
  const currentLang = localStorage.getItem('earth_spheres_lang') === 'te' ? 'en' : 'te';
  setLanguage(currentLang);
};

/* ==========================================================================
   2. UI Header & Footer Injection
   ========================================================================== */
function injectHeaderFooter() {
  const activePage = document.body.dataset.page || 'home';

  // Inject Header
  const headerHtml = `
    <a href="index.html" class="logo-container">
      <svg class="logo-img" viewBox="0 0 100 100" width="48" height="48">
        <!-- Cute Earth Cartoon SVG -->
        <circle cx="50" cy="50" r="45" fill="#52B2CF" />
        <path d="M25,30 Q35,25 45,35 T60,25 T75,35 T85,30" fill="none" stroke="#2D6A4F" stroke-width="8" stroke-linecap="round" />
        <path d="M15,60 Q35,55 50,65 T80,55" fill="none" stroke="#2D6A4F" stroke-width="8" stroke-linecap="round" />
        <path d="M30,80 Q50,75 70,80" fill="none" stroke="#2D6A4F" stroke-width="8" stroke-linecap="round" />
        <circle cx="38" cy="42" r="4" fill="#1e293b" />
        <circle cx="62" cy="42" r="4" fill="#1e293b" />
        <path d="M44,48 Q50,54 56,48" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" />
      </svg>
      <span class="logo-text">
        <span class="lang-en">Earth's Spheres</span>
        <span class="lang-te">భూమి ఆవరణాలు</span>
      </span>
    </a>

    <button class="menu-toggle" aria-label="Toggle Menu" onclick="toggleMobileMenu()">☰</button>

    <nav class="nav-bar">
      <ul class="nav-links" id="nav-links">
        <li>
          <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">
            <span class="lang-en">Home</span>
            <span class="lang-te">హోమ్</span>
          </a>
        </li>
        <li>
          <a href="lithosphere.html" class="${activePage === 'lithosphere' ? 'active' : ''}">
            <span class="lang-en">Lithosphere</span>
            <span class="lang-te">శిలావరణం</span>
          </a>
        </li>
        <li>
          <a href="hydrosphere.html" class="${activePage === 'hydrosphere' ? 'active' : ''}">
            <span class="lang-en">Hydrosphere</span>
            <span class="lang-te">జలావరణం</span>
          </a>
        </li>
        <li>
          <a href="atmosphere.html" class="${activePage === 'atmosphere' ? 'active' : ''}">
            <span class="lang-en">Atmosphere</span>
            <span class="lang-te">వాతావరణం</span>
          </a>
        </li>
        <li>
          <a href="biosphere.html" class="${activePage === 'biosphere' ? 'active' : ''}">
            <span class="lang-en">Biosphere</span>
            <span class="lang-te">జీవావరణం</span>
          </a>
        </li>
        <li>
          <a href="explorer.html" class="${activePage === 'explorer' ? 'active' : ''}">
            <span class="lang-en">Earth Explorer</span>
            <span class="lang-te">భూమి ఎక్స్‌ప్లోరర్</span>
          </a>
        </li>
        <li>
          <a href="quiz.html" class="${activePage === 'quiz' ? 'active' : ''}">
            <span class="lang-en">Quiz</span>
            <span class="lang-te">క్విజ్</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="header-actions">
      <!-- Bilingual Toggle Switch -->
      <label class="lang-toggle" aria-label="Switch language to Telugu or English">
        <input type="checkbox" class="lang-toggle-input" onchange="toggleLanguage()">
        <span class="lang-slider">
          <span class="lang-label-en">EN</span>
          <span class="lang-label-te">తె</span>
        </span>
      </label>
    </div>
  `;

  // Create header tag and insert before container
  const header = document.createElement('header');
  header.className = 'app-header';
  header.innerHTML = headerHtml;
  document.body.insertBefore(header, document.body.firstChild);

  // Inject Footer
  const footerHtml = `
    <div class="footer-content">
      <p class="lang-en">&copy; 2026 Earth's Four Spheres Interactive Learning Platform. Made with 🌍 for young scientists.</p>
      <p class="lang-te">&copy; 2026 భూమి యొక్క నాలుగు ఆవరణాల ఇంటరాక్టివ్ లెర్నింగ్ ప్లాట్‌ఫారమ్. యువ శాస్త్రవేత్తల కోసం 🌍 తో తయారు చేయబడింది.</p>
    </div>
  `;
  const footer = document.createElement('footer');
  footer.className = 'app-footer';
  footer.innerHTML = footerHtml;
  document.body.appendChild(footer);

  // Inject Text-to-Speech Widget if it is a lesson page (litho, hydro, atmo, bio, or home)
  if (['home', 'lithosphere', 'hydrosphere', 'atmosphere', 'biosphere'].includes(activePage)) {
    injectTTSWidget();
  }

  // Inject Globe-E Mascot Guide on all pages
  injectMascotWidget(activePage);
}

window.toggleMobileMenu = function() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('active');
};

/* ==========================================================================
   3. LocalStorage Progress & Achievement System
   ========================================================================= */
function initProgressTracker() {
  if (!localStorage.getItem('earth_spheres_lessons')) {
    localStorage.setItem('earth_spheres_lessons', JSON.stringify([]));
  }
  if (!localStorage.getItem('earth_spheres_badges')) {
    localStorage.setItem('earth_spheres_badges', JSON.stringify([]));
  }
  
  // Track active page completion
  const activePage = document.body.dataset.page;
  if (['lithosphere', 'hydrosphere', 'atmosphere', 'biosphere'].includes(activePage)) {
    markLessonCompleted(activePage);
  }

  // Hook home page badge cards for kid micro-interactions
  if (activePage === 'home') {
    setTimeout(initBadgeClickWiggles, 800);
  }
}

function markLessonCompleted(lessonId) {
  let completed = JSON.parse(localStorage.getItem('earth_spheres_lessons') || '[]');
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
    localStorage.setItem('earth_spheres_lessons', JSON.stringify(completed));
  }
  
  // Check if all four lessons are completed to unlock specialized Master Badges
  unlockBadge(`${lessonId}_master`);
}

function unlockBadge(badgeId) {
  let badges = JSON.parse(localStorage.getItem('earth_spheres_badges') || '[]');
  if (!badges.includes(badgeId)) {
    badges.push(badgeId);
    localStorage.setItem('earth_spheres_badges', JSON.stringify(badges));
    showBadgeUnlockNotification(badgeId);
  }
}

window.getStudentProgress = function() {
  const completed = JSON.parse(localStorage.getItem('earth_spheres_lessons') || '[]');
  const badges = JSON.parse(localStorage.getItem('earth_spheres_badges') || '[]');
  const score = localStorage.getItem('earth_spheres_quiz_score') || null;
  return {
    completedCount: completed.length,
    completedLessons: completed,
    badges: badges,
    quizScore: score
  };
};

function showBadgeUnlockNotification(badgeId) {
  // Map badge names to child-friendly titles
  const badgeTitles = {
    'lithosphere_master': { en: 'Lithosphere Master! ⛰️', te: 'శిలావరణ విజేత! ⛰️' },
    'hydrosphere_master': { en: 'Hydrosphere Master! 🌊', te: 'జలావరణ విజేత! 🌊' },
    'atmosphere_master': { en: 'Atmosphere Master! ☁️', te: 'వాతావరణ విజేత! ☁️' },
    'biosphere_master': { en: 'Biosphere Master! 🌲', te: 'జీవావరణ విజేత! 🌲' },
    'earth_explorer': { en: 'Earth Explorer! 🚀', te: 'భూమి అన్వేషకుడు! 🚀' },
    'quiz_champion': { en: 'Quiz Champion! 🏆', te: 'క్విజ్ విజేత! 🏆' }
  };

  const title = badgeTitles[badgeId] || { en: 'New Badge Unlocked!', te: 'కొత్త బ్యాడ్జ్ అన్‌లాక్ అయింది!' };
  
  // Create an animated popup toast
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '90px';
  toast.style.left = '24px';
  toast.style.backgroundColor = 'var(--bg-card)';
  toast.style.border = '3px solid var(--success)';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.borderRadius = '20px';
  toast.style.padding = '16px 24px';
  toast.style.zIndex = '2000';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '12px';
  toast.style.animation = 'slide-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
  toast.style.cursor = 'pointer';

  toast.innerHTML = `
    <span style="font-size: 2.2rem;">🎉</span>
    <div>
      <h4 style="margin:0; font-family:var(--font-header); font-size:1.1rem; color:var(--success);">
        <span class="lang-en">Achievement Unlocked!</span>
        <span class="lang-te">సాధన అన్‌లాక్ అయింది!</span>
      </h4>
      <p style="margin:0; font-size:0.95rem; font-weight:700; color:var(--text-dark);">
        <span class="lang-en">${title.en}</span>
        <span class="lang-te">${title.te}</span>
      </p>
    </div>
  `;

  document.body.appendChild(toast);

  // Play a tiny happy sound via web audio if possible
  playBadgeSound();

  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.style.animation = 'slide-down 0.5s ease-in forwards';
    setTimeout(() => toast.remove(), 500);
  }, 5000);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.remove();
  });
}

function playBadgeSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + index * 0.1);
      osc.stop(audioCtx.currentTime + index * 0.1 + 0.4);
    });
  } catch (e) {
    console.log("Audio not supported or allowed yet.");
  }
}

// Add CSS keyframes dynamically for notifications
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes slide-up {
    from { transform: translateY(150px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slide-down {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(150px); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);


/* ==========================================================================
   4. Text-To-Speech (TTS) Engine
   ========================================================================== */
let speechUtterance = null;
let isSpeaking = false;
let isPaused = false;

function injectTTSWidget() {
  const ttsHtml = `
    <div class="tts-title">
      <span>🔊</span>
      <span class="lang-en">Narrator</span>
      <span class="lang-te">వివరణకారి</span>
    </div>
    <button class="tts-btn" id="tts-play" title="Play / Pause" aria-label="Play or Pause text reading">▶</button>
    <button class="tts-btn" id="tts-stop" title="Stop" aria-label="Stop reading">■</button>
    <div class="tts-visualizer">
      <div class="tts-bar"></div>
      <div class="tts-bar"></div>
      <div class="tts-bar"></div>
    </div>
  `;
  
  const widget = document.createElement('div');
  widget.className = 'tts-widget';
  widget.id = 'tts-widget';
  widget.innerHTML = ttsHtml;
  document.body.appendChild(widget);
}

function initTextToSpeech() {
  if (!window.speechSynthesis) {
    const widget = document.getElementById('tts-widget');
    if (widget) widget.style.display = 'none'; // Hide if not supported
    return;
  }

  const playBtn = document.getElementById('tts-play');
  const stopBtn = document.getElementById('tts-stop');

  if (playBtn && stopBtn) {
    playBtn.addEventListener('click', () => {
      if (isSpeaking) {
        if (isPaused) {
          window.speechSynthesis.resume();
          isPaused = false;
          updateTTSWidgetState(true, false);
        } else {
          window.speechSynthesis.pause();
          isPaused = true;
          updateTTSWidgetState(true, true);
        }
      } else {
        startReading();
      }
    });

    stopBtn.addEventListener('click', () => {
      stopReading();
    });
  }
}

function stopReading() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    isPaused = false;
    updateTTSWidgetState(false, false);
  }
}

function updateTTSWidgetState(playing, paused) {
  const widget = document.getElementById('tts-widget');
  const playBtn = document.getElementById('tts-play');
  if (!widget || !playBtn) return;

  if (playing) {
    widget.classList.add('playing');
    if (paused) {
      widget.classList.remove('playing');
      playBtn.textContent = '▶';
    } else {
      playBtn.textContent = '⏸';
    }
  } else {
    widget.classList.remove('playing');
    playBtn.textContent = '▶';
  }
}

function startReading() {
  // Collect all text from read-aloud sections
  const readContainer = document.querySelector('.read-aloud-section') || document.querySelector('main');
  if (!readContainer) return;

  const text = getVisibleText(readContainer);
  if (!text) return;

  const activeLang = localStorage.getItem('earth_spheres_lang') || 'en';

  speechUtterance = new SpeechSynthesisUtterance(text);
  
  // Try to find matching voice
  const voices = window.speechSynthesis.getVoices();
  let selectedVoice = null;

  if (activeLang === 'te') {
    // Search for Telugu voice
    selectedVoice = voices.find(v => v.lang.startsWith('te'));
    speechUtterance.rate = 0.85; // Read Telugu slightly slower for clarity
  } else {
    // Search for English voice
    selectedVoice = voices.find(v => v.lang.startsWith('en-US')) || 
                    voices.find(v => v.lang.startsWith('en'));
    speechUtterance.rate = 0.95;
  }

  if (selectedVoice) {
    speechUtterance.voice = selectedVoice;
  }

  speechUtterance.onstart = () => {
    isSpeaking = true;
    isPaused = false;
    updateTTSWidgetState(true, false);
  };

  speechUtterance.onend = () => {
    isSpeaking = false;
    isPaused = false;
    updateTTSWidgetState(false, false);
  };

  speechUtterance.onerror = (e) => {
    console.error("Speech Synthesis Error:", e);
    isSpeaking = false;
    isPaused = false;
    updateTTSWidgetState(false, false);
  };

  window.speechSynthesis.speak(speechUtterance);
}

// Extract only visible text (ignoring language spans that are hidden)
function getVisibleText(container) {
  let textList = [];
  
  // Find all elements containing text inside read-aloud sections
  const selectors = '.read-aloud, h1, h2, h3, p, li, td, th';
  const elements = container.querySelectorAll(selectors);

  elements.forEach(el => {
    // Check if the element is visible
    const style = window.getComputedStyle(el);
    if (style.display !== 'none' && style.visibility !== 'hidden' && el.offsetHeight > 0) {
      
      // If the element contains language-specific spans, check their visibility
      const children = el.children;
      if (children.length > 0) {
        let spanText = "";
        for (let i = 0; i < children.length; i++) {
          const childStyle = window.getComputedStyle(children[i]);
          if (childStyle.display !== 'none' && childStyle.visibility !== 'hidden') {
            spanText += children[i].textContent.trim() + " ";
          }
        }
        if (spanText.trim().length > 0) {
          textList.push(spanText.trim());
        } else {
          // If no specific visible child, check text directly without hidden children
          let cleanText = el.innerText || el.textContent;
          textList.push(cleanText.trim());
        }
      } else {
        textList.push(el.textContent.trim());
      }
    }
  });

  return textList.join('. ').replace(/\.\.+/g, '.');
}


/* ==========================================================================
   5. Globe-E Mascot & Trivia Engine
   ========================================================================== */
const mascotTrivia = {
  home: [
    { en: "Hi! I'm Globe-E, your science guide! 🌍 Click a card below to start, or test your skills in the Explorer Lab!", te: "హాయ్! నేను గ్లోబ్-ఈ, మీ సైన్స్ గైడ్! 🌍 అన్వేషణను ప్రారంభించడానికి కింద ఉన్న కార్డుపై క్లిక్ చేయండి!" },
    { en: "Did you know? Our planet is the only place in the universe known to host life. Let's protect it! 🌲", te: "మీకు తెలుసా? విశ్వంలో జీవం ఉన్నట్లు తెలిసిన ఏకైక ప్రదేశం మన భూగ్రహమే. దీన్ని కాపాడుకుందాం! 🌲" }
  ],
  lithosphere: [
    { en: "The crust we walk on is as thin as the skin on an apple compared to the whole Earth! 🍎", te: "భూమి యొక్క సైజుతో పోలిస్తే మనం నడిచే క్రస్ట్ పొర ఆపిల్ పండు పై తొక్క అంత సన్నగా ఉంటుంది! 🍎" },
    { en: "Magma is hot liquid rock inside the Earth. When it erupts out of a volcano, we call it lava! 🌋", te: "శిలాద్రవం (Magma) అనేది భూమి లోపల ఉండే వేడి ద్రవ రాయి. అది బయటకు వచ్చినప్పుడు దాన్ని లావా అంటాము! 🌋" }
  ],
  hydrosphere: [
    { en: "Water is a shape-shifter! It evaporates as gas, condenses as clouds, and precipitates as rain! 🌧️", te: "నీరు రూపాలు మారుస్తుంది! అది ఆవిరిగా మారి, మేఘాలుగా సాంద్రీకరించి, వర్షంగా కురుస్తుంది! 🌧️" },
    { en: "Dinosaurs drank the exact same water we drink today! The water cycle keeps recycling it forever! 🦕", te: "ఈ రోజు మనం తాగే నీటిని ఒకప్పుడు డైనోసార్‌లు తాగాయి! నీటి చక్రం దాన్ని నిరంతరం శుద్ధి చేస్తుంది! 🦕" }
  ],
  atmosphere: [
    { en: "Jet planes fly in the Stratosphere because it's smooth and has no clouds to cause bumps! ✈️", te: "స్ట్రాటోవరణంలో మేఘాలు ఉండవు కాబట్టి జెట్ విమానాలు అక్కడ ఎగరడానికి ఇష్టపడతాయి! ✈️" },
    { en: "Meteors burn up in the cold Mesosphere, creating glowing streaks we call shooting stars! ☄️", te: "మీసోవరణంలో అంతరిక్ష శిలలు మండిపోతాయి. వాటినే మనం తోకచుక్కలు (shooting stars) అంటాము! ☄️" }
  ],
  biosphere: [
    { en: "Plants are green heroes! They use sunlight to make food and release fresh oxygen for us to breathe! 🌿", te: "మొక్కలు ఆకుపచ్చని హీరోలు! అవి సూర్యకాంతితో ఆహారాన్ని తయారుచేస్తూ మనకు ఆక్సిజన్ ఇస్తాయి! 🌿" },
    { en: "Decomposers like mushrooms clean up nature by recycling dead leaves back into rich soil! 🍄", te: "పుట్టగొడుగుల వంటి విచ్ఛిన్నకారులు కుళ్ళిన ఆకులను తిరిగి మట్టిలో కలిపి ప్రకృతిని శుభ్రపరుస్తాయి! 🍄" }
  ],
  explorer: [
    { en: "Welcome to the Lab! Try building the Earth by dragging layers, or test the interaction simulator! 🚀", te: "ల్యాబ్‌కు స్వాగతం! పొరలను లాగి భూమిని నిర్మించండి, లేదా సిమ్యులేటర్ పరీక్షించండి! 🚀" },
    { en: "In the matching game, you can click an item first, and then click its correct basket! Try it! 🎯", te: "జతపరిచే ఆటలో, మొదట వస్తువుపై క్లిక్ చేసి ఆ తర్వాత బుట్టపై క్లిక్ చేయవచ్చు! ప్రయత్నించండి! 🎯" }
  ],
  quiz: [
    { en: "You can do it, Cadet! Take your time, read each question carefully, and think about the spheres! 🏆", te: "మీరు చేయగలరు, క్యాడెట్! నిదానంగా ప్రశ్నను చదివి, ఆవరణల గురించి ఆలోచించి జవాబు చెప్పండి! 🏆" }
  ],
  'quiz-results': [
    { en: "Wow! What an adventure. Check your score and click 'Review Answers' to see explanations! 🏆", te: "వావ్! ఎంతటి గొప్ప ప్రయాణం. మీ స్కోరును చూసి, వివరణల కోసం 'సమాధానాలు సమీక్షించు' క్లిక్ చేయండి! 🏆" }
  ]
};

function injectMascotWidget(activePage) {
  // Avoid injecting inside results if not needed, but good to have everywhere
  const pageKey = activePage;
  if (!mascotTrivia[pageKey]) return;

  const mascotHtml = `
    <div class="mascot-avatar" id="mascot-clicker" onclick="triggerMascotSpeech(event)" title="Click Globe-E for Trivia!">
      <svg viewBox="0 0 100 100" width="55" height="55">
        <circle cx="50" cy="50" r="45" fill="#38bdf8" />
        <!-- Continents -->
        <path d="M25,32 Q32,25 45,35 T60,25 T75,35 T85,32 T80,48 Q70,45 60,55 T35,50 Z" fill="#22c55e" />
        <path d="M15,62 Q30,57 45,67 T70,57 T82,72" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round" />
        <!-- Face -->
        <circle cx="38" cy="46" r="4.5" fill="#0f172a" />
        <circle cx="62" cy="46" r="4.5" fill="#0f172a" />
        <path d="M46,55 Q50,61 54,55" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round" />
        <circle cx="31" cy="53" r="3.5" fill="#ff8fa3" opacity="0.8" />
        <circle cx="69" cy="53" r="3.5" fill="#ff8fa3" opacity="0.8" />
        <!-- Astronaut Hat -->
        <path d="M30,18 Q50,2 70,18" fill="none" stroke="#6c5ce7" stroke-width="5" stroke-linecap="round" />
        <circle cx="50" cy="5" r="4" fill="#ff9f43" />
      </svg>
    </div>
    <div class="mascot-bubble" id="mascot-bubble">
      <button class="mascot-close" onclick="closeMascotBubble(event)">×</button>
      <span id="mascot-speech-text"></span>
    </div>
  `;

  const widget = document.createElement('div');
  widget.className = 'mascot-widget';
  widget.id = 'mascot-widget';
  widget.innerHTML = mascotHtml;
  document.body.appendChild(widget);

  // Auto-greet after 1.5 seconds
  setTimeout(() => {
    showMascotLine(pageKey, 0);
  }, 1500);
}

let mascotBubbleTimer = null;

function showMascotLine(pageKey, index) {
  const widget = document.getElementById('mascot-widget');
  const bubble = document.getElementById('mascot-bubble');
  const textEl = document.getElementById('mascot-speech-text');

  if (!widget || !bubble || !textEl) return;

  const lines = mascotTrivia[pageKey];
  if (!lines || lines.length === 0) return;

  const lineIndex = index % lines.length;
  const line = lines[lineIndex];

  // Store index in widget dataset to rotate next time
  widget.dataset.dialogIndex = lineIndex;

  textEl.innerHTML = `
    <span class="lang-en">${line.en}</span>
    <span class="lang-te">${line.te}</span>
  `;

  widget.classList.add('talking');
  
  // Play tiny bubble pop sound
  playMascotPopSound();

  // Auto close speech bubble after 8 seconds
  clearTimeout(mascotBubbleTimer);
  mascotBubbleTimer = setTimeout(() => {
    widget.classList.remove('talking');
  }, 8000);
}

window.triggerMascotSpeech = function(event) {
  const widget = document.getElementById('mascot-widget');
  if (!widget) return;

  // Wiggle avatar
  const avatar = document.getElementById('mascot-clicker');
  avatar.style.transform = 'scale(1.2) rotate(15deg)';
  setTimeout(() => {
    avatar.style.transform = '';
  }, 300);

  // Rotate dialog
  const activePage = document.body.dataset.page || 'home';
  const lastIndex = parseInt(widget.dataset.dialogIndex || '0');
  
  // Create click sparkles
  if (event && window.createSparkleBurst) {
    createSparkleBurst(event.clientX, event.clientY);
  }

  showMascotLine(activePage, lastIndex + 1);
};

window.closeMascotBubble = function(event) {
  if (event) event.stopPropagation();
  const widget = document.getElementById('mascot-widget');
  if (widget) {
    widget.classList.remove('talking');
  }
};

function playMascotPopSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
}

/* ==========================================================================
   6. Dashboard Badge Wiggles & Dialogue feedback
   ========================================================================== */
function initBadgeClickWiggles() {
  const badges = document.querySelectorAll('.badge-card');
  const widget = document.getElementById('mascot-widget');
  const bubble = document.getElementById('mascot-bubble');
  const textEl = document.getElementById('mascot-speech-text');

  badges.forEach(badge => {
    badge.addEventListener('click', (event) => {
      // Check if unlocked
      if (!badge.classList.contains('unlocked')) {
        // Locked badge click
        playTone(180, 0.2, 'sawtooth');
        showMascotCustomSpeech({
          en: "Keep studying to unlock this badge! Complete lessons or activities! 🔒",
          te: "ఈ బ్యాడ్జ్‌ను అన్‌లాక్ చేయడానికి ఇంకా చదవండి! పాఠాలు లేదా ఆటలను పూర్తి చేయండి! 🔒"
        });
        return;
      }

      // Wiggle badge
      badge.classList.add('wiggling');
      playTone(587.33, 0.2, 'sine'); // D5 note
      if (window.createSparkleBurst) {
        createSparkleBurst(event.clientX, event.clientY);
      }

      setTimeout(() => {
        badge.classList.remove('wiggling');
      }, 1000);

      // Globe-E special praise!
      const badgeId = badge.id.replace('badge-', '');
      const badgePraise = {
        'lithosphere_master': { en: "Wow! You are a Lithosphere Master! You know rocks, crust layers, and mountains! ⛰️", te: "వావ్! మీరు శిలావరణ విజేత! మీకు రాళ్ళు, పొరలు మరియు పర్వతాల గురించి బాగా తెలుసు! ⛰️" },
        'hydrosphere_master': { en: "Superb! As a Hydrosphere Master, oceans, rivers, and the water cycle are your domain! 🌊", te: "అద్భుతం! జలావరణ విజేతగా, మహాసముద్రాలు మరియు నదులపై మీకు పూర్తి పట్టు ఉంది! 🌊" },
        'atmosphere_master': { en: "Great flight! Atmosphere Master! You understand clouds, winds, and sky layers! ☁️", te: "మంచి ప్రయాణం! వాతావరణ విజేత! మీకు మేఘాలు, గాలులు మరియు వాతావరణంపై అవగాహన ఉంది! ☁️" },
        'biosphere_master': { en: "Lush work! Biosphere Master! You know all about ecosystems and animal food chains! 🌲", te: "పచ్చని విజయం! జీవావరణ విజేత! మీకు పర్యావరణ వ్యవస్థలు మరియు ఆహార గొలుసులు తెలుసు! 🌲" },
        'earth_explorer': { en: "Space Cadet Explorer! You built Earth and solved interaction sims in the Lab! 🚀", te: "స్పేస్ క్యాడెట్ అన్వేషకుడు! మీరు భూమిని నిర్మించారు మరియు సిమ్యులేటర్లను పూర్తి చేశారు! 🚀" },
        'quiz_champion': { en: "Bow down! You are the Quiz Champion! A perfect 100% score on the Quest! 🏆", te: "నమస్కారం! మీరే క్విజ్ విజేత! క్విజ్‌లో 100% పరిపూర్ణ స్కోర్ సాధించారు! 🏆" }
      };

      if (badgePraise[badgeId]) {
        showMascotCustomSpeech(badgePraise[badgeId]);
      }
    });
  });
}

function showMascotCustomSpeech(speech) {
  const widget = document.getElementById('mascot-widget');
  const bubble = document.getElementById('mascot-bubble');
  const textEl = document.getElementById('mascot-speech-text');

  if (!widget || !bubble || !textEl) return;

  textEl.innerHTML = `
    <span class="lang-en">${speech.en}</span>
    <span class="lang-te">${speech.te}</span>
  `;

  widget.classList.add('talking');
  playMascotPopSound();

  clearTimeout(mascotBubbleTimer);
  mascotBubbleTimer = setTimeout(() => {
    widget.classList.remove('talking');
  }, 7500);
}

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

// Chrome loads voices asynchronously
if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => {
    // Warm up the voices
  };
}

