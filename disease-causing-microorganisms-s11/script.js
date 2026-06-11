// Shared educational content used across all separate pages.
const microorganismData = [
  {
    id: "bacteria",
    name: "Bacteria",
    icon: "BAC",
    color: "#0f8c6f",
    description:
      "Bacteria are single-celled microorganisms. Some are useful, but harmful bacteria can grow in food, water, or the body and cause infection.",
    facts: "Common bacterial diseases include tuberculosis, cholera, typhoid, and bacterial pneumonia.",
    diseases: [
      {
        id: "tuberculosis",
        name: "Tuberculosis",
        imageIcon: "TB",
        description:
          "Tuberculosis is a serious infectious disease that mainly affects the lungs and can also spread to other organs if untreated.",
        symptoms: "Persistent cough, chest pain, fatigue, fever, weight loss, and night sweats.",
        cause: "It is caused by the bacterium Mycobacterium tuberculosis.",
        transmission:
          "It spreads through tiny droplets released into the air when an infected person coughs or sneezes.",
        prevention:
          "Early diagnosis, covering the mouth while coughing, good ventilation, vaccination in high-risk areas, and completing treatment."
      },
      {
        id: "cholera",
        name: "Cholera",
        imageIcon: "H2O",
        description:
          "Cholera is an intestinal infection that can cause severe dehydration very quickly if treatment is delayed.",
        symptoms: "Watery diarrhea, vomiting, muscle cramps, thirst, and weakness.",
        cause: "It is caused by the bacterium Vibrio cholerae.",
        transmission:
          "It spreads through contaminated water and food, especially where sanitation is poor.",
        prevention:
          "Drink safe water, maintain sanitation, wash hands, eat hygienic food, and use oral cholera vaccines where recommended."
      },
      {
        id: "typhoid",
        name: "Typhoid",
        imageIcon: "FEVER",
        description:
          "Typhoid fever is a bacterial infection that affects the digestive system and can become life-threatening without care.",
        symptoms: "High fever, weakness, stomach pain, headache, constipation, or diarrhea.",
        cause: "It is caused by the bacterium Salmonella Typhi.",
        transmission:
          "It spreads through contaminated food, water, or close contact with infected carriers.",
        prevention:
          "Use clean water, wash produce, cook food well, practice hand hygiene, and take typhoid vaccines when advised."
      },
      {
        id: "bacterial-pneumonia",
        name: "Bacterial Pneumonia",
        imageIcon: "LUNG",
        description:
          "Bacterial pneumonia is a lung infection in which air sacs become inflamed and may fill with fluid or pus.",
        symptoms: "Cough with mucus, fever, chest pain, chills, and difficulty breathing.",
        cause: "It is commonly caused by bacteria such as Streptococcus pneumoniae.",
        transmission:
          "It spreads through respiratory droplets, especially when infected people cough or sneeze.",
        prevention:
          "Vaccination, covering coughs, washing hands, avoiding smoking, and seeking early treatment for respiratory infections."
      }
    ]
  },
  {
    id: "viruses",
    name: "Viruses",
    icon: "VIR",
    color: "#2f6fed",
    description:
      "Viruses are tiny infectious agents that cannot reproduce on their own. They invade living cells and use them to multiply.",
    facts: "Common viral diseases include COVID-19, measles, influenza, and dengue fever.",
    diseases: [
      {
        id: "covid-19",
        name: "COVID-19",
        imageIcon: "RESP",
        description:
          "COVID-19 is a respiratory illness that ranges from mild symptoms to severe lung complications in vulnerable people.",
        symptoms: "Fever, cough, sore throat, body pain, tiredness, and breathing difficulty in severe cases.",
        cause: "It is caused by the SARS-CoV-2 virus.",
        transmission:
          "It spreads through respiratory droplets, aerosols, and contaminated hands or surfaces.",
        prevention:
          "Vaccination, mask use in risky settings, hand washing, good ventilation, and staying home when sick."
      },
      {
        id: "measles",
        name: "Measles",
        imageIcon: "RASH",
        description:
          "Measles is a highly contagious viral disease that can lead to complications such as ear infections and pneumonia.",
        symptoms: "High fever, cough, runny nose, red eyes, and a spreading skin rash.",
        cause: "It is caused by the measles virus.",
        transmission:
          "It spreads through the air and can remain infectious in enclosed spaces for a long time.",
        prevention:
          "MMR vaccination, isolation of infected individuals, respiratory hygiene, and strong community immunization."
      },
      {
        id: "influenza",
        name: "Influenza",
        imageIcon: "FLU",
        description:
          "Influenza, or flu, is a seasonal viral infection that mainly affects the nose, throat, and lungs.",
        symptoms: "Fever, chills, cough, muscle aches, headache, and weakness.",
        cause: "It is caused by influenza viruses.",
        transmission:
          "It spreads through respiratory droplets when infected people talk, cough, or sneeze.",
        prevention:
          "Annual flu vaccination, hand hygiene, covering coughs, and avoiding close contact during outbreaks."
      },
      {
        id: "dengue",
        name: "Dengue Fever",
        imageIcon: "MOSQ",
        description:
          "Dengue fever is a viral disease that can cause high fever and severe body pain, and in some cases may become dangerous.",
        symptoms: "High fever, headache, pain behind the eyes, rash, nausea, and joint or muscle pain.",
        cause: "It is caused by the dengue virus.",
        transmission:
          "It spreads through the bite of infected Aedes mosquitoes rather than direct person-to-person contact.",
        prevention:
          "Prevent mosquito breeding, use nets and repellents, wear protective clothing, and keep surroundings free of standing water."
      }
    ]
  },
  {
    id: "fungi",
    name: "Fungi",
    icon: "FUN",
    color: "#c96b2c",
    description:
      "Fungi include molds and yeasts. Some fungi infect the skin, nails, or lungs, especially in warm or damp environments.",
    facts: "Common fungal diseases include ringworm, athlete's foot, and candidiasis.",
    diseases: [
      {
        id: "ringworm",
        name: "Ringworm",
        imageIcon: "RING",
        description:
          "Ringworm is a contagious fungal infection of the skin that creates circular, itchy, scaly patches.",
        symptoms: "Red ring-shaped rash, itching, flaky skin, and mild irritation.",
        cause: "It is caused by dermatophyte fungi that live on skin, hair, and nails.",
        transmission:
          "It spreads by direct skin contact, shared towels, clothing, combs, or infected pets.",
        prevention:
          "Keep skin dry, avoid sharing personal items, wash hands, and treat infected people or animals early."
      },
      {
        id: "athletes-foot",
        name: "Athlete's Foot",
        imageIcon: "FOOT",
        description:
          "Athlete's foot is a fungal infection that commonly affects the skin between the toes and soles of the feet.",
        symptoms: "Itching, burning, cracked skin, redness, and peeling between the toes.",
        cause: "It is caused by fungi that grow well in warm, moist conditions.",
        transmission:
          "It spreads through contaminated floors, socks, shoes, towels, and skin contact.",
        prevention:
          "Dry feet well, wear breathable footwear, change socks, and avoid walking barefoot in public wet areas."
      },
      {
        id: "candidiasis",
        name: "Candidiasis",
        imageIcon: "YEAST",
        description:
          "Candidiasis is a fungal infection caused by an overgrowth of yeast and can affect the mouth, skin folds, or private areas.",
        symptoms: "White patches, redness, itching, irritation, or burning depending on the affected area.",
        cause: "It is usually caused by Candida species, especially Candida albicans.",
        transmission:
          "It may develop when normal body balance changes, after antibiotic use, or in moist skin areas.",
        prevention:
          "Keep skin dry, avoid unnecessary antibiotic use, maintain hygiene, and manage conditions that weaken immunity."
      }
    ]
  },
  {
    id: "protozoa",
    name: "Protozoa",
    icon: "PRO",
    color: "#8b4fc9",
    description:
      "Protozoa are microscopic single-celled organisms, often found in water or spread by insects, that can cause serious human diseases.",
    facts: "Common protozoan diseases include malaria, amoebiasis, and giardiasis.",
    diseases: [
      {
        id: "malaria",
        name: "Malaria",
        imageIcon: "BITE",
        description:
          "Malaria is a serious disease that affects the blood and causes repeated fever episodes, especially in tropical regions.",
        symptoms: "Fever, chills, sweating, headache, weakness, vomiting, and body pain.",
        cause: "It is caused by Plasmodium protozoa.",
        transmission:
          "It spreads through the bite of infected female Anopheles mosquitoes.",
        prevention:
          "Use mosquito nets, prevent mosquito breeding, wear protective clothing, and seek early medical care."
      },
      {
        id: "amoebiasis",
        name: "Amoebiasis",
        imageIcon: "GUT",
        description:
          "Amoebiasis is an intestinal infection that may cause diarrhea, stomach pain, and in severe cases liver complications.",
        symptoms: "Loose stools, abdominal pain, cramps, fatigue, and sometimes blood in stool.",
        cause: "It is caused by the protozoan Entamoeba histolytica.",
        transmission:
          "It spreads through contaminated food and water, especially where sanitation is poor.",
        prevention:
          "Drink clean water, wash hands, eat properly cooked food, and improve sanitation."
      },
      {
        id: "giardiasis",
        name: "Giardiasis",
        imageIcon: "WAVE",
        description:
          "Giardiasis is a protozoan infection of the small intestine that often causes digestive upset and dehydration.",
        symptoms: "Diarrhea, gas, stomach cramps, bloating, nausea, and weight loss.",
        cause: "It is caused by the protozoan Giardia lamblia.",
        transmission:
          "It spreads through contaminated water, food, and poor hand hygiene.",
        prevention:
          "Use safe drinking water, wash hands, avoid swallowing untreated water, and maintain food hygiene."
      }
    ]
  }
];

