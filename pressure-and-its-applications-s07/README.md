# Pressure Playground — PressureVerse

An interactive, browser-only educational site that teaches **Pressure = Force ÷ Area** to school students (Class 9–11). No server, no build step — just open `index.html` in any modern browser.

**Live on Vercel:** https://intern-gules-zeta.vercel.app/index.html

---

## Project Overview

PressureVerse is a gamified physics learning simulation built with pure HTML, CSS, and vanilla JavaScript. Students interact with cutting simulators, hydraulic lifts, blood pressure gauges, and more — seeing the physics formula come alive in real time.

---

## Purpose

- Replace passive pressure-chapter reading with hands-on simulation
- Demonstrate P = F/A with immediate visual cause-and-effect
- Provide an accessible, offline-capable resource for Class 9-11 teachers and students

---

## Features

- Interactive knife-vs-tomato cutting game with real-time pressure meter
- 6 animated physics simulations (Pascal, Boyle, Bernoulli, Blood Pressure, Underwater, Wing)
- Live Force / Pressure / Formula readout bars
- 7-question quiz with hints, instant feedback, and confetti on perfect score
- Background music engine (Web Audio API — no external audio library)
- Dr. Pascal voice tutor assistant (Speech Synthesis API)
- Custom animated cursor system with 4-state hover modes
- Floating physics symbol doodles
- Pressure Experience Meter (PEM) that rises as you scroll
- Fully keyboard-operable; prefers-reduced-motion supported
- Responsive from 360 px to 1440 px+

---

## Technologies Used

| Technology        | Purpose                                      |
|-------------------|----------------------------------------------|
| HTML5             | Page structure, semantic markup, ARIA        |
| CSS3              | Layout, animations, responsive design        |
| Vanilla JavaScript| Simulations, quiz, audio engine, cursor      |
| SVG               | All diagrams, animations, and illustrations  |
| Web Audio API     | Background music and sound effects           |
| Speech Synthesis  | Dr. Pascal voice tutor (learn page)          |
| Google Fonts      | Fredoka / Fredoka One + Nunito               |
| Vercel            | Static site deployment                       |

---

## Folder Structure

```
dashboard/
├── index.html                        ← Game / Play page (main entry point)
│
├── html/
│   ├── learn.html                    ← Full learn module (6 simulations + quiz)
│   └── pressure-veggie-cutting.html  ← Alternative cutting simulator with audio
│
├── css/
│   └── learn.css                     ← Styles for the learn module
│
├── js/
│   └── learn.js                      ← JavaScript for the learn module
│
├── images/
│   ├── cur_btn.png                   ← Custom cursor — button state
│   ├── cur_default.png               ← Custom cursor — default state
│   ├── cur_nav.png                   ← Custom cursor — nav state
│   ├── cur_slider.png                ← Custom cursor — slider state
│   ├── show_div12.png                ← Reference screenshot (dividers 1-2)
│   ├── show_div23.png                ← Reference screenshot (dividers 2-3)
│   ├── show_div45.png                ← Reference screenshot (dividers 4-5)
│   ├── show_rocket.png               ← Reference screenshot (rocket card)
│   ├── show_top.png                  ← Reference screenshot (page top)
│   ├── ss_cards.png                  ← Reference screenshot (cards view)
│   ├── ss_div34.png                  ← Reference screenshot (dividers 3-4)
│   ├── ss_div5.png                   ← Reference screenshot (divider 5)
│   ├── ss_mid.png                    ← Reference screenshot (mid section)
│   ├── ss_top.png                    ← Reference screenshot (top section)
│   ├── v2_btn.png                    ← V2 cursor — button state
│   ├── v2_card.png                   ← V2 cursor — card state
│   ├── v2_default.png                ← V2 cursor — default state
│   ├── v2_nav.png                    ← V2 cursor — nav state
│   └── v2_slider.png                 ← V2 cursor — slider state
│
├── storyboard/                       ← Project storyboard files (add PNG/PDF here)
├── userpersona/                      ← User persona files (add PNG/PDF here)
│
├── nogod.mp3                         ← Cutting feedback audio
├── requirements.txt                  ← Phase 2 requirement gathering document
├── teams.txt                         ← Team info + Phase 5 task division
├── README.md                         ← This file
├── vercel.json                       ← Vercel deployment config
└── .gitignore                        ← Git ignore rules
```

---

## How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern browser — no server needed.

```bash
# Optional: serve with Python for the cleanest experience
python -m http.server 8000
# then visit http://localhost:8000
```

Google Fonts is the only external resource. Everything else works fully offline.

---

## Page Details

| Page | File | Description |
|------|------|-------------|
| Play | `index.html` | Knife game: choose sharp or blunt, hold PRESS, watch the tomato react. Live P = F/A meters. |
| Pressure Playground | `html/pressure-veggie-cutting.html` | Enhanced simulator with audio cutting feedback (nogod.mp3). |
| Learn | `html/learn.html` | 6 animated simulations, 3 real-world stories, 6 solved examples, 7-question quiz, Dr. Pascal tutor. |

---

## Asset Details

| Asset | Location | Purpose |
|-------|----------|---------|
| `nogod.mp3` | root | Cutting sound for pressure-veggie-cutting.html |
| `cur_*.png` | `images/` | Custom cursor sprites (4 states) |
| `v2_*.png` | `images/` | V2 cursor design reference sprites |
| `ss_*.png` | `images/` | Screenshot reference images |
| `show_*.png` | `images/` | Screenshot reference images |

---

## Team Details

See [teams.txt](teams.txt) for full team information and Phase 5 task division.

**Lead Developer:** Rameshkumar (Rameshkumar31595)

---

## Requirements Summary

See [requirements.txt](requirements.txt) for the full Phase 2 requirement gathering document.

- **Target users:** Class 9-11 students and science teachers
- **No backend, no login, no tracking** — pure static site
- **Browser support:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Offline capable** after first load (Google Fonts only)

---

## Testing Checklist

- [x] index.html opens and game works (Sharp/Blunt knife, PRESS button, meters, confetti)
- [x] html/learn.html opens and all 6 simulation cards are interactive
- [x] html/pressure-veggie-cutting.html opens and cutting audio plays
- [x] Nav links: Play ↔ Learn navigation works correctly
- [x] Background music toggle persists across page reloads
- [x] Sound mute toggle works on all pages
- [x] Quiz: 7 questions, hints, scoring, confetti at 6-7/7 correct
- [x] Responsive layout at 360 px, 720 px, 1080 px, 1440 px
- [x] Keyboard: Space = press knife, Enter = select quiz option, Tab = focus
- [x] prefers-reduced-motion: all animations and transitions disabled
- [x] .gitignore: .claude/ and .env files are NOT tracked

---

## Future Improvements

- Add storyboard files to `storyboard/` folder
- Add user persona documents to `userpersona/` folder
- Add a 3rd nav tab (e.g. Quiz standalone page)
- Archimedes buoyancy simulation (7th card on Learn page)
- Altitude pressure card (balloon rises, pressure drops)
- Offline PWA support (Service Worker + manifest)
- Dark mode support
