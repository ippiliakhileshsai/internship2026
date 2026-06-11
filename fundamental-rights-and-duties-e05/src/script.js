// =====================================================
// CONSTITUTION QUEST - SCRIPT.JS
// PART 1 : VARIABLES + TOPICS + QUIZ DATA
// =====================================================
let appPoints = 0;
let currentTopic = {};
let activeModuleTrack = "rights";
let globalQuizIndex = 0;
let answeredCurrentQuestion = false;
let earnedBadges = [];
// =====================================================
// TOPICS
// =====================================================
const topics = {
    // ---------- FUNDAMENTAL RIGHTS ----------
    equality: {
        title: "Right to Equality",
        content:
            "Every citizen has equal rights. Nobody can be treated unfairly because of religion, caste, gender or financial status.",
        scenario:
            "Your school allows only boys to join the robotics club while girls are forced to do cleaning work. Which right is violated?",
        mcq: [
            "Right to Freedom",
            "Right to Equality",
            "Right against Exploitation"
        ],
        answer: 1,
        puzzle: "EQUALITY"
    },
    freedom: {
        title: "Right to Freedom",
        content:
            "Citizens can speak respectfully, move freely and express ideas peacefully.",
        scenario:
            "Students wish to publish an eco-friendly school magazine with useful suggestions.",
        mcq: [
            "Students have freedom to express ideas respectfully.",
            "Students cannot share opinions.",
            "Children get freedom only after turning 18."
        ],
        answer: 0,
        puzzle: "FREEDOM"
    },
    exploitation: {
        title: "Right against Exploitation",
        content:
            "Children cannot be forced into dangerous labour or unfair work.",
        scenario:
            "An 11-year-old child is forced to work in a factory instead of going to school.",
        mcq: [
            "This violates the Right against Exploitation.",
            "This is acceptable.",
            "Factory owners can do anything."
        ],
        answer: 0,
        puzzle: "JUSTICE"
    },
    religion: {
        title: "Freedom of Religion",
        content:
            "Everyone can follow and practice the religion of their choice.",
        scenario:
            "A family is denied housing because they celebrate different festivals.",
        mcq: [
            "Families should change religion.",
            "Everyone has freedom of religion.",
            "Only one religion should be followed."
        ],
        answer: 1,
        puzzle: "SECULAR"
    },
    culture: {
        title: "Cultural and Educational Rights",
        content:
            "Minority communities can preserve their language and traditions.",
        scenario:
            "A child speaking a minority language is denied admission to school.",
        mcq: [
            "This violates Cultural Rights.",
            "Only majority culture matters.",
            "Children should forget family traditions."
        ],
        answer: 0,
        puzzle: "CULTURE"
    },
    remedies: {
        title: "Right to Constitutional Remedies",
        content:
            "Citizens can approach courts when their rights are violated.",
        scenario:
            "A peaceful reading club is stopped without any valid reason.",
        mcq: [
            "Citizens must stay silent.",
            "They can approach courts for justice.",
            "Courts do not help citizens."
        ],
        answer: 1,
        puzzle: "REMEDY"
    },
    // ---------- FUNDAMENTAL DUTIES ----------
    symbols: {
        title: "Respect National Symbols",
        content:
            "Citizens must respect the Constitution, National Flag and National Anthem.",
        scenario:
            "Some students laugh during the National Anthem.",
        mcq: [
            "Ignore it.",
            "Stand respectfully for the anthem.",
            "Leave the assembly."
        ],
        answer: 1,
        puzzle: "ANTHEM"
    },
    environment: {
        title: "Protect Environment",
        content:
            "We must protect forests, rivers, parks and animals.",
        scenario:
            "Visitors throw plastic near a river inside a park.",
        mcq: [
            "Leave it there.",
            "Dispose waste properly and protect nature.",
            "Animals can eat plastic."
        ],
        answer: 1,
        puzzle: "NATURE"
    },
    science: {
        title: "Scientific Temper",
        content:
            "Think logically and verify facts scientifically.",
        scenario:
            "A message says keeping onions under your desk guarantees 100 marks.",
        mcq: [
            "Believe it immediately.",
            "Think scientifically and verify facts.",
            "Forward it to everyone."
        ],
        answer: 1,
        puzzle: "SCIENCE"
    },
    property: {
        title: "Protect Public Property",
        content:
            "Public property belongs to everyone and must be protected.",
        scenario:
            "A student damages school desks after getting low marks.",
        mcq: [
            "Destroying property is wrong.",
            "Breaking desks is acceptable.",
            "School money can repair everything."
        ],
        answer: 0,
        puzzle: "PROPERTY"
    }
};

