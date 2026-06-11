// Level configuration data
export const levelsData = [
  {
    id: 1,
    name: "Sources of Light",
    subtitle: "Find the light!",
    icon: "💡",
    color: "#c084fc",
    colorDark: "#7c3aed",
    crystal: "💜",
    story: "The Kingdom is dark! A mysterious shadow has stolen the Crystal of Sources. Young Explorer, can you discover what light truly is and where it comes from? Your quest begins here!",
    simTitle: "Identify Light Sources",
    simDesc: "Tap all the LUMINOUS (self-glowing) objects to restore the first crystal!",
    simObjects: [
      { emoji: "☀️", name: "Sun", luminous: true },
      { emoji: "💡", name: "Bulb", luminous: true },
      { emoji: "🕯️", name: "Candle", luminous: true },
      { emoji: "🌕", name: "Moon", luminous: false },
      { emoji: "📖", name: "Book", luminous: false },
      { emoji: "⭐", name: "Star", luminous: true },
      { emoji: "🪨", name: "Rock", luminous: false },
      { emoji: "🔦", name: "Torch", luminous: true }
    ]
  },
  {
    id: 2,
    name: "Rays of Light",
    subtitle: "Trace the path!",
    icon: "🔦",
    color: "#ffd700",
    colorDark: "#b45309",
    crystal: "💛",
    story: "The Crystal of Rays has shattered! Darkness spreads. Light travels in a straight line — but can you prove it? Guide the light beam through the maze to restore order to the kingdom!",
    simTitle: "Light Ray Maze",
    simDesc: "Click the correct path the light beam takes — remember, light travels STRAIGHT!",
    simObjects: []
  },
  {
    id: 3,
    name: "Reflection",
    subtitle: "Bounce it back!",
    icon: "🪞",
    color: "#60a5fa",
    colorDark: "#1d4ed8",
    crystal: "💙",
    story: "The Mirror Caves hold the Crystal of Reflection! The angle of incidence equals the angle of reflection — use this law to direct light beams and unlock the crystal chamber!",
    simTitle: "Mirror Angles",
    simDesc: "Tap the correct reflected ray — remember the Law of Reflection!",
    simObjects: []
  },
  {
    id: 4,
    name: "Refraction",
    subtitle: "Bend the light!",
    icon: "💎",
    color: "#34d399",
    colorDark: "#065f46",
    crystal: "💚",
    story: "The Crystal of Refraction sank into the enchanted pool! Light bends when it enters water. Understand refraction to rescue it from the depths!",
    simTitle: "Refraction Pool",
    simDesc: "Select how the light ray bends as it enters from air into water!",
    simObjects: []
  },
  {
    id: 5,
    name: "Dispersion",
    subtitle: "Reveal the rainbow!",
    icon: "🌈",
    color: "#f472b6",
    colorDark: "#9d174d",
    crystal: "🩷",
    story: "A prism guards the Crystal of Colours! White light holds a hidden secret — 7 beautiful colours waiting to be revealed. Use your knowledge of VIBGYOR to unlock the Rainbow Crystal!",
    simTitle: "Prism & Rainbow",
    simDesc: "Arrange the colours in the correct order of the visible spectrum!",
    simObjects: []
  },
  {
    id: 6,
    name: "Light Energy",
    subtitle: "Power the kingdom!",
    icon: "🌞",
    color: "#fb923c",
    colorDark: "#9a3412",
    crystal: "🧡",
    story: "The final Crystal of Energy powers the entire kingdom! Light is not just visible — it carries energy that powers life itself. Prove your mastery and restore the Light Kingdom forever!",
    simTitle: "Energy Match",
    simDesc: "Match each light application to how it uses light energy!",
    simObjects: []
  }
];