const preventionTips = [
  {
    title: "Hand Washing",
    icon: "WASH",
    text: "Wash hands with soap and water for at least 20 seconds to remove germs before eating and after using the restroom.",
    image: "../images/effective-handwashing-techniques-rub-palm-tips-other-hand-s-fingers-hand-washing-very-important-to-avoid-risk-174652235.webp",
    alt: "Hands being washed with soap and water"
  },
  {
    title: "Vaccination",
    icon: "VAX",
    text: "Vaccines train the immune system to fight infections early and reduce the severity and spread of disease.",
    image: "../images/infant-vaccination-healthcare-2023-photo.webp",
    alt: "A healthcare worker giving a vaccination to a child"
  },
  {
    title: "Safe Food Practices",
    icon: "FOOD",
    text: "Cook food properly, wash fruits and vegetables, and store food safely to reduce bacterial contamination.",
    image: "../images/food-safety-words-written-under-torn-paper-healthcare-healthy-diet-concept-food-safety-words-written-under-torn-paper-healthcare-183041820.webp",
    alt: "Food safety concept illustration"
  },
  {
    title: "Wearing Masks",
    icon: "MASK",
    text: "Masks help reduce the spread of respiratory infections in crowded spaces and during outbreaks.",
    image: "../images/masked-girl-to-protect-herself-from-covid-19-virus-in-public-area.webp",
    alt: "A person wearing a mask in a crowded public place"
  },
  {
    title: "Clean Drinking Water",
    icon: "WATER",
    text: "Use boiled, filtered, or treated water to avoid water-borne infections such as cholera and typhoid.",
    image: "../images/man-pouring-himself-water.webp",
    alt: "Clean water being poured into a glass"
  },
  {
    title: "Personal Hygiene",
    icon: "HYGIENE",
    text: "Keep the body, clothes, nails, and surroundings clean to reduce the growth and transfer of harmful microorganisms.",
    image: "../images/vector-illustration-bathroom-accessories-personal-hygiene-care-items_793518-370.webp",
    alt: "Personal hygiene items illustration"
  }
];

