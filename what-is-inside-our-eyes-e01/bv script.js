// State management
let isProcessing = false;
let currentStep = 1;
let activeStageCard = null;

// Elements
const body = document.body;
const humanCard = document.getElementById('human-card');
const btnTriggerSignal = document.getElementById('btn-trigger-signal');
const successBanner = document.getElementById('success-banner');
const progressBar = document.getElementById('progress-bar');
const progressPercentText = document.getElementById('progress-percent');
const previewImage = document.getElementById('preview-image');
const stepperBar = document.getElementById('stepper-bar');

// SVG animated flow paths
const flowNerve = document.getElementById('flow-nerve');
const flowTract = document.getElementById('flow-tract');

// SVG glow nodes
const retinaGlow = document.getElementById('retina-glow-node');
const thalamusGlow = document.getElementById('thalamus-glow-node');
const cortexGlow = document.getElementById('cortex-glow-node');
const brainCortex = document.getElementById('part-brain');

// Interactive controls/cards
const stageCards = document.querySelectorAll('.stage-card');
const stepButtons = document.querySelectorAll('.step-btn');
const interactiveNodes = document.querySelectorAll('.svg-interactive-node');
const tooltipBox = document.getElementById('svg-tooltip');

// Initial state setup on load
window.addEventListener('load', () => {
  body.classList.add('loaded');
  resetSimulation();
  setupTooltips();
  setupCardInteractivity();
});

function resetSimulation() {
  isProcessing = false;
  btnTriggerSignal.disabled = false;
  successBanner.classList.remove('visible');
  
  // Reset progress
  progressBar.style.width = '0%';
  progressPercentText.innerText = 'Brain Processing: 0%';
  stepperBar.style.width = '0%';
  
  // Reset image preview state
  previewImage.style.filter = 'blur(16px) grayscale(85%)';
  previewImage.style.transform = 'scale(0.94)';

  // Clear SVG glows
  retinaGlow.setAttribute('r', '0');
  thalamusGlow.setAttribute('r', '0');
  cortexGlow.setAttribute('r', '0');
  brainCortex.classList.remove('pulse');

  // Clear glows from nodes
  document.getElementById('part-retina').classList.remove('pulse');
  document.getElementById('part-cortex').classList.remove('pulse');

  // Clear flows
  flowNerve.classList.remove('active');
  flowTract.classList.remove('active');

  // Reset step buttons
  stepButtons.forEach((btn, idx) => {
    btn.classList.remove('active', 'completed');
    if (idx === 0) btn.classList.add('active');
  });

  // Reset card selection
  stageCards.forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-selected', 'false');
  });
  activeStageCard = null;
}

// Trigger signal click
btnTriggerSignal.addEventListener('click', () => {
  if (isProcessing) return;
  triggerSignalJourney();
});

function triggerSignalJourney() {
  isProcessing = true;
  btnTriggerSignal.disabled = true;
  successBanner.classList.remove('visible');
  resetSimulation();
  isProcessing = true;
  btnTriggerSignal.disabled = true;

  // 3D Card flip animation on start
  humanCard.classList.add('transitioning');
  setTimeout(() => {
    humanCard.classList.remove('transitioning');
  }, 600);

  // Define the timing steps
  // t = 0.0s: Step 1 (Eyes detect light)
  updateStepper(1, 0);
  updatePreviewState(0);

  // t = 0.3s: Step 2 (Retina Convert Signal) -> Retina glows
  setTimeout(() => {
    updateStepper(2, 16);
    updatePreviewState(15);
    document.getElementById('part-retina').classList.add('pulse');
    retinaGlow.setAttribute('r', '24');
    activateStageCard(1);
  }, 300);

  // t = 0.6s: Step 3 (Optic Nerve transmission start) -> Path 1 activates
  setTimeout(() => {
    updateStepper(3, 33);
    updatePreviewState(30);
    flowNerve.classList.add('active');
    activateStageCard(2);
  }, 600);

  // t = 1.2s: Step 4 (Thalamus lights up)
  setTimeout(() => {
    updateStepper(4, 50);
    updatePreviewState(50);
    thalamusGlow.setAttribute('r', '22');
  }, 1200);

  // t = 1.5s: Step 5 (Visual Tract activates / Cortex starts)
  setTimeout(() => {
    updateStepper(5, 66);
    updatePreviewState(65);
    flowTract.classList.add('active');
    activateStageCard(3);
  }, 1500);

  // t = 2.0s: Step 6 (Cortex activates) -> Cortex glows
  setTimeout(() => {
    updateStepper(6, 83);
    updatePreviewState(85);
    document.getElementById('part-cortex').classList.add('pulse');
    cortexGlow.setAttribute('r', '26');
    brainCortex.classList.add('pulse');
  }, 2000);

  // t = 2.4s: Step 7 (You See! Brain creates final image)
  setTimeout(() => {
    updateStepper(7, 100);
    updatePreviewState(100);
    activateStageCard(4);
    successBanner.classList.add('visible');
    isProcessing = false;
    btnTriggerSignal.disabled = false;
  }, 2400);
}