// =====================================================
// LEVEL BASED FINAL QUIZ (SCENARIO QUESTIONS)
// =====================================================
const levelizedQuizData = [
    // LEVEL 1
    {
        level: 1,
        levelName: "🌟 Level 1 : School Basics",
        q:
        "Your teacher asks how many Fundamental Rights are guaranteed by the Constitution. What should you answer?",
        a: [
            "11 Rights",
            "6 Rights",
            "25 Rights"
        ],
        c: 1
    },
    {
        level: 1,
        levelName: "🌟 Level 1 : School Basics",
        q:
        "A Class 6 student asks the age group covered under Right to Education. Which answer is correct?",
        a: [
            "3–10 years",
            "6–14 years",
            "18–21 years"
        ],
        c: 1
    },
    {
        level: 1,
        levelName: "🌟 Level 1 : School Basics",
        q:
        "Students are reminded not to damage desks and buses. Which duty does this represent?",
        a: [
            "Protect Public Property",
            "Freedom of Religion",
            "Right to Equality"
        ],
        c: 0
    },
    // LEVEL 2
    {
        level: 2,
        levelName: "🚀 Level 2 : Civic Application",
        q:
        "A child is forced to work in a dangerous factory. Which right protects the child?",
        a: [
            "Freedom of Religion",
            "Right against Exploitation",
            "Right to Property"
        ],
        c: 1
    },
    {
        level: 2,
        levelName: "🚀 Level 2 : Civic Application",
        q:
        "A viral message spreads false information. What should responsible students do?",
        a: [
            "Forward it immediately",
            "Verify facts scientifically",
            "Believe everything online"
        ],
        c: 1
    },
    {
        level: 2,
        levelName: "🚀 Level 2 : Civic Application",
        q:
        "Different religions celebrate different festivals peacefully. What does this show?",

        a: [
            "Respect for all religions",
            "Only one religion matters",
            "Festivals should be banned"
        ],
        c: 0
    },
    // LEVEL 3
    {
        level: 3,
        levelName: "🏆 Level 3 : Constitution Hero",
        q:
        "Who is known as the Father of the Indian Constitution?",
        a: [
            "Mahatma Gandhi",
            "Dr. B.R. Ambedkar",
            "Jawaharlal Nehru"
        ],
        c: 1
    },
    {
        level: 3,
        levelName: "🏆 Level 3 : Constitution Hero",
        q:
        "India celebrates Republic Day because the Constitution came into force in:",
        a: [
            "1947",
            "1950",
            "1956"
        ],
        c: 1
    },
    {
        level: 3,
        levelName: "🏆 Level 3 : Constitution Hero",
        q:
        "Which right allows citizens to approach courts when their rights are violated?",
        a: [
            "Right to Equality",
            "Right to Constitutional Remedies",
            "Right against Exploitation"
        ],
        c: 1
    }
];
// =====================================================
// PART 2 : NAVIGATION + TOPIC LOADING + MCQ + PUZZLE
// =====================================================
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add("active");
    }
    if (pageId === "rights") activeModuleTrack = "rights";
    if (pageId === "duties") activeModuleTrack = "duties";
    window.scrollTo(0, 0);
}
// =====================================================
function goBackToModuleGroup() {
    showPage(activeModuleTrack);
}
// =====================================================
function loadTopic(topicKey) {
    currentTopic = topics[topicKey];
    if (!currentTopic) return;
    showPage("learning");
    document.getElementById("topicTitle").innerText =
        currentTopic.title;
    document.getElementById("topicContent").innerText =
        currentTopic.content;
    document.getElementById("scenarioText").innerText =
        currentTopic.scenario;
    // Clear previous game feedback
    if(document.getElementById("mcqFeedback")){
        document.getElementById("mcqFeedback").innerText = "";
    }
    if(document.getElementById("puzzleResult")){
        document.getElementById("puzzleResult").innerText = "";
    }
    if(document.getElementById("puzzleAnswer")){
        document.getElementById("puzzleAnswer").value = "";
    }
}
// =====================================================
// SCENARIO MCQ GAME
// =====================================================
function startMCQ() {
    showPage("mcqGame");
    document.getElementById("mcqFeedback").innerHTML = "";
    document.getElementById("mcqQuestion").innerText =
        currentTopic.scenario;
    let optionArea = document.getElementById("mcqOptions");
    optionArea.innerHTML = "";
    currentTopic.mcq.forEach((optionText, index) => {
        let btn = document.createElement("button");
        btn.innerText = optionText;
        btn.onclick = () => {
            if (index === currentTopic.answer) {
                appPoints++;
                document.getElementById("mcqFeedback").innerHTML =
                    "<span style='color:green;'>✅ Excellent! (+1 Point)</span>";
            } else {
                document.getElementById("mcqFeedback").innerHTML =
                    "<span style='color:#dd6b20;'>❌ Try Again!</span>";
            }
        };
        optionArea.appendChild(btn);
    });
}
// =====================================================
// WORD PUZZLE
// =====================================================
function startPuzzle() {
    showPage("puzzleGame");
    document.getElementById("puzzleResult").innerText = "";
    document.getElementById("puzzleAnswer").value = "";
    let word = currentTopic.puzzle;
    let mixedWord =
        word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    while (mixedWord === word && word.length > 1) {
        mixedWord =
            word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }
    document.getElementById("scrambledWord").innerText =
        mixedWord;
}
// =====================================================
function checkPuzzle() {
    let answer =
        document
        .getElementById("puzzleAnswer")
        .value
        .trim()
        .toUpperCase();
    if (answer === currentTopic.puzzle) {
        appPoints++;
        document.getElementById("puzzleResult").innerHTML =
            "<span style='color:green;'>✅ Correct! (+1 Point)</span>";
    }
    else {
        document.getElementById("puzzleResult").innerHTML =
            "<span style='color:#dd6b20;'>❌ Incorrect. Try Again.</span>";
    }
}
// ====================================================
// START FINAL QUIZ
// =====================================================
function startQuiz() {
    globalQuizIndex = 0;
    answeredCurrentQuestion = false;
    showPage("quizPage");
    renderLevelizedQuestion();
}
// =====================================================
// PART 3 : FINAL QUIZ ENGINE + PROGRESS BAR
// =====================================================
function renderLevelizedQuestion() {
    // Quiz finished
    if (globalQuizIndex >= levelizedQuizData.length) {
        displayFinalPerformanceMetrics();
        return;
    }
    // ---------- LEVEL COMPLETION POPUPS ----------
    if (globalQuizIndex === 3) {
        showLevelPopup(
            "🌟",
            "Great Work!",
            "Level 1 completed! Keep going, Constitution Explorer!"
        );
        if (!earnedBadges.includes("🌟 Constitution Explorer")) {
            earnedBadges.push("🌟 Constitution Explorer");
        }
    }
    if (globalQuizIndex === 6) {
        showLevelPopup(
            "🚀",
            "Awesome Progress!",
            "Level 2 completed! You are becoming a Civic Champion!"
        );
        if (!earnedBadges.includes("🚀 Civic Champion")) {
            earnedBadges.push("🚀 Civic Champion");
        }
    }
    answeredCurrentQuestion = false;
    let currentQuestion =
        levelizedQuizData[globalQuizIndex];
    // ---------- LEVEL LABEL ----------
    document.getElementById("quizLevelBadge").innerText =
        currentQuestion.levelName;
    // ---------- QUESTION COUNT ----------
    document.getElementById("quizProgressTracker").innerText =
        "Question " +
        (globalQuizIndex + 1) +
        "/" +
        levelizedQuizData.length;
    // ---------- QUESTION ----------
    document.getElementById("question").innerText =
        currentQuestion.q;
    // ---------- PROGRESS BAR ----------
    let progress =
        (globalQuizIndex / levelizedQuizData.length) * 100;
    document.getElementById("progressBar").style.width =
        progress + "%";
    // ---------- CLEAR OLD OPTIONS ----------
    let answerArea =
        document.getElementById("answers");
    answerArea.innerHTML = "";
    document.getElementById(
        "quizRuntimeFeedback"
    ).innerHTML = "";
    // ---------- CREATE OPTION BUTTONS ----------
    currentQuestion.a.forEach((choice, index) => {
        let optionButton =
            document.createElement("button");
        optionButton.innerText = choice;
        optionButton.onclick = () => {
            // Prevent double clicking
            if (answeredCurrentQuestion) return;
            answeredCurrentQuestion = true;
            if (index === currentQuestion.c) {
                appPoints++;
                document.getElementById(
                    "quizRuntimeFeedback"
                ).innerHTML =
                "<span style='color:green;'>✅ Correct Answer!</span>";
            }
            else {
                document.getElementById(
                    "quizRuntimeFeedback"
                ).innerHTML =
                "<span style='color:#dd6b20;'>❌ Incorrect Answer</span>";
            }
            // Move to next question automatically
            setTimeout(() => {
                globalQuizIndex++;
                renderLevelizedQuestion();
            }, 1200);
        };
        answerArea.appendChild(optionButton);
    });
}
// =====================================================
// PART 4 : POPUPS + RESULTS + CERTIFICATE + RESET
// =====================================================
// ---------------- POPUP ----------------