const quizQuestions = [
  {
    question: "Which microorganism category includes tuberculosis-causing organisms?",
    options: ["Bacteria", "Viruses", "Fungi", "Protozoa"],
    answer: "Bacteria",
    explanation: "Tuberculosis is caused by Mycobacterium tuberculosis, which is a bacterium."
  },
  {
    question: "Which disease is mainly spread by contaminated water?",
    options: ["Influenza", "Cholera", "Measles", "Ringworm"],
    answer: "Cholera",
    explanation: "Cholera commonly spreads through unsafe water and poor sanitation."
  },
  {
    question: "Malaria is caused by which type of microorganism?",
    options: ["Bacteria", "Virus", "Protozoa", "Fungi"],
    answer: "Protozoa",
    explanation: "Malaria is caused by Plasmodium, which is a protozoan microorganism."
  },
  {
    question: "What is the best-known prevention for measles?",
    options: ["Wearing sandals", "MMR vaccination", "Using antifungal cream", "Drinking warm water"],
    answer: "MMR vaccination",
    explanation: "Measles is best prevented through vaccination with the MMR vaccine."
  },
  {
    question: "Which disease is a fungal skin infection?",
    options: ["Typhoid", "Ringworm", "COVID-19", "Tuberculosis"],
    answer: "Ringworm",
    explanation: "Ringworm is caused by fungi that infect the skin."
  },
  {
    question: "Dengue fever is most commonly transmitted by what?",
    options: ["Contaminated milk", "Mosquito bites", "Shared shoes", "Dust particles"],
    answer: "Mosquito bites",
    explanation: "Dengue spreads through the bite of infected Aedes mosquitoes."
  },
  {
    question: "Viruses need what to multiply?",
    options: ["Sunlight", "Living cells", "Dust particles", "Only water"],
    answer: "Living cells",
    explanation: "Viruses cannot reproduce alone; they need host cells."
  },
  {
    question: "Which habit helps prevent many infectious diseases?",
    options: ["Skipping meals", "Hand washing", "Sleeping late", "Sharing towels"],
    answer: "Hand washing",
    explanation: "Hand washing removes germs and reduces the spread of infection."
  },
  {
    question: "Athlete's foot usually affects which part of the body?",
    options: ["Lungs", "Eyes", "Feet", "Stomach"],
    answer: "Feet",
    explanation: "Athlete's foot is a fungal infection that commonly affects the toes and soles."
  },
  {
    question: "Why is personal hygiene important?",
    options: ["It helps harmful microbes spread faster", "It reduces microbial growth and transmission", "It replaces vaccination", "It only matters for adults"],
    answer: "It reduces microbial growth and transmission",
    explanation: "Clean habits help reduce the number of germs on the body and in daily surroundings."
  }
];

