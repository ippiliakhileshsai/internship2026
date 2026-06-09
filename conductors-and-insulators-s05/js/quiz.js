const questionsDatabase = {
    1: [
        {
            question: "Which material is a conductor?",
            visual: "🧵 Conducting path",
            options: ["Rubber", "Copper", "Plastic"],
            answer: "Copper"
        },
        {
            question: "In a conductor like copper, what is special about its outer electrons?",
            visual: "⚛️ Atomic structure",
            options: ["They are locked in tight bonds", "They are \"free electrons\" that can drift easily", "They orbit backwards"],
            answer: "They are \"free electrons\" that can drift easily"
        },
        {
            question: "What is electric current?",
            visual: "⚡ Electric flow",
            options: ["The flow of protons", "The flow of free electrons along a path", "A magnetic wave"],
            answer: "The flow of free electrons along a path"
        },
        {
            question: "Why do insulators block electric current?",
            visual: "🛡️ Blocked flow",
            options: ["Their electrons are locked tight and cannot drift", "They have too many free electrons", "They are made of metal"],
            answer: "Their electrons are locked tight and cannot drift"
        },
        {
            question: "What happens to free electrons when voltage (electrical pressure) is increased?",
            visual: "📈 Voltage push",
            options: ["They stop moving", "They drift faster", "They turn into protons"],
            answer: "They drift faster"
        }
    ],
    2: [
        {
            question: "Why is it dangerous to touch electric appliances with wet hands?",
            visual: "💧 Moisture hazard",
            options: ["Water is always pure", "Tap water contains dissolved minerals that conduct electricity", "Wet skin becomes a perfect insulator"],
            answer: "Tap water contains dissolved minerals that conduct electricity"
        },
        {
            question: "Why are electrician tools covered in thick rubber or plastic handles?",
            visual: "🛠️ Insulated grips",
            options: ["To make them heavier", "Rubber and plastic are insulators that block shock currents", "To absorb sweat"],
            answer: "Rubber and plastic are insulators that block shock currents"
        },
        {
            question: "What should you do if an electric wire has its protective plastic cover worn out or cracked?",
            visual: "⚠️ Exposed core",
            options: ["Touch it to see if it's hot", "Ignore it", "Turn off power and replace/tape it immediately"],
            answer: "Turn off power and replace/tape it immediately"
        },
        {
            question: "Which of these is the safest action when a severe lightning storm is directly overhead?",
            visual: "⛈️ Lightning shield",
            options: ["Stand under a tall lone tree", "Stay indoors away from electrical devices", "Swim in an outdoor pool"],
            answer: "Stay indoors away from electrical devices"
        },
        {
            question: "Why are rubber gloves worn by power line technicians?",
            visual: "🧤 Protective gear",
            options: ["To keep their hands warm", "To prevent grease marks", "To shield them from high-voltage currents"],
            answer: "To shield them from high-voltage currents"
        }
    ],
    3: [
        {
            question: "How does a safety fuse protect your house from an electrical fire?",
            visual: "🔥 Fuse safety",
            options: ["It turns off the main valve", "It melts and breaks the circuit if the current gets too high", "It absorbs the extra electrons like a sponge"],
            answer: "It melts and breaks the circuit if the current gets too high"
        },
        {
            question: "Inside an incandescent light bulb, the glowing filament is a conductor (tungsten), but what supports it?",
            visual: "💡 Filament structure",
            options: ["Insulating glass support mounts", "Conducting copper wires", "Soft paper mounts"],
            answer: "Insulating glass support mounts"
        },
        {
            question: "What is the purpose of a lightning rod on top of a tall building?",
            visual: "🗼 Lightning rod",
            options: ["To attract lightning and safely guide the charge to the ground", "To store electricity for the building", "To block lightning from forming"],
            answer: "To attract lightning and safely guide the charge to the ground"
        },
        {
            question: "The high-voltage power cables on utility poles are supported by large bell-shaped cups made of ceramic or glass. Why?",
            visual: "🕭 Ceramic cup",
            options: ["To make the poles look decorative", "They are heavy weights", "They are insulators that prevent current from escaping to the pole"],
            answer: "They are insulators that prevent current from escaping to the pole"
        },
        {
            question: "When a plug is connected to an outlet, which parts conduct the electricity?",
            visual: "🔌 Socket connection",
            options: ["The outer plastic housing", "The two metal prongs inside the plug", "The paper label on the cord"],
            answer: "The two metal prongs inside the plug"
        }
    ]
};

let currentLevel = 1;

