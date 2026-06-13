/* =========================================================
   main.js – Global: Language Toggle, TTS, Progress Tracking
   Methods of Separation Learning Platform
   ========================================================= */

// ── Translations Object ──────────────────────────────────
const TRANSLATIONS = {
  en: {
    // Navbar
    'nav.brand': 'ScienceKids',
    'nav.home': 'Home',
    'nav.listen': '🎙️ Listen',
    'nav.progress': 'Progress',

    // Home Page
    'home.badge': '🔬 Science Made Fun!',
    'home.title.1': 'Discover the Magic of',
    'home.title.2': 'Separation Science!',
    'home.subtitle': 'Learn how scientists separate mixtures using Filtration, Evaporation & Distillation. Explore virtual labs and take fun quizzes!',
    'home.btn.start': '🚀 Start Learning',
    'home.btn.lab': '🧪 Go to Lab',
    'home.nav.title': '📚 Choose a Topic',
    'home.nav.subtitle': 'Pick any topic below to start your science adventure!',

    'card.filtration.title': 'Filtration',
    'card.filtration.desc': 'Separate solids from liquids using filter paper',
    'card.evaporation.title': 'Evaporation',
    'card.evaporation.desc': 'Remove liquid by heating a mixture',
    'card.distillation.title': 'Distillation',
    'card.distillation.desc': 'Separate liquids using boiling & cooling',
    'card.lab.title': 'Virtual Lab',
    'card.lab.desc': 'Do real experiments in a virtual lab!',
    'card.quiz.title': 'Take a Quiz',
    'card.quiz.desc': 'Test your science knowledge!',

    'home.why.title': '🌍 Why Do We Separate Mixtures?',
    'home.why.text': 'In our daily life, many substances are found mixed together. Scientists and engineers use separation methods to get pure substances. For example, we filter drinking water to remove dirt, evaporate sea water to get salt, and distill water to make it pure!',

    'home.progress.title': '⭐ Your Learning Progress',
    'home.badges.title': '🏅 Your Achievements',
    'badge.filtration': 'Filtration Master',
    'badge.evaporation': 'Evaporation Expert',
    'badge.distillation': 'Distillation Pro',
    'badge.lab': 'Lab Scientist',
    'badge.quiz': 'Quiz Champion',

    // Topic Pages
    'btn.back': '← Back',
    'btn.complete': '✅ Mark as Complete',
    'btn.completed': '✅ Lesson Completed!',
    'section.definition': '📖 Definition',
    'section.howworks': '⚙️ How Does It Work?',
    'section.examples': '🌍 Real-Life Examples',
    'section.funfacts': '💡 Fun Facts',
    'section.demo': '🎬 Watch the Animation',
    'demo.play': '▶ Play',
    'demo.pause': '⏸ Pause',
    'demo.replay': '🔁 Replay',

    // Filtration
    'filtration.title': 'Filtration',
    'filtration.subtitle': 'Separating solids from liquids using filter paper',
    'filtration.def': 'Filtration is a separation method where a mixture of a solid and liquid is passed through a filter (like filter paper) to separate the solid particles from the liquid.',
    'filtration.how.1': 'The mixture is poured into a funnel lined with filter paper.',
    'filtration.how.2': 'The liquid (called the filtrate) passes through the tiny holes in the filter paper.',
    'filtration.how.3': 'The solid particles (called residue) are too big to pass through and remain on the filter paper.',
    'filtration.fact1': 'The water you drink every day is purified using filtration! Water treatment plants use sand and gravel as giant filters.',
    'filtration.fact2': 'Your kidneys filter about 200 liters of blood every single day using a natural filtration process!',
    'filtration.fact3': 'Coffee is made by filtering hot water through ground coffee beans – that\'s filtration in action!',
    'filtration.ex.1': '☕ Making Tea / Coffee',
    'filtration.ex.2': '🚰 Water Purification',
    'filtration.ex.3': '🧃 Fruit Juice Straining',
    'filtration.ex.4': '🩺 Blood Purification (Kidneys)',
    'filtration.ex.5': '🏭 Industrial Water Treatment',
    'filtration.ex.6': '🍪 Sieving Flour',
    'filtration.demo.title': '🧪 Filtration – Watch dirty water become clean!',

    // Evaporation
    'evaporation.title': 'Evaporation',
    'evaporation.subtitle': 'Separating dissolved solids from liquids using heat',
    'evaporation.def': 'Evaporation is a process where a liquid is heated and turns into vapor (gas), leaving behind any dissolved solids. It is used to separate a dissolved substance from a solvent.',
    'evaporation.how.1': 'A solution (like salt water) is placed in a dish and heated.',
    'evaporation.how.2': 'The heat energy causes the liquid (water) molecules to move faster and escape as vapor.',
    'evaporation.how.3': 'As the water evaporates, the dissolved solid (salt) is left behind as crystals.',
    'evaporation.fact1': 'India gets most of its salt by evaporating sea water in large shallow ponds called salt pans!',
    'evaporation.fact2': 'The water cycle is nature\'s own evaporation process – the Sun heats ocean water, which evaporates and forms clouds!',
    'evaporation.fact3': 'When you sweat, water evaporates from your skin and cools your body down – that\'s evaporation at work!',
    'evaporation.ex.1': '🧂 Making Salt from Sea Water',
    'evaporation.ex.2': '👕 Drying Wet Clothes',
    'evaporation.ex.3': '💧 The Water Cycle',
    'evaporation.ex.4': '🏊 Pool Water Evaporating',
    'evaporation.ex.5': '😓 Sweating cools our body',
    'evaporation.ex.6': '🍲 Cooking – Reducing Sauces',
    'evaporation.demo.title': '🔥 Evaporation – Watch salt water turn into crystals!',

    // Distillation
    'distillation.title': 'Distillation',
    'distillation.subtitle': 'Separating liquids based on their different boiling points',
    'distillation.def': 'Distillation is a separation method where a liquid mixture is heated to form vapor, the vapor is then cooled in a condenser, and the pure liquid is collected. It works because different liquids have different boiling points.',
    'distillation.how.1': 'The liquid mixture is heated in a distillation flask.',
    'distillation.how.2': 'The component with the lowest boiling point evaporates first and rises as vapor.',
    'distillation.how.3': 'The vapor passes through a condenser where it is cooled by cold water and turns back into liquid (condensate).',
    'distillation.how.4': 'The purified liquid is collected in a separate flask.',
    'distillation.fact1': 'Petrol, diesel, kerosene, and LPG are all separated from crude oil using a process called fractional distillation!',
    'distillation.fact2': 'Pure drinking water can be made by distilling sea water — ships and submarines use this method!',
    'distillation.fact3': 'The perfume industry uses distillation to extract fragrant oils from flowers and plants!',
    'distillation.ex.1': '⛽ Crude Oil Refining (Petrol/Diesel)',
    'distillation.ex.2': '🚢 Ships Making Drinking Water',
    'distillation.ex.3': '🌹 Perfume & Essential Oils',
    'distillation.ex.4': '🥃 Alcohol Distillation',
    'distillation.ex.5': '🌊 Desalination Plants',
    'distillation.ex.6': '🔬 Laboratory Water Purification',
    'distillation.demo.title': '⚗️ Distillation – Watch vapor condense into pure liquid!',
    'nav.next.evaporation': 'Next: Evaporation ☀️ →',
    'nav.try.lab': 'Try in Virtual Lab 🧪',
    'nav.next.distillation': 'Next: Distillation ⚗️ →',
    'nav.take.quiz': 'Take the Quiz 🧠 →',

    // Quiz
    'quiz.title': '🧠 Science Quiz',
    'quiz.subtitle': 'Test what you\'ve learned!',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.next': 'Next Question →',
    'quiz.submit': '🏆 See Results!',
    'quiz.correct': '🎉 Correct! Well done!',
    'quiz.wrong': '❌ Oops! Try harder next time.',
    'quiz.score': 'Score',

    // Results
    'results.title': 'Your Results',
    'results.score': 'Score',
    'results.correct': 'Correct',
    'results.wrong': 'Wrong',
    'results.percent': 'Percentage',
    'results.badge.champion': '🏆 Science Champion!',
    'results.badge.explorer': '🌟 Science Explorer!',
    'results.badge.learner': '📚 Curious Learner!',
    'results.badge.practice': '💪 Keep Practicing!',
    'results.msg.champion': 'Outstanding! You\'re a Science Champion! You have mastered the methods of separation!',
    'results.msg.explorer': 'Great job! You\'re a Science Explorer! Keep learning and you\'ll be a champion soon!',
    'results.msg.learner': 'Good effort! You\'re a Curious Learner! Review the topics and try again!',
    'results.msg.practice': 'Don\'t give up! Read through the lessons again and you\'ll do much better!',
    'results.btn.review': '📋 Review Answers',
    'results.btn.retake': '🔄 Retake Quiz',
    'results.btn.home': '🏠 Go Home',
    'results.review.title': '📋 Answer Review',
    'results.review.num': '#',
    'results.review.question': 'Question',
    'results.review.your_ans': 'Your Answer',
    'results.review.correct_ans': 'Correct Answer',
    'results.continue': '📚 Continue Learning',

    // Lab
    'lab.title': '🧪 Virtual Science Lab',
    'lab.subtitle': 'Perform real experiments virtually!',
    'lab.materials': '🧰 Materials',
    'lab.instructions': '📋 Step-by-Step Guide',
    'lab.btn.start': '▶ Start Experiment',
    'lab.btn.reset': '🔄 Reset',
    'lab.complete': 'Experiment Complete!',
    'lab.drag.hint': 'Drag materials to the experiment area',

    // TTS
    'tts.listen': 'Listen',
    'tts.play': '▶',
    'tts.pause': '⏸',
    'tts.stop': '⏹',
  },

  te: {
    // Navbar
    'nav.brand': 'సైన్స్ కిడ్స్',
    'nav.home': 'హోమ్',
    'nav.listen': '🎙️ వినండి',
    'nav.progress': 'పురోగతి',

    // Home Page
    'home.badge': '🔬 సైన్స్ మరింత సరదాగా!',
    'home.title.1': 'వేరుపరచడం యొక్క',
    'home.title.2': 'మాయను కనుగొనండి!',
    'home.subtitle': 'వడపోత, ఆవిరి మరియు స్వేదనం ద్వారా శాస్త్రవేత్తలు మిశ్రమాలను వేరు చేసే విధానాలను నేర్చుకోండి. వర్చువల్ ల్యాబ్‌లను అన్వేషించండి!',
    'home.btn.start': '🚀 నేర్చుకోవడం ప్రారంభించు',
    'home.btn.lab': '🧪 ల్యాబ్‌కు వెళ్ళు',
    'home.nav.title': '📚 ఒక విషయాన్ని ఎంచుకోండి',
    'home.nav.subtitle': 'మీ సైన్స్ అడ్వెంచర్ ప్రారంభించడానికి దిగువ ఏదైనా అంశాన్ని ఎంచుకోండి!',

    'card.filtration.title': 'వడపోత',
    'card.filtration.desc': 'ఫిల్టర్ పేపర్ ఉపయోగించి ఘనపదార్థాలను ద్రవాల నుండి వేరు చేయు',
    'card.evaporation.title': 'ఆవిరి',
    'card.evaporation.desc': 'వేడి చేయడం ద్వారా మిశ్రమం నుండి ద్రవాన్ని తొలగించు',
    'card.distillation.title': 'స్వేదనం',
    'card.distillation.desc': 'మరిగించడం మరియు చల్లారించడం ద్వారా ద్రవాలను వేరు చేయు',
    'card.lab.title': 'వర్చువల్ ల్యాబ్',
    'card.lab.desc': 'వర్చువల్ ల్యాబ్‌లో నిజమైన ప్రయోగాలు చేయండి!',
    'card.quiz.title': 'క్విజ్ తీసుకో',
    'card.quiz.desc': 'మీ సైన్స్ జ్ఞానాన్ని పరీక్షించుకోండి!',

    'home.why.title': '🌍 మనం మిశ్రమాలను ఎందుకు వేరు చేస్తాం?',
    'home.why.text': 'మన దైనందిన జీవితంలో, అనేక పదార్ధాలు కలిసి కనిపిస్తాయి. శాస్త్రవేత్తలు స్వచ్ఛమైన పదార్థాలను పొందేందుకు వేరుపరచే పద్ధతులను ఉపయోగిస్తారు. ఉదాహరణకు, మనం తాగే నీటిని వడపోత ద్వారా శుద్ధి చేస్తాం, సముద్రపు నీటిని ఆవిరి చేసి ఉప్పు తయారు చేస్తాం, మరియు స్వేదనం ద్వారా నీటిని స్వచ్ఛం చేస్తాం!',

    'home.progress.title': '⭐ మీ అభ్యాస పురోగతి',
    'home.badges.title': '🏅 మీ విజయాలు',
    'badge.filtration': 'వడపోత నిపుణుడు',
    'badge.evaporation': 'ఆవిరి నిపుణుడు',
    'badge.distillation': 'స్వేదనం నిపుణుడు',
    'badge.lab': 'ల్యాబ్ శాస్త్రవేత్త',
    'badge.quiz': 'క్విజ్ చాంపియన్',

    // Topic Pages
    'btn.back': '← వెనుకకు',
    'btn.complete': '✅ పూర్తయినట్లు గుర్తించు',
    'btn.completed': '✅ పాఠం పూర్తయింది!',
    'section.definition': '📖 నిర్వచనం',
    'section.howworks': '⚙️ ఇది ఎలా పని చేస్తుంది?',
    'section.examples': '🌍 వాస్తవ జీవిత ఉదాహరణలు',
    'section.funfacts': '💡 సరదా వాస్తవాలు',
    'section.demo': '🎬 యానిమేషన్ చూడండి',
    'demo.play': '▶ ప్లే',
    'demo.pause': '⏸ పాజ్',
    'demo.replay': '🔁 మళ్ళీ',

    // Filtration
    'filtration.title': 'వడపోత',
    'filtration.subtitle': 'ఫిల్టర్ పేపర్ ఉపయోగించి ద్రవాల నుండి ఘనపదార్థాలను వేరు చేయడం',
    'filtration.def': 'వడపోత అనేది ఒక వేరుపరచే పద్ధతి, దీనిలో ఘన మరియు ద్రవ మిశ్రమాన్ని ఫిల్టర్ పేపర్ ద్వారా పంపి ఘన కణాలను ద్రవం నుండి వేరు చేస్తారు.',
    'filtration.how.1': 'మిశ్రమాన్ని ఫిల్టర్ పేపర్ పరచిన గరాటులోకి పోస్తారు.',
    'filtration.how.2': 'ద్రవం (ఫిల్ట్రేట్ అంటారు) ఫిల్టర్ పేపర్‌లోని చిన్న రంధ్రాల గుండా వెళుతుంది.',
    'filtration.how.3': 'ఘన కణాలు (అవశేషం అంటారు) చాలా పెద్దవి కాబట్టి వాటికి ఫిల్టర్ పేపర్ మీదనే ఉంటాయి.',
    'filtration.fact1': 'మీరు ప్రతిరోజు తాగే నీటిని వడపోత ద్వారా శుద్ధి చేస్తారు! నీటి శుద్ధి కర్మాగారాలు ఇసుక మరియు గులక రాళ్ళను పెద్ద ఫిల్టర్లుగా ఉపయోగిస్తాయి.',
    'filtration.fact2': 'మీ మూత్రపిండాలు ప్రతి రోజు 200 లీటర్ల రక్తాన్ని ఒక సహజ వడపోత ప్రక్రియ ద్వారా వడపోస్తాయి!',
    'filtration.fact3': 'కాఫీని వేడి నీటిని పొడి కాఫీ బీన్స్ ద్వారా ఫిల్టర్ చేయడం ద్వారా తయారు చేస్తారు – ఇది వడపోత!',
    'filtration.ex.1': '☕ టీ / కాఫీ తయారు చేయడం',
    'filtration.ex.2': '🚰 నీటి శుద్ధి',
    'filtration.ex.3': '🧃 పండ్ల రసం వడకట్టడం',
    'filtration.ex.4': '🩺 రక్త శుద్ధి (మూత్రపిండాలు)',
    'filtration.ex.5': '🏭 పారిశ్రామిక నీటి శుద్ధి',
    'filtration.ex.6': '🍪 పిండి జల్లెడ పట్టడం',
    'filtration.demo.title': '🧪 వడపోత – మురికి నీరు శుభ్రంగా మారడం చూడండి!',

    // Evaporation
    'evaporation.title': 'ఆవిరి',
    'evaporation.subtitle': 'వేడి ఉపయోగించి ద్రావణాల నుండి కరిగిన ఘనపదార్థాలను వేరు చేయడం',
    'evaporation.def': 'ఆవిరి అనేది ఒక ప్రక్రియ, దీనిలో ద్రవాన్ని వేడి చేస్తే అది ఆవిరిగా మారి, కరిగిన ఘనపదార్థాలు వెనుక ఉంటాయి.',
    'evaporation.how.1': 'ఒక ద్రావణం (ఉప్పు నీరు వంటిది) ఒక చట్టిలో ఉంచి వేడి చేస్తారు.',
    'evaporation.how.2': 'వేడి శక్తి వల్ల నీటి అణువులు వేగంగా కదిలి ఆవిరిగా తప్పించుకుంటాయి.',
    'evaporation.how.3': 'నీరు ఆవిరైన కొద్దీ, కరిగిన ఘనపదార్థం (ఉప్పు) స్ఫటికాలుగా మిగిలిపోతుంది.',
    'evaporation.fact1': 'భారతదేశం చాలా ఉప్పును "ఉప్పు పాన్లు" అని పిలువబడే పెద్ద నుగ్గు కొలనులలో సముద్రపు నీటిని ఆవిరి చేయడం ద్వారా పొందుతుంది!',
    'evaporation.fact2': 'నీటి చక్రం అనేది ప్రకృతి యొక్క స్వంత ఆవిరి ప్రక్రియ – సూర్యుడు సమద్రపు నీటిని వేడి చేస్తాడు, ఇది ఆవిరిగా మారి మేఘాలుగా ఏర్పడుతుంది!',
    'evaporation.fact3': 'మీరు చెమటపట్టినప్పుడు, నీరు ఆవిరైపోయి మీ శరీరాన్ని చల్లగా చేస్తుంది!',
    'evaporation.ex.1': '🧂 సముద్రపు నీటి నుండి ఉప్పు తయారు చేయడం',
    'evaporation.ex.2': '👕 తడి బట్టలు ఆరబెట్టడం',
    'evaporation.ex.3': '💧 నీటి చక్రం',
    'evaporation.ex.4': '🏊 ఈత కొలను నీరు ఆవిరైపోవడం',
    'evaporation.ex.5': '😓 చెమట మన శరీరాన్ని చల్లబరుస్తుంది',
    'evaporation.ex.6': '🍲 వంట చేయడం – సాస్‌లు తగ్గించడం',
    'evaporation.demo.title': '🔥 ఆవిరి – ఉప్పు నీరు స్ఫటికాలుగా మారడం చూడండి!',

    // Distillation
    'distillation.title': 'స్వేదనం',
    'distillation.subtitle': 'వేర్వేరు మరిగే ఉష్ణోగ్రతల ఆధారంగా ద్రవాలను వేరు చేయడం',
    'distillation.def': 'స్వేదనం అనేది వేరుపరచే పద్ధతి, దీనిలో ద్రవ మిశ్రమాన్ని వేడి చేసి ఆవిరిగా మార్చి, ఆ ఆవిరిని కండెన్సర్‌లో చల్లారించి స్వచ్ఛమైన ద్రవాన్ని సేకరిస్తారు.',
    'distillation.how.1': 'ద్రవ మిశ్రమాన్ని స్వేదన ఫ్లాస్క్‌లో వేడి చేస్తారు.',
    'distillation.how.2': 'అత్యల్ప మరిగే ఉష్ణోగ్రత గల భాగం మొదట ఆవిరైపోయి పైకి వెళుతుంది.',
    'distillation.how.3': 'ఆవిరి కండెన్సర్ గుండా వెళ్ళి చల్లబడి మళ్ళీ ద్రవంగా మారుతుంది.',
    'distillation.how.4': 'స్వచ్ఛమైన ద్రవం వేరే ఫ్లాస్క్‌లో సేకరించబడుతుంది.',
    'distillation.fact1': 'పెట్రోల్, డీజిల్, కిరోసిన్ మరియు LPG అన్నీ ముడి చమురు నుండి భిన్నాత్మక స్వేదనం అనే ప్రక్రియ ద్వారా వేరు చేయబడతాయి!',
    'distillation.fact2': 'సముద్రపు నీటిని స్వేదనం ద్వారా స్వచ్ఛమైన తాగు నీరుగా మార్చవచ్చు – నౌకలు మరియు జలాంతర్గాములు ఈ పద్ధతిని ఉపయోగిస్తాయి!',
    'distillation.fact3': 'పరిమళ ద్రవ్యాల పరిశ్రమ పువ్వులు మరియు మొక్కల నుండి సువాసన నూనెలను వేరు చేయడానికి స్వేదనాన్ని ఉపయోగిస్తుంది!',
    'distillation.ex.1': '⛽ ముడి చమురు శుద్ధి (పెట్రోల్/డీజిల్)',
    'distillation.ex.2': '🚢 ఓడలు త్రాగునీటిని తయారు చేయడం',
    'distillation.ex.3': '🌹 పరిమళ ద్రవ్యాలు & ముఖ్యమైన నూనెలు',
    'distillation.ex.4': '🥃 ఆల్కహాల్ స్వేదనం',
    'distillation.ex.5': '🌊 నిర్లవణీకరణ ప్లాంట్లు',
    'distillation.ex.6': '🔬 ప్రయోగశాల నీటి శుద్ధి',
    'distillation.demo.title': '⚗️ స్వేదనం – ఆవిరి స్వచ్ఛమైన ద్రవంగా మారడం చూడండి!',
    'nav.next.evaporation': 'తదుపరిది: ఆవిరి ☀️ →',
    'nav.try.lab': 'వర్చువల్ ల్యాబ్‌లో ప్రయత్నించండి 🧪',
    'nav.next.distillation': 'తదుపరిది: స్వేదనం ⚗️ →',
    'nav.take.quiz': 'క్విజ్ తీసుకోండి 🧠 →',

    // Quiz
    'quiz.title': '🧠 సైన్స్ క్విజ్',
    'quiz.subtitle': 'మీరు నేర్చుకున్నది పరీక్షించుకోండి!',
    'quiz.question': 'ప్రశ్న',
    'quiz.of': 'లో',
    'quiz.next': 'తదుపరి ప్రశ్న →',
    'quiz.submit': '🏆 ఫలితాలు చూడండి!',
    'quiz.correct': '🎉 సరైనది! చాలా బాగు!',
    'quiz.wrong': '❌ అయ్యో! తదుపరిసారి కష్టపడండి.',
    'quiz.score': 'స్కోర్',

    // Results
    'results.title': 'మీ ఫలితాలు',
    'results.score': 'స్కోర్',
    'results.correct': 'సరైనవి',
    'results.wrong': 'తప్పినవి',
    'results.percent': 'శాతం',
    'results.badge.champion': '🏆 సైన్స్ చాంపియన్!',
    'results.badge.explorer': '🌟 సైన్స్ అన్వేషకుడు!',
    'results.badge.learner': '📚 ఉత్సుకత గల నేర్చుకునే వాడు!',
    'results.badge.practice': '💪 సాధన చేస్తూ ఉండండి!',
    'results.msg.champion': 'అద్భుతం! మీరు సైన్స్ చాంపియన్! మీరు వేరుపరచే పద్ధతులను పూర్తిగా నేర్చుకున్నారు!',
    'results.msg.explorer': 'చాలా బాగు! మీరు సైన్స్ అన్వేషకుడు! నేర్చుకుంటూ ఉండండి మరియు మీరు త్వరలో చాంపియన్ అవుతారు!',
    'results.msg.learner': 'మంచి ప్రయత్నం! అంశాలను మళ్ళీ చదివి మళ్ళీ ప్రయత్నించండి!',
    'results.msg.practice': 'వదులుకోకండి! పాఠాలను మళ్ళీ చదివి మరింత మెరుగ్గా చేయండి!',
    'results.btn.review': '📋 సమాధానాలు చూడండి',
    'results.btn.retake': '🔄 క్విజ్ మళ్ళీ తీసుకోండి',
    'results.btn.home': '🏠 హోమ్‌కు వెళ్ళు',
    'results.review.title': '📋 సమాధాన సమీక్ష',
    'results.review.num': '#',
    'results.review.question': 'ప్రశ్న',
    'results.review.your_ans': 'మీ సమాధానం',
    'results.review.correct_ans': 'సరైన సమాధానం',
    'results.continue': '📚 నేర్చుకోవడం కొనసాగించండి',

    // Lab
    'lab.title': '🧪 వర్చువల్ సైన్స్ ల్యాబ్',
    'lab.subtitle': 'వర్చువల్‌గా నిజమైన ప్రయోగాలు చేయండి!',
    'lab.materials': '🧰 సామాగ్రి',
    'lab.instructions': '📋 దశల వారీ మార్గదర్శి',
    'lab.btn.start': '▶ ప్రయోగం ప్రారంభించు',
    'lab.btn.reset': '🔄 రీసెట్',
    'lab.complete': 'ప్రయోగం పూర్తయింది!',
    'lab.drag.hint': 'సామాగ్రిని ప్రయోగ ప్రాంతానికి లాగండి',

    // TTS
    'tts.listen': 'వినండి',
    'tts.play': '▶',
    'tts.pause': '⏸',
    'tts.stop': '⏹',
  }
};