const bodyPage = document.body.dataset.page;

function createSvgData(label, accent, icon) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.92" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />
        </linearGradient>
      </defs>
      <rect width="800" height="520" rx="34" fill="url(#grad)" />
      <circle cx="128" cy="110" r="58" fill="#ffffff" fill-opacity="0.32" />
      <circle cx="680" cy="150" r="88" fill="#ffffff" fill-opacity="0.18" />
      <circle cx="620" cy="410" r="124" fill="#ffffff" fill-opacity="0.16" />
      <text x="70" y="140" font-size="58" font-family="Verdana" font-weight="700" fill="#12313c">${icon}</text>
      <text x="70" y="250" font-family="Verdana" font-size="40" font-weight="700" fill="#12313c">${label}</text>
      <text x="70" y="310" font-family="Verdana" font-size="22" fill="#264853">Educational Health Topic</text>
      <rect x="70" y="350" width="250" height="12" rx="6" fill="#12313c" fill-opacity="0.18" />
      <rect x="70" y="382" width="340" height="12" rx="6" fill="#12313c" fill-opacity="0.12" />
      <rect x="70" y="414" width="280" height="12" rx="6" fill="#12313c" fill-opacity="0.1" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getStoredMicrobeId() {
  return localStorage.getItem("selectedMicrobeId") || "bacteria";
}

