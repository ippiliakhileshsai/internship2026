import { navigate } from '../app.js';
import { updateState, gameState } from '../utils/state.js';
import { quizData } from '../data/quizData.js';
import { levelsData } from '../data/levels.js';
import { audio } from '../utils/audio.js';
import { loadTemplate } from '../utils/template.js';

export async function renderQuiz(container, { levelId }) {
  const lvl = levelsData.find(l => l.id === levelId);
  const questions = quizData[levelId]?.questions || [];
  let currentQ = 0;
  let score = 0;
  let answered = false;

  async function renderQuestion() {
    const q = questions[currentQ];
    const progress = ((currentQ) / questions.length) * 100;

    container.innerHTML = await loadTemplate('quiz', { lvl, q, currentQ, questions, progress, score });

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

        container.querySelector('#btn-next').addEventListener('click', async () => {
          audio.click();
          currentQ++;
          answered = false;
          if (currentQ < questions.length) {
            await renderQuestion();
          } else {
            updateState({ quizScore: score });
            navigate('analysis', { levelId });
          }
        });
      });
    });
  }

  await renderQuestion();
}
