// ===== CIRCULATORY SYSTEM EXPLORER - JAVASCRIPT ===== 

// Quiz Questions Data
const quizQuestions = [
    {
        question: "Which organ is responsible for pumping blood throughout the body?",
        choices: ["Lungs", "Heart", "Kidney", "Liver"],
        correct: 1
    },
    {
        question: "Which type of blood vessels carry oxygen-rich blood away from the heart?",
        choices: ["Veins", "Capillaries", "Arteries", "Lymph vessels"],
        correct: 2
    },
    {
        question: "Where does blood receive oxygen in the circulatory system?",
        choices: ["Liver", "Muscles", "Lungs", "Stomach"],
        correct: 2
    },
    {
        question: "How many chambers does the human heart have?",
        choices: ["Two", "Three", "Four", "Five"],
        correct: 2
    },
    {
        question: "What do platelets help with in the blood?",
        choices: ["Transport oxygen", "Form blood clots", "Fight infections", "Carry nutrients"],
        correct: 1
    },
    {
        question: "What is the normal resting heart rate for adults?",
        choices: ["30-50 bpm", "60-100 bpm", "120-150 bpm", "160-180 bpm"],
        correct: 1
    },
    {
        question: "Which blood cells are responsible for transporting oxygen?",
        choices: ["White blood cells", "Platelets", "Red blood cells", "Plasma"],
        correct: 2
    },
    {
        question: "What is the function of heart valves?",
        choices: ["Pump blood", "Prevent backflow of blood", "Produce oxygen", "Filter blood"],
        correct: 1
    },
    {
        question: "Which blood vessels exchange nutrients and oxygen with body cells?",
        choices: ["Arteries", "Veins", "Capillaries", "Aorta"],
        correct: 2
    },
    {
        question: "Approximately how much blood does the human heart pump per day?",
        choices: ["100 gallons", "500 gallons", "1,000 gallons", "2,000 gallons"],
        correct: 3
    }
];

// ===== QUIZ STATE ===== 
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizStarted = false;

// ===== INITIALIZE QUIZ ===== 
function initializeQuiz() {
    const quizContainer = document.getElementById('quizContent');
    if (!quizContainer) return;

    quizContainer.innerHTML = `
        <div class="quiz-progress">
            <div class="quiz-progress-bar" style="width: 0%"></div>
        </div>
        <div id="quizQuestion" class="quiz-question"></div>
        <div id="quizChoices" class="quiz-choices"></div>
        <div class="quiz-buttons">
            <button class="quiz-btn" id="prevBtn" onclick="previousQuestion()" style="display: none;">← Previous</button>
            <button class="quiz-btn" id="nextBtn" onclick="nextQuestion()">Next →</button>
        </div>
        <div id="quizResult" class="quiz-result" style="display: none;">
            <h3>Quiz Complete!</h3>
            <div class="quiz-score" id="finalScore"></div>
            <button class="quiz-btn" onclick="restartQuiz()">Restart Quiz</button>
        </div>
    `;

    displayQuestion(0);
}

// ===== DISPLAY QUESTION ===== 
function displayQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    const questionEl = document.getElementById('quizQuestion');
    const choicesEl = document.getElementById('quizChoices');
    const progressBar = document.querySelector('.quiz-progress-bar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Update progress bar
    const progress = ((questionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progress + '%';

    // Display question number and text
    questionEl.innerHTML = `Question ${questionIndex + 1} of ${quizQuestions.length}: ${question.question}`;

    // Display choices
    choicesEl.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const choiceEl = document.createElement('div');
        choiceEl.className = 'quiz-choice';
        if (userAnswers[questionIndex] === index) {
            choiceEl.classList.add('selected');
        }
        choiceEl.textContent = choice;
        choiceEl.onclick = () => selectAnswer(index);
        choicesEl.appendChild(choiceEl);
    });

    // Update button states
    prevBtn.style.display = questionIndex > 0 ? 'block' : 'none';
    nextBtn.textContent = questionIndex === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next →';
    nextBtn.onclick = questionIndex === quizQuestions.length - 1 ? submitQuiz : nextQuestion;
}

// ===== SELECT ANSWER ===== 
function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;
    displayQuestion(currentQuestion);
}

// ===== NEXT QUESTION ===== 
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion(currentQuestion);
    }
}

// ===== PREVIOUS QUESTION ===== 
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
    }
}

