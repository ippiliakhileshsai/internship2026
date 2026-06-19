// State management
let activeVision = 'normal';
let glassesOn = false;
let currentStep = 1;
let hyperopiaFocusNear = true; // Near focus active for Hyperopia

// Elements
const body = document.body;
const eyeCard = document.getElementById('eye-card');
const glassesToggle = document.getElementById('glasses-toggle');
const correctionStatus = document.getElementById('correction-status');
const glassesActiveIndicator = document.getElementById('glasses-active-indicator');
const focusBadgeText = document.getElementById('focus-badge-val');
const hyperopiaToggles = document.getElementById('hyperopia-toggles');
const btnFocusNear = document.getElementById('btn-focus-near');
const btnFocusFar = document.getElementById('btn-focus-far');
const stepperProgress = document.getElementById('stepper-progress');
const stepInfoBox = document.getElementById('step-info-box');

// Lenses in SVG
const concaveLensPath = document.getElementById('glasses-concave');
const convexLensPath = document.getElementById('glasses-convex');
const cylindricalLensGroup = document.getElementById('glasses-cylindrical');

// Rays Groups in SVG
const rayGroups = {
  normal: document.getElementById('rays-normal'),
  myopia: document.getElementById('rays-myopia'),
  hyperopia: document.getElementById('rays-hyperopia'),
  astigmatism: document.getElementById('rays-astigmatism')
};

// Preview Window Groups
const previewFar = document.getElementById('preview-far');
const previewNear = document.getElementById('preview-near');

// Stepper labels and click buttons
const stepButtons = document.querySelectorAll('.step-btn');
const eyeLabels = document.querySelectorAll('.eye-label-text');

// Step explanation text contents
const stepDescriptions = {
  1: "Light Source: Light reflects off objects in the environment and travels in straight lines toward the eye.",
  2: "Cornea: The clear, dome-shaped outer window of the eye bends light to do about 70% of the focusing.",
  3: "Aqueous Humor: This clear watery fluid fills the front chamber, nourishing the cornea and lens.",
  4: "Lens: The flexible crystalline lens adjusts its thickness (accommodates) to fine-tune focus for near or far objects.",
  5: "Vitreous Humor: Light travels through this clear, gel-like center that fills the main cavity, keeping the eye round.",
  6: "Retina: The light-sensitive tissue at the back captures rays, forming a sharp (but upside-down!) image.",
  7: "Brain: The optic nerve transmits electrical impulses to the brain, which flips the image upright so you see it!"
};

// Mapping of SVG element IDs corresponding to light journey steps
const stepPartMappings = {
  1: [], // Rays are highlighted
  2: ['part-cornea'],
  3: ['part-aqueous'],
  4: ['part-lens'],
  5: ['part-vitreous'],
  6: ['part-retina', 'fovea-dot', 'fovea-marker'],
  7: ['part-brain']
};

// Staggered cards entrance trigger
window.addEventListener('load', () => {
  body.classList.add('loaded');
  updateStepperProgress();
  setupRaysAnimation();
});

// Vision type cards activation
const visionCards = document.querySelectorAll('.vision-card');
visionCards.forEach((card, index) => {
  // Staggered bottom animation delay
  card.style.transitionDelay = `${index * 80}ms`;

  card.addEventListener('click', () => {
    const visionType = card.getAttribute('data-vision');
    selectVisionType(visionType);
  });

  // Keyboard navigation
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectVisionType(card.getAttribute('data-vision'));
    }
  });
});

function selectVisionType(type) {
  if (activeVision === type) return;

  // Card active states
  visionCards.forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-selected', 'false');
  });
  const selectedCard = document.querySelector(`.vision-card[data-vision="${type}"]`);
  selectedCard.classList.add('active');
  selectedCard.setAttribute('aria-selected', 'true');

  // 3D Card flip animation
  eyeCard.classList.add('flipping');
  setTimeout(() => {
    eyeCard.classList.remove('flipping');
  }, 500);

  // Perform update after a short delay to line up with the card flip midpoint
  setTimeout(() => {
    activeVision = type;
    
    // Show/hide Hyperopia Near vs Far selectors
    if (activeVision === 'hyperopia') {
      hyperopiaToggles.classList.add('active');
    } else {
      hyperopiaToggles.classList.remove('active');
    }

    // Auto-disable glasses or keep state? Usually it is nicer to keep state if relevant
    updateSimulation();
  }, 150);
}

// Glasses toggle change handler
glassesToggle.addEventListener('change', (e) => {
  glassesOn = e.target.checked;
  updateSimulation();
});

// Hyperopia Near/Far focus buttons
btnFocusNear.addEventListener('click', () => {
  hyperopiaFocusNear = true;
  btnFocusNear.classList.add('active');
  btnFocusFar.classList.remove('active');
  updateSimulation();
});

btnFocusFar.addEventListener('click', () => {
  hyperopiaFocusNear = false;
  btnFocusFar.classList.add('active');
  btnFocusNear.classList.remove('active');
  updateSimulation();
});

// Setup active ray paths flow dash arrays dynamically
function setupRaysAnimation() {
  const paths = document.querySelectorAll('.ray-path');
  paths.forEach(p => {
    // Compute path length
    const length = p.getTotalLength();
    p.style.strokeDasharray = `90 ${length}`;
    // Add class to run animation keyframe
    p.classList.add('ray-flow');
  });
}

