/* =========================================================
   quiz.js – Quiz Engine: Questions, Scoring, Locking
   ========================================================= */

// ── Question Bank ────────────────────────────────────────
const QUESTIONS = [
  // Filtration
  {
    id: 1, category: 'Filtration', emoji: '🧪',
    en: { q: 'What is the liquid that passes through the filter paper called?', opts: ['Residue', 'Filtrate', 'Solvent', 'Mixture'], ans: 1 },
    te: { q: 'ఫిల్టర్ పేపర్ గుండా వెళ్ళే ద్రవాన్ని ఏమంటారు?', opts: ['అవశేషం', 'ఫిల్ట్రేట్', 'ద్రావకం', 'మిశ్రమం'], ans: 1 }
  },
  {
    id: 2, category: 'Filtration', emoji: '🔬',
    en: { q: 'Which of the following is the best example of filtration in daily life?', opts: ['Making tea using a strainer', 'Boiling water', 'Melting ice', 'Mixing salt in water'], ans: 0 },
    te: { q: 'దైనందిన జీవితంలో వడపోతకు ఉత్తమ ఉదాహరణ ఏది?', opts: ['వడపోతను ఉపయోగించి టీ చేయడం', 'నీటిని మరిగించడం', 'మంచుని కరిగించడం', 'నీటిలో ఉప్పు కలపడం'], ans: 0 }
  },
  {
    id: 3, category: 'Filtration', emoji: '💧',
    en: { q: 'The solid particles left on the filter paper after filtration are called?', opts: ['Filtrate', 'Solute', 'Residue', 'Solution'], ans: 2 },
    te: { q: 'వడపోత తర్వాత ఫిల్టర్ పేపర్ మీద మిగిలిన ఘన కణాలను ఏమంటారు?', opts: ['ఫిల్ట్రేట్', 'ద్రావ్యం', 'అవశేషం', 'ద్రావణం'], ans: 2 }
  },
  {
    id: 4, category: 'Filtration', emoji: '🌊',
    en: { q: 'Which equipment is used to hold the filter paper during filtration?', opts: ['Beaker', 'Funnel', 'Test tube', 'Flask'], ans: 1 },
    te: { q: 'వడపోత సమయంలో ఫిల్టర్ పేపర్‌ను పట్టుకోవడానికి ఏ పరికరం ఉపయోగిస్తారు?', opts: ['బీకర్', 'గరాటు', 'టెస్ట్ ట్యూబ్', 'ఫ్లాస్క్'], ans: 1 }
  },
  // Evaporation
  {
    id: 5, category: 'Evaporation', emoji: '☀️',
    en: { q: 'In evaporation, which part of the mixture escapes as vapor?', opts: ['Solid', 'Liquid', 'Both solid and liquid', 'Neither'], ans: 1 },
    te: { q: 'ఆవిరిలో, మిశ్రమంలో ఏ భాగం ఆవిరిగా తప్పించుకుంటుంది?', opts: ['ఘనపదార్థం', 'ద్రవం', 'రెండూ', 'ఏదీ కాదు'], ans: 1 }
  },
  {
    id: 6, category: 'Evaporation', emoji: '🧂',
    en: { q: 'Sea water is evaporated to produce which of the following?', opts: ['Sugar', 'Common salt', 'Baking soda', 'Chalk'], ans: 1 },
    te: { q: 'సముద్రపు నీటిని ఆవిరి చేసి దేన్ని తయారు చేస్తారు?', opts: ['చక్కెర', 'సామాన్య ఉప్పు', 'బేకింగ్ సోడా', 'సుద్ద'], ans: 1 }
  },
  {
    id: 7, category: 'Evaporation', emoji: '🌡️',
    en: { q: 'What makes evaporation happen faster?', opts: ['Cooling the liquid', 'Heating the liquid', 'Adding more solid', 'Filtering the liquid'], ans: 1 },
    te: { q: 'ఆవిరి వేగంగా జరగడానికి ఏ పద్ధతి వేగవంతం చేస్తుంది?', opts: ['ద్రవాన్ని చల్లారించడం', 'ద్రవాన్ని వేడి చేయడం', 'మరింత ఘనపదార్థం కలపడం', 'ద్రవాన్ని వడపోయడం'], ans: 1 }
  },
  {
    id: 8, category: 'Evaporation', emoji: '💦',
    en: { q: 'After complete evaporation of salt water, what remains?', opts: ['Nothing', 'Water', 'Salt crystals', 'Salt water'], ans: 2 },
    te: { q: 'ఉప్పు నీటి పూర్తి ఆవిరి తర్వాత ఏమి మిగిలిపోతుంది?', opts: ['ఏమీ కాదు', 'నీరు', 'ఉప్పు స్ఫటికాలు', 'ఉప్పు నీరు'], ans: 2 }
  },
  // Distillation
  {
    id: 9, category: 'Distillation', emoji: '⚗️',
    en: { q: 'Distillation is used to separate mixtures of?', opts: ['Two solids', 'A solid and a gas', 'Two liquids with different boiling points', 'A solid and a liquid'], ans: 2 },
    te: { q: 'స్వేదనం ఉపయోగించి ఏ మిశ్రమాలను వేరు చేస్తారు?', opts: ['రెండు ఘనపదార్థాలు', 'ఒక ఘనపదార్థం మరియు వాయువు', 'వేర్వేరు మరిగే ఉష్ణోగ్రతలు గల రెండు ద్రవాలు', 'ఒక ఘనపదార్థం మరియు ద్రవం'], ans: 2 }
  },
  {
    id: 10, category: 'Distillation', emoji: '🔥',
    en: { q: 'What is the role of the condenser in distillation?', opts: ['To heat the liquid', 'To cool the vapor back into liquid', 'To filter impurities', 'To hold the liquid mixture'], ans: 1 },
    te: { q: 'స్వేదనంలో కండెన్సర్ పాత్ర ఏమిటి?', opts: ['ద్రవాన్ని వేడి చేయడం', 'ఆవిరిని మళ్ళీ ద్రవంగా చల్లారించడం', 'అపరిశుద్ధతలను వడపోయడం', 'ద్రవ మిశ్రమాన్ని నిల్వ చేయడం'], ans: 1 }
  },
  {
    id: 11, category: 'Distillation', emoji: '⛽',
    en: { q: 'Petrol and diesel are separated from crude oil using which method?', opts: ['Simple filtration', 'Evaporation', 'Fractional distillation', 'Crystallization'], ans: 2 },
    te: { q: 'ముడి చమురు నుండి పెట్రోల్ మరియు డీజిల్ ఏ పద్ధతి ద్వారా వేరు చేస్తారు?', opts: ['సాధారణ వడపోత', 'ఆవిరి', 'భిన్నాత్మక స్వేదనం', 'స్ఫటికీభవనం'], ans: 2 }
  },
  // Mixed Concepts
  {
    id: 12, category: 'Mixed', emoji: '🌟',
    en: { q: 'Which separation method would you use to get pure water from sea water?', opts: ['Filtration', 'Evaporation', 'Distillation', 'Sieving'], ans: 2 },
    te: { q: 'సముద్రపు నీటి నుండి స్వచ్ఛమైన నీటిని పొందడానికి ఏ వేరుపరచే పద్ధతి ఉపయోగిస్తారు?', opts: ['వడపోత', 'ఆవిరి', 'స్వేదనం', 'జల్లెడ పట్టడం'], ans: 2 }
  },
  {
    id: 13, category: 'Mixed', emoji: '💡',
    en: { q: 'Which method separates insoluble solid from a liquid?', opts: ['Evaporation', 'Distillation', 'Filtration', 'Condensation'], ans: 2 },
    te: { q: 'ద్రవంలో కరగని ఘనపదార్థాన్ని ఏ పద్ధతి వేరు చేస్తుంది?', opts: ['ఆవిరి', 'స్వేదనం', 'వడపోత', 'సంఘనీభవనం'], ans: 2 }
  },
  {
    id: 14, category: 'Mixed', emoji: '🔭',
    en: { q: 'Your kidneys clean your blood using a process similar to which method?', opts: ['Evaporation', 'Distillation', 'Filtration', 'Condensation'], ans: 2 },
    te: { q: 'మీ మూత్రపిండాలు మీ రక్తాన్ని శుద్ధి చేయడం ఏ పద్ధతిని పోలి ఉంటుంది?', opts: ['ఆవిరి', 'స్వేదనం', 'వడపోత', 'సంఘనీభవనం'], ans: 2 }
  },
  {
    id: 15, category: 'Mixed', emoji: '🏆',
    en: { q: 'When we hang wet clothes to dry, which process is happening?', opts: ['Filtration', 'Evaporation', 'Distillation', 'Condensation'], ans: 1 },
    te: { q: 'మనం తడి బట్టలు ఆరబెట్టినప్పుడు ఏ ప్రక్రియ జరుగుతోంది?', opts: ['వడపోత', 'ఆవిరి', 'స్వేదనం', 'సంఘనీభవనం'], ans: 1 }
  }
];

