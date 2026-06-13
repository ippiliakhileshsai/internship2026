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
    simTitle: "Dark Room Explorer",
    simDesc: "Move your flashlight to find hidden objects. Tap them to classify as Luminous or Non-Luminous!",
    simObjects: [
      { emoji: "☀️", name: "Sun", luminous: true, x: 0.15, y: 0.2 },
      { emoji: "💡", name: "Bulb", luminous: true, x: 0.75, y: 0.15 },
      { emoji: "🕯️", name: "Candle", luminous: true, x: 0.5, y: 0.5 },
      { emoji: "🌕", name: "Moon", luminous: false, x: 0.25, y: 0.7 },
      { emoji: "📖", name: "Book", luminous: false, x: 0.8, y: 0.6 },
      { emoji: "⭐", name: "Star", luminous: true, x: 0.4, y: 0.3 },
      { emoji: "🪨", name: "Rock", luminous: false, x: 0.65, y: 0.8 },
      { emoji: "🔦", name: "Torch", luminous: true, x: 0.2, y: 0.55 }
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
    story: "The Crystal of Rays has shattered! Darkness spreads. Light travels in a straight line — but can you prove it? Align the holes in the obstacles to guide the light beam to the crystal!",
    simTitle: "Straight Line Lab",
    simDesc: "Drag the cards up and down so their holes align perfectly. Light only travels in straight lines!",
    simCards: [
      { x: 0.3, y: 0.4, holeSize: 40 },
      { x: 0.5, y: 0.7, holeSize: 40 },
      { x: 0.7, y: 0.3, holeSize: 40 }
    ],
    sourceY: 0.5
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
    simTitle: "Mirror Lab",
    simDesc: "Drag the light ray to change the angle. Watch the reflected ray obey the Law of Reflection!",
    simChallenges: [
      { targetAngle: 30, label: "Set angle of incidence to 30°" },
      { targetAngle: 45, label: "Now try 45°" },
      { targetAngle: 60, label: "Finally, set it to 60°" }
    ]
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
    simTitle: "Bending Light Pool",
    simDesc: "Drag the light ray to change the angle. See how it bends as it enters water!",
    simMedia: [
      { name: "Air → Water", n1: 1.0, n2: 1.33, color1: "#87CEEB", color2: "#1a8a9a" },
      { name: "Air → Glass", n1: 1.0, n2: 1.52, color1: "#87CEEB", color2: "#8B7DA8" }
    ]
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
    simDesc: "Drag the prism to catch the white light beam and split it into the colours of the rainbow!",
    simSpectrum: [
      { name: "Violet", color: "#8B00FF", angle: -18 },
      { name: "Indigo", color: "#4B0082", angle: -12 },
      { name: "Blue",   color: "#0000FF", angle: -6 },
      { name: "Green",  color: "#00FF00", angle: 0 },
      { name: "Yellow", color: "#FFD700", angle: 6 },
      { name: "Orange", color: "#FF8C00", angle: 12 },
      { name: "Red",    color: "#FF0000", angle: 18 }
    ]
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
    simTitle: "Solar Power Lab",
    simDesc: "Rotate the solar panel to face the sun. Maximize energy to power the kingdom's devices!",
    simAppliances: [
      { emoji: "💡", name: "Light Bulb", threshold: 25 },
      { emoji: "📱", name: "Phone", threshold: 50 },
      { emoji: "🏠", name: "House", threshold: 80 }
    ]
  }
];
