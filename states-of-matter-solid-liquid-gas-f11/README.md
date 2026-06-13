# States of Matter Explorer

An interactive science simulation for exploring the four states of matter — Solid, Liquid, Gas, and Plasma — with real-time particle animation, substance lookup, and a built-in quiz.

🔗 **Live Demo:** https://states-of-materss.netlify.app

---

## What's Inside

### Particle Simulation
- Real-time canvas-based particle animation for all four states of matter
- Temperature slider from -200°C to 6000°C
- Pressure slider from Vacuum to Extreme
- Adjustable particle count (10–120)
- Auto phase change — particles transition state automatically at the correct temperature
- Play / Pause / Reset / Random controls
- Live stats bar showing current State, Temperature, Pressure, and Kinetic Energy

### Substance Explorer
- 50+ built-in substances across metals, liquids, gases, solids, and special materials
- Autocomplete search
- Shows melting point, boiling point, chemical symbol, type, and physical properties
- Special multi-stage substances (Sea Water, Salt Pan, Candle Wax, Gunpowder, etc.) with step-by-step phase behavior
- AI-powered fallback for substances not in the built-in list (available within claude.ai)

### Built-in Substances (selected)
Metals: Iron, Gold, Copper, Aluminium, Silver, Mercury, Tungsten, Gallium, Cesium  
Liquids: Water, Ethanol, Acetone, Benzene, Glycerin, Gasoline, Lava, Bromine  
Gases: Oxygen, Nitrogen, Hydrogen, Carbon Dioxide, Helium, Neon, Methane, Ozone, Ammonia  
Solids: Diamond, Graphite, Ice, Salt, Sand, Glass, Dry Ice, Iodine, Silicon, Chalk  
Special: Sea Water, Ocean Water, Salt Pan, Candle Wax, Gunpowder, Obsidian, Window Glass, Liquid Nitrogen

### Quiz
- 15 questions per language
- Available in English, Hindi (हिंदी), and Telugu (తెలుగు)
- Instant feedback with scientific explanation for each answer
- Score summary with performance message

### Multilingual UI
- Full interface available in English, Hindi, and Telugu
- Language switcher on the intro screen and throughout the app

---

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks, no build tools
- Canvas API for particle simulation
- Google Fonts — Space Grotesk, Orbitron, JetBrains Mono
- Netlify for hosting

---

## Project Structure

```
states-of-matter/
└── index.html       # Entire application (single file)
```

---

## Deployment

1. Rename your file to `index.html`
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag and drop the file
4. Get a live URL instantly — no account needed

---

## Future Perspectives

- **3D particle simulation** using WebGL or Three.js for more realistic molecular visualization
- **Phase diagram view** — interactive P-T diagram showing phase boundaries for any selected substance
- **Molecule structure panel** — show the actual molecular geometry (ball-and-stick model) alongside the simulation
- **More states** — Bose-Einstein Condensate (near 0K) and Fermionic Condensate as explorable states
- **Real gas behavior** — implement Van der Waals corrections for more accurate high-pressure/low-temperature behavior
- **Sound effects** — audio feedback for phase transitions and particle collisions
- **Export/share** — let users snapshot a simulation state and share it as a link
- **Teacher mode** — guided lesson plans with locked controls for classroom use
- **More languages** — expand beyond English, Hindi, Telugu to support broader regional reach
- **Mobile responsive layout** — optimize the three-panel grid for smaller screens
- **Offline support** — PWA with service worker so the simulation works without internet

---

## Team

Built as a collaborative 4-member project — Interactive States of Matter Explorer.