// Primary simulation render function
function updateSimulation() {
  // 1. Update Glasses Lens inside Eye diagram
  // Reset all lens visibility
  concaveLensPath.style.opacity = '0';
  convexLensPath.style.opacity = '0';
  cylindricalLensGroup.style.opacity = '0';

  if (glassesOn) {
    glassesActiveIndicator.classList.add('active');
    correctionStatus.classList.add('visible');
    focusBadgeText.innerText = "Focus Correct (With Glasses)";
    focusBadgeText.style.color = 'var(--color-lens-purple)';

    // Show appropriate lens type
    if (activeVision === 'myopia') {
      concaveLensPath.style.opacity = '1';
    } else if (activeVision === 'hyperopia') {
      convexLensPath.style.opacity = '1';
    } else if (activeVision === 'astigmatism') {
      cylindricalLensGroup.style.opacity = '1';
    }
  } else {
    glassesActiveIndicator.classList.remove('active');
    correctionStatus.classList.remove('visible');
    if (activeVision === 'normal') {
      focusBadgeText.innerText = "Focus Correct";
      focusBadgeText.style.color = 'var(--color-normal-g)';
    } else {
      focusBadgeText.innerText = "Blurred Focus";
      focusBadgeText.style.color = 'var(--color-error-r)';
    }
  }

  // Glasses toggle disablement logic for Normal vision (normal doesn't need corrective lenses)
  if (activeVision === 'normal') {
    glassesToggle.disabled = true;
    glassesToggle.checked = false;
    glassesOn = false;
    glassesActiveIndicator.classList.remove('active');
    correctionStatus.classList.remove('visible');
    focusBadgeText.innerText = "Focus Correct";
    focusBadgeText.style.color = 'var(--color-normal-g)';
  } else {
    glassesToggle.disabled = false;
  }

  // 2. Crossfade Ray Paths
  // Hide all ray groups first
  Object.keys(rayGroups).forEach(k => {
    rayGroups[k].style.display = 'none';
    const uncorrected = rayGroups[k].querySelector('.uncorrected-rays');
    const corrected = rayGroups[k].querySelector('.corrected-rays');
    if (uncorrected) uncorrected.style.display = 'block';
    if (corrected) corrected.style.display = 'none';
  });

  // Show selected group
  const activeGroup = rayGroups[activeVision];
  activeGroup.style.display = 'block';

  // Toggle corrected vs uncorrected paths inside that group
  const uncorrectedGroup = activeGroup.querySelector('.uncorrected-rays');
  const correctedGroup = activeGroup.querySelector('.corrected-rays');

  if (glassesOn && correctedGroup) {
    if (uncorrectedGroup) uncorrectedGroup.style.display = 'none';
    correctedGroup.style.display = 'block';
  }

  // 3. Apply Filters to Preview Window Graphics
  // Reset filters
  previewFar.style.filter = 'none';
  previewNear.style.filter = 'none';
  previewFar.style.transform = 'none';
  previewNear.style.transform = 'none';

  if (!glassesOn) {
    if (activeVision === 'myopia') {
      // Myopia: Near (book) is clear, Far (landscape) is blurred
      previewFar.style.filter = 'blur(6px)';
      previewFar.style.transform = 'scale(1.04)';
    } else if (activeVision === 'hyperopia') {
      // Hyperopia: Farsighted. Depends on where they are looking
      if (hyperopiaFocusNear) {
        // Looking at near book -> book is highly blurred
        previewNear.style.filter = 'blur(6px)';
        previewFar.style.filter = 'blur(1px)'; // background slightly out of focus
      } else {
        // Looking at far tree -> tree is sharp, near book is blurred
        previewNear.style.filter = 'blur(4px)';
      }
    } else if (activeVision === 'astigmatism') {
      // Astigmatism: Directional blur horizontally on everything
      previewFar.style.filter = 'url(#astigmatism-blur)';
      previewNear.style.filter = 'url(#astigmatism-blur)';
      // Add a slight skew to visually double down on directional smear
      previewFar.style.transform = 'skewX(3deg)';
      previewNear.style.transform = 'skewX(3deg)';
    }
  }
}

// 4. Step journey stepper logic
stepButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const step = parseInt(btn.getAttribute('data-step'));
    selectStep(step);
  });
});

// Allow clicking on anatomical labels in the eye diagram to jump to the step
eyeLabels.forEach(label => {
  label.addEventListener('click', () => {
    const step = parseInt(label.getAttribute('data-step'));
    selectStep(step);
  });
});

function selectStep(step) {
  currentStep = step;

  // Update buttons active classes
  stepButtons.forEach(btn => {
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

  // Update text in status box
  stepInfoBox.innerHTML = stepDescriptions[step];

  // Update stepper bar width percentage
  updateStepperProgress();

  // Highlight corresponding anatomy path in SVG with a pulse class
  // Clear all active pulse labels/elements
  eyeLabels.forEach(l => l.classList.remove('active'));
  const activeLabel = document.querySelector(`.eye-label-text[data-step="${step}"]`);
  if (activeLabel) activeLabel.classList.add('active');

  const allAnatomyParts = document.querySelectorAll('.eye-layer');
  allAnatomyParts.forEach(part => part.classList.remove('highlight-pulse'));

  const partIdsToHighlight = stepPartMappings[step];
  partIdsToHighlight.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('highlight-pulse');
    }
  });
}

function updateStepperProgress() {
  const percentage = ((currentStep - 1) / 6) * 100;
  stepperProgress.style.width = `${percentage}%`;
}
