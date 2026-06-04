let appPoints = 0;
let currentTopic = {};
let activeModuleTrack = 'rights';

/* ============================================================================
   📚 COMPREHENSIVE TEXTBOOK DATABASE: 6 RIGHTS & 11 DUTIES FOR MIDDLE SCHOOL
   ============================================================================ */
const topics = {
    // --- THE 6 FUNDAMENTAL RIGHTS ---
    equality: {
        title: "Right to Equality",
        content: "Every citizen has the same rights. The government and laws cannot discriminate against anyone because of their gender, religion, caste, or rich/poor status.",
        scenario: "Your school creates an advanced computer workshop, but says only boys can join while girls are assigned to manual cleaning duties. What right is broken?",
        mcq: ["Right to Freedom", "Right to Equality", "Right against Exploitation"],
        answer: 1,
        puzzle: "EQUALITY"
    },
    freedom: {
        title: "Right to Freedom",
        content: "You have the freedom to speak your mind respectfully, gather peacefully for meetings, move around any state in India, and live where you like safely.",
        scenario: "A group of middle school students wants to print a student newsletter discussing better eco-friendly methods for handling mid-day meal waste.",
        mcq: ["The school must ban all child opinions.", "Students have the freedom to express helpful ideas respectfully.", "Kids only get freedom when they turn 18."],
        answer: 1,
        puzzle: "FREEDOM"
    },
    exploitation: {
        title: "Right against Exploitation",
        content: "This law makes it illegal to treat people like slaves, force adults to work without pay, or make children under 14 work in dangerous jobs or factories.",
        scenario: "An 11-year-old child named Rohan is forced by a workshop owner to sew leather footballs for 12 hours a day instead of going to school.",
        mcq: ["This is a violation under the Right against Exploitation.", "This is fine if Rohan wants money.", "Only older factories have rules."],
        answer: 0,
        puzzle: "JUSTICE"
    },
    religion: {
        title: "Freedom of Religion",
        content: "India is a secular country. This means every person has the complete choice to follow, practice, and celebrate any religion they believe in.",
        scenario: "A housing colony tells a family they cannot rent a flat because they celebrate a different festival than the rest of the building.",
        mcq: ["Colonies have absolute right to pick matching groups.", "This breaks the Freedom of Religion; everyone can practice their faith.", "Families must change their holiday schedules."],
        answer: 1,
        puzzle: "SECULAR"
    },
    culture: {
        title: "Cultural & Educational Rights",
        content: "This right allows different minority communities to protect their unique language, script, and cultural heritage by setting up their own schools.",
        scenario: "A student who speaks a unique minority language is denied entry into a state school because they do not speak the local state language at home.",
        mcq: ["Denying them entry breaks their Cultural and Educational Rights.", "Schools should only allow one single majority culture.", "Students must drop their family traditions to get an education."],
        answer: 0,
        puzzle: "CULTURE"
    },
    remedies: {
        title: "Right to Constitutional Remedies",
        content: "This is the protector right! If any citizen feels their fundamental rights are being stripped away by someone or even the police, they can go straight to court.",
        scenario: "An innocent citizen's peaceful book club is locked up without reason. They want to use the legal system to secure their immediate release.",
        mcq: ["They have to accept it.", "They can use the Right to Constitutional Remedies to ask a judge for protection.", "Courts do not help individual citizens."],
        answer: 1,
        puzzle: "REMEDY"
    },

    // --- THE 11 FUNDAMENTAL DUTIES ---
    symbols: {
        title: "Respect Flag, Anthem & Constitution",
        content: "We must follow the rules of the Constitution and show perfect respect to our National Flag and the National Anthem.",
        scenario: "The National Anthem starts playing on the PA system during morning assembly. Some students are laughing and tossing water bottles.",
        mcq: ["Laughing is fine if assembly hasn't officially started.", "It is our duty to stand proudly at attention to respect national symbols.", "Students can walk away if they are bored."],
        answer: 1,
        puzzle: "ANTHEM"
    },
    ideals: {
        title: "Follow Noble Freedom Ideals",
        content: "We should remember and practice the great principles of peace, truth, and unity that our freedom fighters used to win India's independence.",
        scenario: "A class project asks students to study how Mahatma Gandhi used non-violence and truth to unite people.",
        mcq: ["Ignore it; history has no value today.", "Learning and following these noble freedom values fulfills our civic duty.", "Only politicians need to know about freedom history."],
        answer: 1,
        puzzle: "IDEALS"
    },
    sovereignty: {
        title: "Protect Unity & Sovereignty",
        content: "We must guard and protect the sovereignty, oneness, and total integrity of India as a united country.",
        scenario: "An online post tries to create bad rumors to separate different Indian states from working together during a national crisis.",
        mcq: ["We should share the rumors.", "We should stand together to protect our nation's shared strength and unity.", "States should work completely separately."],
        answer: 1,
        puzzle: "UNITY"
    },
    defense: {
        title: "Defend Nation & Serve When Called",
        content: "Every citizen must be ready to defend the country and help with national community services whenever the nation needs them.",
        scenario: "A massive flood hits a city district, and local volunteer teams ask student youth groups to help sort food distribution packets.",
        mcq: ["Helping out directly matches our fundamental duty to serve the nation.", "Volunteering is a waste of study time.", "Only the army has to assist during natural disasters."],
        answer: 0,
        puzzle: "DEFEND"
    },
    harmony: {
        title: "Promote Brotherhood & Harmony",
        content: "We must live peacefully with everyone, treat all religions and languages with kindness, and stop practices that hurt the dignity of women.",
        scenario: "A new student joins your school from another state. Some kids make fun of their language accent during lunch recess.",
        mcq: ["Recess teasing is normal.", "We must stop the teasing, build brotherhood, and make them feel welcome.", "The new student should stay quiet."],
        answer: 1,
        puzzle: "HARMONY"
    },
    heritage: {
        title: "Value Our Rich Heritage Culture",
        content: "India has a rich mix of culture, monuments, arts, and traditions. It is our duty to value, respect, and look after it.",
        scenario: "During a class trip to an ancient stone fort, you see a student taking out a coin to scratch their initials into the historic wall.",
        mcq: ["Let them do it, it's just a stone marker.", "Stop them and explain it is our duty to protect our rich historical heritage.", "Join them to mark your name too."],
        answer: 1,
        puzzle: "HERITAGE"
    },
    environment: {
        title: "Protect Forests, Lakes & Wildlife",
        content: "We must protect and improve nature, including our wildlife, green forests, clean rivers, and local parks, and show kindness to animals.",
        scenario: "You notice visitors at a public nature park feeding plastic wrappers to deer and dropping trash near a freshwater stream.",
        mcq: ["Park rangers will clean it later.", "We should throw trash into bins and protect our environment as part of our basic duty.", "Animals can eat plastic safely."],
        answer: 1,
        puzzle: "NATURE"
    },
    science: {
        title: "Build Scientific Temper & Logic",
        content: "This means developing a habit of asking logical questions, thinking scientifically, verifying data, and refusing to believe blind superstitions.",
        scenario: "An online chain message claims that keeping an onion under your school desk guarantees scoring 100% on your math test.",
        mcq: ["Test the rumor because it sounds easy.", "Think logically, verify facts with science, and rely on real study preparation.", "Forward the message to your entire class immediately."],
        answer: 1,
        puzzle: "SCIENCE"
    },
    property: {
        title: "Safeguard Public Property Safely",
        content: "Public property like state buses, trains, government schools, and public parks belong to everyone. We must keep them safe and avoid violence.",
        scenario: "A student gets upset about a test grade and decides to scratch lines onto their school desk and tear down classroom wall charts.",
        mcq: ["School properties belong to everyone; destroying them is wrong and breaks our civic duty.", "It is okay to break desks if you are sad.", "Desks can be repaired easily by using school funds."],
        answer: 0,
        puzzle: "PROPERTY"
    },
    excellence: {
        title: "Strive for Group Excellence",
        content: "We must always work hard to do our best in everything we try, helping our country climb higher in achievements and skills.",
        scenario: "Your student science group decides to spend an extra hour every week refining their rocket project for a national competition.",
        mcq: ["Working hard for team excellence helps our nation grow proud and clever.", "Extra work makes students tired.", "Aim for minimal passing effort instead."],
        answer: 0,
        puzzle: "EXCEL"
    },
    parentDuty: {
        title: "Parent Duty: Send Kids to School",
        content: "Added by the 86th Amendment, this duty tells parents and legal guardians that they must ensure their children aged 6 to 14 go to school.",
        scenario: "A local guardian stops their 9-year-old ward from attending primary school lessons to keep them home for daily housework.",
        mcq: ["Guardians have absolute power to block school trips.", "Every parent/guardian has a core duty to give their child educational learning chances.", "Primary school is completely optional for young children."],
        answer: 1,
        puzzle: "PARENTS"
    }
};

