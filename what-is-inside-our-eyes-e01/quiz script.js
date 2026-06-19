const QUESTIONS = [
  {
    id: 1,
    q: "What does the Cornea do?",
    options: ["Controls light", "Lets light enter the eye", "Sends signals to brain"],
    answer: 1
  },
  {
    id: 2,
    q: "What controls how much light enters the eye?",
    options: ["The Pupil", "The Lens", "The Retina"],
    answer: 0
  },
  {
    id: 3,
    q: "What focuses the light onto the retina?",
    options: ["The Cornea", "The Optic Nerve", "The Lens"],
    answer: 2
  },
  {
    id: 4,
    q: "What converts light into electrical signals?",
    options: ["The Retina", "The Brain", "The Pupil"],
    answer: 0
  },
  {
    id: 5,
    q: "What sends signals from the eye to the brain?",
    options: ["The Lens", "The Optic Nerve", "The Cornea"],
    answer: 1
  }
];

let currentQ = 0;
let score = 0;
let selectedOption = null;

// Elements
const cardBody = document.getElementById('quiz-card-body');

// Icons SVG strings
const checkIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: #22c55e;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
const crossIconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color: #ef4444;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

// Load on page startup
window.addEventListener('load', () => {
  loadQuestion();
});

function loadQuestion() {
  selectedOption = null;
  const qData = QUESTIONS[currentQ];

  cardBody.innerHTML = `
    <div class="fade-transition fade-in">
      <div class="quiz-header-row">
        <span>Question ${currentQ + 1} of ${QUESTIONS.length}</span>
        <span>Score: ${score}</span>
      </div>
      
      <h3 class="question-text">${qData.q}</h3>

      <div class="options-stack" id="options-container">
        ${qData.options.map((opt, i) => `
          <button class="option-btn" onclick="handleOptionSelect(${i})">
            <span>${opt}</span>
            <span class="icon-slot"></span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

window.handleOptionSelect = function(optionIndex) {
  if (selectedOption !== null) return; // Prevent double select
  selectedOption = optionIndex;

  const correctIndex = QUESTIONS[currentQ].answer;
  const optionButtons = document.querySelectorAll('.option-btn');

  // Loop through buttons to set styling states
  optionButtons.forEach((btn, idx) => {
    btn.disabled = true;
    const iconSlot = btn.querySelector('.icon-slot');

    if (idx === correctIndex) {
      btn.classList.add('correct');
      iconSlot.innerHTML = checkIconSvg;
    } else if (idx === optionIndex) {
      btn.classList.add('wrong');
      iconSlot.innerHTML = crossIconSvg;
    } else {
      btn.classList.add('muted');
    }
  });

  // Increment score
  if (optionIndex === correctIndex) {
    score++;
  }

  // Advance to next question after 1.5 seconds
  setTimeout(() => {
    // Fade out
    const container = cardBody.querySelector('div');
    if (container) {
      container.classList.remove('fade-in');
      container.classList.add('fade-out');
    }

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        currentQ++;
        loadQuestion();
      } else {
        showResults();
      }
    }, 300);
  }, 1500);
};

function showResults() {
  let feedbackMsg = "Great job! Keep exploring to learn even more.";
  if (score === QUESTIONS.length) {
    feedbackMsg = "Perfect Score! You are an Ocular Expert! 🌟";
  }

  cardBody.innerHTML = `
    <div class="results-screen fade-transition fade-in">
      <div class="trophy-glow">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
          <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"></path>
        </svg>
      </div>
      
      <h3 class="question-text" style="margin-bottom: 0.5rem; text-align: center;">Quiz Complete!</h3>
      <p class="score-bold">You scored <span class="score-highlight">${score}</span> out of ${QUESTIONS.length}</p>
      
      <p class="score-msg ${score === QUESTIONS.length ? 'perfect' : 'good'}">${feedbackMsg}</p>

      <button class="restart-btn" onclick="restartQuiz()">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
        </svg>
        Try Again
      </button>
    </div>
  `;
}

window.restartQuiz = function() {
  currentQ = 0;
  score = 0;
  loadQuestion();
};