function setStoredMicrobeId(microbeId) {
  localStorage.setItem("selectedMicrobeId", microbeId);
  const microbe = getMicrobeById(microbeId);
  if (microbe) {
    localStorage.setItem("selectedDiseaseId", microbe.diseases[0].id);
  }
}

function getStoredDiseaseId() {
  return localStorage.getItem("selectedDiseaseId") || "tuberculosis";
}

function setStoredDiseaseId(diseaseId) {
  localStorage.setItem("selectedDiseaseId", diseaseId);
}

function getMicrobeById(microbeId) {
  return microorganismData.find((microbe) => microbe.id === microbeId) || microorganismData[0];
}

function getDiseaseById(microbe, diseaseId) {
  return microbe.diseases.find((disease) => disease.id === diseaseId) || microbe.diseases[0];
}

function setupPageBasics() {
  document.body.classList.add("page-enter");

  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === bodyPage);
  });

  const restartAppBtn = document.getElementById("restartAppBtn");
  if (restartAppBtn) {
    restartAppBtn.addEventListener("click", () => {
      localStorage.removeItem("selectedMicrobeId");
      localStorage.removeItem("selectedDiseaseId");
    });
  }
}

function renderMicroCards(containerId, selectable) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const selectedMicrobeId = getStoredMicrobeId();

  container.innerHTML = microorganismData
    .map((microbe) => {
      const actionText = selectable ? "Select this microorganism" : "Go to selection page";
      const selectedClass = selectable && microbe.id === selectedMicrobeId ? "selected-card" : "";

      return `
        <article class="micro-card ${selectedClass}" data-microbe="${microbe.id}">
          <img src="${createSvgData(microbe.name, microbe.color, microbe.icon)}" alt="${microbe.name} illustration">
          <h3>${microbe.name}</h3>
          <p>${microbe.description}</p>
          <span class="micro-meta">${actionText}</span>
        </article>
      `;
    })
    .join("");

  container.querySelectorAll("[data-microbe]").forEach((card) => {
    card.addEventListener("click", () => {
      setStoredMicrobeId(card.dataset.microbe);

      if (selectable) {
        window.location.href = "diseases.html";
      } else {
        window.location.href = "select-microorganism.html";
      }
    });
  });
}

function initSplashPage() {
  setTimeout(() => {
    window.location.href = "home.html";
  }, 3000);
}

function initMicroorganismsPage() {
  renderMicroCards("microOverviewGrid", false);
}

function initSelectPage() {
  const currentSelectionName = document.getElementById("currentSelectionName");
  const currentSelectionText = document.getElementById("currentSelectionText");
  const selectedMicrobe = getMicrobeById(getStoredMicrobeId());

  if (currentSelectionName) {
    currentSelectionName.textContent = selectedMicrobe.name;
  }

  if (currentSelectionText) {
    currentSelectionText.textContent = selectedMicrobe.facts;
  }

  renderMicroCards("microSelectGrid", true);
}

function initDiseasesPage() {
  const microbe = getMicrobeById(getStoredMicrobeId());
  const diseaseList = document.getElementById("diseaseList");
  const selectedMicrobeName = document.getElementById("selectedMicrobeName");
  const diseasesHeading = document.getElementById("diseasesHeading");
  const diseasesIntro = document.getElementById("diseasesIntro");

  if (!diseaseList) {
    return;
  }

  if (selectedMicrobeName) {
    selectedMicrobeName.textContent = microbe.name;
  }

  if (diseasesHeading) {
    diseasesHeading.textContent = `Diseases Caused by ${microbe.name}`;
  }

  if (diseasesIntro) {
    diseasesIntro.textContent = microbe.facts;
  }

  diseaseList.innerHTML = microbe.diseases
    .map(
      (disease) => `
        <article class="disease-card" data-disease="${disease.id}">
          <img src="${createSvgData(disease.name, microbe.color, disease.imageIcon)}" alt="${disease.name} illustration">
          <h3>${disease.name}</h3>
          <p>${disease.description}</p>
          <span class="disease-meta">View full details</span>
        </article>
      `
    )
    .join("");

  diseaseList.querySelectorAll("[data-disease]").forEach((card) => {
    card.addEventListener("click", () => {
      setStoredDiseaseId(card.dataset.disease);
      window.location.href = "details.html";
    });
  });
}

