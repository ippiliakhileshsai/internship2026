#  Quest for the Lost Light

> **An Educational Mobile Adventure Game — Light Chapter · 7th Grade Science**

A fully interactive, browser-based RPG-style game where students restore magical crystals by mastering the science of **Light** through 6 exciting levels of simulations and quizzes.

---

## How to Play

1. **Open `index.html`** in any modern browser (Chrome, Firefox, Edge)
2. Click **"Begin Your Quest"** on the welcome screen
3. Follow the story, complete **simulations** and **quizzes** in each level
4. Earn stars, XP, coins, and badges
5. Restore all 6 crystals and become the **Guardian of Light!**

---

## Design

- Mobile-first UI displayed in a **390×844px phone shell**
- Dark fantasy theme with purple, gold, and glowing neon accents
- Fonts: **Cinzel Decorative** (titles), **Cinzel** (labels), **Nunito** (body)
- Smooth screen transitions + CSS micro-animations throughout

---

## Curriculum Coverage

| Level | Topic | Science Concept |
|-------|-------|----------------|
| 1 | Sources of Light | Luminous vs Non-luminous objects |
| 2 | Rays of Light | Rectilinear propagation, speed |
| 3 | Reflection | Laws of reflection, mirrors |
| 4 | Refraction | Snell's Law, bending of light |
| 5 | Dispersion | VIBGYOR, prism, rainbow |
| 6 | Light Energy | Photons, solar energy, photosynthesis |

---

## File Structure

```
what-makes-things-visible-light-basics-f04/
├── index.html              ← Entry point (open this!)
├── css/
│   ├── main.css            ← Design tokens, shell, base components
│   ├── animations.css      ← All keyframe animations
│   └── screens.css         ← Per-screen layout styles
├── js/
│   ├── app.js              ← Screen router
│   ├── data/
│   │   ├── quizData.js     ← 30 quiz questions (6 levels × 5)
│   │   ├── levels.js       ← Level configuration
│   │   └── badges.js       ← Badge data
│   ├── html/               ← UI HTML templates
│   │   ├── analysis.html
│   │   ├── basics.html
│   │   ├── final.html
│   │   ├── guide.html
│   │   ├── level.html
│   │   ├── map.html
│   │   ├── profile.html
│   │   ├── quiz.html
│   │   ├── reward.html
│   │   ├── scoreboard.html
│   │   └── welcome.html
│   ├── utils/
│   │   ├── audio.js        ← Web Audio API sounds
│   │   ├── state.js        ← Game state + localStorage
│   │   ├── template.js     ← HTML template loader
│   │   └── transitions.js  ← Animation helpers
│   └── screens/
│       ├── analysis.js     ← Score breakdown
│       ├── basics.js       ← Light facts intro
│       ├── final.js        ← Quest complete screen
│       ├── guide.js        ← Story / wizard guide
│       ├── level.js        ← Simulation gameplay
│       ├── map.js          ← World map / level select
│       ├── profile.js      ← Player profile
│       ├── quiz.js         ← Multiple choice quiz
│       ├── reward.js       ← Badge + stars reward
│       ├── scoreboard.js   ← Global leaderboard
│       └── welcome.js      ← Welcome / home screen
└── README.md
```

---

## Features

- **11 screens** with smooth slide/fade transitions
- **30 quiz questions** with explanations
- **6 interactive simulations** (one per level)
- **6 collectible badges** + 3-star rating system
- **XP & score system** with leaderboard
- **localStorage** progress saving
- **Web Audio API** sound effects
- **Confetti** on level complete & quest finale
- **Typewriter** wizard dialog
- Animated **starfield** on every screen

---

## Requirements

- **No installation needed** — pure HTML, CSS, JavaScript
- Requires a modern browser with **ES Modules** support
- Internet connection for Google Fonts (optional — falls back to serif/sans-serif)

---

*Built for 7th Grade Science · Light Chapter · Figma UI Design*