function showLevelPopup(emoji, title, message) {
    document.getElementById("popupEmoji").innerText = emoji;
    document.getElementById("popupTitle").innerText = title;
    document.getElementById("popupMessage").innerText = message;
    document.getElementById("levelPopup").style.display = "flex";
}
function closeLevelPopup() {
    document.getElementById("levelPopup").style.display = "none";
}
// =====================================================
// FINAL RESULT
// =====================================================
function displayFinalPerformanceMetrics() {
    showPage("resultPage");
    // Final Hero Badge
    if (!earnedBadges.includes("🏆 Constitution Hero")) {
        earnedBadges.push("🏆 Constitution Hero");
    }
    // Final Score
    document.getElementById("finalScore").innerText =
        "Score : " + appPoints;
    // Performance Message
    let performanceText = "";
    if (appPoints >= 10) {
        performanceText =
            "🏆 Constitution Hero";
    }
    else if (appPoints >= 7) {
        performanceText =
            "🚀 Civic Champion";
    }
    else if (appPoints >= 4) {
        performanceText =
            "🌟 Constitution Explorer";
    }
    else {
        performanceText =
            "🙂 Keep Practicing";
    }
    document.getElementById("badge").innerText =
        performanceText;
    // Badge Collection
    let badgeContainer =
        document.getElementById("badgeCollection");
    badgeContainer.innerHTML = "";
    earnedBadges.forEach(badge => {
        badgeContainer.innerHTML +=    `
        <div class="badge-card">
            ${badge}
        </div>
        `;
    });

}
// =====================================================
// CERTIFICATE PAGE
// =====================================================
function showCertificate() {
    showPage("certificatePage");
    let studentNameInput =
        document.getElementById("studentName");
    let studentName = "Student";
    if (studentNameInput &&
        studentNameInput.value.trim() !== "") {
        studentName =
            studentNameInput.value;
    }
    document.getElementById(
        "certificateStudentName"
    ).innerText = studentName;
    document.getElementById(
        "certificateScore"
    ).innerText =
    "Final Score : " + appPoints;
    document.getElementById(
        "certificateBadge"
    ).innerText =
    document.getElementById("badge").innerText;
    document.getElementById(
        "certificateDate"
    ).innerText =
    "Date : " + new Date().toLocaleDateString();

}
// =====================================================
// RESET GAME
// =====================================================
function resetStateAndHome() {
    appPoints = 0;
    globalQuizIndex = 0;
    answeredCurrentQuestion = false;
    earnedBadges = [];
    currentTopic = {};
    document.getElementById(
        "quizRuntimeFeedback"
    ).innerHTML = "";
    document.getElementById(
        "mcqFeedback"
    ).innerHTML = "";
    document.getElementById(
        "puzzleResult"
    ).innerHTML = "";
    // Reset progress bar
    if (document.getElementById("progressBar")) {
        document.getElementById(
            "progressBar"
        ).style.width = "0%";
    }
    showPage("welcome");
}
// =====================================================
// DEFAULT PAGE
// =====================================================
showPage("welcome");