/* ============================================================================
   🏆 LEVELIZED FINAL PROGRESSIVE EXAM DATABASE (9 SCALED MIDDLE-SCHOOL ENTRIES)
   ============================================================================ */
const levelizedQuizData = [
    // --- LEVEL 1: THE BASICS (SCHOOL LIFE) ---
    {
        level: 1,
        levelName: "Level 1: School Basics",
        q: "How many Fundamental Rights are guaranteed to Indian citizens under the Constitution?",
        a: ["11 Rights", "6 Rights", "25 Rights"],
        c: 1
    },
    {
        level: 1,
        levelName: "Level 1: School Basics",
        q: "What is the primary age bracket for free and mandatory education under the Right to Education?",
        a: ["3 to 10 Years old", "6 to 14 Years old", "18 to 21 Years old"],
        c: 1
    },
    {
        level: 1,
        levelName: "Level 1: School Basics",
        q: "True or False: Is protecting our school desks and public buses a Fundamental Duty?",
        a: ["True, it is the duty to protect public property", "False, it is completely optional", "True, but only for adults"],
        c: 0
    },

    // --- LEVEL 2: CIVIC APPLICATION (COMMUNITY MANNERS) ---
    {
        level: 2,
        levelName: "Level 2: Civic Application",
        q: "What right protects a child from being forced to work in a dangerous firework factory?",
        a: ["Freedom of Religion", "Right against Exploitation", "Right to Property"],
        c: 1
    },
    {
        level: 2,
        levelName: "Level 2: Civic Application",
        q: "If you try to think logically, check facts with real data, and avoid blind superstitions, you are using:",
        a: ["A Scientific Temper", "A Cultural Right", "A Freedom Speech Option"],
        c: 0
    },
    {
        level: 2,
        levelName: "Level 2: Civic Application",
        q: "What does the word 'Secular' mean in our Indian constitutional rules?",
        a: ["Only one official religion is protected", "The nation respects all religions equally", "Religions are banned from schools"],
        c: 1
    },

    // --- LEVEL 3: CONSTITUTION HERO (EXPERT INSIGHTS) ---
    {
        level: 3,
        levelName: "Level 3: Expert Hero",
        q: "Which major national leader is known as the principal architect or 'Father of the Indian Constitution'?",
        a: ["Mahatma Gandhi", "Dr. B.R. Ambedkar", "Pandit Jawaharlal Nehru"],
        c: 1
    },
    {
        level: 3,
        levelName: "Level 3: Expert Hero",
        q: "In which year did the Constitution of India come into force, which we celebrate as Republic Day?",
        a: ["1947", "1950", "1956"],
        c: 1
    },
    {
        level: 3,
        levelName: "Level 3: Expert Hero",
        q: "If a person feels any of their Fundamental Rights have been broken by anyone, which right protects them to go directly to court?",
        a: ["Right to Equality", "Right to Constitutional Remedies", "Right against Exploitation"],
        c: 1
    }
];

