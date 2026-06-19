// State management
let brightness = 50;
let focus = "near";

// Pupil Simulator Elements
const brightnessSlider = document.getElementById('brightness-range');
const pupilPanel = document.getElementById('pupil-viewport');
const pupilModel = document.getElementById('pupil-pupil');

// Lens Focus Lab Elements
const btnNear = document.getElementById('btn-focus-near');
const btnFar = document.getElementById('btn-focus-far');
const lensElement = document.getElementById('eye-lens');
const focusRayPath = document.getElementById('focus-ray-path');
const farTarget = document.getElementById('far-mountain');
const nearTarget = document.getElementById('near-butterfly');

// 1. Pupil Simulator Logic
if (brightnessSlider) {
  brightnessSlider.addEventListener('input', (e) => {
    brightness = parseInt(e.target.value);
    
    // Update background color based on brightness
    pupilPanel.style.backgroundColor = `hsl(45, 100%, ${brightness}%)`;
    
    // Inverse relationship: brighter light = smaller pupil
    // Max brightness (100) -> small pupil (width = 20px, radius = 10px)
    // Min brightness (0) -> large pupil (width = 80px, radius = 40px)
    const pupilSize = (40 - (brightness * 0.3)) * 2;
    
    pupilModel.style.width = `${pupilSize}px`;
    pupilModel.style.height = `${pupilSize}px`;
  });
}

// 2. Lens Focus Lab Logic
if (btnNear && btnFar) {
  btnNear.addEventListener('click', () => setFocusMode("near"));
  btnFar.addEventListener('click', () => setFocusMode("far"));
}

function setFocusMode(mode) {
  if (focus === mode) return;
  focus = mode;

  if (focus === "near") {
    btnNear.classList.add('active');
    btnFar.classList.remove('active');
    
    // Adjust lens size to accommodate near focus (thicker lens)
    lensElement.setAttribute('rx', '30');
    lensElement.setAttribute('ry', '40');
    
    // Set target focal ray path to near focus (shorter focus target)
    focusRayPath.setAttribute('d', 'M 10 20 L 70 50 M 10 80 L 70 50');
    
    // Near butterfly is sharp and scaled up, far mountain is blurred
    nearTarget.style.filter = "blur(0px)";
    nearTarget.style.transform = "translateY(-50%) scale(1.5)";
    
    farTarget.style.filter = "blur(4px)";
    farTarget.style.transform = "scale(0.8)";
  } else {
    btnFar.classList.add('active');
    btnNear.classList.remove('active');
    
    // Adjust lens size to accommodate far focus (thinner/flatter lens)
    lensElement.setAttribute('rx', '15');
    lensElement.setAttribute('ry', '45');
    
    // Set target focal ray path to far focus (longer focus target)
    focusRayPath.setAttribute('d', 'M 10 20 L 85 50 M 10 80 L 85 50');
    
    // Near butterfly is blurred, far mountain is sharp
    nearTarget.style.filter = "blur(8px)";
    nearTarget.style.transform = "translateY(-50%) scale(1.0)";
    
    farTarget.style.filter = "blur(0px)";
    farTarget.style.transform = "scale(1.0)";
  }
}
