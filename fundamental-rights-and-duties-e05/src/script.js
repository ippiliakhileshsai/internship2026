// =======================
// SPIDEY CIVICS GUARDIAN
// =======================

let xp = Number(localStorage.getItem("xp")) || 0;
let lives = 3;
let highScore = Number(localStorage.getItem("highScore")) || 0;
let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;
let correctCount = Number(localStorage.getItem("correctCount")) || 0;
let wrongCount = Number(localStorage.getItem("wrongCount")) || 0;

let badges =
JSON.parse(localStorage.getItem("badges")) || [];

let scoreHistory =
JSON.parse(localStorage.getItem("scoreHistory")) || [];

let currentQuestion = 0;
let currentLevel = "Beginner";
let playerName = localStorage.getItem("playerName") || "";
let activeTheme = localStorage.getItem("activeTheme") || "spiderman";
let activeAvatar = localStorage.getItem("activeAvatar") || "🦸‍♂️";

// =======================
// QUESTIONS
// =======================

// LEVEL-BASED QUESTIONS
const allQuestions = {
  Beginner: [
    {
      question: "Scenario: A new student from another state joins your class. Some classmates refuse to sit next to them because of their origin. Which value of our Constitution is violated here?",
      options: ["Right to Equality & Non-discrimination", "Right to Freedom of Religion"],
      answer: 0,
      hint: "Our Constitution guarantees that no citizen can be discriminated against based on place of birth, gender, or caste."
    },
    {
      question: "Scenario: Raju, a 12-year-old boy, is forced to work in a local tea shop all day instead of going to school. Which right is being violated here?",
      options: ["Right to Education and protection against Child Labor", "Right to Freedom of Speech"],
      answer: 0,
      hint: "The Constitution guarantees free and compulsory education for all children aged 6 to 14, and bans child labor."
    },
    {
      question: "Scenario: Simran wants to write a polite article for the school magazine sharing her ideas on water conservation, but a teacher says students cannot voice opinions. Which right is restricted here?",
      options: ["Right to Freedom of Speech and Expression", "Right to Equality"],
      answer: 0,
      hint: "Every citizen has the right to express their thoughts, opinions, and ideas peacefully."
    },
    {
      question: "Scenario: During recess, you see a group of students scribbling their names on the school walls and damaging the desks. Which fundamental duty should they remember?",
      options: ["Duty to safeguard public property", "Duty to defend the country"],
      answer: 0,
      hint: "Public property, like school buildings, parks, and buses, belongs to everyone and must be protected."
    },
    {
      question: "Scenario: Some students refuse to let girls play football on the playground, claiming sports are only for boys. This goes against:",
      options: ["Gender Equality and Right to Equality", "Freedom of Occupation"],
      answer: 0,
      hint: "The Constitution treats all genders equally and forbids gender discrimination."
    },
    {
      question: "Scenario: Amit is told he cannot enter a public park because of his family's caste background. Which fundamental right protects Amit's access to public spaces?",
      options: ["Right to Equality (Access to public places)", "Right to Constitutional Remedies"],
      answer: 0,
      hint: "Article 15 ensures equal access to public places, shops, restaurants, parks, and wells for all citizens."
    },
    {
      question: "Scenario: Your classmate, Sarah, follows a different religion and wants to pray quietly during break time. Some students try to stop her. Which constitutional value protects Sarah?",
      options: ["Secularism & Freedom of Religion", "Right to Information"],
      answer: 0,
      hint: "India is a secular country, which means everyone has the freedom to practice their own religion."
    },
    {
      question: "Scenario: Ananya sees plastic bottles and wrappers littered all over a nearby national park. What fundamental duty should citizens remember here?",
      options: ["Duty to protect and improve the natural environment", "Duty to respect the national flag"],
      answer: 0,
      hint: "It is our duty to protect forests, lakes, rivers, and wildlife, and show compassion for living creatures."
    },
    {
      question: "Scenario: When playing games, the team captain decides all the rules without asking anyone else. In a democracy, decisions should be made:",
      options: ["Collectively through discussion and voting", "By the strongest person only"],
      answer: 0,
      hint: "Democracy means power lies with the people, and decisions are made through collective discussion and consensus."
    },
    {
      question: "Scenario: A factory in a neighborhood is dumping toxic chemicals into a local drinking water pond. Which right of the local residents is being violated?",
      options: ["Right to clean environment (part of Right to Life)", "Right to Freedom of Assembly"],
      answer: 0,
      hint: "The Supreme Court has ruled that the Right to Life includes the right to pollution-free water and air."
    }
  ],
  Intermediate: [
    {
      question: "Scenario: A local government office decides to only hire male officers for administrative roles. Can a female candidate challenge this in court?",
      options: ["Yes, under Right to Equality in public employment", "No, governments can choose whoever they want"],
      answer: 0,
      hint: "Article 16 guarantees equal opportunity in public employment regardless of gender."
    },
    {
      question: "Scenario: A group of peaceful villagers are protesting against a factory that polluted their fields, but the local police stops them from gathering. Which right is affected?",
      options: ["Right to assemble peacefully without arms", "Right to reside in any part of the country"],
      answer: 0,
      hint: "The Right to Freedom includes the right to assemble peacefully and form associations."
    },
    {
      question: "Scenario: A 13-year-old girl is forced by her family to stop studying and get married. This violates the Prohibition of Child Marriage and which right?",
      options: ["Right to Education (Article 21A)", "Right to Freedom of Religion"],
      answer: 0,
      hint: "Education is free and compulsory for all children up to the age of 14."
    },
    {
      question: "Scenario: A state government orders that all students must study a particular religious text in government-run schools. Is this allowed?",
      options: ["No, government schools cannot provide religious instruction", "Yes, it helps children learn moral values"],
      answer: 0,
      hint: "Under Article 28, no religious instruction can be provided in any educational institution wholly maintained out of State funds."
    },
    {
      question: "Scenario: An activist notices that a group of migrants from another state are paid half the wages of local laborers for the same work. This violates:",
      options: ["Right to Equality and Fair Wages", "Right to Freedom of Trade"],
      answer: 0,
      hint: "Article 39 of Directive Principles and Right to Equality advocate for equal pay for equal work."
    },
    {
      question: "Scenario: A child's father is arrested by the police but is not told why, and is kept in the police station for two days without seeing a judge. This violates:",
      options: ["Right to protection against arbitrary arrest (Article 22)", "Right to Equality (Article 14)"],
      answer: 0,
      hint: "Arrested persons must be informed of the grounds of arrest and produced before a magistrate within 24 hours."
    },
    {
      question: "Scenario: A builder wants to cut down a local community forest to build high-rise apartments. The tribal community claims they have a right to protect their culture and forest. Which right helps them?",
      options: ["Cultural and Educational Rights (Article 29-30)", "Right to Property"],
      answer: 0,
      hint: "Minorities have the right to conserve their distinct language, script, or culture."
    },
    {
      question: "Scenario: You discover that a nearby restaurant uses children to wash dishes late at night. Which authority should you report this to under which right?",
      options: ["Child Helpline under Right against Exploitation", "Police under Right to Freedom"],
      answer: 0,
      hint: "Article 24 bans employment of children under 14 in factories, mines, or hazardous occupations."
    },
    {
      question: "Scenario: If a citizen believes that their fundamental rights are violated by a new law passed by the government, where can they go?",
      options: ["Directly to the Supreme Court or High Court", "Only to their local municipal office"],
      answer: 0,
      hint: "Article 32 (Right to Constitutional Remedies) allows citizens to approach courts directly to enforce rights."
    },
    {
      question: "Scenario: A city is facing an election, but some residents are told they cannot vote because they do not own property. This violates which democratic principle?",
      options: ["Universal Adult Suffrage (Equal voting rights for all adults)", "Right to Freedom of Speech"],
      answer: 0,
      hint: "Every Indian citizen aged 18 or above has the right to vote, regardless of wealth, gender, or education."
    }
  ],
  Advanced: [
    {
      question: "Scenario: The Parliament passes a law that bans citizens from criticizing any government policy on social media. Can the Supreme Court strike down this law?",
      options: ["Yes, using Judicial Review as it violates Freedom of Speech", "No, laws passed by Parliament are supreme and absolute"],
      answer: 0,
      hint: "Courts can declare a law unconstitutional if it violates Fundamental Rights."
    },
    {
      question: "Scenario: An environment group files a court case on behalf of poor villagers whose health is suffering due to factory smoke, even though the villagers didn't file it themselves. What is this called?",
      options: ["Public Interest Litigation (PIL)", "Writ of Habeas Corpus"],
      answer: 0,
      hint: "PIL allows any public-spirited individual to file a case for those who cannot approach courts themselves."
    },
    {
      question: "Scenario: During a national emergency, the government temporarily suspends the right to assemble in public. Is this constitutionally valid?",
      options: ["Yes, certain rights can be restricted for national security", "No, fundamental rights can never be restricted under any emergency"],
      answer: 0,
      hint: "The Constitution allows reasonable restrictions on freedoms during a declared emergency."
    },
    {
      question: "Scenario: A state law requires citizens to obtain permission from a local committee before they can change their religion. Which right is examined under this law?",
      options: ["Right to Freedom of Religion (Article 25)", "Right to Cultural Rights"],
      answer: 0,
      hint: "Article 25 guarantees the freedom of conscience and free profession, practice, and propagation of religion."
    },
    {
      question: "Scenario: A school principal says that a minority community cannot start their own school in the town to teach their language. Which right protects the community?",
      options: ["Right of minorities to establish educational institutions (Article 30)", "Right to Freedom of Movement"],
      answer: 0,
      hint: "Article 30 guarantees minorities the right to establish and administer educational institutions of their choice."
    },
    {
      question: "Scenario: A person is caught for a crime, and the police beat them to force them to confess. In court, can this forced confession be used as evidence?",
      options: ["No, Article 20 protects against self-incrimination (forcing someone to witness against themselves)", "Yes, if the police verified it later"],
      answer: 0,
      hint: "Article 20(3) says no person accused of an offense shall be compelled to be a witness against himself."
    },
    {
      question: "Scenario: A government department refuses to share documents about how public school funds were spent with a parent group. Which act helps the parents obtain this data?",
      options: ["Right to Information (RTI) Act", "Right to Education Act"],
      answer: 0,
      hint: "RTI is an implied part of Freedom of Speech, allowing citizens to inspect public works and records."
    },
    {
      question: "Scenario: A state passes a law reserving 80% of government jobs for residents of one local district. Why might this be unconstitutional?",
      options: ["It violates equality of opportunity in public employment (Article 16)", "It violates the right to property"],
      answer: 0,
      hint: "Employment cannot be discriminated against based on place of birth or residence except as provided by Parliament."
    },
    {
      question: "Scenario: A judge rules that a citizen cannot be punished twice for the exact same offense. Which constitutional protection is this?",
      options: ["Protection against Double Jeopardy (Article 20)", "Protection against arbitrary arrest"],
      answer: 0,
      hint: "Article 20(2) states that no person shall be prosecuted and punished for the same offense more than once."
    },
    {
      question: "Scenario: A city municipality stops water supply to a slum area because the residents are poor. The residents sue the municipality. Which article will they cite for their Right to Water?",
      options: ["Article 21 (Right to Life, which includes basic necessities)", "Article 19 (Right to Freedom of Speech)"],
      answer: 0,
      hint: "The judiciary has interpreted Right to Life as the right to live with human dignity, including access to clean water, health, and shelter."
    }
  ]
};