// ===== SUBMIT QUIZ ===== 
function submitQuiz() {
    // Calculate score
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            score++;
        }
    });

    // Display results
    const quizQuestion = document.getElementById('quizQuestion').parentElement;
    quizQuestion.style.display = 'none';
    document.getElementById('quizChoices').style.display = 'none';
    document.querySelector('.quiz-buttons').style.display = 'none';

    const resultEl = document.getElementById('quizResult');
    resultEl.style.display = 'block';
    const percentage = Math.round((score / quizQuestions.length) * 100);
    document.getElementById('finalScore').innerHTML = `
        <p>You scored <span style="font-size: 3rem; color: #ff6b9d;">${score}/${quizQuestions.length}</span></p>
        <p>Percentage: ${percentage}%</p>
        <p>${getFeedback(percentage)}</p>
    `;
}

// ===== RESTART QUIZ ===== 
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    quizStarted = false;
    initializeQuiz();
}

// ===== GET FEEDBACK ===== 
function getFeedback(percentage) {
    if (percentage === 100) {
        return "🌟 Perfect! You're a circulatory system expert!";
    } else if (percentage >= 80) {
        return "🎉 Excellent! You have great knowledge!";
    } else if (percentage >= 60) {
        return "👍 Good job! You understand the basics well!";
    } else if (percentage >= 40) {
        return "📚 Nice effort! Review the material to improve!";
    } else {
        return "💡 Keep learning! Review the sections for more information!";
    }
}

// ===== EXPAND/COLLAPSE CARDS ===== 
function toggleExpand(button) {
    const cardContent = button.parentElement.nextElementSibling;
    const isExpanded = cardContent.classList.contains('collapsed');

    if (isExpanded) {
        cardContent.classList.remove('collapsed');
        button.textContent = '−';
    } else {
        cardContent.classList.add('collapsed');
        button.textContent = '+';
    }
}

// ===== SMOOTH SCROLL ===== 
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== SCROLL TO TOP ===== 
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== SHOW/HIDE SCROLL TO TOP BUTTON ===== 
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// ===== DARK MODE TOGGLE ===== 
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    // Load dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDarkMode);
        darkModeToggle.textContent = isNowDarkMode ? '☀️' : '🌙';
    });
}

// ===== MOBILE MENU TOGGLE ===== 
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ===== SEARCH FUNCTIONALITY ===== 
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (searchTerm === '' || text.includes(searchTerm)) {
                section.style.display = 'block';
                // Highlight matching text
                if (searchTerm !== '') {
                    section.style.opacity = '1';
                }
            } else {
                section.style.opacity = '0.5';
            }
        });
    });
}

// ===== BLOOD CELL ANIMATION IN SIMULATION ===== 
let simulationRunning = false;
let bloodCells = [];

function startSimulation() {
    if (simulationRunning) return;
    simulationRunning = true;

    const svg = document.querySelector('.circulation-diagram');
    const cellsGroup = document.getElementById('bloodCells');
    cellsGroup.innerHTML = ''; // Clear previous cells

    // Create multiple blood cells
    for (let i = 0; i < 12; i++) {
        const cell = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const color = i % 2 === 0 ? '#ff1744' : '#4169e1';
        const delay = (i * 500) / 1000;

        cell.setAttribute('r', '6');
        cell.setAttribute('fill', color);
        cell.setAttribute('opacity', '0.8');
        cell.setAttribute('filter', 'drop-shadow(0 0 3px rgba(255, 23, 68, 0.6))');

        // Different paths for different cells
        if (i < 3) {
            // Body to RA path
            animateCellAlongPath(cell, 'M 170 140 Q 250 120 325 100', delay);
        } else if (i < 6) {
            // RV to Lungs path
            animateCellAlongPath(cell, 'M 375 190 Q 430 160 500 90', delay + 2);
        } else if (i < 9) {
            // Lungs to LA path
            animateCellAlongPath(cell, 'M 550 130 Q 480 210 375 300', delay + 4);
        } else {
            // LV to Body path
            animateCellAlongPath(cell, 'M 425 175 Q 300 160 170 140', delay + 6);
        }

        cellsGroup.appendChild(cell);
    }
}

function animateCellAlongPath(cell, pathData, delay) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'none');

    const length = 300; // Approximate path length
    let progress = 0;

    const animate = () => {
        if (!simulationRunning) return;

        setTimeout(() => {
            progress += 0.02;
            if (progress > 1) progress = 0;

            // Calculate position along path
            const t = progress;
            // Using a simplified cubic Bezier calculation
            const x = calculatePathX(pathData, t);
            const y = calculatePathY(pathData, t);

            cell.setAttribute('cx', x);
            cell.setAttribute('cy', y);

            animate();
        }, 30);
    };

    setTimeout(animate, delay * 1000);
}