let globalQuizIndex = 0;

/* ============================================================================
   CORE ROUTING ARCHITECTURE
   ============================================================================ */
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    
    const targetElement = document.getElementById(pageId);
    if (targetElement) {
        targetElement.classList.add("active");
    }
    
    if (pageId === 'rights') activeModuleTrack = 'rights';
    if (pageId === 'duties') activeModuleTrack = 'duties';
    
    window.scrollTo(0,0);
}

function goBackToModuleGroup() {
    showPage(activeModuleTrack);
}

/* ============================================================================
   TOPIC BINDING WORKFLOWS
   ============================================================================ */
function loadTopic(topicKey) {
    currentTopic = topics[topicKey];
    if (!currentTopic) return;
    
    showPage("learning");
    document.getElementById("topicTitle").innerText = currentTopic.title;
    document.getElementById("topicContent").innerText = currentTopic.content;
    document.getElementById("scenarioText").innerText = currentTopic.scenario;
    
    // Clear live feedback spaces from past sessions
    document.getElementById("mcqFeedback").innerText = "";
    document.getElementById("puzzleResult").innerText = "";
    document.getElementById("puzzleAnswer").value = "";
}

/* ============================================================================
   GAME ENGINE: MINI QUIZ PREPARATION
   ============================================================================ */