let questions = allQuestions.Beginner;

// =======================
// UTILITY FUNCTIONS
// =======================

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  let arr = [...array]; // Create a copy
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// =======================
// LOAD UI
// =======================

function updateStats(){
  if (document.getElementById("xp")) document.getElementById("xp").textContent = xp;
  if (document.getElementById("lives")) document.getElementById("lives").textContent = lives;
  if (document.getElementById("highScore")) document.getElementById("highScore").textContent = highScore;
  
  if (document.getElementById("correctCount")) document.getElementById("correctCount").textContent = correctCount;
  if (document.getElementById("wrongCount")) document.getElementById("wrongCount").textContent = wrongCount;
  if (document.getElementById("gamesPlayed")) document.getElementById("gamesPlayed").textContent = gamesPlayed;
  
  // Update User Profile elements
  if (playerName) {
    if (document.getElementById("profileNameDisplay")) {
      document.getElementById("profileNameDisplay").textContent = playerName;
    }
    if (document.getElementById("profileAvatarDisplay")) {
      document.getElementById("profileAvatarDisplay").textContent = activeAvatar;
    }
    if (document.getElementById("profileThemeDisplay")) {
      document.getElementById("profileThemeDisplay").textContent = getThemeLabel(activeTheme);
    }
    if (document.getElementById("profileXpValue")) {
      document.getElementById("profileXpValue").textContent = xp;
    }
    if (document.getElementById("profileHighScoreValue")) {
      document.getElementById("profileHighScoreValue").textContent = highScore;
    }
    if (document.getElementById("profileLevelValue")) {
      document.getElementById("profileLevelValue").textContent = currentLevel;
    }
    
    let accuracy = (correctCount + wrongCount) > 0 ? Math.round((correctCount / (correctCount + wrongCount)) * 100) : 0;
    if (document.getElementById("profileAccuracyValue")) {
      document.getElementById("profileAccuracyValue").textContent = accuracy + "%";
    }
  }
  
  saveData();
}