function updateStepper(step, progressPercent) {
  currentStep = step;
  stepButtons.forEach((btn, idx) => {
    const btnStep = parseInt(btn.getAttribute('data-step'));
    btn.classList.remove('active');
    if (btnStep < step) {
      btn.classList.add('completed');
    } else {
      btn.classList.remove('completed');
    }
    if (btnStep === step) {
      btn.classList.add('active');
    }
  });
  stepperBar.style.width = `${((step - 1) / 6) * 100}%`;
}

function updatePreviewState(percent) {
  progressBar.style.width = `${percent}%`;
  progressPercentText.innerText = `Brain Processing: ${percent}%`;

  // Apply blurring, grayscaling and scaling step-by-step
  if (percent === 0) {
    previewImage.style.filter = 'blur(16px) grayscale(85%)';
    previewImage.style.transform = 'scale(0.94)';
  } else if (percent === 15) {
    previewImage.style.filter = 'blur(12px) grayscale(65%)';
    previewImage.style.transform = 'scale(0.95)';
  } else if (percent === 30) {
    previewImage.style.filter = 'blur(8px) grayscale(45%)';
    previewImage.style.transform = 'scale(0.96)';
  } else if (percent === 50) {
    previewImage.style.filter = 'blur(5px) grayscale(25%)';
    previewImage.style.transform = 'scale(0.97)';
  } else if (percent === 65) {
    previewImage.style.filter = 'blur(3px) grayscale(15%)';
    previewImage.style.transform = 'scale(0.98)';
  } else if (percent === 85) {
    previewImage.style.filter = 'blur(1.5px) grayscale(5%)';
    previewImage.style.transform = 'scale(0.99)';
  } else if (percent === 100) {
    previewImage.style.filter = 'blur(0px) grayscale(0%)';
    previewImage.style.transform = 'scale(1.0)';
  }
}

function activateStageCard(num) {
  stageCards.forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-selected', 'false');
  });
  const activeCard = document.querySelector(`.stage-card[data-stage="${num}"]`);
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.setAttribute('aria-selected', 'true');
    activeStageCard = num;
  }
}

// Set up educational tooltips on SVG components
function setupTooltips() {
  interactiveNodes.forEach(node => {
    node.addEventListener('mouseenter', (e) => {
      showTooltip(e, node);
    });
    node.addEventListener('mousemove', (e) => {
      moveTooltip(e);
    });
    node.addEventListener('mouseleave', () => {
      hideTooltip();
    });
    
    // Mobile tap/focus support
    node.addEventListener('focus', (e) => {
      showTooltip(e, node);
    });
    node.addEventListener('blur', () => {
      hideTooltip();
    });
  });
}

function showTooltip(e, node) {
  const text = node.getAttribute('data-tooltip') || node.getAttribute('data-tooltip');
  if (!text) return;
  tooltipBox.innerText = text;
  tooltipBox.classList.add('visible');
  moveTooltip(e);
}

function moveTooltip(e) {
  // Position tooltip above the cursor/element inside right container
  const containerRect = humanCard.getBoundingClientRect();
  let x, y;
  
  if (e.clientX) {
    // Hover coordinate
    x = e.clientX - containerRect.left;
    y = e.clientY - containerRect.top - 40;
  } else {
    // Focus coordinates
    const rect = e.target.getBoundingClientRect();
    x = rect.left + rect.width / 2 - containerRect.left;
    y = rect.top - containerRect.top - 40;
  }
  
  tooltipBox.style.left = `${x}px`;
  tooltipBox.style.top = `${y}px`;
}

function hideTooltip() {
  tooltipBox.classList.remove('visible');
}

// Cards click to focus/demo
function setupCardInteractivity() {
  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      const num = parseInt(card.getAttribute('data-stage'));
      stageCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      // Flash/highlight corresponding anatomical parts
      highlightStagePart(num);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function highlightStagePart(stageNum) {
  // Clear highlights
  document.getElementById('part-retina').classList.remove('pulse');
  document.getElementById('part-thalamus').classList.remove('active');
  document.getElementById('part-cortex').classList.remove('pulse');
  brainCortex.classList.remove('pulse');

  if (stageNum === 1) {
    document.getElementById('part-retina').classList.add('pulse');
  } else if (stageNum === 2) {
    // Pulse nerve
    flowNerve.classList.add('active');
    setTimeout(() => flowNerve.classList.remove('active'), 1200);
  } else if (stageNum === 3) {
    document.getElementById('part-thalamus').classList.add('active');
    brainCortex.classList.add('pulse');
  } else if (stageNum === 4) {
    document.getElementById('part-cortex').classList.add('pulse');
    // Clear blur entirely for demonstration
    previewImage.style.filter = 'blur(0px) grayscale(0%)';
    previewImage.style.transform = 'scale(1.0)';
  }
}