function startMCQ() {
    showPage("mcqGame");
    document.getElementById("mcqFeedback").innerText = "";
    document.getElementById("mcqQuestion").innerText = currentTopic.scenario;
    
    let optionsBox = document.getElementById("mcqOptions");
    optionsBox.innerHTML = "";
    
    currentTopic.mcq.forEach((textLine, idx) => {
        let btn = document.createElement("button");
        btn.innerText = textLine;
        btn.onclick = () => {
            if (idx === currentTopic.answer) {
                document.getElementById("mcqFeedback").innerHTML = "<span style='color:#138808;'>✅ Excellent Choice! You analyzed the situation correctly! (+1 Point)</span>";
                appPoints++;
            } else {
                document.getElementById("mcqFeedback").innerHTML = "<span style='color:#dd6b20;'>❌ That's not quite right. Read the concept description and try again!</span>";
            }
        };
        optionsBox.appendChild(btn);
    });
}

/* ============================================================================
   GAME ENGINE: WORD DECRYPTION
   ============================================================================ */
function startPuzzle() {
    showPage("puzzleGame");
    document.getElementById("puzzleResult").innerText = "";
    document.getElementById("puzzleAnswer").value = "";
    
    let targetKeyword = currentTopic.puzzle;
    let mixedCharacters = targetKeyword.split('').sort(() => Math.random() - 0.5).join('');
    
    // Make sure the word is actually scrambled
    while (mixedCharacters === targetKeyword && targetKeyword.length > 1) {
        mixedCharacters = targetKeyword.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    document.getElementById("scrambledWord").innerText = mixedCharacters;
}

function checkPuzzle() {
    let cleanInput = document.getElementById("puzzleAnswer").value.trim().toUpperCase();
    if (cleanInput === currentTopic.puzzle) {
        document.getElementById("puzzleResult").innerHTML = "<span style='color:#138808;'>✅ Fantastic! You unscrambled the vocabulary correctly! (+1 Point)</span>";
        appPoints++;
    } else {
        document.getElementById("puzzleResult").innerHTML = "<span style='color:#dd6b20;'>❌ Oops! Spelling match missed. Look at the letters closely and try again!</span>";
    }
}

/* ============================================================================
   EXAM MATRIX SYSTEM: PROGRESSIVE SYSTEM
   ============================================================================ */
function startQuiz() {
    globalQuizIndex = 0;
    showPage("quizPage");
    renderLevelizedQuestion();
}

function renderLevelizedQuestion() {
    document.getElementById("quizRuntimeFeedback").innerText = "";
    
    if (globalQuizIndex >= levelizedQuizData.length) {
        displayFinalPerformanceMetrics();
        return;
    }
    
    let activeQuestionNode = levelizedQuizData[globalQuizIndex];
    
    document.getElementById("quizLevelBadge").innerText = activeQuestionNode.levelName;
    document.getElementById("quizProgressTracker").innerText = `Question ${globalQuizIndex + 1} of ${levelizedQuizData.length}`;
    document.getElementById("question").innerText = activeQuestionNode.q;
    
    let optionsDock = document.getElementById("answers");
    optionsDock.innerHTML = "";
    
    activeQuestionNode.a.forEach((optionString, optionIndex) => {
        let optBtn = document.createElement("button");
        optBtn.innerText = optionString;
        optBtn.onclick = () => {
            if (optionIndex === activeQuestionNode.c) {
                appPoints += 2; // Levelized exam questions grant double weights
                document.getElementById("quizRuntimeFeedback").innerHTML = "<span style='color:#138808;'>⭐ Smart Answer! Leveling up...</span>";
            } else {
                document.getElementById("quizRuntimeFeedback").innerHTML = "<span style='color:#dd6b20;'>❌ Incorrect. Keep moving to practice more!</span>";
            }
            
            // Short timeout so kids can read their answer status before moving on
            setTimeout(() => {
                globalQuizIndex++;
                renderLevelizedQuestion();
            }, 800);
        };
        optionsDock.appendChild(optBtn);
    });
}

/* ============================================================================
   FINAL EVALUATOR AND CALCULATOR CONTROL
   ============================================================================ */
function displayFinalPerformanceMetrics() {
    showPage("resultPage");
    document.getElementById("finalScore").innerText = "Total Score: " + appPoints + " Points";
    
    let outcomeLabel = "";
    if (appPoints <= 6) {
        outcomeLabel = "🥉 Civic Learner Badge";
    } else if (appPoints <= 15) {
        outcomeLabel = "🥈 Constitution Defender Badge";
    } else {
        outcomeLabel = "🥇 Supreme Constitution Hero Laurels!";
    }
    
    document.getElementById("badge").innerText = outcomeLabel;
}

function resetStateAndHome() {
    appPoints = 0;
    globalQuizIndex = 0;
    currentTopic = {};
    showPage("welcome");
}