function saveData(){
  localStorage.setItem("xp", xp);
  localStorage.setItem("highScore", highScore);
  localStorage.setItem("gamesPlayed", gamesPlayed);
  localStorage.setItem("correctCount", correctCount);
  localStorage.setItem("wrongCount", wrongCount);
  localStorage.setItem("badges", JSON.stringify(badges));
  localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
  localStorage.setItem("activeTheme", activeTheme);
  localStorage.setItem("activeAvatar", activeAvatar);
}

// =======================
// QUESTION
// =======================

function loadQuestion(){

if(currentQuestion >= questions.length){

finishGame();
return;

}

let q = questions[currentQuestion];

document.getElementById("question").textContent =
q.question;

document.getElementById("hintBox").innerHTML = "";

document.getElementById("feedback").innerHTML = "";

let optionDiv =
document.getElementById("options");

optionDiv.innerHTML = "";

// Create array of {option, originalIndex} pairs
let optionPairs = q.options.map((option, index) => ({
  text: option,
  originalIndex: index
}));

// Shuffle the options
let shuffledOptions = shuffleArray(optionPairs);

// Add shuffled options to the DOM
shuffledOptions.forEach((pair) => {

let btn =
document.createElement("button");

btn.classList.add("option-btn");

btn.textContent = pair.text;

btn.onclick = ()=>checkAnswer(pair.originalIndex, btn);

optionDiv.appendChild(btn);

});

updateProgress();

speakQuestion(q.question);

}

