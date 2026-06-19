/* ==========================================================================
   Earth's Four Spheres - quiz.js (Quiz Engine & Question Bank)
   ========================================================================== */

// 15 Multiple Choice Questions Set (3 per category)
const quizQuestions = [
  // LITHOSPHERE (Questions 1 - 3)
  {
    category: "lithosphere",
    question: {
      en: "What is the solid, rocky outer layer of the Earth called?",
      te: "భూమి యొక్క ఘనమైన, రాతితో కూడిన వెలుపలి పొరను ఏమంటారు?"
    },
    options: [
      { en: "Hydrosphere", te: "జలావరణం" },
      { en: "Atmosphere", te: "వాతావరణం" },
      { en: "Lithosphere", te: "శిలావరణం" },
      { en: "Biosphere", te: "జీవావరణం" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "The Lithosphere is the solid outer layer of the Earth, including the crust and the upper mantle. The prefix 'Litho' comes from the Greek word for stone!",
      te: "శిలావరణం అనేది క్రస్ట్ మరియు ఎగువ మాంటిల్‌తో కూడిన భూమి యొక్క ఘనమైన వెలుపలి పొర. 'శిలా' అంటే రాయి అని అర్థం!"
    }
  },
  {
    category: "lithosphere",
    question: {
      en: "Which layer of the Earth is the thickest and made of hot, semi-solid rocks?",
      te: "భూమి యొక్క పొరలలో అతి మందపాటిదైన, వేడి పాక్షిక ఘన శిలలతో తయారైన పొర ఏది?"
    },
    options: [
      { en: "The Crust", te: "భూపటలం (Crust)" },
      { en: "The Outer Core", te: "బాహ్య కేంద్రమండలం" },
      { en: "The Inner Core", te: "అంతర కేంద్రమండలం" },
      { en: "The Mantle", te: "భూప్రావారం (Mantle)" }
    ],
    correctAnswer: 3,
    explanation: {
      en: "The Mantle is Earth's thickest layer. Its hot rocks flow very slowly, which helps move the tectonic plates on the crust above it.",
      te: "భూప్రావారం (Mantle) భూమి యొక్క అతి మందపాటి పొర. దీనిలోని వేడి శిలలు చాలా నెమ్మదిగా కదులుతాయి, ఇది భూపటలంపై ఉన్న ప్లేట్లను కదిలిస్తుంది."
    }
  },
  {
    category: "lithosphere",
    question: {
      en: "How are towering mountain ranges formed on Earth?",
      te: "భూమిపై ఎత్తైన పర్వత శ్రేణులు ఎలా ఏర్పడతాయి?"
    },
    options: [
      { en: "Water waves pile up sand", te: "నీటి అలలు ఇసుకను పోగు చేయడం వల్ల" },
      { en: "Tectonic plates crash together, folding the crust upward", te: "టెక్టోనిక్ ప్లేట్లు ఒకదానికొకటి డీకొట్టి, క్రస్ట్‌ను పైకి మడవడం వల్ల" },
      { en: "Strong winds blow sand dunes", te: "బలమైన గాలులు ఇసుక దిబ్బలను ఎగరేయడం వల్ల" },
      { en: "Plant roots grow deep", te: "మొక్కల వేర్లు లోతుగా పెరగడం వల్ల" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Mountains rise when massive tectonic plates collide and push the Earth's crust upwards. This is how Mount Everest was created!",
      te: "భారీ టెక్టోనిక్ ప్లేట్లు ఒకదానికొకటి డీకొట్టి భూమి యొక్క క్రస్ట్‌ను పైకి నెట్టినప్పుడు పర్వతాలు ఏర్పడతాయి. ఎవరెస్ట్ పర్వతం ఇలాగే ఏర్పడింది!"
    }
  },
  
  // HYDROSPHERE (Questions 4 - 6)
  {
    category: "hydrosphere",
    question: {
      en: "What percentage of Earth's water is stored in the oceans?",
      te: "భూమిపై ఉన్న మొత్తం నీటిలో మహాసముద్రాలలో ఎంత శాతం నిల్వ ఉంటుంది?"
    },
    options: [
      { en: "About 50%", te: "దాదాపు 50%" },
      { en: "About 71%", te: "దాదాపు 71%" },
      { en: "About 97%", te: "దాదాపు 97%" },
      { en: "About 3%", te: "దాదాపు 3%" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "Almost 97% of Earth's water is salty ocean water! Only about 3% is fresh water, and most of that is frozen in ice caps and glaciers.",
      te: "భూమిపై ఉన్న నీటిలో దాదాపు 97% ఉప్పునీటి మహాసముద్రాలలోనే ఉంది! కేవలం 3% మాత్రమే మంచి నీరు, అందులోనూ ఎక్కువ భాగం మంచు రూపంలో ఘనీభవించి ఉంది."
    }
  },
  {
    category: "hydrosphere",
    question: {
      en: "In the water cycle, what is the stage where gas water vapor cools down and turns back into liquid clouds?",
      te: "నీటి చక్రంలో, నీటి ఆవిరి చల్లబడి తిరిగి ద్రవ మేఘాలుగా మారే దశను ఏమంటారు?"
    },
    options: [
      { en: "Evaporation", te: "భాష్పీభవనం" },
      { en: "Condensation", te: "సాంద్రీకరణం" },
      { en: "Precipitation", te: "అవపాతం" },
      { en: "Surface Runoff", te: "ఉపరితల ప్రవాహం" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Condensation happens when warm water vapor rises into the sky, cools down, and turns back into tiny water droplets to form clouds.",
      te: "వేడి నీటి ఆవిరి ఆకాశంలోకి వెళ్లి, అక్కడ చల్లబడి చిన్న నీటి బిందువులుగా మారి మేఘాలుగా ఏర్పడే ప్రక్రియను సాంద్రీకరణం అంటారు."
    }
  },
  {
    category: "hydrosphere",
    question: {
      en: "Where is fresh water stored underground beneath the soil?",
      te: "నేల కింద భూగర్భంలో మంచి నీరు ఎక్కడ నిల్వ ఉంటుంది?"
    },
    options: [
      { en: "Glaciers", te: "హిమానీనదాలు" },
      { en: "Lakes", te: "చెరువులు / సరస్సులు" },
      { en: "Aquifers or Groundwater", te: "భూగర్భ జలాలు (Aquifers)" },
      { en: "Oceans", te: "మహాసముద్రాలు" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "Groundwater is fresh water stored in the cracks and spaces in soil and rocks. Humans dig wells or pump aquifers to bring it to the surface.",
      te: "నేల మరియు రాళ్ళ సందులలో నిల్వ ఉండే మంచి నీటిని భూగర్భ జలాలు అంటారు. మనుషులు బావులు తవ్వి ఈ నీటిని పైకి తెచ్చుకుంటారు."
    }
  },

  // ATMOSPHERE (Questions 7 - 9)
  {
    category: "atmosphere",
    question: {
      en: "Which gas is the most abundant in Earth's atmosphere?",
      te: "భూమి యొక్క వాతావరణంలో అత్యధికంగా ఉండే వాయువు ఏది?"
    },
    options: [
      { en: "Oxygen", te: "ఆక్సిజన్ (ప్రాణవాయువు)" },
      { en: "Nitrogen", te: "నైట్రోజన్ (నత్రజని)" },
      { en: "Carbon Dioxide", te: "కార్బన్ డై ఆక్సైడ్" },
      { en: "Hydrogen", te: "హైడ్రోజన్" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Nitrogen makes up 78% of our air! Oxygen is second at 21%, while carbon dioxide and other gases make up the remaining 1%.",
      te: "మన గాలిలో 78% నైట్రోజన్ వాయువే ఉంటుంది! ఆక్సిజన్ 21% ఉంటుంది, కార్బన్ డై ఆక్సైడ్ మరియు ఇతర వాయువులు మిగిలిన 1% లో ఉంటాయి."
    }
  },
  {
    category: "atmosphere",
    question: {
      en: "In which atmospheric layer does all weather, including rain and clouds, occur?",
      te: "వర్షాలు మరియు మేఘాలతో కూడిన వాతావరణ మార్పులన్నీ ఏ పొరలో జరుగుతాయి?"
    },
    options: [
      { en: "Stratosphere", te: "స్ట్రాటోవరణం" },
      { en: "Troposphere", te: "ట్రోపోవరణం" },
      { en: "Mesosphere", te: "మీసోవరణం" },
      { en: "Exosphere", te: "ఎక్సోవరణం" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "All weather happens in the Troposphere, the lowest layer closest to Earth. It contains almost all of the atmosphere's water vapor.",
      te: "వాతావరణ మార్పులన్నీ భూమికి అత్యంత దగ్గరగా ఉండే ట్రోపోవరణంలోనే జరుగుతాయి. ఎందుకంటే నీటి ఆవిరి అంతా ఈ పొరలోనే ఉంటుంది."
    }
  },
  {
    category: "atmosphere",
    question: {
      en: "Why is the Ozone Layer in the Stratosphere so important for life?",
      te: "స్ట్రాటోవరణంలోని ఓజోన్ పొర జీవులకు ఎందుకు అంత ముఖ్యం?"
    },
    options: [
      { en: "It provides carbon dioxide for plants", te: "ఇది మొక్కలకు కార్బన్ డై ఆక్సైడ్ అందిస్తుంది" },
      { en: "It burns up falling shooting stars", te: "ఇది తోకచుక్కలను మండిస్తుంది" },
      { en: "It absorbs harmful UV rays from the Sun", te: "ఇది సూర్యుని నుండి వచ్చే హానికరమైన UV కిరణాలను గ్రహిస్తుంది" },
      { en: "It creates rain clouds", te: "ఇది వర్షపు మేఘాలను సృష్టిస్తుంది" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "The ozone layer blocks dangerous Ultraviolet (UV) radiation from the Sun. Without it, the sun would be too harsh and hot for life to survive.",
      te: "ఓజోన్ పొర సూర్యుని నుండి వచ్చే ప్రమాదకరమైన అతినీలలోహిత (UV) కిరణాలను అడ్డుకుంటుంది. ఇది లేకపోతే సూర్యరశ్మి తీవ్రతకు జీవులు బ్రతకలేవు."
    }
  },

  // BIOSPHERE (Questions 10 - 12)
  {
    category: "biosphere",
    question: {
      en: "What is a community of living organisms interacting with their non-living environment called?",
      te: "నిర్జీవ వస్తువులతో కూడిన పర్యావరణంతో జీవులు కలిసి జీవించే వ్యవస్థను ఏమంటారు?"
    },
    options: [
      { en: "Tectonic Plate", te: "టెక్టోనిక్ ప్లేట్" },
      { en: "Ecosystem", te: "పర్యావరణ వ్యవస్థ (Ecosystem)" },
      { en: "Ocean Current", te: "సముద్ర ప్రవాహం" },
      { en: "Cloud Condensation", te: "మేఘ సాంద్రీకరణ" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "An ecosystem is a community of plants, animals, and microbes (Biosphere) living together and interacting with soil, water, and air.",
      te: "పర్యావరణ వ్యవస్థ అంటే మొక్కలు, జంతువులు మరియు సూక్ష్మజీవులు (జీవావరణం) మట్టి, నీరు మరియు గాలితో కలిసి జీవించే ఒక వ్యవస్థ."
    }
  },
  {
    category: "biosphere",
    question: {
      en: "Why are plants called 'Producers' in a food chain?",
      te: "ఆహార గొలుసులో మొక్కలను 'ఉత్పత్తిదారులు' అని ఎందుకు పిలుస్తారు?"
    },
    options: [
      { en: "They produce oxygen for animals", te: "అవి జంతువులకు ఆక్సిజన్ అందిస్తాయి కాబట్టి" },
      { en: "They consume other animals", te: "అవి ఇతర జంతువులను తింటాయి కాబట్టి" },
      { en: "They make their own food using sunlight", te: "అవి సూర్యకాంతిని ఉపయోగించి తమ ఆహారాన్ని తామే తయారు చేసుకుంటాయి కాబట్టి" },
      { en: "They break down organic waste in soil", te: "అవి వ్యర్థ పదార్థాలను విచ్ఛిన్నం చేస్తాయి కాబట్టి" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "Green plants are called producers because they capture solar energy from the Sun and use it to 'produce' their own food (sugars).",
      te: "ఆకుపచ్చని మొక్కలు సూర్యుని నుండి సౌరశక్తిని గ్రహించి తమ ఆహారాన్ని తామే తయారు (ఉత్పత్తి) చేసుకుంటాయి కాబట్టి వాటిని ఉత్పత్తిదారులు అంటారు."
    }
  },
  {
    category: "biosphere",
    question: {
      en: "What is the primary job of Decomposers, like mushrooms and worms?",
      te: "పుట్టగొడుగులు మరియు పురుగులు వంటి 'విచ్ఛిన్నకారుల' ప్రధాన పని ఏమిటి?"
    },
    options: [
      { en: "To hunt smaller animals", te: "చిన్న జంతువులను వేటాడటం" },
      { en: "To break down dead matter and recycle nutrients into soil", te: "చనిపోయిన జీవులను కుళ్ళింపజేసి, పోషకాలను తిరిగి మట్టిలో కలపడం" },
      { en: "To absorb solar energy", te: "సౌరశక్తిని గ్రహించడం" },
      { en: "To release water vapor", te: "నీటి ఆవిరిని విడుదల చేయడం" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Decomposers eat dead plants and animals and break them down. This cleans up nature and recycles nutrients back into the soil (Lithosphere) for new plants to grow.",
      te: "విచ్ఛిన్నకారులు చనిపోయిన మొక్కలు మరియు జంతువులను తిని వాటిని కుళ్ళింపజేస్తాయి. ఇది ప్రకృతిని శుభ్రపరుస్తుంది మరియు కొత్త మొక్కల పెరుగుదలకు మట్టిలోకి పోషకాలను అందిస్తుంది."
    }
  },

  // SPHERE INTERACTIONS (Questions 13 - 15)
  {
    category: "interactions",
    question: {
      en: "Rainwater (Hydrosphere) flowing downhill and eroding rocks on a mountain (Lithosphere) is an interaction between which two spheres?",
      te: "కొండల నుండి వర్షపు నీరు (జలావరణం) ప్రవహిస్తూ, కొండ రాళ్ళను (శిలావరణం) కరిగించడం ఏ రెండు ఆవరణల మధ్య సంబంధాన్ని తెలుపుతుంది?"
    },
    options: [
      { en: "Lithosphere and Hydrosphere", te: "శిలావరణం మరియు జలావరణం" },
      { en: "Atmosphere and Biosphere", te: "వాతావరణం మరియు జీవావరణం" },
      { en: "Biosphere and Hydrosphere", te: "జీవావరణం మరియు జలావరణం" },
      { en: "Atmosphere and Lithosphere", te: "వాతావరణం మరియు శిలావరణం" }
    ],
    correctAnswer: 0,
    explanation: {
      en: "Water (Hydrosphere) chemically washes away and physically carves solid rocks (Lithosphere). This shapes our landscapes, creating canyons and valleys!",
      te: "నీరు (జలావరణం) ఘన శిలలను (శిలావరణం) రసాయనికంగా కడిగివేస్తుంది మరియు భౌతికంగా కరిగిస్తుంది. ఇది మన ప్రకృతి దృశ్యాలను మలుస్తుంది!"
    }
  },
  {
    category: "interactions",
    question: {
      en: "Plants (Biosphere) breathing in carbon dioxide and releasing oxygen into the air (Atmosphere) is an interaction between which two spheres?",
      te: "మొక్కలు (జీవావరణం) కార్బన్ డై ఆక్సైడ్ ను పీల్చుకుని గాలిలోకి (వాతావరణం) ఆక్సిజన్‌ను విడుదల చేయడం ఏ రెండు ఆవరణల మధ్య సంబంధం?"
    },
    options: [
      { en: "Biosphere and Hydrosphere", te: "జీవావరణం మరియు జలావరణం" },
      { en: "Biosphere and Atmosphere", te: "జీవావరణం మరియు వాతావరణం" },
      { en: "Lithosphere and Hydrosphere", te: "శిలావరణం మరియు జలావరణం" },
      { en: "Atmosphere and Lithosphere", te: "వాతావరణం మరియు శిలావరణం" }
    ],
    correctAnswer: 1,
    explanation: {
      en: "Living plants (Biosphere) continuously exchange gases with the surrounding air (Atmosphere), keeping our air fresh and breathable for humans and animals.",
      te: "మొక్కలు (జీవావరణం) చుట్టూ ఉన్న గాలితో (వాతావరణం) నిరంతరం వాయువులను మార్పిడి చేసుకుంటాయి, ఇది మన గాలిని స్వచ్ఛంగా ఉంచుతుంది."
    }
  },
  {
    category: "interactions",
    question: {
      en: "Wind storms (Atmosphere) blowing dry sand dunes across a desert (Lithosphere) is an interaction between which two spheres?",
      te: "గాలి తుఫానులు (వాతావరణం) ఎడారి ఇసుక దిబ్బలను (శిలావరణం) కదిలించడం ఏ రెండు ఆవరణల మధ్య సంబంధం?"
    },
    options: [
      { en: "Atmosphere and Hydrosphere", te: "వాతావరణం మరియు జలావరణం" },
      { en: "Biosphere and Hydrosphere", te: "జీవావరణం మరియు జలావరణం" },
      { en: "Atmosphere and Lithosphere", te: "వాతావరణం మరియు శిలావరణం" },
      { en: "Lithosphere and Biosphere", te: "శిలావరణం మరియు జీవావరణం" }
    ],
    correctAnswer: 2,
    explanation: {
      en: "Moving air (Atmosphere) exerts force on dry rocks and sand (Lithosphere), eroding lands and carrying dust thousands of miles across oceans.",
      te: "కదిలే గాలి (వాతావరణం) ఎండబెట్టిన రాళ్ళు మరియు ఇసుక (శిలావరణం) పై బలాన్ని ప్రయోగిస్తుంది, నేలను క్షీణింపజేస్తుంది మరియు ఇసుకను ఎగరవేస్తుంది."
    }
  }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; // store index of choices made
let optionLocked = false;

window.addEventListener('DOMContentLoaded', () => {
  renderQuestion();
});

function renderQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    // End of Quiz, redirect to results page
    finishQuiz();
    return;
  }

  const q = quizQuestions[currentQuestionIndex];
  optionLocked = false;

  // Update progress numbers
  const progressText = document.getElementById('quiz-progress-text');
  const progressBar = document.getElementById('quiz-progress-fill');
  if (progressText && progressBar) {
    progressText.innerHTML = `
      <span class="lang-en">Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</span>
      <span class="lang-te">ప్రశ్న ${currentQuestionIndex + 1} / ${quizQuestions.length}</span>
    `;
    const percent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Populate Question title
  const questionTitle = document.getElementById('quiz-question-title');
  if (questionTitle) {
    questionTitle.innerHTML = `
      <span class="lang-en">${q.question.en}</span>
      <span class="lang-te">${q.question.te}</span>
    `;
  }

  // Render options list
  const optionsGrid = document.getElementById('quiz-options-grid');
  if (optionsGrid) {
    optionsGrid.innerHTML = ""; // Clear
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-bullet">${String.fromCharCode(65 + idx)}</span>
        <span class="lang-en">${opt.en}</span>
        <span class="lang-te">${opt.te}</span>
      `;
      btn.addEventListener('click', (event) => selectOption(idx, event));
      optionsGrid.appendChild(btn);
    });
  }

  // Hide next button and explanation panel initially
  const nextBtn = document.getElementById('quiz-next-btn');
  const expPanel = document.getElementById('quiz-explanation-panel');
  if (nextBtn) nextBtn.style.display = 'none';
  if (expPanel) expPanel.style.display = 'none';
}

function selectOption(selectedIdx, event) {
  if (optionLocked) return;
  optionLocked = true;

  const q = quizQuestions[currentQuestionIndex];
  userAnswers.push(selectedIdx);

  const optionsGrid = document.getElementById('quiz-options-grid');
  const optionButtons = optionsGrid.querySelectorAll('.quiz-option-btn');
  const isCorrect = (selectedIdx === q.correctAnswer);

  // Kid-friendly feedback database
  const correctFeeds = [
    { en: "🎉 Correct!", te: "🎉 నిజం!" },
    { en: "🌟 Outstanding!", te: "🌟 అద్భుతం!" },
    { en: "🚀 Superb!", te: "🚀 శభాష్!" },
    { en: "🎯 Spot on!", te: "🎯 కరెక్ట్!" }
  ];
  const incorrectFeeds = [
    { en: "🙈 Almost!", te: "🙈 దాదాపుగా!" },
    { en: "🦖 Uh oh!", te: "🦖 అయ్యో!" },
    { en: "🌪️ Close one!", te: "🌪️ దగ్గరికి వచ్చారు!" },
    { en: "💡 Think again!", te: "💡 మళ్లీ ఆలోచించండి!" }
  ];

  const activeLang = localStorage.getItem('earth_spheres_lang') || 'en';
  const randomIdx = Math.floor(Math.random() * 4);
  const feedbackText = isCorrect ? correctFeeds[randomIdx] : incorrectFeeds[randomIdx];

  // Highlight choices
  optionButtons.forEach((btn, idx) => {
    btn.disabled = true; // Lock choice buttons
    if (idx === q.correctAnswer) {
      btn.classList.add('correct');
    }
    if (idx === selectedIdx && selectedIdx !== q.correctAnswer) {
      btn.classList.add('incorrect');
    }

    // Append visual text tag to the user clicked option
    if (idx === selectedIdx) {
      const tag = document.createElement('span');
      tag.style.marginLeft = 'auto';
      tag.style.padding = '4px 12px';
      tag.style.borderRadius = '12px';
      tag.style.fontSize = '0.9rem';
      tag.style.fontWeight = '800';
      tag.style.color = 'white';
      tag.style.backgroundColor = isCorrect ? '#198754' : '#dc3545';
      tag.style.animation = 'slide-fade-in 0.3s ease-out forwards';
      tag.innerHTML = `
        <span class="lang-en">${feedbackText.en}</span>
        <span class="lang-te">${feedbackText.te}</span>
      `;
      btn.appendChild(tag);
    }
  });

  // Score count
  if (isCorrect) {
    score++;
    playTone(523.25, 0.2, 'sine'); // happy click tone
    if (event) createSparkleBurst(event.clientX, event.clientY);
  } else {
    playTone(220, 0.25, 'sawtooth'); // buzz fail tone
  }

  // Show explanation
  const expPanel = document.getElementById('quiz-explanation-panel');
  const expText = document.getElementById('quiz-explanation-text');
  if (expPanel && expText) {
    expText.innerHTML = `
      <span class="lang-en">${q.explanation.en}</span>
      <span class="lang-te">${q.explanation.te}</span>
    `;
    expPanel.style.display = 'block';
  }

  // Show Next button
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-flex';
    
    // If it is the last question, change next button text to "See Results"
    if (currentQuestionIndex === quizQuestions.length - 1) {
      nextBtn.innerHTML = `
        <span class="lang-en">See Results 📊</span>
        <span class="lang-te">ఫలితాలు చూడు 📊</span>
      `;
    }
  }
}

window.nextQuestion = function() {
  currentQuestionIndex++;
  renderQuestion();
  playTone(392, 0.1);
};

function finishQuiz() {
  // Save results data into localStorage for results.html to pick up
  const percentage = Math.round((score / quizQuestions.length) * 100);
  
  localStorage.setItem('earth_spheres_quiz_score', percentage);
  localStorage.setItem('earth_spheres_quiz_answers', JSON.stringify(userAnswers));
  
  // Award quiz champion badge if 100%
  if (percentage === 100) {
    unlockBadge('quiz_champion');
  }

  // Go to results page
  window.location.href = "results.html";
}

function playTone(freq, duration, type = 'sine') {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}