function initDetailsPage() {
  const microbe = getMicrobeById(getStoredMicrobeId());
  const disease = getDiseaseById(microbe, getStoredDiseaseId());

  const detailName = document.getElementById("detailName");
  const detailImage = document.getElementById("detailImage");
  const detailDescription = document.getElementById("detailDescription");
  const detailSymptoms = document.getElementById("detailSymptoms");
  const detailCause = document.getElementById("detailCause");
  const detailTransmission = document.getElementById("detailTransmission");
  const detailPrevention = document.getElementById("detailPrevention");

  if (detailName) {
    detailName.textContent = disease.name;
  }

  if (detailImage) {
    detailImage.src = createSvgData(disease.name, microbe.color, disease.imageIcon);
    detailImage.alt = `${disease.name} illustration`;
  }

  if (detailDescription) {
    detailDescription.textContent = disease.description;
  }

  if (detailSymptoms) {
    detailSymptoms.textContent = disease.symptoms;
  }

  if (detailCause) {
    detailCause.textContent = disease.cause;
  }

  if (detailTransmission) {
    detailTransmission.textContent = disease.transmission;
  }

  if (detailPrevention) {
    detailPrevention.textContent = disease.prevention;
  }
}

function initPreventionPage() {
  const preventionGrid = document.getElementById("preventionGrid");
  if (!preventionGrid) {
    return;
  }

  preventionGrid.innerHTML = preventionTips
    .map(
      (tip) => `
        <article class="prevention-card">
          <img src="${tip.image}" alt="${tip.alt}">
          <div class="prevention-icon">${tip.icon}</div>
          <h3>${tip.title}</h3>
          <p>${tip.text}</p>
        </article>
      `
    )
    .join("");
}

