# Smart Energy Advisor

## Sustainable Energy Education & Environmental Impact Simulation

### Live Demo

https://mini-intern.vercel.app/

---

# Project Overview

Smart Energy Advisor is a full-stack web application that helps users understand how different energy sources impact the environment. The platform provides an interactive simulation where users can create custom energy mixes using Solar, Wind, Hydro, Coal, and Petroleum energy sources and instantly visualize their environmental consequences.

The system calculates Pollution Scores, CO₂ Emissions, Sustainability Scores, and Cost Index values while generating personalized recommendations to encourage sustainable energy choices.

The project is designed as an educational sustainability simulation that transforms theoretical concepts into an interactive learning experience.

---

# Problem Statement

Many students and general users lack a clear understanding of how energy source selection affects environmental sustainability. Traditional learning methods often rely on static text and theoretical explanations, making it difficult to visualize the real-world consequences of energy decisions.

As a result, users struggle to compare renewable and non-renewable energy sources and understand their impact on pollution, carbon emissions, and sustainability.

---

# HMW (How Might We)

**How might we help students and general users understand the environmental impact of different energy sources through an interactive simulation instead of relying on traditional theoretical learning methods?**

---

# User Persona

## Primary User

### Name

Rahul Kumar

### Age

20 Years

### Occupation

Engineering Student

### Goals

* Learn about renewable and non-renewable energy sources.
* Understand environmental sustainability concepts.
* Compare energy sources based on pollution and carbon emissions.
* Make informed energy planning decisions.

### Pain Points

* Energy concepts are difficult to visualize.
* Traditional learning approaches are often boring and theoretical.
* Environmental impact data is difficult to interpret.

### Needs

* Interactive learning experience.
* Real-time feedback.
* Visual representation of sustainability metrics.
* Easy-to-understand recommendations.

---

# Objectives

* Develop an interactive sustainability simulation platform.
* Educate users about renewable and non-renewable energy sources.
* Provide real-time environmental impact analysis.
* Promote sustainable energy decision-making.
* Visualize complex energy data using charts and dashboards.
* Deliver personalized sustainability recommendations.

---

# Functional Requirements

## Energy Source Information

Users should be able to:

✅ View information about Solar, Wind, Hydro, Coal, and Petroleum.

✅ Understand pollution, CO₂, sustainability, and cost characteristics.

✅ Compare renewable and non-renewable energy sources.

---

## Energy Simulation

Users should be able to:

✅ Adjust energy source percentages using sliders.

✅ Create custom energy mixes.

✅ Run sustainability simulations.

✅ Generate environmental impact scores.

✅ Validate total energy percentage equals 100%.

---

## Dashboard & Visualization

Users should be able to:

✅ View Pollution Score.

✅ View CO₂ Score.

✅ View Sustainability Score.

✅ View Cost Index.

✅ Analyze Pie Charts, Bar Charts, and Sustainability Gauges.

---

## Recommendation System

Users should be able to:

✅ Receive personalized sustainability recommendations.

✅ Identify high-pollution energy mixes.

✅ Understand environmental risks.

✅ Learn ways to improve sustainability scores.

---

## Challenge System

Users should be able to:

✅ Participate in sustainability challenges.

✅ Achieve environmental targets.

✅ Track challenge outcomes.

✅ Earn ratings based on performance.

---

# Non-Functional Requirements

The system should be:

✅ User Friendly

✅ Responsive Across Devices

✅ Fast and Interactive

✅ Easy to Learn

✅ Visually Appealing

✅ Reliable and Stable

✅ Maintainable and Scalable

✅ Accessible for Educational Use

---

# Learning Requirements

After using Smart Energy Advisor, users should be able to:

✅ Explain renewable and non-renewable energy concepts.

✅ Compare environmental impacts of different energy sources.

✅ Understand pollution and CO₂ emissions.

✅ Analyze sustainability scores.

✅ Identify environmentally friendly energy mixes.

✅ Make informed energy planning decisions.

---

# Proposed Solution

