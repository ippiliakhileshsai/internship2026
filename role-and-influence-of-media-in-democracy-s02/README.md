# Role and influence of media in democracy

An interactive, gamified web application designed to educate citizens on the vital relationship between professional journalism and a healthy democratic society. This platform guides users through analyzing media bias, understanding reporting roles, and testing their information-verification skills in a simulation hub.

---

## 📌 Problem Statement
In the modern digital landscape, the rapid spread of misinformation, sensationalism, unchecked sources, and algorithmic echo chambers can severely degrade civic trust and polarization. Ordinary citizens often lack direct, engaging tools to train themselves in identifying media bias, understanding the fundamental checks performed by journalists, and realizing how public information affects overall community stability.

---

## 💡 Solution
The **Media & Democracy Simulator** offers a three-part gamified educational journey that teaches media literacy and verification skills:
1. **Simulation Hub (Telemetry Dashboard)**: A central workspace displaying real-time civic indicators: *Citizens Trained*, *News Checked*, and a dynamic *Community Rating*.
2. **Learn the Roles (Simulation Lab)**: An interactive learning zone featuring the **Media Literacy Toolkit** (Verification Checklists) and detailed breakdowns of the **8 Core Media Roles** (Watchdog, Informer, Public Forum, Gatekeeper, Agenda Setter, Mobilizer, Educator, Consensus Builder).
3. **Quiz Challenge**: A dynamic challenge mode drawing 7 random scenarios from a database of 50 situations. The choices users make directly influence the *Community Rating* counter on the Hub dashboard through an interactive rating interface upon completion.

---

## 🚀 Features
* **Dynamic Telemetry Dashboard**: Animated live counters that update in response to user actions and scores.
* **Interactive Media Literacy Toolkit**: Toggleable checklists covering bias identification, source verification, and cross-referencing networks.
* **8 Core Media Roles Selector**: Interactive cards detailing functions, civic impact, and real-world examples of media roles.
* **50-Scenario Quiz Database**: A randomized, shuffled pool of scenarios testing critical reading and democratic values.
* **Custom Themed Modals**: Unified, dark-mode alert and confirmation systems replacing native browser dialogues.
* **Interactive Star Rating Selector**: Allows users to rate their simulator experience, dynamically increasing or decreasing the persisted *Community Rating* dashboard statistic.
* **Responsive Layout**: Designed with obsidian charcoal aesthetics, neon highlights, and seamless grid transitions.

---

## 🛠 Tech Stack Used
* **Frontend Structure**: HTML5 (Semantic Markup)
* **Styling & Aesthetics**: CSS3 (Vanilla styles, custom animations, transitions, variable properties)
* **Logic & Interactivity**: JavaScript (ES6+, DOM Manipulation, LocalStorage Persistence)
* **Design Assets**: FontAwesome Icons, Google Fonts (Inter)
* **Local Hosting**: Python 3 `http.server`

---

## 💻 How to Run the Project
Follow these simple steps to run the application locally on your machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Vikas-4777/Swechaap-proj1-part2.git
   cd Swechaap-proj1-part2
   ```

2. **Start a Local Server**:
   You can run any local web server. For instance, using Python:
   ```bash
   python3 -m http.server 54331
   ```

3. **Open in Browser**:
   Navigate to the following address:
   `http://localhost:54331`

---

## 🌐 Deployment Link
The project can be deployed and accessed live at:
🔗 [Live Simulator Site](https://vikas-4777.github.io/Swechaap-proj1-part2/)
*(Note: If deployed via GitHub Pages, enable it in Repository Settings > Pages > Source: Deploy from branch > main)*