// =======================
// ANSWER
// =======================

function checkAnswer(selected, clickedButton){
  let q = questions[currentQuestion];
  let buttons = document.querySelectorAll(".option-btn");
  
  // Disable all option buttons immediately to prevent duplicate clicks
  buttons.forEach(btn => btn.style.pointerEvents = "none");
  
  if(selected === q.answer){
    clickedButton.classList.add("correct");
    xp += 10;
    correctCount++;
    document.getElementById("feedback").innerHTML = "✅ Correct! +10 XP";
    playSound("correctSound");
    shootWeb();
    checkBadges();
    updateStats();
    
    // Launch cartoon popup after a short transition delay
    setTimeout(() => {
      showCelebrationPopup();
    }, 800);
    
  }else{
    clickedButton.classList.add("wrong");
    lives--;
    wrongCount++;
    document.getElementById("feedback").innerHTML = "❌ Wrong Answer";
    playSound("wrongSound");
    updateStats();
    
    if(lives<=0){
      setTimeout(() => {
        gameOver();
      }, 1000);
      return;
    }
    
    setTimeout(()=>{
      currentQuestion++;
      loadQuestion();
    }, 1500);
  }
}

// =======================
// PROGRESS
// =======================

function updateProgress(){

let percent =
((currentQuestion+1)/questions.length)*100;

document.getElementById("progressBar").style.width =
percent+"%";

document.getElementById("progressText").textContent =
`Question ${currentQuestion+1} / ${questions.length}`;

}

// =======================
// BADGES
// =======================

