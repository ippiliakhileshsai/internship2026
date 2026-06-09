import { navigate } from '../app.js';
import { updateState, gameState } from '../utils/state.js';
import { quizData } from '../data/quizData.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';

export function renderQuiz(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  const questions = quizData[levelId]?.questions || [];
  let currentQ = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const q = questions[currentQ];
    const progress = ((currentQ) / questions.length) * 100;

    container.innerHTML = `
      <div class="screen quiz-screen" style="--accent:${lvl.color}">
        <div class="starfield" id="starfield-quiz"></div>

        <!-- Header -->
        <div class="quiz-header">
          <div class="quiz-meta">
            <span class="quiz-topic" style="color:${lvl.color}">${lvl.icon} ${lvl.name}</span>
            <span class="quiz-counter" style="color:#a78bca">Q${currentQ + 1}/${questions.length}</span>
          </div>
          <div class="quiz-progress-bar-bg">
            <div class="quiz-progress-fill" style="width:${progress}%; background:${lvl.color}; transition:width 0.5s ease"></div>
          </div>
          <div class="quiz-score-row">
            <span style="color:#ffd700">⭐ Score: ${score}/${currentQ}</span>
            <span style="color:#c084fc">💎 ${lvl.name}</span>
          </div>
        </div>

        <!-- Question -->
        <div class="quiz-card" id="quiz-card">
          <div class="quiz-q-num" style="color:${lvl.color}">Question ${currentQ + 1}</div>
          <div class="quiz-question">${q.q}</div>
        </div>

        <!-- Options -->
        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}" style="--accent:${lvl.color}">
              <span class="opt-letter">${['A','B','C','D'][i]}</span>
              <span class="opt-text">${opt}</span>
            </button>
          `).join('')}
        </div>

        <!-- Explanation (hidden initially) -->
        <div class="quiz-explanation hidden" id="quiz-explanation">
          <span class="exp-icon" id="exp-icon">✅</span>
          <p id="exp-text">${q.explanation}</p>
        </div>

        <!-- Next button (hidden initially) -->
        <div class="quiz-bottom">
          <button class="btn-primary shimmer-btn hidden" id="btn-next" style="background:linear-gradient(135deg,${lvl.colorDark},#4c1d95)">
            <div class="shimmer-sweep"></div>
            <span id="next-label">${currentQ + 1 < questions.length ? 'Next Question →' : '📊 See Results →'}</span>
          </button>
        </div>
      </div>
    `;

    generateStarfield('starfield-quiz');

    // Animate card
    const card = container.querySelector('#quiz-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);

    // Animate options
    container.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.style.opacity = '0';
      btn.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        btn.style.transition = 'all 0.35s ease';
        btn.style.opacity = '1';
        btn.style.transform = 'translateX(0)';
      }, 150 + i * 80);
    });

    // Option click
    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.index);
        const correct = q.answer;

        container.querySelectorAll('.quiz-option').forEach(b => {
          b.disabled = true;
          const idx = parseInt(b.dataset.index);
          if (idx === correct) {
            b.classList.add('opt-correct');
          } else if (idx === chosen && chosen !== correct) {
            b.classList.add('opt-wrong');
          }
        });

        const isCorrect = chosen === correct;
        if (isCorrect) { score++; audio.correct(); }
        else { audio.wrong(); }

        // Show explanation
        const expBox = container.querySelector('#quiz-explanation');
        const expIcon = container.querySelector('#exp-icon');
        const expText = container.querySelector('#exp-text');
        expBox.classList.remove('hidden');
        expIcon.textContent = isCorrect ? '✅' : '❌';
        expBox.style.borderColor = isCorrect ? '#34d399' : '#ef4444';
        expBox.style.background = isCorrect ? '#34d39912' : '#ef444412';

        container.querySelector('#btn-next').classList.remove('hidden');

        container.querySelector('#btn-next').addEventListener('click', () => {
          audio.click();
          currentQ++;
          answered = false;
          if (currentQ < questions.length) {
            renderQuestion();
          } else {
            updateState({ quizScore: score });
            navigate('analysis', { levelId });
          }
        });
      });
    });
  }

  renderQuestion();
}