Smart Energy Advisor provides an interactive simulation platform where users can experiment with different energy source combinations and instantly observe their environmental impact.

The system processes user-defined energy mixes and generates:

* Pollution Score
* CO₂ Emission Score
* Sustainability Score
* Cost Index
* Personalized Recommendations

This approach enables experiential learning through visualization and interaction rather than memorization.

---

# Minimum Viable Product (MVP)

The MVP focuses on one core concept:

**Understanding how energy source selection influences environmental sustainability.**

### MVP Features

✅ Energy Source Selection

✅ Energy Mix Sliders

✅ Sustainability Calculation

✅ Pollution Calculation

✅ Recommendation Generation

✅ Interactive Dashboard

✅ Real-Time Visualization

---

# System Workflow

1. User selects energy source percentages.
2. Energy mix validation is performed.
3. User runs the simulation.
4. Backend calculates environmental metrics.
5. Results are stored in the database.
6. Dashboard updates in real time.
7. Recommendations are generated.
8. Challenge evaluation is performed.
9. User analyzes sustainability outcomes.

---

# Storyboard

## Scene 1

User opens Smart Energy Advisor dashboard.

## Scene 2

User explores available energy sources.

## Scene 3

User adjusts energy mix sliders.

## Scene 4

System validates energy percentages.

## Scene 5

User runs simulation.

## Scene 6

Environmental scores are calculated.

## Scene 7

Charts and dashboards update.

## Scene 8

Recommendations are displayed.

## Scene 9

User attempts sustainability challenge.

## Scene 10

Challenge result and rating are shown.

### Storyboard File

storyboard.jpeg

---

# Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* Chart.js

## Backend

* FastAPI
* Python
* Pydantic
* SQLAlchemy

## Database

* PostgreSQL

## Version Control

* Git
* GitHub

## Deployment

* Vercel

---

# Project Structure

```text
Smart-Energy-Advisor/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   ├── routers/
│   ├── models/
│   ├── services/
│   └── main.py
│
├── requirements.txt
├── README.md
├── storyboard.jpeg
├── UserPersona.pdf
└── TeamNamesList.md
```

# Team Roles & Task Division

| Role                | Responsibility                             |
| ------------------- | ------------------------------------------ |
| Research Lead       | Gather and analyze sustainability research |
| UX Designer         | Design user experience and learning flow   |
| Storyboard Designer | Create storyboard and visual flow          |
| Frontend Developer  | Build React user interface                 |
| Backend Developer   | Develop FastAPI APIs                       |
| Database Developer  | Design PostgreSQL schema                   |
| Documentation Lead  | Maintain project documentation             |
| Testing Lead        | Perform testing and quality assurance      |

---

# Testing & Validation

## Functional Testing

* Energy Mix Validation
* Simulation Calculation
* Recommendation Generation
* Challenge Evaluation

## Edge Case Testing

* 100% Solar Energy
* 100% Coal Energy
* Equal Energy Distribution
* Invalid Percentage Inputs
* Total Percentage ≠ 100

## Usability Testing Questions

* Was the simulation easy to use?
* Did the charts improve understanding?
* Were recommendations useful?
* What was confusing?
* What improvements are needed?

---

# Expected Outcomes

* Improved understanding of sustainable energy concepts.
* Better awareness of environmental impacts.
* Increased engagement through simulation-based learning.
* Enhanced decision-making regarding energy choices.

---

# Future Enhancements

* AI-powered sustainability recommendations.
* User authentication system.
* Historical simulation tracking.
* Carbon footprint analytics.
* Advanced sustainability reporting.
* Leaderboards and gamification features.
* Machine learning-based recommendation engine.

---

# Deployment

### Live Application

https://mini-intern.vercel.app/

---

# Team Project

Smart Energy Advisor was developed as part of the Internship 2026 Mini Project initiative to promote sustainability awareness through interactive educational technology.

The project combines simulation, visualization, recommendation systems, and environmental education into a single learning platform that helps users make more informed energy decisions.
