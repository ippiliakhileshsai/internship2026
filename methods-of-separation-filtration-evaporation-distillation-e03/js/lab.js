/* =========================================================
   lab.js – Virtual Science Lab: Drag & Drop Experiments
   ========================================================= */

// ══════════════════════════════════════════════════════════
//  FILTRATION LAB
// ══════════════════════════════════════════════════════════
class FiltrationLab {
  constructor() {
    this.placed = { funnel: false, filterPaper: false, dirtyWater: false, beaker: false };
    this.currentStep = 0;
    this.steps = ['Place Funnel', 'Add Filter Paper', 'Pour Dirty Water', 'Place Beaker', 'Start!'];
    this.animInstance = null;
    this.init();
  }

  init() {
    // Setup drag sources
    document.querySelectorAll('#filt-tray .material-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', item.dataset.material);
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      
      // Click fallback for easier mobile use / testing
      item.addEventListener('click', () => {
        const mat = item.dataset.material;
        const zone = document.querySelector(`#filt-stage .drop-zone[data-accepts="${mat}"]`);
        if (zone) this.placeMaterial(mat, zone);
      });
    });

    // Setup drop zone
    const stage = document.getElementById('filt-stage');
    if (!stage) return;
    stage.addEventListener('dragover', e => { e.preventDefault(); stage.classList.add('over'); });
    stage.addEventListener('dragleave', () => stage.classList.remove('over'));
    stage.addEventListener('drop', e => {
      e.preventDefault();
      stage.classList.remove('over');
      const mat = e.dataTransfer.getData('text/plain');
      this.placeMaterial(mat);
    });

    // Individual drop zones
    document.querySelectorAll('#filt-stage .drop-zone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('over');
        const mat = e.dataTransfer.getData('text/plain');
        if (zone.dataset.accepts === mat) {
          this.placeMaterial(mat, zone);
        }
      });
    });

    // Start button
    const startBtn = document.getElementById('filt-start');
    if (startBtn) startBtn.addEventListener('click', () => this.startExperiment());

    const resetBtn = document.getElementById('filt-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());

    this.updateStepGuide();
  }

  placeMaterial(mat, zone) {
    if (this.placed[mat]) return;
    this.placed[mat] = true;

    // Mark source as used
    const src = document.querySelector(`#filt-tray [data-material="${mat}"]`);
    if (src) src.classList.add('used');

    // Mark drop zone filled
    if (zone) {
      zone.classList.add('filled');
      zone.innerHTML = `✅ ${zone.dataset.label || mat}`;
    }

    // Update step
    const order = ['funnel', 'filterPaper', 'dirtyWater', 'beaker'];
    const idx = order.indexOf(mat);
    if (idx >= 0) this.currentStep = Math.max(this.currentStep, idx + 1);
    this.updateStepGuide();

    // Check if all placed
    if (Object.values(this.placed).every(v => v)) {
      document.getElementById('filt-start').disabled = false;
      document.getElementById('filt-start').classList.remove('btn-outline');
      document.getElementById('filt-start').classList.add('btn-teal');
    }
  }

  updateStepGuide() {
    const pills = document.querySelectorAll('#filt-steps .step-pill');
    pills.forEach((pill, i) => {
      pill.classList.remove('active-step', 'done-step');
      if (i < this.currentStep) pill.classList.add('done-step');
      else if (i === this.currentStep) pill.classList.add('active-step');
    });
  }

  startExperiment() {
    if (!Object.values(this.placed).every(v => v)) {
      this.showHint('Place all materials first!');
      return;
    }
    // Replace stage with animation canvas
    const stageCanvas = document.getElementById('filt-canvas');
    if (stageCanvas && !this.animInstance) {
      this.animInstance = new FiltrationAnimation('filt-canvas');
    }
    if (this.animInstance) {
      document.getElementById('filt-drop-zones').style.display = 'none';
      stageCanvas.style.display = 'block';
      setTimeout(() => {
        this.animInstance.start();
        this.currentStep = 4;
        this.updateStepGuide();
        setTimeout(() => this.complete(), 14000);
      }, 400);
    }
  }

  complete() {
    const overlay = document.getElementById('filt-success');
    if (overlay) overlay.classList.add('show');
    setProgress('lab_filtration');
    checkLabComplete();
  }

  showHint(msg) {
    const h = document.getElementById('filt-hint');
    if (h) { h.textContent = '💡 ' + msg; h.style.opacity = 1; setTimeout(() => h.style.opacity = 0, 2500); }
  }

  reset() {
    Object.keys(this.placed).forEach(k => this.placed[k] = false);
    this.currentStep = 0;
    document.querySelectorAll('#filt-tray .material-item').forEach(i => i.classList.remove('used'));
    document.querySelectorAll('#filt-stage .drop-zone').forEach(z => {
      z.classList.remove('filled');
      z.innerHTML = z.dataset.empty || '🔲 Drop here';
    });
    document.getElementById('filt-start').disabled = true;
    document.getElementById('filt-start').classList.add('btn-outline');
    document.getElementById('filt-start').classList.remove('btn-teal');
    document.getElementById('filt-drop-zones').style.display = 'grid';
    const canvas = document.getElementById('filt-canvas');
    if (canvas) canvas.style.display = 'none';
    const overlay = document.getElementById('filt-success');
    if (overlay) overlay.classList.remove('show');
    if (this.animInstance) { this.animInstance.reset(); this.animInstance = null; }
    this.updateStepGuide();
  }
}