function initQuizPage() {
  const quizCard = document.getElementById("quizCard");
  const quizProgress = document.getElementById("quizProgress");
  const liveScore = document.getElementById("liveScore");
  const quizResult = document.getElementById("quizResult");
  const quizScoreText = document.getElementById("quizScoreText");
  const quizSummaryText = document.getElementById("quizSummaryText");
  const restartQuizBtn = document.getElementById("restartQuizBtn");
  const submitQuizBtn = document.getElementById("submitQuizBtn");

  if (!quizCard || !quizProgress || !liveScore || !quizResult || !quizScoreText || !quizSummaryText || !restartQuizBtn || !submitQuizBtn) {
    return;
  }

  const selections = Array(quizQuestions.length).fill("");
  let quizSubmitted = false;

  function calculateScore() {
    return quizQuestions.reduce((total, question, index) => {
      return total + (selections[index] === question.answer ? 1 : 0);
    }, 0);
  }

  function updateProgress() {
    const answeredCount = selections.filter(Boolean).length;
    quizProgress.textContent = quizSubmitted
      ? "Quiz submitted"
      : `${answeredCount} of ${quizQuestions.length} answered`;
  }

  function updateLiveScore() {
    liveScore.textContent = `Score: ${calculateScore()}`;
  }

  function updateCardFeedback(questionIndex) {
    const feedback = document.getElementById(`quizFeedback-${questionIndex}`);
    if (!feedback) {
      return;
    }

    const question = quizQuestions[questionIndex];
    const selectedAnswer = selections[questionIndex];

    if (!selectedAnswer) {
      feedback.textContent = quizSubmitted
        ? `The correct answer is "${question.answer}". ${question.explanation}`
        : "Select an answer for this question.";
      return;
    }

    if (quizSubmitted) {
      feedback.textContent =
        selectedAnswer === question.answer
          ? `Correct. ${question.explanation}`
          : `Not quite. The correct answer is "${question.answer}". ${question.explanation}`;
      return;
    }

    feedback.textContent = "Answer recorded. Submit the quiz when you're ready.";
  }

  function updateOptionStates() {
    quizCard.querySelectorAll(".quiz-option").forEach((button) => {
      const questionIndex = Number(button.dataset.questionIndex);
      const question = quizQuestions[questionIndex];
      const selectedAnswer = selections[questionIndex];

      button.classList.toggle("selected", selectedAnswer === button.dataset.option);
      button.classList.toggle("correct", quizSubmitted && button.dataset.option === question.answer);
      button.classList.toggle("wrong", quizSubmitted && selectedAnswer === button.dataset.option && selectedAnswer !== question.answer);
      button.disabled = quizSubmitted;
    });
  }

  function renderQuiz() {
    quizCard.innerHTML = quizQuestions
      .map(
        (question, index) => `
          <article class="quiz-card quiz-question-card" data-question-index="${index}">
            <h2>Question ${index + 1}</h2>
            <p class="quiz-question-text">${question.question}</p>
            <div class="quiz-options">
              ${question.options
                .map(
                  (option) => `
                    <button type="button" class="quiz-option" data-question-index="${index}" data-option="${option}">
                      ${option}
                    </button>
                  `
                )
                .join("")}
            </div>
            <div class="quiz-feedback" id="quizFeedback-${index}">Select an answer for this question.</div>
          </article>
        `
      )
      .join("");

    updateOptionStates();
    quizQuestions.forEach((_, index) => updateCardFeedback(index));
    updateProgress();
    updateLiveScore();
  }

  quizCard.addEventListener("click", (event) => {
    const button = event.target.closest(".quiz-option");
    if (!button || quizSubmitted) {
      return;
    }

    const questionIndex = Number(button.dataset.questionIndex);
    selections[questionIndex] = button.dataset.option;
    updateOptionStates();
    updateCardFeedback(questionIndex);
    updateProgress();
    updateLiveScore();
  });

  submitQuizBtn.addEventListener("click", () => {
    quizSubmitted = true;
    const score = calculateScore();

    quizQuestions.forEach((_, index) => updateCardFeedback(index));
    updateOptionStates();
    updateProgress();
    updateLiveScore();

    quizCard.classList.add("hidden");
    quizResult.classList.remove("hidden");
    quizScoreText.textContent = `You scored ${score} out of ${quizQuestions.length}.`;
    quizSummaryText.textContent =
      score >= 8
        ? "Excellent work. You have a strong understanding of microorganisms, diseases, and prevention."
        : score >= 5
          ? "Good effort. Review the disease and prevention pages once more to strengthen your understanding."
          : "Keep practicing. Revisiting the microorganism and prevention pages will help a lot.";
  });

  restartQuizBtn.addEventListener("click", () => {
    quizSubmitted = false;
    selections.fill("");
    quizCard.classList.remove("hidden");
    quizResult.classList.add("hidden");
    renderQuiz();
  });

  renderQuiz();
}

