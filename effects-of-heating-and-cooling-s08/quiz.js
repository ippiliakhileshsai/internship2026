(() => {
  const NAME_KEY = "heatquest_name";

  const QUESTIONS = [
    {
      q: "Which material usually heats up the fastest?",
      o: ["Wood", "Plastic", "Metal", "Water"],
      a: 2,
      e: "Metal heats up quickly because it has high thermal conductivity and usually low specific heat capacity."
    },
    {
      q: "Why does water take longer to heat?",
      o: ["It has very high specific heat capacity", "It has no particles", "It is always cold", "It is a metal"],
      a: 0,
      e: "Water needs a lot of energy to change its temperature, so it warms slowly."
    },
    {
      q: "What happens to butter when heated?",
      o: ["It turns into glass", "It melts into a soft liquid", "It becomes metal", "It freezes immediately"],
      a: 1,
      e: "Butter melts easily when heated because it changes state at a low temperature."
    },
    {
      q: "Which material is a poor conductor of heat?",
      o: ["Metal", "Wood", "Copper", "Aluminum"],
      a: 1,
      e: "Wood does not transfer heat quickly, so it is a poor conductor."
    },
    {
      q: "What does thermal conductivity mean?",
      o: ["Ability to store sound", "Ability to transfer heat", "Ability to glow", "Ability to float"],
      a: 1,
      e: "Thermal conductivity is how easily heat travels through a material."
    },
    {
      q: "What happens to water when it is cooled to 0°C or below?",
      o: ["It becomes steam", "It becomes ice", "It becomes butter", "It turns into metal"],
      a: 1,
      e: "Water freezes and becomes ice at 0°C or below."
    },
    {
      q: "Which material has the highest specific heat capacity?",
      o: ["Metal", "Water", "Wood", "Wax"],
      a: 1,
      e: "Water has a very high specific heat capacity, so it takes more heat to warm it up."
    }
  ];

  const $ = (id) => document.getElementById(id);

  const state = {
    stage: "intro",
    index: 0,
    answers: []
  };

  function show(el, yes) {
    el.classList.toggle("hidden", !yes);
  }

  function openInstructions() {
    $("modal").classList.remove("hidden");
    $("modal").setAttribute("aria-hidden", "false");
  }

  function closeInstructions() {
    $("modal").classList.add("hidden");
    $("modal").setAttribute("aria-hidden", "true");
  }

  function renderIntro() {
    const name = localStorage.getItem(NAME_KEY);
    if (!name) {
      location.href = "index.html";
      return;
    }

    $("quizGreeting").textContent = `Great work, ${name}!`;
    $("introTitle").textContent = `Great job, ${name}!`;
    $("introText").textContent =
      "You've explored how materials react to heating and cooling. Now let's test what you've learned with a short quiz. Try your best and enjoy the challenge.";

    show($("introScreen"), true);
    show($("quizScreen"), false);
    show($("resultScreen"), false);
    show($("modal"), false);
  }

  function renderQuestion() {
    const q = QUESTIONS[state.index];
    $("qCount").textContent = `Question ${state.index + 1} of ${QUESTIONS.length}`;
    $("questionText").textContent = q.q;
    $("progressFill").style.width = `${(state.index / QUESTIONS.length) * 100}%`;

    const box = $("optionsBox");
    box.innerHTML = "";

    q.o.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "option" + (state.answers[state.index] === i ? " sel" : "");
      btn.innerHTML = `<span class="bubble"></span><span>${opt}</span>`;
      btn.addEventListener("click", () => {
        state.answers[state.index] = i;
        renderQuestion();
      });
      box.appendChild(btn);
    });

    $("prevBtn").disabled = state.index === 0;
    $("nextBtn").textContent = state.index === QUESTIONS.length - 1 ? "Finish" : "Next";

    show($("introScreen"), false);
    show($("quizScreen"), true);
    show($("resultScreen"), false);
  }

  function finishQuiz() {
    let score = 0;
    const review = $("reviewBox");
    review.innerHTML = "";

    QUESTIONS.forEach((q, i) => {
      const chosen = state.answers[i];
      const correct = chosen === q.a;
      if (correct) score++;

      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = `
        <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px">
          <strong>Q${i + 1}. ${q.q}</strong>
          <span class="${correct ? "ok" : "no"}">${correct ? "Correct" : "Wrong"}</span>
        </div>
        <div class="small"><strong>Your answer:</strong> ${q.o[chosen] || "Not answered"}</div>
        <div class="small"><strong>Correct answer:</strong> ${q.o[q.a]}</div>
        <div class="small" style="margin-top:8px;line-height:1.7"><strong>Explanation:</strong> ${q.e}</div>
      `;
      review.appendChild(item);
    });

    $("scoreText").textContent = `${score}/${QUESTIONS.length}`;
    $("resultMsg").textContent =
      score >= 6 ? "Excellent work!" : score >= 4 ? "Good effort!" : "Keep practicing!";

    show($("introScreen"), false);
    show($("quizScreen"), false);
    show($("resultScreen"), true);
  }

  function startQuiz() {
    state.stage = "quiz";
    state.index = 0;
    state.answers = [];
    closeInstructions();
    renderQuestion();
  }

  function initQuizPage() {
    const name = localStorage.getItem(NAME_KEY);
    if (!name) {
      location.href = "index.html";
      return;
    }

    $("quizGreeting").textContent = `Great work, ${name}!`;
    renderIntro();

    $("backBtn").addEventListener("click", () => {
      location.href = "experiment.html";
    });

    $("introScreen").addEventListener("click", (e) => {
      if (e.target === $("introScreen")) openInstructions();
    });

    $("closeModalBtn").addEventListener("click", closeInstructions);
    $("startQuizBtn").addEventListener("click", startQuiz);

    $("prevBtn").addEventListener("click", () => {
      if (state.index > 0) {
        state.index--;
        renderQuestion();
      }
    });

    $("nextBtn").addEventListener("click", () => {
      if (state.answers[state.index] === undefined) {
        alert("Please choose an answer first.");
        return;
      }

      if (state.index < QUESTIONS.length - 1) {
        state.index++;
        renderQuestion();
      } else {
        finishQuiz();
      }
    });

    $("playAgainBtn").addEventListener("click", () => {
      renderIntro();
    });

    $("goExperimentBtn").addEventListener("click", () => {
      location.href = "experiment.html";
    });

    document.addEventListener("keydown", (e) => {
      if (!$("modal").classList.contains("hidden")) {
        if (e.key === "Escape") closeInstructions();
        if (e.key === "Enter") startQuiz();
        return;
      }

      if ($("quizScreen").classList.contains("hidden") === false) {
        if (e.key === "ArrowLeft") $("prevBtn").click();
        if (e.key === "ArrowRight") $("nextBtn").click();
        if (e.key >= "1" && e.key <= "4") {
          const idx = Number(e.key) - 1;
          const q = QUESTIONS[state.index];
          if (q && q.o[idx] !== undefined) {
            state.answers[state.index] = idx;
            renderQuestion();
          }
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initQuizPage);
})();