// ── Language State ───────────────────────────────────────
let currentLang = localStorage.getItem('sciLang') || 'en';

/**
 * Get translated string for a key
 */
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
         (TRANSLATIONS['en'][key]) || key;
}

/**
 * Apply translations to all [data-i18n] elements on the page
 */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  // Update HTML lang attr
  document.documentElement.lang = currentLang;
}

/**
 * Switch language and re-apply translations
 */
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sciLang', lang);
  applyTranslations();
  // Stop TTS on language switch
  stopTTS();
}

// ── Text-to-Speech ───────────────────────────────────────
let ttsUtterance = null;
let ttsParagraphs = [];
let ttsCurrentIndex = 0;
let ttsActive = false;

/**
 * Gather all TTS-content paragraphs on current page
 */
function collectTTSContent() {
  ttsParagraphs = [];
  document.querySelectorAll('.tts-content [data-tts]').forEach(el => {
    ttsParagraphs.push(el);
  });
  // If no [data-tts] elements, fall back to .tts-content paragraphs
  if (ttsParagraphs.length === 0) {
    document.querySelectorAll('.tts-content p, .tts-content li').forEach(el => {
      ttsParagraphs.push(el);
    });
  }
}

/**
 * Highlight a specific paragraph being read
 */
function highlightParagraph(index) {
  ttsParagraphs.forEach((p, i) => {
    p.classList.toggle('tts-highlight', i === index);
  });
}

