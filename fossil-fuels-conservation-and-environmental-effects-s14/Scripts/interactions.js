window.InteractionsManager = {
  init() {
    this.wireFormation();
    this.wireBurning();
    this.wireClimate();
  },

  wireFormation() {
    const slider = document.getElementById('time-slider');
    const canvas = document.getElementById('formation-canvas');
    const ctx = canvas.getContext('2d');
    
    if (window.GraphicsEngine) {
      window.GraphicsEngine.spawnFormationParticles(canvas);
    }

    slider.addEventListener('input', () => {
      const t = parseInt(slider.value);
      if (window.GraphicsEngine) {
        window.GraphicsEngine.drawFormation(canvas, ctx, t);
      }
      
      const ERAS = ["250M Yrs Ago", "200M Yrs Ago", "150M Yrs Ago", "100M Yrs Ago", "50M Yrs Ago", "10M Yrs Ago", "Today"];
      const idx = Math.min(6, Math.floor(t / 14.3));
      document.getElementById('time-era').textContent = ERAS[idx];
      document.getElementById('formation-fact-text').textContent = `Simulation Stage Processing: Value ${t}%`;
    });
  },

  wireBurning() {
    const SOURCES = {
      coal:  { co2: 85, soot: 70, energy: 80 },
      car:   { co2: 50, soot: 45, energy: 50 },
      solar: { co2: 0,  soot: 0,  energy: 60 },
      wind:  { co2: 0,  soot: 0,  energy: 55 }
    };

    const updateBars = () => {
      let co2 = 0, soot = 0, energy = 0;
      if (window.State.coal) { co2 += SOURCES.coal.co2; soot += SOURCES.coal.soot; energy += SOURCES.coal.energy; }
      if (window.State.car)  { co2 += SOURCES.car.co2;  soot += SOURCES.car.soot;  energy += SOURCES.car.energy; }
      if (window.State.solar){ energy += SOURCES.solar.energy; }
      if (window.State.wind) { energy += SOURCES.wind.energy; }

      document.getElementById('bar-co2').style.width = Math.min(co2, 100) + '%';
      document.getElementById('bar-soot').style.width = Math.min(soot, 100) + '%';
      document.getElementById('bar-energy').style.width = Math.min(energy, 100) + '%';
      
      document.getElementById('val-co2').textContent = co2;
      document.getElementById('val-soot').textContent = soot;
      document.getElementById('val-energy').textContent = energy;

      window.State.co2 = Math.max(280, Math.min(850, window.State.co2 + (co2 / 100) * 0.4));
      window.State.earthHealth = Math.max(0, Math.min(100, 100 - (window.State.co2 - 280) / 5.7));
      
      if (window.UiManager) window.UiManager.updateGlobalUI();
      
      if (window.State.thermoDragged) {
        document.getElementById('temp-val').textContent = (25 + (co2 / 130) * 15).toFixed(1) + '°C';
      }
    };

    const setupToggle = (id, key) => {
      const el = document.getElementById(id);
      el.addEventListener('change', () => {
        window.State[key] = el.checked;
        document.getElementById('src-' + key).classList.toggle('on', el.checked);
        updateBars();
      });
    };

    setupToggle('toggle-coal', 'coal');
    setupToggle('toggle-car', 'car');
    setupToggle('toggle-solar', 'solar');
    setupToggle('toggle-wind', 'wind');

    const thermo = document.getElementById('thermometer-tool');
    const wrap = document.getElementById('burning-scene-wrap');
    
    thermo.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', 'thermo'));
    wrap.addEventListener('dragover', e => e.preventDefault());
    wrap.addEventListener('drop', () => {
      window.State.thermoDragged = true;
      document.getElementById('temp-readout').style.display = 'block';
      document.getElementById('drag-thermo-hint').style.display = 'none';
      updateBars();
    });
  },

  wireClimate() {
    document.getElementById('co2-slider').addEventListener('input', (e) => { window.State.co2Rate = parseInt(e.target.value); });
    document.getElementById('forest-slider').addEventListener('input', (e) => { window.State.forestCover = parseInt(e.target.value); });
  }
};