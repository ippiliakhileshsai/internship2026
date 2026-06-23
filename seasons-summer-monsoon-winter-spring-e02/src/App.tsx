import React, { useState } from "react";
import { 
  ArrowLeft, 
  RefreshCw, 
  Sparkles, 
  Home
} from "lucide-react";

export type SeasonKey = "Summer" | "Monsoon" | "Winter" | "Spring";

export interface SeasonDetail {
  emoji: string;
  description: string;
  detailedIntro: string;
  categories: Record<string, string[]>;
  bgColor: string;
  textColor: string;
  cardBg: string;
}

// Simplified kids-ready data structure - only basic words and emojis, easy for young children!
const SEASONS_DATA: Record<SeasonKey, SeasonDetail> = {
  Summer: {
    emoji: "☀️",
    description: "The sun is hot, days are long, and we go swimming!",
    detailedIntro: "Welcome to Summer! The sun is yellow and hot. Trees have green leaves. We eat cool foods and have fun outside!",
    categories: {
      "Yummy Foods": [
        "Ice Cream 🍦",
        "Watermelon 🍉",
        "Mango Juice 🥭",
        "Cold Lemonade 🍋"
      ],
      "Cool Clothes": [
        "Soft T-shirt 👕",
        "Sun Hat 👒",
        "Swim Shorts 🩳",
        "Sandals 🩴"
      ],
      "Fun Things": [
        "Sun Cream 🧴",
        "Cool Fan 💨",
        "Swim Ring 🛟",
        "Hand Fan 🪭"
      ],
      "Summer Nature": [
        "Sunny Sky 🌤️",
        "Cool Shade 🌳",
        "Sunset 🌅",
        "Warm Wind 🍃"
      ]
    },
    bgColor: "from-amber-400 to-orange-500",
    textColor: "text-orange-600",
    cardBg: "bg-amber-50"
  },
  Monsoon: {
    emoji: "🌧️",
    description: "Dark clouds rain, frogs jump, and paper boats float!",
    detailedIntro: "Welcome to Monsoon! It rains to help flowers grow. Frogs jump in water, peacocks dance, and we use umbrellas to stay dry!",
    categories: {
      "Warm Foods": [
        "Warm Tea ☕",
        "Sweet Corn 🌽",
        "Hot Soup 🥣",
        "Hot Snacks 🧆"
      ],
      "Rainy Gear": [
        "Raincoat 🧥",
        "Umbrella ☔",
        "Rain Boots 🥾",
        "Shorts 🩳"
      ],
      "Fun Times": [
        "Paper Boat ⛵",
        "Water Puddle 💦",
        "Rainbow 🌈",
        "Falling Rain 🌧️"
      ],
      "Rainy Nature": [
        "Storm Clouds ⛈️",
        "Little Frog 🐸",
        "Peacock 🪶",
        "Rain Mist 🌫️"
      ]
    },
    bgColor: "from-sky-500 to-indigo-650",
    textColor: "text-indigo-600",
    cardBg: "bg-sky-50"
  },
  Winter: {
    emoji: "❄️",
    description: "Wear cozy hats, drink warm soup, and build a snowman!",
    detailedIntro: "Welcome to Winter! The air is very cold. White snow falls from the sky. We wear warm jackets and gloves to stay cozy!",
    categories: {
      "Winter Foods": [
        "Hot Cocoa ☕",
        "Toasted Nuts 🌰",
        "Sweet Honey 🍯",
        "Warm Soup 🍅"
      ],
      "Cozy Clothes": [
        "Warm Cap 🧶",
        "Thick Sweater 🧥",
        "Cozy Scarf 🧣",
        "Warm Gloves 🧤"
      ],
      "Warm Things": [
        "Heater 🔥",
        "Soft Blanket 🛌",
        "Hot Bottle 🧴",
        "Warm Socks 🧦"
      ],
      "Winter Nature": [
        "Snow Mountain 🏔️",
        "Snowflake ❄️",
        "Penguin 🐧",
        "Snowman ⛄"
      ]
    },
    bgColor: "from-blue-400 to-cyan-500",
    textColor: "text-cyan-600",
    cardBg: "bg-blue-50"
  },
  Spring: {
    emoji: "🌸",
    description: "Beautiful flowers grow, birds sing, and butterflies fly!",
    detailedIntro: "Welcome to Spring! Plants wake up! Bright flowers bloom, gentle wind blows, and cute ladybugs crawl on flat green leaves!",
    categories: {
      "Sweet Fruits": [
        "Strawberries 🍓",
        "Fruit Salad 🥗",
        "Flower Honey 🍯",
        "Sweet Yogurt 🍧"
      ],
      "Spring Clothes": [
        "Light Jacket 🧥",
        "Flower Hat 👒",
        "Sport Shoes 👟",
        "Dress 👗"
      ],
      "Garden Gear": [
        "Flower Basket 🧺",
        "Shovel 🪴",
        "Water Sprayer 💦",
        "Butterfly Net 🦋"
      ],
      "Spring Nature": [
        "Pink Flower 🌸",
        "Butterfly 🦋",
        "Small Bird 🐦",
        "Ladybug 🐞"
      ]
    },
    bgColor: "from-lime-400 to-emerald-500",
    textColor: "text-emerald-600",
    cardBg: "bg-lime-50"
  }
};