/**
 * Clear all highlights
 */
function clearHighlights() {
  ttsParagraphs.forEach(p => p.classList.remove('tts-highlight'));
}

/**
 * Speak a single paragraph
 */
function speakParagraph(index) {
  if (index >= ttsParagraphs.length) {
    clearHighlights();
    ttsActive = false;
    return;
  }
  const text = ttsParagraphs[index].textContent.trim();
  if (!text) { speakParagraph(index + 1); return; }

  highlightParagraph(index);
  ttsCurrentIndex = index;

  ttsUtterance = new SpeechSynthesisUtterance(text);
  ttsUtterance.rate = 0.92;
  ttsUtterance.pitch = 1.05;
  ttsUtterance.volume = 1;

  // Language selection
  if (currentLang === 'te') {
    // Try Telugu voice
    const voices = speechSynthesis.getVoices();
    const teVoice = voices.find(v => v.lang.startsWith('te'));
    if (teVoice) {
      ttsUtterance.voice = teVoice;
      ttsUtterance.lang = 'te-IN';
    } else {
      ttsUtterance.lang = 'en-US';
    }
  } else {
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
                    voices.find(v => v.lang.startsWith('en-US')) ||
                    voices.find(v => v.lang.startsWith('en'));
    if (enVoice) ttsUtterance.voice = enVoice;
    ttsUtterance.lang = 'en-US';
  }

  ttsUtterance.onend = () => {
    if (ttsActive) speakParagraph(index + 1);
  };
  ttsUtterance.onerror = () => {
    if (ttsActive) speakParagraph(index + 1);
  };

  speechSynthesis.speak(ttsUtterance);
}

