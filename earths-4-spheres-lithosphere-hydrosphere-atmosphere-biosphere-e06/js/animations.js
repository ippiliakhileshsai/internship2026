/* ==========================================================================
   Earth's Four Spheres - animations.js (Micro-animations and Particles)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalAnimations();
});

function initGlobalAnimations() {
  // Add styling for sparkles/particles to head dynamically
  const style = document.createElement('style');
  style.innerText = `
    .sparkle {
      position: absolute;
      pointer-events: none;
      width: 12px;
      height: 12px;
      background: radial-gradient(circle, #ffe600 20%, transparent 80%);
      border-radius: 50%;
      animation: fly-and-fade 0.8s ease-out forwards;
      z-index: 1500;
    }
    
    .floating-bubble {
      position: absolute;
      bottom: -20px;
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(0, 119, 182, 0.3);
      border-radius: 50%;
      pointer-events: none;
      animation: rise-bubble var(--time) linear infinite;
    }

    .leaf-particle {
      position: absolute;
      top: -20px;
      background-color: #55a630;
      border-radius: 2px 10px 5px 10px;
      pointer-events: none;
      animation: fall-leaf var(--time) linear forwards;
    }

    .wind-particle {
      position: absolute;
      left: -100px;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
      pointer-events: none;
      animation: blow-wind var(--time) linear forwards;
    }

    @keyframes fly-and-fade {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0.2); opacity: 0; }
    }

    @keyframes rise-bubble {
      0% { transform: translateY(0) translateX(0); opacity: 0.1; }
      10% { opacity: 0.7; }
      90% { opacity: 0.7; }
      100% { transform: translateY(-350px) translateX(var(--drift)); opacity: 0; }
    }

    @keyframes fall-leaf {
      0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; }
      100% { transform: translateY(420px) rotate(360deg) translateX(var(--drift)); opacity: 0; }
    }

    @keyframes blow-wind {
      0% { transform: translateX(0) translateY(0); width: 20px; opacity: 0.6; }
      50% { width: 80px; }
      100% { transform: translateX(1100px) translateY(var(--drift)); width: 20px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Sparkle Burst Effect (e.g., when clicking items or answering correctly)
window.createSparkleBurst = function(x, y, container = document.body) {
  const count = 12;
  const rect = container.getBoundingClientRect();
  const relativeX = x - rect.left;
  const relativeY = y - rect.top;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${relativeX}px`;
    sparkle.style.top = `${relativeY}px`;
    
    // Random direction vector
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 60;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    sparkle.style.setProperty('--tx', `${tx}px`);
    sparkle.style.setProperty('--ty', `${ty}px`);
    
    // Random color variant (yellow, orange, blue, green)
    const colors = ['#ffe600', '#ff9f43', '#00d2d3', '#10ac84', '#ff9ff3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = `radial-gradient(circle, ${randomColor} 30%, transparent 80%)`;
    
    // Random size
    const size = 6 + Math.random() * 10;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }
};

// Create floating bubble stream inside a container (Hydrosphere element)
window.createBubbleStream = function(container, active = true) {
  if (!active) return;
  const bubbleInterval = setInterval(() => {
    if (!container.isConnected) {
      clearInterval(bubbleInterval);
      return;
    }
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    const size = 6 + Math.random() * 16;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 90}%`;
    bubble.style.setProperty('--time', `${3 + Math.random() * 4}s`);
    bubble.style.setProperty('--drift', `${-50 + Math.random() * 100}px`);
    
    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 7000);
  }, 400);

  return bubbleInterval;
};

// Create falling leaves inside a container (Biosphere element)
window.createLeafFall = function(container, active = true) {
  if (!active) return;
  const leafInterval = setInterval(() => {
    if (!container.isConnected) {
      clearInterval(leafInterval);
      return;
    }
    const leaf = document.createElement('div');
    leaf.className = 'leaf-particle';
    const size = 8 + Math.random() * 12;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size * 0.7}px`;
    leaf.style.left = `${Math.random() * 95}%`;
    leaf.style.setProperty('--time', `${4 + Math.random() * 4}s`);
    leaf.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
    
    // Vary colors of leaves
    const leafColors = ['#55a630', '#80b918', '#2d6a4f', '#ffb703', '#d00000'];
    leaf.style.backgroundColor = leafColors[Math.floor(Math.random() * leafColors.length)];

    container.appendChild(leaf);
    setTimeout(() => leaf.remove(), 8000);
  }, 650);

  return leafInterval;
};

// Create wind streaks inside a container (Atmosphere element)
window.createWindStreaks = function(container, active = true) {
  if (!active) return;
  const windInterval = setInterval(() => {
    if (!container.isConnected) {
      clearInterval(windInterval);
      return;
    }
    const wind = document.createElement('div');
    wind.className = 'wind-particle';
    wind.style.top = `${10 + Math.random() * 80}%`;
    wind.style.setProperty('--time', `${2.5 + Math.random() * 2}s`);
    wind.style.setProperty('--drift', `${-60 + Math.random() * 120}px`);
    
    container.appendChild(wind);
    setTimeout(() => wind.remove(), 4500);
  }, 500);

  return windInterval;
};
