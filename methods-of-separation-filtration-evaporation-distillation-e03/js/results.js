/* =========================================================
   results.js – Results Page: Confetti, Badges, Score Display
   ========================================================= */

// ── Confetti Engine ──────────────────────────────────────
class Confetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  makeParticle() {
    const colors = ['#FF6B35','#FFD700','#00C9A7','#FF4F8B','#6C3FE0','#4FC3F7','#00E676'];
    return {
      x: Math.random() * this.canvas.width,
      y: -12,
      w: 8 + Math.random() * 10,
      h: 6 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.2,
      life: 1.0
    };
  }

  start(duration = 4000) {
    this.running = true;
    const end = Date.now() + duration;
    const spawn = () => {
      if (Date.now() < end) {
        for (let i = 0; i < 6; i++) this.particles.push(this.makeParticle());
        setTimeout(spawn, 60);
      }
    };
    spawn();
    this._loop();
  }

  _loop() {
    if (!this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.rotV;
      p.vy += 0.08; // gravity
      p.life -= 0.006;
      if (p.life <= 0 || p.y > this.canvas.height + 20) return false;

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rot);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.ctx.restore();
      return true;
    });
    if (this.particles.length > 0 || this.running) {
      this.animId = requestAnimationFrame(() => this._loop());
    }
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.animId);
    if (this.canvas) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// ── Star Burst Animation ──────────────────────────────────
function animateStars(count) {
  const stars = document.querySelectorAll('.results-star');
  stars.forEach((star, i) => {
    star.classList.remove('lit');
    if (i < count) {
      setTimeout(() => star.classList.add('lit'), i * 280);
    }
  });
}

// ── Badge & Message Logic ────────────────────────────────
function getBadgeData(pct) {
  if (pct >= 90) return { key: 'champion', trophy: '🏆', stars: 3, color: '#FFD700' };
  if (pct >= 75) return { key: 'explorer',  trophy: '🌟', stars: 3, color: '#9B72F5' };
  if (pct >= 50) return { key: 'learner',   trophy: '📚', stars: 2, color: '#00C9A7' };
  return              { key: 'practice',  trophy: '💪', stars: 1, color: '#FF6B35' };
}

