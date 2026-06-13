Based on your Smart Energy Advisor blueprint, these are the proper project requirements that can be placed in **Requirements.md**.

# Smart Energy Advisor - Requirements Document

## 1. Project Title

**Smart Energy Advisor**
A Full-Stack Sustainable Energy Simulation and Recommendation Platform

---

# 2. Problem Statement

Most people lack awareness of how different energy sources impact environmental sustainability, pollution, and carbon emissions. Traditional educational resources are often static and difficult to understand.

The Smart Energy Advisor provides an interactive platform where users can experiment with energy source combinations and instantly observe their environmental impact through simulations, visual analytics, and recommendations.

---

# 3. Project Objectives

* Create an interactive energy simulation platform.
* Promote awareness of sustainable energy usage.
* Compare renewable and non-renewable energy sources.
* Generate sustainability metrics in real time.
* Provide intelligent recommendations based on energy mixes.
* Encourage users through challenge-based learning.

---

# 4. Functional Requirements

## 4.1 Energy Source Module

The system shall provide information about:

* Solar Energy
* Wind Energy
* Hydro Energy
* Coal Energy
* Petroleum Energy

Each source shall contain:

* Category
* Pollution Score
* CO₂ Score
* Sustainability Score
* Cost Score

---

## 4.2 Energy Simulation Module

The system shall allow users to:

* Adjust energy percentages using sliders.
* Create a custom energy mix.
* Ensure total energy percentage equals 100%.
* Run simulations based on selected values.
* View calculated environmental scores.

Inputs:

* Solar %
* Wind %
* Hydro %
* Coal %
* Petroleum %

Output:

* Pollution Score
* CO₂ Emission Score
* Sustainability Score
* Cost Index

---

## 4.3 Dashboard Module

The system shall display:

### Dashboard Cards

* Pollution Score
* CO₂ Score
* Sustainability Score
* Cost Index

### Visualizations

* Pie Chart
* Bar Chart
* Sustainability Gauge

---

## 4.4 Recommendation Module

The system shall:

* Analyze energy mixes.
* Evaluate sustainability conditions.
* Generate recommendations.
* Display energy optimization suggestions.

Recommendation Types:

* Environmental Risk
* High Pollution Alert
* High Carbon Emissions
* Sustainable Mix
* Excellent Energy Plan
* Moderate Energy Mix

---

## 4.5 Challenge Module

The system shall allow users to:

* Participate in sustainability challenges.
* Achieve predefined environmental targets.
* Submit challenge results.
* Receive success/failure feedback.
* Earn challenge ratings.

Example Targets:

* Pollution < 30
* CO₂ < 25
* Sustainability > 80

---

# 5. API Requirements

## GET /energy-sources

Purpose:

Retrieve all available energy sources.

Response:

* Source Name
* Category
* Pollution Score
* CO₂ Score
* Sustainability Score
* Cost Score

---

## POST /simulate

Purpose:

Calculate simulation scores.

Request:

```json
{
  "solar": 40,
  "wind": 30,
  "hydro": 20,
  "coal": 5,
  "petroleum": 5
}
```

Response:

```json
{
  "pollution": 17.4,
  "co2": 14.5,
  "sustainability": 87.25,
  "cost": 54.5
}
```

---

## POST /recommend

Purpose:

Generate recommendations.

Response:

```json
{
  "recommendation": "Sustainable Mix",
  "tips": [
    "Excellent renewable balance",
    "Consider adding more Hydro"
  ]
}
```

---

## POST /challenge-result

Purpose:

Store challenge outcomes.

---

# 6. Database Requirements

## Energy Sources Table

Stores:

* Source Name
* Category
* Pollution Score
* CO₂ Score
* Sustainability Score
* Cost Score

---

## Simulation Results Table

Stores:

* Energy Mix Percentages
* Pollution Score
* CO₂ Score
* Sustainability Score
* Timestamp

---

## Recommendations Table

Stores:

* Recommendation Text
* Recommendation Type
* Simulation Reference

---

## Challenges Table

Stores:

* Challenge Name
* Target Values
* Status
* Timestamp

---

# 7. Non-Functional Requirements

## Performance

* Simulation results should be generated within 2 seconds.
* Dashboard should update in real time.

## Usability

* Simple and intuitive interface.
* Responsive design.

## Reliability

* Proper API validation.
* Database integrity constraints.

## Maintainability

* Modular frontend and backend structure.
* Clear code documentation.

## Scalability

* Support future AI recommendation systems.
* Support user accounts and analytics features.

---

# 8. Technology Requirements

## Frontend

* React.js
* Vite
* JavaScript
* Axios
* Chart.js
* HTML5
* CSS3

## Backend

* FastAPI
* Python
* Pydantic
* SQLAlchemy
* Uvicorn

## Database

* PostgreSQL

## Version Control

* Git
* GitHub

---

# 9. Expected Outcomes

The completed system should:

* Simulate energy consumption scenarios.
* Educate users on environmental sustainability.
* Provide visual insights into energy choices.
* Generate intelligent recommendations.
* Encourage sustainable energy planning through challenges.

This is the kind of **Requirements.md** document that faculty reviewers, project evaluators, and GitHub repositories typically expect for a mini-project. It is also aligned with your blueprint's functional requirements, architecture, database design, APIs, and simulation workflow.  