function playTTS() {
  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support text-to-speech. Please try Chrome or Edge.');
    return;
  }
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    ttsActive = true;
    return;
  }
  stopTTS();
  
  // A small delay allows the browser's TTS engine to fully clear before starting new speech
  setTimeout(() => {
    collectTTSContent();
    ttsCurrentIndex = 0;
    ttsActive = true;
    // Ensure voices are loaded
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        if (ttsActive) {
          speakParagraph(0);
        }
        speechSynthesis.onvoiceschanged = null;
      };
    } else {
      speakParagraph(0);
    }
  }, 50);
}

function pauseTTS() {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    ttsActive = false;
  }
}

function stopTTS() {
  ttsActive = false;
  if (ttsUtterance) {
    ttsUtterance.onend = null;
    ttsUtterance.onerror = null;
  }
  speechSynthesis.cancel();
  clearHighlights();
}

// ── Progress Tracking ────────────────────────────────────
const PROGRESS_KEYS = {
  filtration: 'progress_filtration',
  evaporation: 'progress_evaporation',
  distillation: 'progress_distillation',
  lab: 'progress_lab',
  quiz: 'progress_quiz'
};
const BADGE_KEYS = {
  filtration: 'badge_filtration',
  evaporation: 'badge_evaporation',
  distillation: 'badge_distillation',
  lab: 'badge_lab',
  quiz: 'badge_quiz'
};