// ── Build Review Table ───────────────────────────────────
function buildReviewTable(answers, questions, lang) {
  const wrapper = document.getElementById('review-section');
  if (!wrapper) return;

  const title = document.getElementById('review-title');
  if (title) title.textContent = lang === 'te' ? '📋 సమాధాన సమీక్ష' : '📋 Answer Review';

  const tbody = document.getElementById('review-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  answers.forEach((a, idx) => {
    const q = questions.find(x => x.id === a.qId);
    if (!q) return;
    const data = lang === 'te' ? q.te : q.en;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${q.emoji} ${data.q}</td>
      <td>${data.opts[a.chosen]}</td>
      <td class="${a.isCorrect ? 'review-correct' : 'review-wrong'}">
        ${a.isCorrect ? '✅ ' + data.opts[a.correct] : '❌ ' + data.opts[a.correct]}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Main Init ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const lang    = localStorage.getItem('sciLang') || 'en';
  const score   = parseInt(localStorage.getItem('quizScore')  || '0');
  const total   = parseInt(localStorage.getItem('quizTotal')  || '15');
  const answers = JSON.parse(localStorage.getItem('quizAnswers') || '[]');
  const wrong   = total - score;
  const pct     = Math.round((score / total) * 100);

  const badge = getBadgeData(pct);

  // ── Score Stats ──
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('res-score',   `${score}/${total}`);
  setEl('res-correct', score);
  setEl('res-wrong',   wrong);
  setEl('res-pct',     pct + '%');

  // ── Trophy & Badge ──
  setEl('res-trophy', badge.trophy);

  const badgeLabel = document.getElementById('res-badge-label');
  if (badgeLabel) {
    const keys = { champion: 'results.badge.champion', explorer: 'results.badge.explorer', learner: 'results.badge.learner', practice: 'results.badge.practice' };
    badgeLabel.textContent = (window.t && window.t(keys[badge.key])) || badge.trophy;
    badgeLabel.style.color = badge.color;
  }

  const msgEl = document.getElementById('res-msg');
  if (msgEl) {
    const msgs = {
      en: {
        champion: "Outstanding! You're a Science Champion! You have mastered the methods of separation!",
        explorer:  "Great job! You're a Science Explorer! Keep learning and you'll be a champion soon!",
        learner:   "Good effort! You're a Curious Learner! Review the topics and try again!",
        practice:  "Don't give up! Read through the lessons again and you'll do much better!"
      },
      te: {
        champion: "అద్భుతం! మీరు సైన్స్ చాంపియన్! మీరు వేరుపరచే పద్ధతులను పూర్తిగా నేర్చుకున్నారు!",
        explorer:  "చాలా బాగు! మీరు సైన్స్ అన్వేషకుడు! నేర్చుకుంటూ ఉండండి!",
        learner:   "మంచి ప్రయత్నం! అంశాలను మళ్ళీ చదివి మళ్ళీ ప్రయత్నించండి!",
        practice:  "వదులుకోకండి! పాఠాలను మళ్ళీ చదివి మరింత మెరుగ్గా చేయండి!"
      }
    };
    msgEl.textContent = (msgs[lang] || msgs.en)[badge.key];
  }

  // ── Percentage Circle ──
  const circleEl = document.getElementById('pct-circle-fill');
  if (circleEl) {
    const r = 54;
    const circ = 2 * Math.PI * r;
    setTimeout(() => {
      circleEl.style.strokeDashoffset = circ - (circ * pct / 100);
    }, 300);
  }

  // ── Stars ──
  animateStars(badge.stars);

  // ── Confetti (good scores) ──
  if (pct >= 50) {
    const confetti = new Confetti('confetti-canvas');
    setTimeout(() => confetti.start(4500), 600);
  }

  // ── Colour score stats ──
  const pctEl = document.getElementById('res-pct');
  if (pctEl) pctEl.style.color = badge.color;

  // ── Build Review ──
  // Dynamically import question bank from quiz.js context (stored in localStorage)
  // We re-declare a mini questions list here for review
  const QUESTIONS_REVIEW = [
    { id:1,  category:'Filtration',   emoji:'🧪', en:{q:'What is the liquid that passes through the filter paper called?',opts:['Residue','Filtrate','Solvent','Mixture'],ans:1},te:{q:'ఫిల్టర్ పేపర్ గుండా వెళ్ళే ద్రవాన్ని ఏమంటారు?',opts:['అవశేషం','ఫిల్ట్రేట్','ద్రావకం','మిశ్రమం'],ans:1}},
    { id:2,  category:'Filtration',   emoji:'🔬', en:{q:'Which is the best example of filtration in daily life?',opts:['Making tea using a strainer','Boiling water','Melting ice','Mixing salt in water'],ans:0},te:{q:'దైనందిన జీవితంలో వడపోతకు ఉత్తమ ఉదాహరణ ఏది?',opts:['వడపోతను ఉపయోగించి టీ చేయడం','నీటిని మరిగించడం','మంచుని కరిగించడం','నీటిలో ఉప్పు కలపడం'],ans:0}},
    { id:3,  category:'Filtration',   emoji:'💧', en:{q:'Solid particles left on filter paper are called?',opts:['Filtrate','Solute','Residue','Solution'],ans:2},te:{q:'ఫిల్టర్ పేపర్ మీద మిగిలిన ఘన కణాలను ఏమంటారు?',opts:['ఫిల్ట్రేట్','ద్రావ్యం','అవశేషం','ద్రావణం'],ans:2}},
    { id:4,  category:'Filtration',   emoji:'🌊', en:{q:'Which equipment holds filter paper during filtration?',opts:['Beaker','Funnel','Test tube','Flask'],ans:1},te:{q:'వడపోత సమయంలో ఫిల్టర్ పేపర్‌ను పట్టుకోవడానికి ఏ పరికరం?',opts:['బీకర్','గరాటు','టెస్ట్ ట్యూబ్','ఫ్లాస్క్'],ans:1}},
    { id:5,  category:'Evaporation',  emoji:'☀️', en:{q:'In evaporation, which part escapes as vapor?',opts:['Solid','Liquid','Both','Neither'],ans:1},te:{q:'ఆవిరిలో ఏ భాగం ఆవిరిగా తప్పించుకుంటుంది?',opts:['ఘనపదార్థం','ద్రవం','రెండూ','ఏదీ కాదు'],ans:1}},
    { id:6,  category:'Evaporation',  emoji:'🧂', en:{q:'Sea water is evaporated to produce?',opts:['Sugar','Common salt','Baking soda','Chalk'],ans:1},te:{q:'సముద్రపు నీటిని ఆవిరి చేసి దేన్ని తయారు చేస్తారు?',opts:['చక్కెర','సామాన్య ఉప్పు','బేకింగ్ సోడా','సుద్ద'],ans:1}},
    { id:7,  category:'Evaporation',  emoji:'🌡️', en:{q:'What makes evaporation happen faster?',opts:['Cooling','Heating','Adding solid','Filtering'],ans:1},te:{q:'ఆవిరి వేగంగా జరగడానికి ఏది సహాయపడుతుంది?',opts:['చల్లారించడం','వేడి చేయడం','ఘనపదార్థం కలపడం','వడపోయడం'],ans:1}},
    { id:8,  category:'Evaporation',  emoji:'💦', en:{q:'After complete evaporation of salt water, what remains?',opts:['Nothing','Water','Salt crystals','Salt water'],ans:2},te:{q:'ఉప్పు నీటి పూర్తి ఆవిరి తర్వాత ఏమి మిగిలిపోతుంది?',opts:['ఏమీ కాదు','నీరు','ఉప్పు స్ఫటికాలు','ఉప్పు నీరు'],ans:2}},
    { id:9,  category:'Distillation', emoji:'⚗️', en:{q:'Distillation separates mixtures of?',opts:['Two solids','Solid & gas','Two liquids with different boiling points','Solid & liquid'],ans:2},te:{q:'స్వేదనం ఏ మిశ్రమాలను వేరు చేస్తుంది?',opts:['రెండు ఘనపదార్థాలు','ఘనపదార్థం & వాయువు','వేర్వేరు మరిగే ఉష్ణోగ్రతలు గల రెండు ద్రవాలు','ఘనపదార్థం & ద్రవం'],ans:2}},
    { id:10, category:'Distillation', emoji:'🔥', en:{q:'What is the role of the condenser in distillation?',opts:['Heat liquid','Cool vapor to liquid','Filter impurities','Hold liquid'],ans:1},te:{q:'స్వేదనంలో కండెన్సర్ పాత్ర ఏమిటి?',opts:['ద్రవాన్ని వేడి చేయడం','ఆవిరిని చల్లారించడం','అపరిశుద్ధతలను వడపోయడం','ద్రవాన్ని నిల్వ చేయడం'],ans:1}},
    { id:11, category:'Distillation', emoji:'⛽', en:{q:'Petrol/diesel from crude oil uses which method?',opts:['Filtration','Evaporation','Fractional distillation','Crystallization'],ans:2},te:{q:'ముడి చమురు నుండి పెట్రోల్/డీజిల్ ఏ పద్ధతి?',opts:['వడపోత','ఆవిరి','భిన్నాత్మక స్వేదనం','స్ఫటికీభవనం'],ans:2}},
    { id:12, category:'Mixed',        emoji:'🌟', en:{q:'To get pure water from sea water, use?',opts:['Filtration','Evaporation','Distillation','Sieving'],ans:2},te:{q:'సముద్రపు నీటి నుండి స్వచ్ఛమైన నీరు పొందడానికి?',opts:['వడపోత','ఆవిరి','స్వేదనం','జల్లెడ'],ans:2}},
    { id:13, category:'Mixed',        emoji:'💡', en:{q:'Which method separates insoluble solid from liquid?',opts:['Evaporation','Distillation','Filtration','Condensation'],ans:2},te:{q:'ద్రవంలో కరగని ఘనపదార్థాన్ని ఏ పద్ధతి వేరు చేస్తుంది?',opts:['ఆవిరి','స్వేదనం','వడపోత','సంఘనీభవనం'],ans:2}},
    { id:14, category:'Mixed',        emoji:'🔭', en:{q:'Kidneys cleaning blood is similar to?',opts:['Evaporation','Distillation','Filtration','Condensation'],ans:2},te:{q:'మూత్రపిండాలు రక్తాన్ని శుద్ధి చేయడం ఏ పద్ధతిని పోలి ఉంటుంది?',opts:['ఆవిరి','స్వేదనం','వడపోత','సంఘనీభవనం'],ans:2}},
    { id:15, category:'Mixed',        emoji:'🏆', en:{q:'Hanging wet clothes to dry involves?',opts:['Filtration','Evaporation','Distillation','Condensation'],ans:1},te:{q:'తడి బట్టలు ఆరబెట్టడంలో ఏ ప్రక్రియ?',opts:['వడపోత','ఆవిరి','స్వేదనం','సంఘనీభవనం'],ans:1}},
  ];

  buildReviewTable(answers, QUESTIONS_REVIEW, lang);

  // ── Buttons ──
  const reviewBtn = document.getElementById('btn-review');
  const reviewSec = document.getElementById('review-section');
  if (reviewBtn && reviewSec) {
    reviewBtn.addEventListener('click', () => {
      const hidden = reviewSec.style.display === 'none' || reviewSec.style.display === '';
      reviewSec.style.display = hidden ? 'block' : 'none';
      reviewBtn.textContent = hidden
        ? (lang === 'te' ? '🙈 సమీక్ష దాచు' : '🙈 Hide Review')
        : (lang === 'te' ? '📋 సమాధానాలు చూడండి' : '📋 Review Answers');
    });
  }

  const retakeBtn = document.getElementById('btn-retake');
  if (retakeBtn) retakeBtn.addEventListener('click', () => {
    localStorage.removeItem('quizScore');
    localStorage.removeItem('quizTotal');
    localStorage.removeItem('quizAnswers');
    window.location.href = 'quiz.html';
  });

  const homeBtn = document.getElementById('btn-home');
  if (homeBtn) homeBtn.addEventListener('click', () => window.location.href = 'index.html');
});
