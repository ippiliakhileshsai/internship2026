# Atmosphere Explorer: Air Pollution, Wind, Storms & Cyclones Simulation

Atmosphere Explorer is an interactive, premium PhET-style educational web simulation designed specifically for Government High School students (Classes 8–10) to explore, play with, and understand atmospheric physics and environmental science concepts.

Rather than memorizing definitions, students manipulate wind vectors, spark cyclones, induce storm washouts, and observe how temperature, humidity, and pressure coordinate to spread or clear air pollution in a dynamic city.

---

## Key Features

1. **Air Pollution & Density Engine**: Emits factory smoke and vehicle exhaust particles dynamically responding to temperature, wind, and humidity.
2. **Dynamic Wind & Vector Fields**: Visualize invisible air currents with scaling force arrows that respond to high and low-pressure zones.
3. **Storm & Cyclone Simulations**: Trigger heavy rain (which collides with and precipitates pollution particles) or rotation vortexes (pulling smoke into circular spirals).
4. **Hidden Science Layer**: Toggle transparent visualizations of pressure fronts, temperature layers, and circulation currents.
5. **Challenge Mode (Gamified Assessment)**:
   * **Mission 1**: Clean Air Protocol (Reduce AQI below 50).
   * **Mission 2**: Shelter Protection (Route smoke away from houses).
   * **Mission 3**: Natural Washout (Combine storms and wind to clean the city).
   * **Mission 4**: Cyclone Predictor (Direct wind to contain pollution inside the cyclone eye).
6. **Student Superpowers**: Clock controls for time pause, slow motion, fast-forward, and instanst cyclone spawning.

---

## File Structure

```text
atmosphere-explorer/
├── index.html          # Main HTML structure with embedded SVGs
├── css/
│   └── style.css       # Premium Design System (colors, glassmorphism, layouts)
├── js/
│   ├── main.js         # Core clock, loop orchestration, UI bindings
│   ├── particles.js    # Canvas particle engine, physical drag, AQI analysis
│   ├── weather.js      # Rain particles, lightning, cyclone vortex math
│   └── challenge.js    # Gamified mission definitions, ratings, feedback
├── docs/
│   ├── UserPersona.md  # Profiling target students (e.g. Ravi, Class 9)
│   ├── HMW.md          # How-Might-We pedagogical questions
│   ├── Storyboard.md   # Step-by-step student learning journey
│   ├── Architecture.md # Code execution flow & mathematical formulas
│   └── DeploymentGuide.md # Hosting on GitHub Pages / Vercel
├── README.md           # This document
└── requirements.txt    # Basic developer server requirements
```

---

## Getting Started

### Local Setup
Since Atmosphere Explorer is built using vanilla technologies with zero compilation:
1. Download or clone this directory.
2. Open `index.html` in your favorite browser..

---

## Educational Standards Mapping
* **Class 8**: Air and Water Pollution (Pollutant dispersal, environmental impacts).
* **Class 9**: Natural Resources (Wind patterns, air currents, rainfall dynamics).
* **Class 10**: Environmental Studies (AQI metrics, industrial impacts, storms & cyclones).