const badgeData = {
  "Equality Defender": { icon: "⚖️", color: "#ff6b6b", desc: "3 Correct Answers" },
  "Education Hero": { icon: "📚", color: "#4ecdc4", desc: "5 Correct Answers" },
  "Duty Master": { icon: "🏆", color: "#ffd93d", desc: "8 Correct Answers" },
  "Perfect Score": { icon: "💯", color: "#6bcf7f", desc: "10/10 Correct!" },
  "Beginner Champion": { icon: "🌟", color: "#667eea", desc: "Beginner Level Complete" },
  "Intermediate Master": { icon: "⚡", color: "#f5576c", desc: "Intermediate Level Complete" },
  "Advanced Legend": { icon: "🔥", color: "#00d4ff", desc: "Advanced Level Complete" },
  "Quick Thinker": { icon: "⏱️", color: "#a855f7", desc: "Average 10s per question" },
  "Rights Guardian": { icon: "🛡️", color: "#2196f3", desc: "15 Correct Answers" },
  "Civics Master": { icon: "👑", color: "#ff9f43", desc: "25 Correct Answers" }
};

let consecutiveCorrect = 0;

function checkBadges(){

  // Correct answer count badges
  if(correctCount >= 3 && !badges.includes("Equality Defender")){
    badges.push("Equality Defender");
    showBadge("Equality Defender");
  }

  if(correctCount >= 5 && !badges.includes("Education Hero")){
    badges.push("Education Hero");
    showBadge("Education Hero");
  }

  if(correctCount >= 8 && !badges.includes("Duty Master")){
    badges.push("Duty Master");
    showBadge("Duty Master");
  }

  if(correctCount >= 15 && !badges.includes("Rights Guardian")){
    badges.push("Rights Guardian");
    showBadge("Rights Guardian");
  }

  if(correctCount >= 25 && !badges.includes("Civics Master")){
    badges.push("Civics Master");
    showBadge("Civics Master");
  }

  // Perfect game badge
  if(wrongCount === 0 && correctCount === 10 && !badges.includes("Perfect Score")){
    badges.push("Perfect Score");
    showBadge("Perfect Score");
  }

  // Level completion badges
  if(currentLevel === "Beginner" && correctCount >= 8 && !badges.includes("Beginner Champion")){
    badges.push("Beginner Champion");
    showBadge("Beginner Champion");
  }

  if(currentLevel === "Intermediate" && correctCount >= 8 && !badges.includes("Intermediate Master")){
    badges.push("Intermediate Master");
    showBadge("Intermediate Master");
  }

  if(currentLevel === "Advanced" && correctCount >= 8 && !badges.includes("Advanced Legend")){
    badges.push("Advanced Legend");
    showBadge("Advanced Legend");
  }

}

function showAllBadges(){
  let container = document.getElementById("badgeContainer");
  
  if(badges.length === 0){
    container.innerHTML = "No Badges Yet";
    return;
  }
  
  container.innerHTML = "";
  badges.forEach(badgeName => {
    let badgeInfo = badgeData[badgeName];
    if(badgeInfo){
      let badge = document.createElement("div");
      badge.classList.add("badge-item");
      badge.style.backgroundColor = badgeInfo.color;
      badge.innerHTML = `
        <div class="badge-icon">${badgeInfo.icon}</div>
        <div class="badge-name">${badgeName}</div>
        <div class="badge-desc">${badgeInfo.desc}</div>
      `;
      container.appendChild(badge);
    }
  });
}

function showBadge(name){

  playSound("badgeSound");

  let badgeInfo = badgeData[name];
  
  // Add to badge container
  let badge = document.createElement("div");
  badge.classList.add("badge-item");
  badge.style.backgroundColor = badgeInfo.color;
  badge.innerHTML = `
    <div class="badge-icon">${badgeInfo.icon}</div>
    <div class="badge-name">${name}</div>
    <div class="badge-desc">${badgeInfo.desc}</div>
  `;

  let container = document.getElementById("badgeContainer");
  
  // Clear "No Badges Yet" text
  if(container.textContent.includes("No Badges Yet")){
    container.innerHTML = "";
  }

  container.appendChild(badge);

  // Show popup notification
  showBadgePopup(name, badgeInfo);

}

