/* ==========================================================================
   Earth's Four Spheres - results.js (Results Rendering & Confetti)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderResults();
  initConfetti();
});

/* ==========================================================================
   1. Results Renderer
   ========================================================================== */
function renderResults() {
  // Read quiz details from localStorage
  const scorePercent = parseInt(localStorage.getItem('earth_spheres_quiz_score') || '0');
  const userAnswers = JSON.parse(localStorage.getItem('earth_spheres_quiz_answers') || '[]');

  // Calculate correct / incorrect counts
  let correctCount = 0;
  quizQuestions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      correctCount++;
    }
  });
  const incorrectCount = quizQuestions.length - correctCount;

  // Render score stats
  const percentageEl = document.getElementById('res-percentage');
  const correctEl = document.getElementById('res-correct');
  const incorrectEl = document.getElementById('res-incorrect');

  if (percentageEl) percentageEl.textContent = `${scorePercent}%`;
  if (correctEl) correctEl.textContent = correctCount;
  if (incorrectEl) incorrectEl.textContent = incorrectCount;

  // Badge System Evaluation
  let badgeId = "";
  let badgeTitle = {};
  let badgeDesc = {};
  let badgeIcon = "";
  let badgeThemeColor = "";

  if (scorePercent >= 90) {
    badgeId = "earth_guardian";
    badgeTitle = { en: "Earth Guardian 🛡️", te: "ఎర్త్ గార్డియన్ (రక్షకుడు) 🛡️" };
    badgeDesc = {
      en: "Outstanding! You scored 90% or higher and are now a certified Earth Guardian. You understand how our planet's spheres work together to support life!",
      te: "అద్భుతం! మీరు 90% లేదా అంతకంటే ఎక్కువ స్కోర్ చేసి సర్టిఫైడ్ ఎర్త్ గార్డియన్ అయ్యారు. భూమి యొక్క ఆవరణలు ఎలా కలిసి పనిచేస్తాయో మీకు బాగా తెలుసు!"
    };
    badgeIcon = `
      <circle cx="32" cy="32" r="30" fill="#d1e7dd" />
      <path d="M32,12 L48,22 V36 C48,46 38,51 32,54 C26,51 16,46 16,36 V22 Z" fill="#198754" />
      <path d="M26,30 L30,34 L38,24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" />
    `;
    badgeThemeColor = "var(--success)";
  } else if (scorePercent >= 75) {
    badgeId = "planet_explorer";
    badgeTitle = { en: "Planet Explorer 🚀", te: "ప్లానెట్ ఎక్స్‌ప్లోరర్ (అన్వేషకుడు) 🚀" };
    badgeDesc = {
      en: "Great job! You scored 75%-89% and unlocked the Planet Explorer badge. You have a solid understanding of Earth's four spheres!",
      te: "చాలా బాగుంది! మీరు 75%-89% స్కోర్ చేసి ప్లానెట్ ఎక్స్‌ప్లోరర్ బ్యాడ్జ్‌ను అన్‌లాక్ చేశారు. భూమి యొక్క ఆవరణలపై మీకు మంచి అవగాహన ఉంది!"
    };
    badgeIcon = `
      <circle cx="32" cy="32" r="30" fill="#cff4fc" />
      <path d="M22,42 L42,22 M42,22 L32,20 M42,22 L44,32" stroke="#0dcaf0" stroke-width="4" stroke-linecap="round" />
      <circle cx="22" cy="42" r="4" fill="#0dcaf0" />
      <circle cx="42" cy="22" r="5" fill="#e74c3c" />
    `;
    badgeThemeColor = "var(--atmo-primary)";
  } else if (scorePercent >= 50) {
    badgeId = "nature_learner";
    badgeTitle = { en: "Nature Learner 🌱", te: "నేచర్ లెర్నర్ (ప్రకృతి విద్యార్థి) 🌱" };
    badgeDesc = {
      en: "Good effort! You scored 50%-74%. You unlocked the Nature Learner badge. Keep studying Earth's spheres to unlock the next level!",
      te: "మంచి ప్రయత్నం! మీరు 50%-74% స్కోర్ చేసి నేచర్ లెర్నర్ బ్యాడ్జ్‌ను సాధించారు. తర్వాతి స్థాయిని చేరుకోవడానికి భూమి ఆవరణల గురించి ఇంకా నేర్చుకోండి!"
    };
    badgeIcon = `
      <circle cx="32" cy="32" r="30" fill="#fff3cd" />
      <path d="M32,16 C25,24 25,36 32,44 C39,36 39,24 32,16 Z" fill="#ffc107" />
      <path d="M32,44 V50" stroke="#8b5a2b" stroke-width="3" />
    `;
    badgeThemeColor = "#ffc107";
  } else {
    badgeId = "future_scientist";
    badgeTitle = { en: "Future Scientist 🧪", te: "భవిష్యత్ శాస్త్రవేత్త 🧪" };
    badgeDesc = {
      en: "Keep trying! You scored below 50%. Take the lessons again, click the interactive diagrams, and retake the quiz to become a science master!",
      te: "మళ్లీ ప్రయత్నించండి! మీ స్కోర్ 50% కంటే తక్కువ వచ్చింది. పాఠాలను మళ్లీ చదవండి, ఇంటరాక్టివ్ చిత్రాలను క్లిక్ చేయండి మరియు సైన్స్ మాస్టర్ కావడానికి మళ్లీ క్విజ్ రాయండి!"
    };
    badgeIcon = `
      <circle cx="32" cy="32" r="30" fill="#f8d7da" />
      <path d="M26,18 H38 M28,18 V34 L20,46 H44 L36,34 V18" fill="none" stroke="#dc3545" stroke-width="4" stroke-linejoin="round" />
      <circle cx="32" cy="38" r="3" fill="#dc3545" />
    `;
    badgeThemeColor = "var(--error)";
  }

  // Update Badge Showcase Card
  const badgeTitleEl = document.getElementById('badge-title-reward');
  const badgeDescEl = document.getElementById('badge-desc-reward');
  const badgeIconSvg = document.getElementById('badge-svg-reward');
  const rewardCard = document.getElementById('reward-card');

  if (badgeTitleEl) {
    badgeTitleEl.innerHTML = `
      <span class="lang-en">${badgeTitle.en}</span>
      <span class="lang-te">${badgeTitle.te}</span>
    `;
  }
  if (badgeDescEl) {
    badgeDescEl.innerHTML = `
      <span class="lang-en">${badgeDesc.en}</span>
      <span class="lang-te">${badgeDesc.te}</span>
    `;
  }
  if (badgeIconSvg) {
    badgeIconSvg.innerHTML = badgeIcon;
  }
  if (rewardCard) {
    rewardCard.style.borderColor = badgeThemeColor;
    rewardCard.style.backgroundColor = scorePercent >= 50 ? '#f0fff4' : '#fff5f5';
  }

  // Save the earned badge to localStorage achievements list
  unlockBadge(badgeId);

  // Play congratulations sound
  playQuizEndSound(scorePercent);
}