// ── Quiz State ───────────────────────────────────────────
let currentQ     = 0;
let score        = 0;
let answered     = false;
let userAnswers  = [];   // { qId, chosen, correct }
let lang         = localStorage.getItem('sciLang') || 'en';

// ── Render Question ──────────────────────────────────────
function renderQuestion() {
  const q = QUESTIONS[currentQ];
  const data = lang === 'te' ? q.te : q.en;

  // Update progress
  const pct = Math.round((currentQ / QUESTIONS.length) * 100);
  document.getElementById('quiz-fill').style.width = pct + '%';
  document.getElementById('quiz-prog-text').textContent =
    `${lang === 'te' ? 'ప్రశ్న' : 'Question'} ${currentQ + 1} ${lang === 'te' ? 'లో' : 'of'} ${QUESTIONS.length}`;
  document.getElementById('quiz-score-text').textContent =
    `${lang === 'te' ? 'స్కోర్' : 'Score'}: ${score}`;

  // Category badge
  document.getElementById('quiz-category').textContent = q.category;
  document.getElementById('quiz-emoji').textContent = q.emoji;

  // Question text
  document.getElementById('quiz-question').textContent = data.q;

  // Options
  const grid = document.getElementById('quiz-options');
  grid.innerHTML = '';
  const keys = ['A', 'B', 'C', 'D'];
  data.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${i}`;
    btn.innerHTML = `<span class="option-key">${keys[i]}</span> <span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i));
    grid.appendChild(btn);
  });

  // Clear feedback & next
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-next').style.display = 'none';
  answered = false;
}