export default function App() {
  const [view, setView] = useState<"dashboard" | "explorer" | "quiz">("dashboard");
  const [selectedSeason, setSelectedSeason] = useState<SeasonKey>("Summer");

  // Quiz States
  const [quizPool, setQuizPool] = useState<{ id: string; name: string; isSummer: boolean }[]>([]);
  const [selectedQuizItems, setSelectedQuizItems] = useState<string[]>([]);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const handleSeasonSelect = (season: SeasonKey) => {
    setSelectedSeason(season);
    setView("explorer");
  };

  // Generate a random 3x3 layout of text items containing exactly 4 Summer things and 5 distractors
  const startQuiz = () => {
    setQuizChecked(false);
    setQuizSuccess(null);
    setSelectedQuizItems([]);

    // Collect summer target pool
    const summerItems = Object.values(SEASONS_DATA.Summer.categories).flat();
    const nonSummerItems = [
      ...Object.values(SEASONS_DATA.Monsoon.categories).flat(),
      ...Object.values(SEASONS_DATA.Winter.categories).flat(),
      ...Object.values(SEASONS_DATA.Spring.categories).flat()
    ];

    // Pick 4 unique summer items
    const shuffledSummer = [...summerItems].sort(() => 0.5 - Math.random());
    const targetSummer = shuffledSummer.slice(0, 4);

    // Pick 5 unique non-summer items
    const shuffledNonSummer = [...nonSummerItems].sort(() => 0.5 - Math.random());
    const distractors = shuffledNonSummer.slice(0, 5);

    // Combine and shuffle
    const combined = [
      ...targetSummer.map(name => ({ id: `s_${name}`, name, isSummer: true })),
      ...distractors.map(name => ({ id: `ns_${name}`, name, isSummer: false }))
    ].sort(() => 0.5 - Math.random());

    setQuizPool(combined);
    setView("quiz");
  };

  const toggleQuizItem = (id: string) => {
    if (quizChecked) return;
    if (selectedQuizItems.includes(id)) {
      setSelectedQuizItems(prev => prev.filter(item => item !== id));
    } else {
      setSelectedQuizItems(prev => [...prev, id]);
    }
  };

  const verifyQuizAnswers = () => {
    const totalSummerInPool = quizPool.filter(x => x.isSummer).length;
    const correctlySelected = quizPool.filter(x => x.isSummer && selectedQuizItems.includes(x.id)).length;
    const wronglySelected = quizPool.filter(x => !x.isSummer && selectedQuizItems.includes(x.id)).length;

    const isAllCorrect = correctlySelected === totalSummerInPool && wronglySelected === 0;
    setQuizChecked(true);
    setQuizSuccess(isAllCorrect);
    setQuizScore(correctlySelected);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col justify-between">
      
      {/* Visual Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div 
          id="app-logo-box"
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => setView("dashboard")}
        >
          <div className="bg-amber-500 text-slate-950 p-2 rounded-xl font-black text-xl animate-bounce">
            🎈
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight">Kids Seasons Explorer</h1>
            
          </div>
        </div>
      </header>

      {/* Main Container Views Wrapper */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col justify-center">
        
        {/* VIEW 1: LANDING DASHBOARD */}
        {view === "dashboard" && (
          <div id="view-dashboard" className="w-full text-center py-6">
            <span className="inline-block bg-amber-400/10 text-amber-400 text-[10px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full mb-3">
              🎯 Simple Reading Game
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Explore Seasonal Words!
            </h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
              We kept it extra clean for early learning. Select any season below to read the item names, or test your memory!
            </p>

            {/* Simple Grid Picker */}
            <div id="seasons-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {(Object.keys(SEASONS_DATA) as SeasonKey[]).map((key) => {
                const s = SEASONS_DATA[key];
                return (
                  <button
                    id={`btn-select-season-${key}`}
                    key={key}
                    onClick={() => handleSeasonSelect(key)}
                    className={`p-6 rounded-2xl bg-gradient-to-b ${s.bgColor} text-white font-black hover:scale-102 transform active:scale-98 transition shadow-lg flex flex-col items-center justify-center text-center cursor-pointer min-h-[140px]`}
                  >
                    <span className="text-4xl mb-2">{s.emoji}</span>
                    <span className="text-xl tracking-tight">{key}</span>
                    <span className="text-[10px] font-normal text-white/85 mt-2 line-clamp-2">{s.description}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Play Quiz widget */}
            <div className="bg-slate-850 p-6 rounded-3xl border border-slate-800 max-w-lg mx-auto flex flex-col items-center">
              <span className="text-2xl mb-1">🥇</span>
              <h3 className="text-base font-black text-white">Ready for the Quiz Challenge?</h3>
              <p className="text-xs text-slate-400 text-center mt-1 mb-4">
                Prove you are a champion! Identify all the sweet summer things inside our pure text board.
              </p>
              <button
                id="btn-go-quiz"
                onClick={startQuiz}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition hover:scale-102 active:scale-95 text-sm cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                Play Summer Quiz Now!
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: SEASON EXPLORER */}
        {view === "explorer" && (
          <div id="view-explorer" className="w-full">
            {/* Back anchor bar */}
            <div className="mb-6 flex items-center justify-between">
              <button
                id="btn-explorer-back-home"
                onClick={() => setView("dashboard")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Seasons
              </button>
              <button
                id="btn-explorer-play-quiz"
                onClick={startQuiz}
                className="bg-amber-400 text-slate-950 hover:bg-amber-300 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                Play Summer Quiz
              </button>
            </div>

            {/* High Contrast Banner without any header image */}
            <div className={`p-6 md:p-8 rounded-3xl bg-gradient-to-br ${SEASONS_DATA[selectedSeason].bgColor} text-white mb-8 border border-white/20 shadow-xl`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{SEASONS_DATA[selectedSeason].emoji}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/80 font-bold">Discover Mode</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">{selectedSeason} Season</h2>
              <p className="text-sm md:text-base mt-2 text-white/90 leading-relaxed max-w-3xl">
                {SEASONS_DATA[selectedSeason].detailedIntro}
              </p>
            </div>

            {/* List Categories - absolutely NO image elements, only names and touchable cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Object.entries(SEASONS_DATA[selectedSeason].categories) as [string, string[]][]).map(([categoryName, itemNames]) => (
                <div 
                  id={`pkg-cat-${categoryName.replace(/\s+/g, '-').toLowerCase()}`}
                  key={categoryName}
                  className="bg-slate-850 p-6 rounded-2xl border border-slate-800 shadow-sm"
                >
                  <h3 className="text-lg font-black text-amber-400 mb-4 flex items-center gap-2">
                    <span>✨</span> {categoryName}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {itemNames.map((name, i) => (
                      <div
                        id={`item-badge-${categoryName.replace(/\s+/g, '-').toLowerCase()}-${i}`}
                        key={name}
                        className="w-full text-left bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-sm font-semibold text-slate-200 flex justify-between items-center"
                      >
                        <span className="tracking-tight">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Direct prompt at footer */}
            <div className="mt-8 text-center bg-slate-850 p-6 rounded-3xl border border-slate-800 max-w-md mx-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Enjoyed learning?</span>
              <p className="text-xs text-slate-300 mb-4">Click the Quiz button below to check your spelling memory!</p>
              <button
                id="btn-footer-start-quiz"
                onClick={startQuiz}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 rounded-2xl transition shadow shadow-amber-300/30 cursor-pointer text-sm"
              >
                🎯 Play Summer Quiz Challenge
              </button>
            </div>
          </div>
        )}

        {/* VIEW 3: SIMPLIFIED TEXT-ONLY QUIZ */}
        {view === "quiz" && (
          <div id="view-quiz" className="w-full max-w-xl mx-auto">
            
            {/* Header Quiz elements */}
            <div className="mb-6 flex items-center justify-between">
              <button
                id="btn-quiz-back-home"
                onClick={() => setView("dashboard")}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition"
              >
                <Home className="w-4 h-4" />
                Go Back Home
              </button>
              
              <span className="text-sm font-mono tracking-widest text-amber-400 font-black">
                LEVEL: SUMMER MATCH ☀️
              </span>
            </div>

            {/* Instruction Panel */}
            <div className="bg-slate-850 border border-slate-800 p-6 rounded-3xl text-center shadow-lg mb-6">
              <span className="text-3xl block mb-2 animate-bounce">🤔</span>
              <h2 className="text-xl md:text-2xl font-black text-white">The Summer Names Quiz</h2>
              <p className="text-xs text-slate-300 mt-2 line-clamp-3">
                Below are different things you see in seasons, but there are no pictures to help! Can you find and click only the <span className="text-amber-400 font-bold underline">Summer names</span>?
              </p>
            </div>

            {/* 3x3 Grid of plain text buttons only! */}
            <div id="quiz-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {quizPool.map((item) => {
                const isSelected = selectedQuizItems.includes(item.id);
                // When checked we highlight correctness
                let borderStyle = "border-slate-800 hover:border-slate-700 bg-slate-900";
                if (isSelected) {
                  borderStyle = "border-amber-400 bg-amber-500/10 text-amber-300 shadow-md shadow-amber-500/5";
                }
                if (quizChecked) {
                  if (isSelected && item.isSummer) {
                    borderStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                  } else if (isSelected && !item.isSummer) {
                    borderStyle = "border-rose-500 bg-rose-500/10 text-rose-400 animate-shake";
                  } else if (!isSelected && item.isSummer) {
                    borderStyle = "border-yellow-600/50 bg-slate-900 text-yellow-500 border-dashed";
                  }
                }

                return (
                  <button
                    id={`btn-quiz-tile-${item.id}`}
                    key={item.id}
                    disabled={quizChecked}
                    onClick={() => toggleQuizItem(item.id)}
                    className={`p-5 rounded-2xl border-2 text-center text-sm font-black transition duration-200 outline-none flex items-center justify-center min-h-[90px] ${borderStyle} ${
                      !quizChecked ? "hover:scale-102 active:scale-95 cursor-pointer" : "opacity-80"
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Feedback banner */}
            {quizChecked && (
              <div 
                id="quiz-feedback-box"
                className={`p-5 rounded-3xl mb-6 text-center shadow-md animate-fade-in flex flex-col items-center border ${
                  quizSuccess 
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                    : "bg-rose-500/10 border-rose-500 text-rose-400"
                }`}
              >
                <div className="text-3xl mb-1.5">{quizSuccess ? "🎉 🥇 🌟" : "💡 🌈 ✨"}</div>
                <h3 className="font-black text-lg">
                  {quizSuccess ? "WOW! PERFECT!" : "Almost Got It!"}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {quizSuccess 
                    ? "You detected every summer item without any errors. Magnificent reading champion!" 
                    : "Let's review: remember, winter sweaters or monsoon raincoats are for cold and wet days. Summer things are for hot sunny days!"}
                </p>
                <span className="text-xs font-mono font-bold mt-2.5 bg-slate-900/60 text-slate-200 px-3 py-1 rounded-full border border-white/5">
                  Summer score: {quizScore} / 4 found
                </span>
              </div>
            )}

            {/* Action buttons at bottom */}
            <div className="flex gap-3">
              {!quizChecked ? (
                <button
                  id="btn-quiz-verify"
                  onClick={verifyQuizAnswers}
                  disabled={selectedQuizItems.length === 0}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-4 rounded-2xl transition hover:scale-101 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow shadow-amber-400/20 text-sm cursor-pointer"
                >
                  Verify Selection Check
                </button>
              ) : (
                <button
                  id="btn-quiz-retry"
                  onClick={startQuiz}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-4 rounded-2xl transition hover:scale-101 active:scale-95 text-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  Try Another Grid Challenge!
                </button>
              )}
              
              <button
                id="btn-quiz-back-detail"
                onClick={() => setView("dashboard")}
                className="bg-slate-800 hover:bg-slate-755 text-white font-black px-5 rounded-2xl text-xs flex items-center justify-center cursor-pointer border border-slate-700"
              >
                Home
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Playful Footer */}
      <footer className="py-6 border-t border-slate-800 bg-slate-950/50 text-center text-[10px] text-slate-500 uppercase tracking-widest font-mono">
        Kids Seasons Explorer • Clean Layout • Three Files Structure
      </footer>

    </div>
  );
}