// ══════════════════════════════════════════════════════════
//  EVAPORATION LAB
// ══════════════════════════════════════════════════════════
class EvaporationLab {
  constructor() {
    this.placed = { saltWater: false, dish: false, heater: false };
    this.currentStep = 0;
    this.animInstance = null;
    this.init();
  }

  init() {
    document.querySelectorAll('#evap-tray .material-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', item.dataset.material);
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      
      // Click fallback for easier mobile use / testing
      item.addEventListener('click', () => {
        const mat = item.dataset.material;
        const zone = document.querySelector(`#evap-stage .drop-zone[data-accepts="${mat}"]`);
        if (zone) this.placeMaterial(mat, zone);
      });
    });

    document.querySelectorAll('#evap-stage .drop-zone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('over');
        const mat = e.dataTransfer.getData('text/plain');
        if (zone.dataset.accepts === mat) this.placeMaterial(mat, zone);
      });
    });

    const startBtn = document.getElementById('evap-start');
    if (startBtn) startBtn.addEventListener('click', () => this.startExperiment());
    const resetBtn = document.getElementById('evap-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
    this.updateStepGuide();
  }

  placeMaterial(mat, zone) {
    if (this.placed[mat]) return;
    this.placed[mat] = true;
    const src = document.querySelector(`#evap-tray [data-material="${mat}"]`);
    if (src) src.classList.add('used');
    if (zone) { zone.classList.add('filled'); zone.innerHTML = `✅ ${zone.dataset.label}`; }
    const order = ['dish', 'saltWater', 'heater'];
    const idx = order.indexOf(mat);
    if (idx >= 0) this.currentStep = Math.max(this.currentStep, idx + 1);
    this.updateStepGuide();
    if (Object.values(this.placed).every(v => v)) {
      document.getElementById('evap-start').disabled = false;
      document.getElementById('evap-start').classList.add('btn-teal');
    }
  }

  updateStepGuide() {
    const pills = document.querySelectorAll('#evap-steps .step-pill');
    pills.forEach((pill, i) => {
      pill.classList.remove('active-step', 'done-step');
      if (i < this.currentStep) pill.classList.add('done-step');
      else if (i === this.currentStep) pill.classList.add('active-step');
    });
  }

  startExperiment() {
    if (!Object.values(this.placed).every(v => v)) return;
    document.getElementById('evap-drop-zones').style.display = 'none';
    const canvas = document.getElementById('evap-canvas');
    if (canvas) canvas.style.display = 'block';
    if (!this.animInstance) this.animInstance = new EvaporationAnimation('evap-canvas');
    setTimeout(() => {
      this.animInstance.start();
      this.currentStep = 3;
      this.updateStepGuide();
      setTimeout(() => this.complete(), 18000);
    }, 300);
  }

  complete() {
    const overlay = document.getElementById('evap-success');
    if (overlay) overlay.classList.add('show');
    setProgress('lab_evaporation');
    checkLabComplete();
  }

  reset() {
    Object.keys(this.placed).forEach(k => this.placed[k] = false);
    this.currentStep = 0;
    document.querySelectorAll('#evap-tray .material-item').forEach(i => i.classList.remove('used'));
    document.querySelectorAll('#evap-stage .drop-zone').forEach(z => {
      z.classList.remove('filled');
      z.innerHTML = z.dataset.empty || '🔲 Drop here';
    });
    document.getElementById('evap-start').disabled = true;
    document.getElementById('evap-start').classList.remove('btn-teal');
    document.getElementById('evap-drop-zones').style.display = 'grid';
    const canvas = document.getElementById('evap-canvas');
    if (canvas) canvas.style.display = 'none';
    const overlay = document.getElementById('evap-success');
    if (overlay) overlay.classList.remove('show');
    if (this.animInstance) { this.animInstance.reset(); this.animInstance = null; }
    this.updateStepGuide();
  }
}

// ══════════════════════════════════════════════════════════
//  DISTILLATION LAB
// ══════════════════════════════════════════════════════════
class DistillationLab {
  constructor() {
    this.placed = { distFlask: false, condenser: false, colFlask: false };
    this.currentStep = 0;
    this.animInstance = null;
    this.init();
  }