function getProgress(key) {
  return localStorage.getItem(PROGRESS_KEYS[key]) === 'true';
}
function setProgress(key) {
  localStorage.setItem(PROGRESS_KEYS[key], 'true');
  localStorage.setItem(BADGE_KEYS[key], 'true');
}
function getBadge(key) {
  return localStorage.getItem(BADGE_KEYS[key]) === 'true';
}

function getOverallProgress() {
  const keys = Object.keys(PROGRESS_KEYS);
  const done = keys.filter(k => getProgress(k)).length;
  return Math.round((done / keys.length) * 100);
}

/**
 * Update nav progress bar
 */
function updateNavProgress() {
  const pct = getOverallProgress();
  const fill = document.querySelector('.nav-progress-fill');
  const label = document.querySelector('.nav-progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '%';
}

/**
 * Mark a lesson complete and update UI
 */
function markComplete(key) {
  setProgress(key);
  updateNavProgress();
  const btn = document.getElementById('btn-complete');
  if (btn) {
    btn.textContent = t('btn.completed');
    btn.classList.add('done');
    btn.disabled = true;
  }
  // Show a celebration
  showMiniCelebration();
}

/**
 * Mini star burst celebration
 */
function showMiniCelebration() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    font-size:4rem;z-index:9999;pointer-events:none;
    animation:celebrationPop 1.5s ease forwards;
  `;
  overlay.textContent = '🎉⭐🎊';
  const style = document.createElement('style');
  style.textContent = `
    @keyframes celebrationPop {
      0%  {opacity:0;transform:translate(-50%,-50%) scale(0.5);}
      30% {opacity:1;transform:translate(-50%,-50%) scale(1.3);}
      70% {opacity:1;transform:translate(-50%,-50%) scale(1);}
      100%{opacity:0;transform:translate(-50%,-60%) scale(0.8);}
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);
  setTimeout(() => { overlay.remove(); style.remove(); }, 1600);
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply translations
  applyTranslations();

  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });

  // TTS buttons
  const playBtn  = document.getElementById('tts-play');
  const pauseBtn = document.getElementById('tts-pause');
  const stopBtn  = document.getElementById('tts-stop');
  if (playBtn)  playBtn.addEventListener('click', playTTS);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTTS);
  if (stopBtn)  stopBtn.addEventListener('click', stopTTS);

  // Nav progress
  updateNavProgress();

  // Complete button
  const completeBtn = document.getElementById('btn-complete');
  if (completeBtn) {
    const pageKey = document.body.dataset.page;
    if (pageKey && getProgress(pageKey)) {
      completeBtn.textContent = t('btn.completed');
      completeBtn.classList.add('done');
      completeBtn.disabled = true;
    }
    completeBtn.addEventListener('click', () => {
      const key = document.body.dataset.page;
      if (key) markComplete(key);
    });
  }

  // Stop TTS on page unload
  window.addEventListener('beforeunload', stopTTS);
});