function initSimulationPage() {
  const canvas = document.getElementById("game");
  const threatLabel = document.getElementById("threat");
  const infectedCountLabel = document.getElementById("infectedCount");
  const scoreValueLabel = document.getElementById("scoreValue");
  const statusLabel = document.getElementById("status");
  const restartBtn = document.getElementById("restartSimulationBtn");
  const protectionButtons = Array.from(document.querySelectorAll("[data-protect]"));

  if (!canvas || !threatLabel || !infectedCountLabel || !scoreValueLabel || !statusLabel) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const totalPeople = 40;
  const people = [];
  const diseases = [
    {
      name: "Bacteria (Cholera)",
      correct: "water",
      spread: 25
    },
    {
      name: "Virus (Flu)",
      correct: "mask",
      spread: 40
    },
    {
      name: "Fungi (Ringworm)",
      correct: "soap",
      spread: 15
    },
    {
      name: "Protozoa (Malaria)",
      correct: "net",
      spread: 30
    }
  ];

  let score = 0;
  let protection = "";
  let answeredCurrentDisease = false;
  let currentDisease = diseases[0];
  let animationFrameId = null;
  let diseaseIntervalId = null;
  let gameFinished = false;

  function setStatus(message, type) {
    statusLabel.textContent = message;
    statusLabel.className = "simulation-status";

    if (type) {
      statusLabel.classList.add(type);
    }
  }

  function updateStats() {
    const infectedPeople = people.filter((person) => person.infected).length;
    infectedCountLabel.textContent = `${infectedPeople} / ${totalPeople}`;
    scoreValueLabel.textContent = `${score}`;
    return infectedPeople;
  }

  function enableButtons() {
    protectionButtons.forEach((button) => {
      button.disabled = false;
    });
  }

  function disableButtons() {
    protectionButtons.forEach((button) => {
      button.disabled = true;
    });
  }

  function seedPeople() {
    people.length = 0;

    for (let index = 0; index < totalPeople; index += 1) {
      people.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        infected: false
      });
    }
  }

  function infectRandomPerson() {
    people.forEach((person) => {
      person.infected = false;
    });

    people[Math.floor(Math.random() * people.length)].infected = true;
  }

  function startNewDisease() {
    if (gameFinished) {
      return;
    }

    currentDisease = diseases[Math.floor(Math.random() * diseases.length)];
    threatLabel.textContent = currentDisease.name;
    protection = "";
    answeredCurrentDisease = false;
    infectRandomPerson();
    enableButtons();
    updateStats();
    setStatus("Choose the correct prevention method before the infection spreads.", "");
  }

  function finishGame(message) {
    gameFinished = true;
    disableButtons();
    setStatus(message, "is-finished");

    if (diseaseIntervalId) {
      window.clearInterval(diseaseIntervalId);
    }

    if (animationFrameId) {
      window.cancelAnimationFrame(animationFrameId);
    }
  }

  function protect(type) {
    if (answeredCurrentDisease || gameFinished) {
      return;
    }

    answeredCurrentDisease = true;
    disableButtons();

    if (type === currentDisease.correct) {
      protection = type;
      score += 10;
      setStatus("Correct choice. The outbreak is contained for this round.", "is-success");
    } else {
      score -= 5;
      setStatus("Wrong prevention. The infection keeps spreading through the city.", "is-error");
    }

    updateStats();
  }

  function drawPerson(person) {
    ctx.beginPath();
    ctx.arc(person.x, person.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = person.infected ? "#d64545" : "#2f8f62";
    ctx.fill();
  }

  function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (const person of people) {
      person.x += person.dx;
      person.y += person.dy;

      if (person.x < 8 || person.x > canvasWidth - 8) {
        person.dx *= -1;
      }

      if (person.y < 8 || person.y > canvasHeight - 8) {
        person.dy *= -1;
      }

      for (const other of people) {
        const distance = Math.hypot(person.x - other.x, person.y - other.y);

        if (
          distance < currentDisease.spread &&
          (person.infected || other.infected) &&
          protection !== currentDisease.correct
        ) {
          person.infected = true;
          other.infected = true;
        }
      }

      drawPerson(person);
    }

    const infectedPeople = updateStats();

    if (infectedPeople >= 30) {
      finishGame(`Game over. Too many people were infected. Final score: ${score}.`);
      return;
    }

    if (score >= 100) {
      finishGame(`You win. The city is protected. Final score: ${score}.`);
      return;
    }

    animationFrameId = window.requestAnimationFrame(update);
  }

  protectionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      protect(button.dataset.protect);
    });
  });

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }

  seedPeople();
  startNewDisease();
  diseaseIntervalId = window.setInterval(startNewDisease, 10000);
  update();
}

function initPage() {
  setupPageBasics();

  if (bodyPage === "splash") {
    initSplashPage();
  }

  if (bodyPage === "microorganisms") {
    initMicroorganismsPage();
  }

  if (bodyPage === "select") {
    initSelectPage();
  }

  if (bodyPage === "diseases") {
    initDiseasesPage();
  }

  if (bodyPage === "details") {
    initDetailsPage();
  }

  if (bodyPage === "prevention") {
    initPreventionPage();
  }

  if (bodyPage === "quiz") {
    initQuizPage();
  }

  if (bodyPage === "simulation") {
    initSimulationPage();
  }
}

initPage();