function showBadgePopup(name, badgeInfo){
  let popup = document.createElement("div");
  popup.classList.add("badge-popup");
  popup.style.backgroundColor = badgeInfo.color;
  popup.innerHTML = `
    <div class="popup-icon">${badgeInfo.icon}</div>
    <div class="popup-title">🎉 Badge Earned!</div>
    <div class="popup-name">${name}</div>
    <div class="popup-desc">${badgeInfo.desc}</div>
  `;
  
  document.body.appendChild(popup);
  
  // Auto remove after 3 seconds
  setTimeout(()=>{
    popup.classList.add("fade-out");
    setTimeout(()=>popup.remove(), 500);
  }, 3000);
}

// =======================
// HINT
// =======================

let hintBtn = document.getElementById("hintBtn");
if(hintBtn){
  hintBtn.addEventListener("click",()=>{
    document.getElementById("hintBox").innerHTML =
    questions[currentQuestion].hint;
  });
}

// =======================
// LANGUAGE SELECTION
// =======================

// =======================
// LEVELS
// =======================

function setLevel(level){
  currentLevel = level;
  questions = allQuestions[level];
  currentQuestion = 0;
  
  document.getElementById("selectedLevel")
    .textContent =
    "Current Level: " + level;
  
  // Automatically start the quiz when level is selected
  startQuiz();
}

function selectAvatar(avatarEmoji, element) {
  activeAvatar = avatarEmoji;
  
  // Highlight selected avatar on welcome page
  const options = document.querySelectorAll(".avatar-option");
  options.forEach(opt => opt.classList.remove("selected"));
  if(element) {
    element.classList.add("selected");
  }
}

function selectTheme(themeName) {
  activeTheme = themeName;
  localStorage.setItem("activeTheme", activeTheme);
  
  applyTheme(themeName);
  
  // Update theme card active state across selectors
  const cards = document.querySelectorAll(".theme-card");
  cards.forEach(card => card.classList.remove("active"));
  
  const welcomeCardSpiderman = document.getElementById("themeCardSpiderman");
  const welcomeCardIronman = document.getElementById("themeCardIronman");
  const welcomeCardDora = document.getElementById("themeCardDora");
  
  const profileCardSpiderman = document.getElementById("profileThemeCardSpiderman");
  const profileCardIronman = document.getElementById("profileThemeCardIronman");
  const profileCardDora = document.getElementById("profileThemeCardDora");
  
  if(themeName === "spiderman") {
    if(welcomeCardSpiderman) welcomeCardSpiderman.classList.add("active");
    if(profileCardSpiderman) profileCardSpiderman.classList.add("active");
  } else if(themeName === "ironman") {
    if(welcomeCardIronman) welcomeCardIronman.classList.add("active");
    if(profileCardIronman) profileCardIronman.classList.add("active");
  } else if(themeName === "dora") {
    if(welcomeCardDora) welcomeCardDora.classList.add("active");
    if(profileCardDora) profileCardDora.classList.add("active");
  }
  
  const themeText = document.getElementById("profileThemeDisplay");
  if(themeText) {
    themeText.textContent = getThemeLabel(themeName);
  }
}