  init() {
    document.querySelectorAll('#dist-tray .material-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', item.dataset.material);
        item.classList.add('dragging');
      });
      item.addEventListener('dragend', () => item.classList.remove('dragging'));
      
      // Click fallback for easier mobile use / testing
      item.addEventListener('click', () => {
        const mat = item.dataset.material;
        const zone = document.querySelector(`#dist-stage .drop-zone[data-accepts="${mat}"]`);
        if (zone) this.placeMaterial(mat, zone);
      });
    });

    document.querySelectorAll('#dist-stage .drop-zone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('over');
        const mat = e.dataTransfer.getData('text/plain');
        if (zone.dataset.accepts === mat) this.placeMaterial(mat, zone);
      });
    });

    const startBtn = document.getElementById('dist-start');
    if (startBtn) startBtn.addEventListener('click', () => this.startExperiment());
    const resetBtn = document.getElementById('dist-reset');
    if (resetBtn) resetBtn.addEventListener('click', () => this.reset());
    this.updateStepGuide();
  }

  placeMaterial(mat, zone) {
    if (this.placed[mat]) return;
    this.placed[mat] = true;
    const src = document.querySelector(`#dist-tray [data-material="${mat}"]`);
    if (src) src.classList.add('used');
    if (zone) { zone.classList.add('filled'); zone.innerHTML = `✅ ${zone.dataset.label}`; }
    const order = ['distFlask', 'condenser', 'colFlask'];
    const idx = order.indexOf(mat);
    if (idx >= 0) this.currentStep = Math.max(this.currentStep, idx + 1);
    this.updateStepGuide();
    if (Object.values(this.placed).every(v => v)) {
      document.getElementById('dist-start').disabled = false;
      document.getElementById('dist-start').classList.add('btn-teal');
    }
  }

  updateStepGuide() {
    const pills = document.querySelectorAll('#dist-steps .step-pill');
    pills.forEach((pill, i) => {
      pill.classList.remove('active-step', 'done-step');
      if (i < this.currentStep) pill.classList.add('done-step');
      else if (i === this.currentStep) pill.classList.add('active-step');
    });
  }

  startExperiment() {
    if (!Object.values(this.placed).every(v => v)) return;
    document.getElementById('dist-drop-zones').style.display = 'none';
    const canvas = document.getElementById('dist-canvas');
    if (canvas) canvas.style.display = 'block';
    if (!this.animInstance) this.animInstance = new DistillationAnimation('dist-canvas');
    setTimeout(() => {
      this.animInstance.start();
      this.currentStep = 3;
      this.updateStepGuide();
      setTimeout(() => this.complete(), 20000);
    }, 300);
  }

  complete() {
    const overlay = document.getElementById('dist-success');
    if (overlay) overlay.classList.add('show');
    setProgress('lab_distillation');
    checkLabComplete();
  }

  reset() {
    Object.keys(this.placed).forEach(k => this.placed[k] = false);
    this.currentStep = 0;
    document.querySelectorAll('#dist-tray .material-item').forEach(i => i.classList.remove('used'));
    document.querySelectorAll('#dist-stage .drop-zone').forEach(z => {
      z.classList.remove('filled');
      z.innerHTML = z.dataset.empty || '🔲 Drop here';
    });
    document.getElementById('dist-start').disabled = true;
    document.getElementById('dist-start').classList.remove('btn-teal');
    document.getElementById('dist-drop-zones').style.display = 'grid';
    const canvas = document.getElementById('dist-canvas');
    if (canvas) canvas.style.display = 'none';
    const overlay = document.getElementById('dist-success');
    if (overlay) overlay.classList.remove('show');
    if (this.animInstance) { this.animInstance.reset(); this.animInstance = null; }
    this.updateStepGuide();
  }
}

// ── Lab Progress Helpers ─────────────────────────────────
function setProgress(key) {
  localStorage.setItem('progress_' + key, 'true');
}

function checkLabComplete() {
  const f = localStorage.getItem('progress_lab_filtration') === 'true';
  const e = localStorage.getItem('progress_lab_evaporation') === 'true';
  const d = localStorage.getItem('progress_lab_distillation') === 'true';
  if (f && e && d) {
    localStorage.setItem('progress_lab', 'true');
    localStorage.setItem('badge_lab', 'true');
    // Update progress circles
    updateLabProgressCircles();
  }
  updateLabProgressCircles();
}

function updateLabProgressCircles() {
  const map = {
    'lab-prog-filt': 'progress_lab_filtration',
    'lab-prog-evap': 'progress_lab_evaporation',
    'lab-prog-dist': 'progress_lab_distillation'
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && localStorage.getItem(key) === 'true') {
      el.closest('.lab-progress-item').classList.add('done');
    }
  });
}

// ── Tab Switching ────────────────────────────────────────
function initLabTabs() {
  const tabs = document.querySelectorAll('.lab-tab');
  const panels = document.querySelectorAll('.lab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// ── Init ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLabTabs();
  updateLabProgressCircles();
  new FiltrationLab();
  new EvaporationLab();
  new DistillationLab();
});