function calculatePathX(pathData, t) {
    // Simplified path calculation - adjust based on actual path data
    if (pathData.includes('170')) {
        // Body to RA
        return 170 + (325 - 170) * t;
    } else if (pathData.includes('375') && pathData.includes('190')) {
        // RV to Lungs
        return 375 + (500 - 375) * t;
    } else if (pathData.includes('550')) {
        // Lungs to LA
        return 550 - (550 - 375) * t;
    } else {
        // LV to Body
        return 425 - (425 - 170) * t;
    }
}

function calculatePathY(pathData, t) {
    // Simplified path calculation
    if (pathData.includes('170')) {
        // Body to RA
        return 140 - (140 - 100) * t;
    } else if (pathData.includes('375') && pathData.includes('190')) {
        // RV to Lungs
        return 190 - (190 - 90) * t;
    } else if (pathData.includes('550')) {
        // Lungs to LA
        return 130 + (300 - 130) * t;
    } else {
        // LV to Body
        return 175 - (175 - 140) * t;
    }
}

function resetSimulation() {
    simulationRunning = false;
    const cellsGroup = document.getElementById('bloodCells');
    cellsGroup.innerHTML = '';
}

// ===== REVEAL ANIMATIONS ON SCROLL ===== 
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach((element) => {
        observer.observe(element);
    });
}

// ===== FLOATING BLOOD CELLS BACKGROUND ===== 
function createFloatingCells() {
    const background = document.querySelector('.blood-cells-background');
    for (let i = 0; i < 20; i++) {
        const cell = document.createElement('div');
        cell.className = 'floating-cell';
        cell.style.position = 'absolute';
        cell.style.width = Math.random() * 20 + 10 + 'px';
        cell.style.height = cell.style.width;
        cell.style.background = i % 2 === 0 ? 'rgba(255, 23, 68, 0.1)' : 'rgba(65, 105, 225, 0.1)';
        cell.style.borderRadius = '50%';
        cell.style.left = Math.random() * 100 + '%';
        cell.style.top = Math.random() * 100 + '%';
        cell.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
        cell.style.animationDelay = Math.random() * 5 + 's';
        background.appendChild(cell);
    }
}

// ===== INITIALIZE ON DOM LOAD ===== 
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after 2.5 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }, 2500);

    // Initialize quiz
    initializeQuiz();

    // Reveal animations
    revealOnScroll();

    // Create floating cells
    createFloatingCells();

    // Add reveal animations to all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
    });
});

// ===== KEYBOARD NAVIGATION ===== 
document.addEventListener('keydown', (e) => {
    // Navigate quiz with arrow keys
    if (quizStarted && e.key === 'ArrowLeft') {
        previousQuestion();
    } else if (quizStarted && e.key === 'ArrowRight') {
        nextQuestion();
    }
});

// ===== ACCESSIBILITY: ANNOUNCE QUIZ UPDATES ===== 
function announceQuestion(questionIndex) {
    const question = quizQuestions[questionIndex];
    const announcement = `Question ${questionIndex + 1} of ${quizQuestions.length}: ${question.question}`;
    console.log(announcement); // For screen readers
}

// ===== PERFORMANCE: LAZY LOAD IMAGES ===== 
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[src]');
    images.forEach(image => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.src;
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(image);
    });
}

// ===== LOCAL STORAGE FOR QUIZ PROGRESS ===== 
function saveQuizProgress() {
    const progress = {
        currentQuestion,
        userAnswers,
        score
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
}

function loadQuizProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentQuestion = progress.currentQuestion;
        userAnswers = progress.userAnswers;
        score = progress.score;
        return true;
    }
    return false;
}

// Save progress every 30 seconds
setInterval(saveQuizProgress, 30000);

// ===== EASTER EGG: KONAMI CODE ===== 
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Fun hearts animation
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.animation = 'float 3s ease-in-out forwards';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9998';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);
    }
}

console.log('%cWelcome to Circulatory System Explorer! 💖', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
console.log('This educational website teaches you about the heart, blood vessels, and blood circulation.');
console.log('Try the Konami code (↑↑↓↓←→←→BA) for a surprise! 😊');