function applyTheme(themeName) {
  document.body.classList.remove("theme-spiderman", "theme-ironman", "theme-dora");
  document.body.classList.add("theme-" + themeName);
  
  let missionTitle = "🕷️ Your Mission";
  let missionText = "A mysterious villain is spreading unfairness and injustice in schools. Help Spidey defend Fundamental Rights and Duties to save the day!";
  let spiderEmoji = "🕷️";
  let mainTitle = "Civics Guardian";
  
  if(themeName === "ironman") {
    missionTitle = "⚡ Iron Shield Mission";
    missionText = "The AI defense grids are failing under corrupted laws. Join Iron Man to reinforce constitutional rights and secure the school city!";
    spiderEmoji = "🤖";
    mainTitle = "Iron Civics Guardian";
  } else if(themeName === "dora") {
    missionTitle = "🎒 Explorer's Adventure";
    missionText = "Swiper is trying to swipe the school rules! Join Dora and Backpack to discover fundamental duties and share equality with everyone!";
    spiderEmoji = "👧";
    mainTitle = "Dora's Civics Explorer";
  }
  
  const missionHeader = document.querySelector("#storyBox h3");
  if(missionHeader) missionHeader.innerHTML = missionTitle;
  
  const missionParagraph = document.querySelector("#storyBox p");
  if(missionParagraph) missionParagraph.innerHTML = missionText;
  
  const spiderElement = document.getElementById("spider");
  if(spiderElement) spiderElement.textContent = spiderEmoji;
  
  const headerTitle = document.querySelector("header h1");
  if(headerTitle) headerTitle.textContent = mainTitle;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getThemeLabel(themeName) {
  if(themeName === "spiderman") return "Spider-Man";
  if(themeName === "ironman") return "Iron Man";
  if(themeName === "dora") return "Dora Explorer";
  return themeName;
}

function saveProfileAndStart() {
  const nameInput = document.getElementById("playerName").value.trim();
  
  if(nameInput === "") {
    alert("Please enter your name!");
    return;
  }
  
  playerName = nameInput;
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("activeAvatar", activeAvatar);
  localStorage.setItem("activeTheme", activeTheme);
  
  if (document.getElementById("profileNameDisplay")) {
    document.getElementById("profileNameDisplay").textContent = playerName;
  }
  if (document.getElementById("profileAvatarDisplay")) {
    document.getElementById("profileAvatarDisplay").textContent = activeAvatar;
  }
  if (document.getElementById("profileThemeDisplay")) {
    document.getElementById("profileThemeDisplay").textContent = getThemeLabel(activeTheme);
  }
  
  document.getElementById("displayName").textContent = 
    "Welcome Hero, " + playerName + "! Let's begin your mission!";
  
  setTimeout(() => {
    resetUI();
  }, 800);
}

let celebrationTimeout;

function showCelebrationPopup() {
  const cartoonImg = document.getElementById("celebrationCartoonImg");
  const badgeImg = document.getElementById("celebrationBadgeImg");
  const title = document.getElementById("celebrationTitle");
  const subtext = document.getElementById("celebrationSubtext");
  
  if(activeTheme === "ironman") {
    cartoonImg.textContent = "🤖";
    badgeImg.textContent = "⚡";
    title.textContent = "Arc Reactor Power! ⚡";
    subtext.textContent = `Excellent, ${playerName}! Iron Man awards you the Power Core Badge!`;
  } else if(activeTheme === "dora") {
    cartoonImg.textContent = "👧";
    badgeImg.textContent = "⭐";
    title.textContent = "¡Excelente! 🎉";
    subtext.textContent = `¡Muy bien, ${playerName}! Dora and Backpack give you an Explorer Star!`;
  } else {
    cartoonImg.textContent = "🕷️";
    badgeImg.textContent = "🕸️";
    title.textContent = "Web-Tastic! 🕸️";
    subtext.textContent = `Amazing job, ${playerName}! Spider-Man awards you a Web Defender Badge!`;
  }
  
  const overlay = document.getElementById("celebrationOverlay");
  if(overlay) overlay.classList.add("active");
  
  playSound("badgeSound");
  
  celebrationTimeout = setTimeout(() => {
    closeCelebrationAndContinue();
  }, 2500);
}

function closeCelebrationAndContinue() {
  clearTimeout(celebrationTimeout);
  const overlay = document.getElementById("celebrationOverlay");
  if(overlay) overlay.classList.remove("active");
  
  currentQuestion++;
  loadQuestion();
}

function startQuiz(){
  const welcomeSection = document.getElementById("welcomeSection");
  const profileSection = document.getElementById("profileSection");
  const startSection = document.getElementById("startSection");
  const levelSection = document.querySelector(".level-section");
  const spiderArea = document.querySelector(".spider-area");
  const badgeSection = document.querySelector(".badge-section");
  const quizSection = document.querySelector(".quiz-section");
  const historySection = document.querySelector(".history");
  const analyticsSection = document.querySelector(".analytics");
  
  if(welcomeSection) welcomeSection.style.display = "none";
  if(profileSection) profileSection.style.display = "none";
  if(startSection) startSection.style.display = "none";
  if(levelSection) levelSection.style.display = "none";
  if(spiderArea) spiderArea.style.display = "none";
  if(badgeSection) badgeSection.style.display = "none";
  if(historySection) historySection.style.display = "none";
  if(analyticsSection) analyticsSection.style.display = "none";
  if(quizSection) quizSection.style.display = "block";
  
  currentQuestion = 0;
  xp = 0;
  lives = 3;
  correctCount = 0;
  wrongCount = 0;
  updateStats();
  loadQuestion();
}

// =======================
// WEB SHOOT & DANCE
// =======================

function shootWeb(){
  let spider = document.getElementById("spider");
  
  spider.classList.add("spider-dance");
  
  setTimeout(()=>{
    spider.classList.remove("spider-dance");
  }, 1500);
}

// =======================
// TEXT TO SPEECH
// =======================

function speakQuestion(question){
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  
  // Create utterance
  let utterance = new SpeechSynthesisUtterance(question);
  
  // English voice
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  
  // Speak the question
  window.speechSynthesis.speak(utterance);
}

function toggleVoiceButton(){
  let isSpeaking = window.speechSynthesis.speaking;
  
  if(isSpeaking){
    window.speechSynthesis.cancel();
  } else {
    let q = questions[currentQuestion];
    speakQuestion(q.question);
  }
}

// =======================
// DARK MODE
// =======================

let darkBtn = document.getElementById("darkBtn");
if(darkBtn){
  darkBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
  });
}

