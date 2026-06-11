// Spidey Civics Guardian - 8 Constitution & Civic Duty Scenarios
// Declared as a plain global array so it plays perfectly even off local "file://" double-clicks!

const SCENARIOS = [
  {
    id: 1,
    badge: "🌱",
    themeColor: "from-emerald-400 to-green-600",
    voiceGuide: "Whoa, look at that crumpled trash on the floor, web-slinger! Keeping our public parks clean is a core citizen duty. Do we shoot our web to throw it securely inside the green recycling bin, or do we ignore the mess and walk past?",
    congratsVoice: "Spectacular cleanup! Protecting our environment and keeping shared parks pristine is our core fundamental duty. You are a true green hero!",
    visualIllustration: {
      backgroundEmoji: "🌳🌲🌳",
      targetEmoji: "🗑️♻️",
      keyItemEmoji: "📄💨"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️📄🎯🗑️",
        moralFeedback: "Amazing! Tossing crumpled waste inside the recycle bin helps the planet!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "🚶🏽‍♂️💤📄",
        moralFeedback: "Oh no! A real hero never ignores trash on our shared parks ground!"
      }
    ]
  },
  {
    id: 2,
    badge: "🤝",
    themeColor: "from-sky-400 to-blue-600",
    voiceGuide: "Hey, one of our friends is left out from our playing field! Under the constitution, every student has an equal right to study and play, with zero discrimination. Do we shoot our web to pass them the basketball so we can play together, or leave them out?",
    congratsVoice: "Fantastic action! Promoting equality and inclusion makes us stronger. Under the Right to Equality, every person has a right to be included in shared joy!",
    visualIllustration: {
      backgroundEmoji: "🏀🏫🏟️",
      targetEmoji: "🧑‍🦽🌟",
      keyItemEmoji: "🏀"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️🏀❤️🧑‍🦽",
        moralFeedback: "Superb! Everyone has an equal right to inclusion and joy!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "🧑‍🤝‍🧑💔🚶🏽‍♂️🚪",
        moralFeedback: "Oops! Excluding friends because of differences hurts. Everyone is equal!"
      }
    ]
  },
  {
    id: 3,
    badge: "🏛️",
    themeColor: "from-amber-400 to-red-500",
    voiceGuide: "Oh look, a vandal is ruining our ancient historical monument with spray paint! It is our fundamental national duty to protect and preserve our glorious heritage. Do we web-shoot a sparkling protective shield to save the wall, or ignore it?",
    congratsVoice: "Incredible guard! Protecting national heritage monuments from vandalism is a core constitutional duty. You saved history today!",
    visualIllustration: {
      backgroundEmoji: "🕌🏰🕌",
      targetEmoji: "🏰🛡️",
      keyItemEmoji: "🧴❌"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️🛡️✨🏛️",
        moralFeedback: "Heroic! Protecting old monuments guards our country's rich history!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "🧴🖊️💥💔",
        moralFeedback: "Oh no! Drawing graffiti on historical sites damages our public treasures!"
      }
    ]
  },
  {
    id: 4,
    badge: "🗳️",
    themeColor: "from-purple-400 to-indigo-600",
    voiceGuide: "A corrupt agent is offering a massive bag of money in exchange for a vote at the polling center! Our vote is our fundamental right to a clean democracy. Do we web-lock the bribery bag and drop a clean vote into the ballot box, or take the bribe?",
    congratsVoice: "Superb integrity! A clean, corrupt-free election is key to our democracy. Rejecting voting bribes is your legal right and patriotic responsibility!",
    visualIllustration: {
      backgroundEmoji: "🗳️🏢🗳️",
      targetEmoji: "🗳️🕊️",
      keyItemEmoji: "💰"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️🛡️🗳️✅",
        moralFeedback: "Magnificent! Honesty and free voting make our democratic country proud!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "💰🤲🏽💸",
        moralFeedback: "Think again! Taking illegal money bribes destroys democratic fairness!"
      }
    ]
  },
  {
    id: 5,
    badge: "🎒",
    themeColor: "from-rose-400 to-pink-600",
    voiceGuide: "That little young kid is forced to work at the tea shop instead of studying! The Constitution guarantees that every child has the Right to Education. Do we web-throw a beautiful school bag and textbooks to support their study, or ignore them?",
    congratsVoice: "Life-changing decision! Under Article 21A, every single child has the fundamental free right to school education. Helping them learn is the ultimate hero move!",
    visualIllustration: {
      backgroundEmoji: "🎒✨🏫",
      targetEmoji: "👨‍🎓📚",
      keyItemEmoji: "☕"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️🎒📚🏫",
        moralFeedback: "Spectacular! Education is every child's fundamental birth right!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "☕🧼🧹",
        moralFeedback: "No citizen should let a kid labor in shops when they should be learning in school!"
      }
    ]
  },
  {
    id: 6,
    badge: "🐾",
    themeColor: "from-teal-400 to-green-600",
    voiceGuide: "Look at that shivering stray puppy in the cold rain! The Constitution says it is our fundamental duty to show kindness and compassion to all living creatures. Do we web-shoot a warm, protective umbrella shelter and a tasty bowl of food, or walk past?",
    congratsVoice: "Such a kind heart! Compassion for animals and living creatures is our constitutional duty under Article 51A. You have saved a furry friend's day!",
    visualIllustration: {
      backgroundEmoji: "🌧️☔💨",
      targetEmoji: "🐶🏡🍗",
      keyItemEmoji: "🦴"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️☔🏡🐶",
        moralFeedback: "Spectacular! Compassion for all living animals is our fundamental duty!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "🌧️🚶🏽‍♂️🐶😢",
        moralFeedback: "Uh oh! Heroes always stand up and help helpless animals brave the cold!"
      }
    ]
  },
  {
    id: 7,
    badge: "🚌",
    themeColor: "from-amber-500 to-amber-700",
    voiceGuide: "Oh, look! Someone left burning paper on a public bus seat! Safeguarding public transport and public property is a crucial national duty. Do we shoot our fire-suppressant web capsule to put out the spark safely, or let it spread?",
    congratsVoice: "Incredible quick thinking! Protecting public property is key to keeping our cities safe and thriving. You are a true local protector!",
    visualIllustration: {
      backgroundEmoji: "🚏🚌💨",
      targetEmoji: "🚒🚌✅",
      keyItemEmoji: "🔥"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️🧯💦🚌",
        moralFeedback: "Awesome! Safeguarding public buses and train property protects our whole community!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "🔥🚌🏃🏽‍♂️",
        moralFeedback: "Yikes! Ignoring damage to public transit costs everyone and harms our city!"
      }
    ]
  },
  {
    id: 8,
    badge: "🗣️",
    themeColor: "from-sky-400 to-cyan-600",
    voiceGuide: "A public speaker is sharing a peaceful opinion at a community hall, but a rowdy crowd is shouting them down to silence them! Under our Constitution, every citizen has the Fundamental Right to Freedom of peaceful speech. Do we web-shoot friendly peaceful banners to keep the speech ongoing, or support the silencers?",
    congratsVoice: "Sensational respect! Respecting peaceful expression is the very definition of free democracy and constitutional freedom. You safeguarded freedom today!",
    visualIllustration: {
      backgroundEmoji: "🏛️🗣️📣",
      targetEmoji: "🕊️🎙️✨",
      keyItemEmoji: "❌"
    },
    options: [
      {
        isRightChoice: true,
        illustrativeEmoji: "🕸️🎙️🕊️🔊",
        moralFeedback: "Perfect! Every individual has a peaceful constitutional right to share their ideas safely!"
      },
      {
        isRightChoice: false,
        illustrativeEmoji: "🤐🔇🚫💔",
        moralFeedback: "Oh no! Silencing peaceful ideas goes directly against democratic free speech rights!"
      }
    ]
  }
];

// Attach to window so it is available to appJS across scopes
if (typeof window !== "undefined") {
  window.SCENARIOS = SCENARIOS;
}
