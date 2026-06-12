(() => {
  const NAME_KEY = "heatquest_name";
  const SELECTED_KEY = "heatquest_selected";
  const TEMP_KEY = "heatquest_temp";
  const MODE_KEY = "heatquest_mode";

  const MATERIALS = {
    metal: {
      name: "Metal",
      image: "metal.jpg",
      conductivity: "High",
      shc: "Low",
      baseTemp: 0,
      explain: "Metal has high thermal conductivity, so heat moves through it quickly. It also has a low specific heat capacity, so its temperature changes faster than many other materials.",
      heatText: "Metal heats up quickly because it transfers energy fast.",
      coolText: "Metal cools down quickly because it releases heat fast.",
      state: "solid",
      stepHeat: 20,
      stepCool: 20
    },
    wood: {
      name: "Wood",
      image: "wood.jpg",
      conductivity: "Low",
      shc: "Medium",
      baseTemp: 0,
      explain: "Wood is a poor conductor of heat, so heat does not travel through it quickly. It is a good example of an insulating material.",
      heatText: "Wood warms slowly because it is a poor conductor.",
      coolText: "Wood cools slowly and stays solid.",
      state: "solid",
      stepHeat: 10,
      stepCool: 10
    },
    plastic: {
      name: "Plastic",
      image: "plastic.jpg",
      conductivity: "Very Low",
      shc: "Medium",
      baseTemp: 0,
      explain: "Plastic usually has low thermal conductivity, so it resists the flow of heat. That is why many plastic items feel slower to warm up.",
      heatText: "Plastic warms slowly and may soften if heated enough.",
      coolText: "Plastic cools without a major state change in this simulation.",
      state: "solid",
      stepHeat: 8,
      stepCool: 8
    },
    water: {
      name: "Water",
      image: "water.jpg",
      conductivity: "Low",
      shc: "Very High",
      baseTemp: 10,
      explain: "Water has a very high specific heat capacity, so it takes a lot of energy to change its temperature. That is why it heats and cools more slowly.",
      heatText: "Water needs a lot of heat before its temperature rises greatly.",
      coolText: "Water cools and can freeze into ice when the temperature drops enough.",
      state: "liquid",
      stepHeat: 25,
      stepCool: 25
    },
    ice: {
      name: "Ice",
      image: "ice.jpg",
      conductivity: "Medium",
      shc: "Medium",
      baseTemp: -5,
      explain: "Ice is the solid state of water. When heat is added, it absorbs energy and turns into liquid water.",
      heatText: "Ice melts into water at 0°C and above.",
      coolText: "Ice stays frozen when the temperature is low.",
      state: "solid",
      stepHeat: 20,
      stepCool: 10
    },
    wax: {
      name: "Wax",
      image: "wax.jpg",
      conductivity: "Low",
      shc: "Low",
      baseTemp: 0,
      explain: "Wax changes state easily with heat because its particles are held together less strongly than in many solids.",
      heatText: "Wax melts easily when heated.",
      coolText: "Wax hardens again when cooled.",
      state: "solid",
      stepHeat: 15,
      stepCool: 15
    },
    chocolate: {
      name: "Chocolate",
      image: "chocolate.jpg",
      conductivity: "Low",
      shc: "Low",
      baseTemp: 0,
      explain: "Chocolate has a low melting point, so even mild heat can make it soften or melt.",
      heatText: "Chocolate melts when heated.",
      coolText: "Chocolate becomes firm again when cooled.",
      state: "solid",
      stepHeat: 15,
      stepCool: 15
    },
    butter: {
      name: "Butter",
      image: "butter.jpg",
      conductivity: "Low",
      shc: "Low",
      baseTemp: 0,
      explain: "Butter melts easily when warmed because it changes state at a relatively low temperature.",
      heatText: "Butter melts into a soft liquid when heated.",
      coolText: "Butter becomes solid again when cooled.",
      state: "solid",
      stepHeat: 15,
      stepCool: 15
    },
    glass: {
      name: "Glass",
      image: "glass.jpg",
      conductivity: "Medium",
      shc: "Low",
      baseTemp: 0,
      explain: "Glass is a solid that can transfer some heat, but it does not change state easily in normal classroom conditions.",
      heatText: "Glass becomes warmer but stays solid in this model.",
      coolText: "Glass cools down gradually.",
      state: "solid",
      stepHeat: 10,
      stepCool: 10
    }
  };

  const $ = (id) => document.getElementById(id);

  function getStateFromTemp(key, temp) {
    if (key === "water") {
      if (temp <= 0) return "solid";
      if (temp >= 100) return "gas";
      return "liquid";
    }
    if (key === "ice") {
      return temp > 0 ? "liquid" : "solid";
    }
    if (key === "wax" || key === "chocolate" || key === "butter") {
      return temp >= 30 ? "liquid" : "solid";
    }
    return MATERIALS[key].state;
  }

  function getImageFor(key, temp) {
    if (key === "water") {
      if (temp <= 0) return "ice.jpg";
      if (temp >= 100) return "steam.jpg";
      return "water.jpg";
    }
    if (key === "ice") {
      return temp > 0 ? "water.jpg" : "ice.jpg";
    }
    if (key === "wax") {
      return temp >= 30 ? "melted_wax.jpg" : "wax.jpg";
    }
    if (key === "chocolate") {
      return temp >= 30 ? "melted_chocolate.jpg" : "chocolate.jpg";
    }
    if (key === "butter") {
      return temp >= 30 ? "melted_butter.jpg" : "butter.jpg";
    }
    return MATERIALS[key].image;
  }

  function clampTemp(key, temp) {
    if (key === "water") return Math.max(-20, Math.min(110, temp));
    if (key === "ice") return Math.max(-25, Math.min(35, temp));
    if (key === "wax" || key === "chocolate" || key === "butter") return Math.max(-10, Math.min(60, temp));
    return Math.max(-25, Math.min(120, temp));
  }

  function loadState() {
    return {
      name: localStorage.getItem(NAME_KEY) || "",
      selected: localStorage.getItem(SELECTED_KEY) || "metal",
      temp: Number(localStorage.getItem(TEMP_KEY) || 0),
      mode: localStorage.getItem(MODE_KEY) || "cool"
    };
  }

  function saveState(state) {
    localStorage.setItem(SELECTED_KEY, state.selected);
    localStorage.setItem(TEMP_KEY, String(state.temp));
    localStorage.setItem(MODE_KEY, state.mode);
  }

  function tempLabel(temp) {
    if (temp <= 0) return "Very Cold";
    if (temp < 20) return "Cold";
    if (temp < 50) return "Warm";
    if (temp < 80) return "Hot";
    return "Very Hot";
  }

  function tempBar(temp) {
    return Math.max(6, Math.min(96, (temp + 25) * 2.2));
  }

  function particleCount(temp) {
    return Math.max(1, Math.min(8, Math.round((temp + 25) / 16)));
  }

  function renderMaterialCards(state) {
    const grid = $("materialGrid");
    grid.innerHTML = "";

    Object.entries(MATERIALS).forEach(([key, material]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "material-card" + (state.selected === key ? " active" : "");
      btn.innerHTML = `
        <div class="thumb">
          <img src="${material.image}" alt="${material.name}">
        </div>
        <div class="card-label">
          <span>${material.name}</span>
          <span class="tag">Select</span>
        </div>
      `;
      btn.addEventListener("click", () => selectMaterial(key));
      grid.appendChild(btn);
    });
  }

  function renderParticles(temp) {
    const bar = $("particleBar");
    bar.innerHTML = "";
    const count = particleCount(temp);
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement("div");
      dot.className = "dot" + (i < count ? " on" : "");
      bar.appendChild(dot);
    }
  }

  function updateExperiment() {
    const state = loadState();
    const m = MATERIALS[state.selected];
    const phase = getStateFromTemp(state.selected, state.temp);

    $("greetingText").textContent = state.name
      ? `Hi ${state.name}, let's explore how materials respond when heat is added or removed.`
      : "Let's explore how materials respond when heat is added or removed.";

    $("selectedLabel").textContent = `Selected: ${m.name}`;
    $("conductivity").textContent = m.conductivity;
    $("shc").textContent = m.shc;
    $("stateValue").textContent = phase.charAt(0).toUpperCase() + phase.slice(1);
    $("explanation").textContent = m.explain;
    $("temperature").innerHTML = `${state.temp}<span>°C</span>`;
    $("thermoFill").style.height = `${tempBar(state.temp)}%`;
    $("stateText").textContent = tempLabel(state.temp);
    $("resultText").textContent = state.mode === "heat" ? m.heatText : m.coolText;
    $("materialVisual").src = getImageFor(state.selected, state.temp);

    renderParticles(state.temp);
  }

  function selectMaterial(key) {
    const state = loadState();
    state.selected = key;
    state.temp = MATERIALS[key].baseTemp;
    state.mode = "cool";
    saveState(state);
    renderMaterialCards(state);
    updateExperiment();
  }

  function changeTemp(action) {
    const state = loadState();
    const material = MATERIALS[state.selected];
    state.mode = action;

    const step = action === "heat" ? material.stepHeat : material.stepCool;
    state.temp += action === "heat" ? step : -step;
    state.temp = clampTemp(state.selected, state.temp);

    saveState(state);
    updateExperiment();
  }

  function resetExperiment() {
    const state = loadState();
    state.temp = MATERIALS[state.selected].baseTemp;
    state.mode = "cool";
    saveState(state);
    updateExperiment();
  }

  function initIndexPage() {
    const input = $("nameInput");
    const btn = $("startBtn");
    if (!input || !btn) return;

    input.focus();

    btn.addEventListener("click", () => {
      const name = input.value.trim();
      if (!name) {
        input.focus();
        return;
      }

      localStorage.setItem(NAME_KEY, name);
      localStorage.setItem(SELECTED_KEY, "metal");
      localStorage.setItem(TEMP_KEY, "0");
      localStorage.setItem(MODE_KEY, "cool");

      location.href = "experiment.html";
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btn.click();
    });
  }

  function initExperimentPage() {
    if (!localStorage.getItem(NAME_KEY)) {
      location.href = "index.html";
      return;
    }

    $("quizBtn").addEventListener("click", () => {
      location.href = "quiz.html";
    });

    $("heatBtn").addEventListener("click", () => changeTemp("heat"));
    $("coolBtn").addEventListener("click", () => changeTemp("cool"));
    $("resetBtn").addEventListener("click", resetExperiment);

    renderMaterialCards(loadState());
    updateExperiment();
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.classList.contains("page-index")) initIndexPage();
    if (document.body.classList.contains("page-experiment")) initExperimentPage();
  });
})();