document.addEventListener("DOMContentLoaded", () => {
    // Level cards click listener
    const levelCards = document.querySelectorAll(".level-card");
    levelCards.forEach(card => {
        card.addEventListener("click", () => {
            const level = parseInt(card.getAttribute("data-level"), 10);
            if (level) {
                // Remove active from all
                levelCards.forEach(c => c.classList.remove("active"));
                // Add active to clicked
                card.classList.add("active");
                currentLevel = level;
                loadLevel(level);
            }
        });
    });

    // Listen for choices to update progress
    const form = document.getElementById("quizForm");
    if (form) {
        form.addEventListener("change", updateProgress);
    }

    // Initial load
    loadLevel(1);
});

function loadLevel(levelNum) {
    const container = document.getElementById("hologramQuizContainer");
    const result = document.getElementById("result");
    if (result) result.innerHTML = ""; // Clear results
    
    if (!container) return;
    
    const questions = questionsDatabase[levelNum];
    if (!questions) return;

    let html = "";
    questions.forEach((q, index) => {
        html += `
            <article class="quiz-card" data-answer="${q.answer}">
                <div class="question-visual">${q.visual}</div>
                <h3>${index + 1}. ${q.question}</h3>
                <div class="answers">
                    ${q.options.map(opt => `
                        <label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label>
                    `).join('')}
                </div>
            </article>
        `;
    });
    
    container.innerHTML = html;
    
    // Reset progress fill
    const fill = document.getElementById("quizProgressFill");
    const text = document.getElementById("quizProgressText");
    if (fill) fill.style.width = "0%";
    if (text) text.textContent = `0 of ${questions.length} Questions Answered`;
}

function updateProgress() {
    const questions = questionsDatabase[currentLevel];
    if (!questions) return;
    
    const container = document.getElementById("hologramQuizContainer");
    if (!container) return;
    
    const inputs = container.querySelectorAll("input[type='radio']");
    const answered = new Set();
    
    inputs.forEach(input => {
        if (input.checked) {
            answered.add(input.name);
        }
    });
    
    const count = answered.size;
    const pct = Math.round((count / questions.length) * 100);
    
    const fill = document.getElementById("quizProgressFill");
    const text = document.getElementById("quizProgressText");
    if (fill) fill.style.width = pct + "%";
    if (text) text.textContent = `${count} of ${questions.length} Questions Answered`;
}

function calculateScore() {
    const container = document.getElementById("hologramQuizContainer");
    if (!container) return;
    
    const cards = container.querySelectorAll(".quiz-card");
    const result = document.getElementById("result");
    if (!result) return;
    
    let score = 0;
    let total = cards.length;

    // Check if any are unanswered
    let unansweredCount = 0;
    cards.forEach((card) => {
        const checked = card.querySelector("input[type='radio']:checked");
        if (!checked) unansweredCount++;
    });

    if (unansweredCount > 0) {
        if (!confirm(`You have ${unansweredCount} unanswered question(s). Submit anyway?`)) {
            return;
        }
    }

    cards.forEach((card) => {
        const answer = card.getAttribute("data-answer");
        const checked = card.querySelector("input[type='radio']:checked");
        const isCorrect = checked && checked.value === answer;

        // Trigger animation reset by forcing reflow
        card.classList.remove("correct", "wrong");
        void card.offsetWidth; // Reflow trigger
        card.classList.add(isCorrect ? "correct" : "wrong");

        if (isCorrect) {
            score++;
        }
    });

    const percent = Math.round((score / total) * 100);
    let badge = "Keep exploring";
    let message = "Review the lesson and try again. Every scientist improves by testing.";

    if (score === total) {
        badge = "🏆 Electricity Master";
        message = "Excellent work! You truly understand conductors and insulators.";
    } else if (score >= 3) {
        badge = "✨ Electricity Explorer";
        message = "Good progress! Review the cards that got a red outline to get 5/5.";
    }

    let certificateLinkHtml = "";
    if (score >= 4) {
        certificateLinkHtml = `<a class="btn" href="certificate.html">Claim Your Certificate 🏆</a>`;
    }

    result.innerHTML = `
        <h2>${badge}</h2>
        <p>Your Score: <strong>${score}/${total}</strong></p>
        <div class="score-meter" aria-label="Score ${percent} percent">
            <span style="width:${percent}%"></span>
        </div>
        <p style="margin-top: 10px;">${message}</p>
        <div class="quiz-actions" style="justify-content: center; margin-top: 18px; gap: 12px; display: flex; flex-wrap: wrap;">
            ${certificateLinkHtml}
            <a class="btn secondary" href="uses.html">Explore Real-Life Uses</a>
            <button class="btn secondary" type="button" onclick="loadLevel(currentLevel)">Try Again</button>
        </div>
    `;
    
    // Smooth scroll to results panel
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
