## Title: **EarthSim**

An interactive, single-screen science simulation engineered for students to explore the lifecycle of fossil fuels, their environmental impact, and clean energy alternatives through real-time canvas-rendered visualization engines.

---------------------------------------------------------------------------------------------------------------------------------------------------------

## Problem Statement
Fossil fuels (coal, oil, and natural gas) take hundreds of millions of years to form, yet humanity is consuming them at an unsustainable rate. The widespread burning of these resources releases massive amounts of carbon dioxide ($\text{CO}_2$) and particulates into the atmosphere. This accelerates the greenhouse effect, traps thermal energy, melts glaciers, and triggers critical threats to global biodiversity and ecosystems.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Solution
**EarthSim** brings climate science to life by translating complex geological timelines and environmental physics into an accessible, interactive digital laboratory. The web application allows users to:
* **Time Travel:** Control geological timelines to visualize sedimentation, heat, and pressure creating fossil fuels.
* **Test Emissions:** Toggle power grids on/off to see immediate visual feedback of carbon and soot generation.
* **Simulate Climate Futures:** Tweak atmospheric absorption and forest cover metrics to observe real-time calculations of sea-level rise and environmental degradation.
* **Validate Knowledge:** Take a built-in gamified challenge that tests their comprehension of the simulation's core concepts.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Key Features
* **Modular Reactive Architecture:** Decoupled codebase separated into clean logical domains (State Management, UI/UX Control, Canvas Graphics, and Interaction Engines).
* **Real-Time Canvas Animation:** High-frequency rendering pipelines that update environmental layers, particle physics, wind turbine rotation, and heat wave vectors dynamically.
* **Dynamic Interactive Systems:** Drag-and-drop mechanics (such as the interactive thermometer tool) and interactive slider streams.
* **Gamified Diagnostic Suite:** An automated puzzle system featuring interactive answer checking, state tracking, and direct contextual return links back into the simulation tabs.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Tech Stack Used
* **Frontend Structure:** HTML5 (Semantic Architecture & ARIA Accessibility Labels)
* **Styling & Layout:** CSS3 (Custom Properties, Flexbox/Grid layouts, and Media Queries for responsive views)
* **Core Logic Engine:** Vanilla JavaScript (ES6+, RequestAnimationFrame Loops, and Dynamic State Objects)
* **Deployment & Hosting:** Vercel

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------v

## Project Architecture & Team Roles
The codebase is structured to support clean separation of concerns:

EarthSim/
├── index.html                  # UI Structure & Elements (UI/UX Developer)
├── styles.css                  # UI Layout & Aesthetics (UI/UX Developer)
├── script.js                   # Application Initialization & Loop (Lead Integration)
└── modules/
    ├── state.js                # Core Configuration & Math Helpers (Backend Logic)
    ├── ui-manager.js           # UI-State Synchronization (UI/UX Manager)
    ├── graphics-engine.js      # Canvas Particle Drawing (Graphics Specialist)
    ├── interactions.js         # Event Streams & Drag-and-Drop (Interactive Features)
    └── challenge-system.js     # Puzzle Processing & Analytics (Challenge Specialist)

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## **How to run project**

Here is a step-by-step user guide explaining how to interact, experiment, and play with your **EarthSim** simulation project.

Step 1: Travel Through Time (Formation Tab)

Start by understanding where fossil fuels come from before exploring their modern impact.

* **Locate the Slider:** On the right-hand panel, find the **Time Travel** slider.
* **Interact:** Drag the slider from left (**250M Yrs Ago**) to right (**Today**).
* **What to Watch on the Canvas:** * Watch the ancient surface swamp and dinosaur silhouette gradually fade away.
* Observe rock and sediment layers stacking up dynamically over the organic material.
* Notice the **Coal**, **Oil**, and **Gas** underground pockets light up in the deep layers as you approach modern times.


Step 2: Test Power Grids & Pollute (Burning Tab)

Now that the fuels are formed, see what happens when humanity burns them at an accelerated rate.

* **Toggle Energy Sources:** Click the switches on the grid cards to turn different power plants and vehicles on or off.
* **Experiment with Dirty Energy:** Turn on the **Coal Plant** and **Petrol Car**. Watch the canvas darken with heavy gray soot and carbon emissions. Check the **Emission Bars** to see the numerical spike in $\text{CO}_2$ and Soot levels.
* **Experiment with Clean Energy:** Turn off the fossil fuel sources and switch on **Solar Panels** and **Wind Turbines**. Notice that the Energy bar fills up, but the $\text{CO}_2$ and Soot bars remain at zero, keeping the sky bright.


Step 3: Use the Interactive Thermometer

Measure local air pollution changes in real time.

* **Grab the Tool:** Locate the 🌡️ icon at the bottom right.
* **Drag and Drop:** Click and hold the thermometer, then drag it directly onto the active left-hand canvas scene.
* **Read the Data:** Drop it to unlock the hidden **Air Temp** readout box. Toggle the energy sources again to watch how the local temperature climbs dynamically based on your grid choices.

Step 4: Simulate Global Climate Change (Climate Tab)

Take control of planetary variables to study the greenhouse effect on a macro scale.

* **Set a High Emission Rate:** Move the **$\text{CO}_2$ Emission Rate** slider to **High**.
* **Observe the Greenhouse Blanket:** Look at the canvas to see an orange atmospheric carbon blanket trapping bouncing heat wave arrows. The global metric boxes below will begin shifting toward a dangerous red state.
* **Counteract with Nature:** Drop the **Forest Cover** slider to **0%** to accelerate the destruction, then push it to **100%**. Notice how planting trees acts as a carbon sink, stabilizing the rapidly climbing $\text{CO}_2$ parts per million (ppm) levels.
* **Watch the Secondary Effects:** As global temperature climbs, monitor the top of the canvas to see the polar **Ice Caps** melt, which simultaneously triggers the **Sea Rise** metric to climb.


Step 5: Complete the Earth Rescue Challenge (Challenge Tab)

Put your knowledge to the test and prove you can save the planet.

* **Answer Puzzles:** Read the conceptual questions regarding fossil fuel generation and climate science.
* **Get Live Diagnostic Feedback:** Click an option. If correct, you will earn a permanent gold star 🌟. If wrong, the interface will display a helpful hint explaining the science.
* **Navigate Back to Research:** If you get stuck on a tricky question, click the **🔬 Go back to Simulation** button. The app will automatically jump you back to the exact tab where that scientific concept can be re-studied.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ** Live Deployment Link **
https://fossilfuelsco9nservation.vercel.app