// =======================
// SOUND
// =======================

function playSound(id){

let audio =
document.getElementById(id);

if(audio){

audio.currentTime = 0;
audio.play();

}

}

// =======================
// GAME OVER
// =======================

function gameOver(){

alert("Game Over! You ran out of lives.");

gamesPlayed++;

scoreHistory.push(xp);

saveData();

resetUI();

}

// =======================
// FINISH
// =======================

function finishGame(){

playSound("victorySound");

gamesPlayed++;

if(xp > highScore){

highScore = xp;

}

scoreHistory.push(xp);

saveData();

showHistory();

alert(
"🎉 Congratulations! Mission Completed! You earned " + xp + " XP!"
);

resetUI();

}

// =======================
// RESET UI
// =======================

function resetUI(){
  const welcomeSection = document.getElementById("welcomeSection");
  const profileSection = document.getElementById("profileSection");
  const startSection = document.getElementById("startSection");
  const levelSection = document.querySelector(".level-section");
  const spiderArea = document.querySelector(".spider-area");
  const badgeSection = document.querySelector(".badge-section");
  const quizSection = document.querySelector(".quiz-section");
  const historySection = document.querySelector(".history");
  const analyticsSection = document.querySelector(".analytics");
  
  if(playerName) {
    if(welcomeSection) welcomeSection.style.display = "none";
    if(profileSection) profileSection.style.display = "block";
    if(startSection) startSection.style.display = "block";
    if(levelSection) levelSection.style.display = "block";
    if(spiderArea) spiderArea.style.display = "block";
    if(badgeSection) badgeSection.style.display = "block";
    if(historySection) historySection.style.display = "block";
    if(analyticsSection) analyticsSection.style.display = "block";
    
    // Highlight the active theme card
    applyTheme(activeTheme);
  } else {
    if(welcomeSection) welcomeSection.style.display = "block";
    if(profileSection) profileSection.style.display = "none";
    if(startSection) startSection.style.display = "none";
    if(levelSection) levelSection.style.display = "none";
    if(spiderArea) spiderArea.style.display = "none";
    if(badgeSection) badgeSection.style.display = "none";
    if(historySection) historySection.style.display = "none";
    if(analyticsSection) analyticsSection.style.display = "none";
  }
  
  if(quizSection) quizSection.style.display = "none";
  
  currentQuestion = 0;
  updateStats();
}

// =======================
// HISTORY
// =======================

function showHistory(){

let list =
document.getElementById("scoreHistory");

list.innerHTML = "";

scoreHistory.forEach(score=>{

let li =
document.createElement("li");

li.textContent =
score + " XP";

list.appendChild(li);

});

}

// =======================
// RESTART
// =======================

function restartGame(){

currentQuestion = 0;

xp = 0;

lives = 3;

loadQuestion();

updateStats();

}

// =======================
// RESET
// =======================

function resetProgress(){

if(confirm("Reset all progress?")){

localStorage.clear();

location.reload();

}

}

// =======================
// START
// =======================

// Initialize on page load
window.addEventListener('DOMContentLoaded', ()=>{
  applyTheme(activeTheme);
  showHistory();
  showAllBadges();
  
  if(playerName){
    if(document.getElementById("displayName")) {
      document.getElementById("displayName").textContent = "Welcome back, " + playerName + "! 🎉";
    }
  }
  resetUI();
});