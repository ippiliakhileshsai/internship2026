const eyeData = {
  cornea: {
    name: "Cornea",
    function: "The transparent front layer that lets light enter your eye.",
    fact: "The cornea has no blood vessels — it gets oxygen from the air!",
    color: "#0ea5e9",
    glowColor: "rgba(14, 165, 233, 0.2)"
  },
  pupil: {
    name: "Pupil",
    function: "The opening that controls how much light enters.",
    fact: "Your pupil can change size in less than a second!",
    color: "#64748b",
    glowColor: "rgba(100, 116, 139, 0.2)"
  },
  lens: {
    name: "Lens",
    function: "The flexible structure that focuses light.",
    fact: "The lens is so flexible it can change shape 14 times per second!",
    color: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.2)"
  },
  retina: {
    name: "Retina",
    function: "The light-sensitive layer that converts images into signals.",
    fact: "Your retina has 130 million light-sensitive cells!",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.2)"
  },
  "optic-nerve": {
    name: "Optic Nerve",
    function: "The pathway that sends signals to the brain.",
    fact: "The optic nerve carries a million fibers to the brain!",
    color: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.2)"
  }
};

let activePart = null;

// Elements
const interactiveElements = {
  cornea: document.getElementById('svg-part-cornea'),
  pupil: document.getElementById('svg-part-pupil'),
  lens: document.getElementById('svg-part-lens'),
  retina: document.getElementById('svg-part-retina'),
  "optic-nerve": document.getElementById('svg-part-optic-nerve')
};

const infoDisplay = document.getElementById('info-display-slot');
const helperTag = document.getElementById('helper-text-tag');

// Add Event Listeners
Object.keys(interactiveElements).forEach(partKey => {
  const el = interactiveElements[partKey];
  if (!el) return;

  el.addEventListener('click', () => selectPart(partKey));
  
  // Hover effect to highlight
  el.addEventListener('mouseenter', () => {
    if (activePart !== partKey) {
      el.style.filter = "brightness(1.15) drop-shadow(0 0 10px " + (eyeData[partKey].color) + ")";
    }
  });
  el.addEventListener('mouseleave', () => {
    if (activePart !== partKey) {
      el.style.filter = "";
    }
  });
});

function selectPart(partKey) {
  if (activePart === partKey) return;
  activePart = partKey;

  // Update SVG fills and styles
  Object.keys(interactiveElements).forEach(key => {
    const el = interactiveElements[key];
    if (!el) return;

    if (key === partKey) {
      el.style.filter = "brightness(1.1) drop-shadow(0 0 15px " + eyeData[key].color + ")";
      if (key === "cornea") {
        el.style.fill = "rgba(56, 189, 248, 0.5)";
      } else if (key === "retina") {
        el.style.fill = "#f472b6";
      } else if (key === "optic-nerve") {
        el.style.fill = "#a78bfa";
      } else if (key === "lens") {
        el.style.fill = "#fbbf24";
      }
    } else {
      el.style.filter = "";
      // Revert to default fills
      if (key === "cornea") {
        el.style.fill = "rgba(56, 189, 248, 0.2)";
      } else if (key === "retina") {
        el.style.fill = "#db2777";
      } else if (key === "optic-nerve") {
        el.style.fill = "#8b5cf6";
      } else if (key === "lens") {
        el.style.fill = "#f59e0b";
      }
    }
  });

  // Hide the floating helper tag once a selection is made
  if (helperTag) {
    helperTag.style.display = 'none';
  }

  // Animate Info Card content update
  const currentCard = infoDisplay.querySelector('.info-card');
  
  if (currentCard) {
    // Fade out existing card
    currentCard.classList.remove('fade-in');
    currentCard.classList.add('fade-out');
    
    setTimeout(() => {
      renderInfoCard(partKey);
    }, 350);
  } else {
    // No card present, render immediately
    renderInfoCard(partKey);
  }
}

function renderInfoCard(partKey) {
  const data = eyeData[partKey];
  
  infoDisplay.innerHTML = `
    <div class="glass-card info-card fade-out">
      <div class="info-card-glow" style="background: ${data.glowColor}"></div>
      
      <div class="info-header">
        <div class="info-icon-wrapper" style="color: ${data.color}; border-color: ${data.color}80; background: ${data.color}20">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <h3 class="info-title">${data.name}</h3>
      </div>
      
      <p class="info-desc">${data.function}</p>
      
      <div class="fact-banner">
        <div class="fact-title-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/>
          </svg>
          Fun Fact
        </div>
        <p class="fact-text">"${data.fact}"</p>
      </div>
    </div>
  `;

  // Trigger browser paint then fade in
  const newCard = infoDisplay.querySelector('.info-card');
  setTimeout(() => {
    newCard.classList.remove('fade-out');
    newCard.classList.add('fade-in');
  }, 50);
}