// ── Select Answer ────────────────────────────────────────
function selectAnswer(chosen) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[currentQ];
  const data = lang === 'te' ? q.te : q.en;
  const correct = data.ans;
  const isCorrect = chosen === correct;

  if (isCorrect) score++;

  // Record answer
  userAnswers.push({ qId: q.id, chosen, correct, isCorrect });

  // Visual feedback
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen && !isCorrect) btn.classList.add('wrong');
    else btn.classList.add('locked');
  });

  // Feedback message
  const fb = document.getElementById('quiz-feedback');
  fb.textContent = isCorrect
    ? (lang === 'te' ? '🎉 సరైనది! చాలా బాగు!' : '🎉 Correct! Well done!')
    : (lang === 'te' ? '❌ అయ్యో! తదుపరిసారి కష్టపడండి.' : '❌ Oops! Try harder next time.');
  fb.className = `quiz-feedback ${isCorrect ? 'correct-fb' : 'wrong-fb'}`;

  // Show next / submit
  const nextBtn = document.getElementById('quiz-next');
  nextBtn.style.display = 'inline-flex';
  if (currentQ === QUESTIONS.length - 1) {
    nextBtn.textContent = lang === 'te' ? '🏆 ఫలితాలు చూడండి!' : '🏆 See Results!';
  } else {
    nextBtn.textContent = lang === 'te' ? 'తదుపరి ప్రశ్న →' : 'Next Question →';
  }

  // Save score to localStorage
  localStorage.setItem('quizScore', score);
  localStorage.setItem('quizTotal', QUESTIONS.length);
  localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
}

// ── Next Question ────────────────────────────────────────
function nextQuestion() {
  if (!answered) return;
  currentQ++;
  if (currentQ >= QUESTIONS.length) {
    // Save final
    localStorage.setItem('quizScore',   score);
    localStorage.setItem('quizTotal',   QUESTIONS.length);
    localStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('progress_quiz', 'true');
    localStorage.setItem('badge_quiz',    'true');
    window.location.href = 'results.html';
    return;
  }
  // Animate out/in
  const card = document.getElementById('quiz-card');
  card.style.opacity = '0';
  card.style.transform = 'translateX(60px)';
  setTimeout(() => {
    renderQuestion();
    card.style.transition = 'opacity 0.35s, transform 0.35s';
    card.style.opacity = '1';
    card.style.transform = 'translateX(0)';
  }, 280);
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Reset quiz state
  currentQ   = 0;
  score      = 0;
  answered   = false;
  userAnswers = [];
  lang = localStorage.getItem('sciLang') || 'en';

  renderQuestion();

  document.getElementById('quiz-next')
    .addEventListener('click', nextQuestion);

  // Language switch re-renders question
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      if (!answered) renderQuestion();
    });
  });
});