function playQuizEndSound(score) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (score >= 75) {
      // Fanfare notes: C4, G4, C5, E5
      const notes = [261.63, 392.00, 523.25, 659.25];
      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + index * 0.12);
        osc.stop(audioCtx.currentTime + index * 0.12 + 0.5);
      });
    } else {
      // Encouraging beep
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    }
  } catch (e) {}
}

/* ==========================================================================
   2. Confetti Particle Simulation Engine (Pure Canvas)
   ========================================================================== */
function initConfetti() {
  const scorePercent = parseInt(localStorage.getItem('earth_spheres_quiz_score') || '0');
  if (scorePercent < 50) return; // No confetti for scores below 50%

  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = ['#f59e0b', '#10ac84', '#00b4d8', '#6c5ce7', '#ff4d4d', '#ff9f43'];
  const particles = [];

  // Spawn 120 confetti particles
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * -height - 20,
      size: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 4,
      speedX: -1.5 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotationSpeed: -4 + Math.random() * 8
    });
  }

  let animationFrameId;

  function update() {
    ctx.clearRect(0, 0, width, height);
    
    let activeParticles = 0;

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      // Draw confetti rectangle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      if (p.y < height) {
        activeParticles++;
      } else {
        // Recycle particle to top for endless look for 4 seconds, then let it drop
        if (performance.now() < 4000) {
          p.y = -20;
          p.x = Math.random() * width;
          p.speedY = 2 + Math.random() * 4;
        }
      }
    });

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  update();
}

/* ==========================================================================
   3. Review Answers System
   ========================================================================== */
let reviewRendered = false;

window.toggleReview = function() {
  const container = document.getElementById('review-container');
  if (!container) return;

  if (container.style.display === 'none' || container.style.display === '') {
    container.style.display = 'block';
    if (!reviewRendered) {
      renderReviewDetails();
    }
    // Scroll smoothly to review container
    container.scrollIntoView({ behavior: 'smooth' });
  } else {
    container.style.display = 'none';
  }
  playTone(392, 0.08);
};

function renderReviewDetails() {
  const list = document.getElementById('review-list');
  if (!list) return;

  const userAnswers = JSON.parse(localStorage.getItem('earth_spheres_quiz_answers') || '[]');
  list.innerHTML = ""; // Clear

  quizQuestions.forEach((q, qIdx) => {
    const userChoice = userAnswers[qIdx];
    const isCorrect = (userChoice === q.correctAnswer);

    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    
    let choicesHtml = "";
    q.options.forEach((opt, oIdx) => {
      let rowClass = "";
      let icon = "⚪";

      if (oIdx === q.correctAnswer) {
        rowClass = "correct-ans";
        icon = "✅";
      } else if (oIdx === userChoice && !isCorrect) {
        rowClass = "user-wrong";
        icon = "❌";
      }

      choicesHtml += `
        <div class="review-choice-row ${rowClass}">
          <span>${icon}</span>
          <span style="font-weight:700;">${String.fromCharCode(65 + oIdx)}.</span>
          <span class="lang-en">${opt.en}</span>
          <span class="lang-te">${opt.te}</span>
        </div>
      `;
    });

    reviewItem.innerHTML = `
      <div class="review-q-title">
        <span>Question ${qIdx + 1}:</span>
        <span class="lang-en">${q.question.en}</span>
        <span class="lang-te">${q.question.te}</span>
      </div>
      <div class="review-choices">
        ${choicesHtml}
      </div>
      <div class="quiz-explanation-box" style="margin-top:10px; background-color:#f8fafc; border-color:var(--border-color);">
        <h5 style="margin:0 0 5px 0; color:var(--text-dark); display:flex; align-items:center; gap:6px;">
          <span>💡</span>
          <span class="lang-en">Fact Check</span>
          <span class="lang-te">వివరణ</span>
        </h5>
        <p style="margin:0; font-size:0.95rem; color:var(--text-muted);">
          <span class="lang-en">${q.explanation.en}</span>
          <span class="lang-te">${q.explanation.te}</span>
        </p>
      </div>
    `;

    list.appendChild(reviewItem);
  });

  reviewRendered = true;
}

window.retakeQuiz = function() {
  localStorage.removeItem('earth_spheres_quiz_score');
  localStorage.removeItem('earth_spheres_quiz_answers');
  window.location.href = "quiz.html";
};
