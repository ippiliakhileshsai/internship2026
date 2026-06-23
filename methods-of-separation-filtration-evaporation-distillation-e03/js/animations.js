/* =========================================================
   animations.js – Canvas/CSS Animations for Topic Demos
   Filtration | Evaporation | Distillation
   ========================================================= */

// ══════════════════════════════════════════════════════════
//  FILTRATION ANIMATION
// ══════════════════════════════════════════════════════════
class FiltrationAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.W = this.canvas.width  = Math.min(480, this.canvas.parentElement.clientWidth - 20);
    this.H = this.canvas.height = 360;
    this.running = false;
    this.frame   = 0;
    this.drops   = [];
    this.cleanDrops = [];
    this.filterClogged = 0;   // 0..1 how much residue
    this.phase   = 0;         // 0=idle 1=pouring 2=filtering 3=done
    this.dirtyLevel = 1.0;    // liquid level in top beaker
    this.cleanLevel = 0.0;    // liquid level in bottom beaker
    this.animId  = null;
    this.draw();
  }

  /** Dirty particle specs */
  makeDrop(x, y, clean = false) {
    return {
      x, y,
      vy: 1.5 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.8,
      r: clean ? 3 + Math.random() * 2 : 4 + Math.random() * 4,
      alpha: 0.8 + Math.random() * 0.2,
      clean
    };
  }

  draw() {
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);

    // ── Background gradient ──
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0828');
    bg.addColorStop(1, '#1a1550');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Layout constants
    const cx = W / 2;
    const topBeakerX = cx - 50, topBeakerY = 20, topBW = 100, topBH = 120;
    const funnelTopY = topBeakerY + topBH + 10;
    const funnelBotY = funnelTopY + 100;
    const funnelNeckY = funnelBotY + 30;
    const botBeakerX = cx - 55, botBeakerY = funnelNeckY + 20, botBW = 110, botBH = 100;

    // ── Top Beaker (dirty water) ──
    this.drawBeaker(ctx, topBeakerX, topBeakerY, topBW, topBH, '#4A90D9', this.dirtyLevel, true);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 12px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Dirty Water', cx, topBeakerY - 6);

    // ── Funnel ──
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - 60, funnelTopY);
    ctx.lineTo(cx + 60, funnelTopY);
    ctx.lineTo(cx + 8, funnelBotY);
    ctx.lineTo(cx + 8, funnelNeckY);
    ctx.lineTo(cx - 8, funnelNeckY);
    ctx.lineTo(cx - 8, funnelBotY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(180,200,255,0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(180,200,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // ── Filter Paper ──
    const fpY = funnelTopY + 20;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - 55, fpY);
    ctx.lineTo(cx + 55, fpY);
    ctx.lineTo(cx + 7, fpY + 75);
    ctx.lineTo(cx - 7, fpY + 75);
    ctx.closePath();
    ctx.fillStyle = `rgba(255,245,220,${0.25 + this.filterClogged * 0.25})`;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,245,220,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Filter paper label
    ctx.fillStyle = 'rgba(255,245,200,0.85)';
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Filter Paper', cx + 62, fpY + 30);

    // ── Residue on filter ──
    if (this.filterClogged > 0.1) {
      ctx.save();
      ctx.globalAlpha = this.filterClogged * 0.9;
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        ctx.arc(
          cx - 35 + i * 5, fpY + 20 + Math.sin(i) * 10,
          3 + Math.random() * 1, 0, Math.PI * 2
        );
        ctx.fillStyle = `hsl(${28 + i * 6}, 60%, 40%)`;
        ctx.fill();
      }
      ctx.restore();
    }

    // ── Dirty drops ──
    this.drops.forEach(d => {
      ctx.save();
      ctx.globalAlpha = d.alpha;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = d.clean ? '#a0d8ef' : `hsl(${30}, 55%, 35%)`;
      ctx.fill();
      ctx.restore();
    });

    // ── Clean drops ──
    this.cleanDrops.forEach(d => {
      ctx.save();
      ctx.globalAlpha = d.alpha * 0.85;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = '#7BC8F6';
      ctx.fill();
      ctx.restore();
    });

    // ── Bottom Beaker (clean water) ──
    this.drawBeaker(ctx, botBeakerX, botBeakerY, botBW, botBH, '#7BC8F6', this.cleanLevel, false);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px Nunito, sans-serif';
    ctx.fillText('Clean Filtrate', cx, botBeakerY + botBH + 18);

    // ── Done overlay ──
    if (this.phase === 3) {
      ctx.fillStyle = 'rgba(0,230,118,0.85)';
      ctx.font = 'bold 22px Fredoka One, cursive';
      ctx.textAlign = 'center';
      ctx.fillText('✅ Filtration Complete!', cx, H - 18);
    }
  }

  drawBeaker(ctx, x, y, w, h, color, level, dirty) {
    ctx.save();
    // Beaker outline
    ctx.beginPath();
    ctx.moveTo(x + 10, y);
    ctx.lineTo(x, y + 10);
    ctx.lineTo(x, y + h);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + w, y + 10);
    ctx.lineTo(x + w - 10, y);
    ctx.strokeStyle = 'rgba(200,220,255,0.6)';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.closePath();

    // Liquid
    const liquidH = (h - 8) * level;
    const liquidY = y + h - liquidH;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + 2, liquidY, w - 4, liquidH - 4);
    ctx.clip();
    const grad = ctx.createLinearGradient(x, liquidY, x, liquidY + liquidH);
    if (dirty) {
      grad.addColorStop(0, 'rgba(90,130,80,0.6)');
      grad.addColorStop(1, 'rgba(60,100,50,0.85)');
    } else {
      grad.addColorStop(0, 'rgba(100,200,240,0.5)');
      grad.addColorStop(1, 'rgba(60,160,220,0.8)');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(x + 2, liquidY, w - 4, liquidH - 4);
    ctx.restore();

    ctx.restore();
  }

  update() {
    if (!this.running) return;
    this.frame++;
    const W = this.W;

    // Phase 1: pour dirty water → drops fall into funnel
    if (this.phase === 1) {
      if (this.frame % 4 === 0 && this.dirtyLevel > 0.05) {
        this.drops.push(this.makeDrop(W / 2, 140, false));
        this.dirtyLevel = Math.max(0, this.dirtyLevel - 0.008);
      }
    }

    // Update dirty drops
    const funnelBotY = 20 + 120 + 10 + 100;
    this.drops = this.drops.filter(d => {
      d.y += d.vy;
      d.x += d.vx;
      // Hit filter → become residue
      if (d.y > 165 && d.y < 210 && !d.clean) {
        this.filterClogged = Math.min(1, this.filterClogged + 0.04);
        // Spawn clean drop through
        if (Math.random() < 0.55) {
          this.cleanDrops.push(this.makeDrop(W / 2 + (Math.random() - 0.5) * 6, 215, true));
        }
        return false; // remove dirty drop
      }
      return d.y < 400;
    });

    // Update clean drops
    this.cleanDrops = this.cleanDrops.filter(d => {
      d.y += d.vy * 1.1;
      const botBeakerY = 285;
      if (d.y > botBeakerY + 10) {
        this.cleanLevel = Math.min(0.9, this.cleanLevel + 0.004);
        return false;
      }
      return true;
    });

    // Phase done check
    if (this.phase === 1 && this.dirtyLevel <= 0.05 && this.drops.length === 0 && this.cleanDrops.length === 0) {
      this.phase = 3;
      this.running = false;
    }
  }

  start() {
    if (this.phase === 3) this.reset();
    this.phase = 1;
    this.running = true;
    this._loop();
  }

  pause() {
    this.running = false;
    cancelAnimationFrame(this.animId);
  }

  replay() { this.reset(); this.start(); }

  reset() {
    this.running = false;
    cancelAnimationFrame(this.animId);
    this.frame = 0;
    this.drops = [];
    this.cleanDrops = [];
    this.filterClogged = 0;
    this.phase = 0;
    this.dirtyLevel = 1.0;
    this.cleanLevel = 0.0;
    this.draw();
  }

  _loop() {
    this.update();
    this.draw();
    if (this.running) this.animId = requestAnimationFrame(() => this._loop());
  }
}

// ══════════════════════════════════════════════════════════
//  EVAPORATION ANIMATION
// ══════════════════════════════════════════════════════════
class EvaporationAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.W = this.canvas.width  = Math.min(480, this.canvas.parentElement.clientWidth - 20);
    this.H = this.canvas.height = 360;
    this.running = false;
    this.frame   = 0;
    this.vapors  = [];
    this.crystals = [];
    this.waterLevel = 0.75;
    this.heatIntensity = 0;
    this.phase = 0; // 0=idle 1=heating 2=evaporating 3=done
    this.animId = null;
    this.draw();
  }

  makeVapor(x, y) {
    return {
      x, y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(1 + Math.random() * 2),
      life: 1.0,
      r: 8 + Math.random() * 14,
      decay: 0.008 + Math.random() * 0.008
    };
  }

  makeCrystal(x, y) {
    return {
      x, y,
      size: 4 + Math.random() * 8,
      hue: 40 + Math.random() * 30
    };
  }

  draw() {
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0828');
    bg.addColorStop(1, '#1a1550');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2;
    const dishW = 200, dishH = 55;
    const dishX = cx - dishW / 2;
    const dishY = H - 150;

    // ── Tripod ──
    ctx.save();
    ctx.strokeStyle = 'rgba(180,180,200,0.5)';
    ctx.lineWidth = 4;
    // 3 legs
    const legBaseY = dishY + dishH + 50;
    ctx.beginPath(); ctx.moveTo(cx, dishY + dishH + 4); ctx.lineTo(cx - 55, legBaseY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, dishY + dishH + 4); ctx.lineTo(cx + 55, legBaseY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, dishY + dishH + 4); ctx.lineTo(cx, legBaseY);       ctx.stroke();
    ctx.restore();

    // ── Flame / Burner ──
    if (this.heatIntensity > 0) {
      this.drawFlame(ctx, cx, legBaseY - 12, this.heatIntensity);
    } else {
      // Bunsen burner stub
      ctx.save();
      ctx.fillStyle = 'rgba(150,150,170,0.6)';
      ctx.fillRect(cx - 8, legBaseY - 18, 16, 18);
      ctx.restore();
    }

    // ── Evaporation Dish ──
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, dishY + dishH, dishW / 2, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(160,180,220,0.15)';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(dishX, dishY);
    ctx.quadraticCurveTo(cx, dishY + dishH * 0.6, dishX + dishW, dishY);
    ctx.strokeStyle = 'rgba(180,200,255,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // ── Salt Water ──
    if (this.waterLevel > 0.02) {
      ctx.save();
      ctx.beginPath();
      const wH = dishH * 0.5 * this.waterLevel;
      ctx.ellipse(cx, dishY + dishH - wH * 0.3, dishW * 0.47 * this.waterLevel, wH * 0.4, 0, 0, Math.PI * 2);
      const wg = ctx.createRadialGradient(cx, dishY + dishH - wH, 2, cx, dishY + dishH, dishW / 2);
      wg.addColorStop(0, 'rgba(120,190,240,0.9)');
      wg.addColorStop(1, 'rgba(60,140,200,0.7)');
      ctx.fillStyle = wg;
      ctx.fill();
      ctx.restore();
    }

    // ── Salt Crystals ──
    this.crystals.forEach(c => {
      ctx.save();
      ctx.fillStyle = `hsla(${c.hue}, 40%, 85%, 0.9)`;
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.rect(c.x - c.size / 2, c.y - c.size / 2, c.size, c.size);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    // ── Vapor particles ──
    this.vapors.forEach(v => {
      ctx.save();
      ctx.globalAlpha = v.life * 0.45;
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,220,255,0.8)';
      ctx.fill();
      ctx.restore();
    });

    // ── Labels ──
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 12px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Evaporation Dish', cx, dishY - 12);

    if (this.waterLevel > 0.15) {
      ctx.fillStyle = 'rgba(100,200,255,0.8)';
      ctx.fillText('Salt Water', cx, dishY + dishH - 10);
    }

    if (this.crystals.length > 4) {
      ctx.fillStyle = 'rgba(255,245,200,0.85)';
      ctx.fillText('Salt Crystals', cx, dishY + dishH + 20);
    }

    if (this.phase === 3) {
      ctx.fillStyle = 'rgba(0,230,118,0.9)';
      ctx.font = 'bold 22px Fredoka One, cursive';
      ctx.fillText('✅ Evaporation Complete!', cx, 28);
    }

    if (this.heatIntensity > 0) {
      ctx.fillStyle = 'rgba(255,160,30,0.8)';
      ctx.font = 'bold 11px Nunito, sans-serif';
      ctx.fillText('HEATING ↑', cx, legBaseY + 30);
    }
  }

  drawFlame(ctx, x, y, intensity) {
    ctx.save();
    // Outer flame
    ctx.beginPath();
    ctx.moveTo(x - 12 * intensity, y);
    ctx.quadraticCurveTo(x - 8 * intensity, y - 30 * intensity, x, y - 48 * intensity);
    ctx.quadraticCurveTo(x + 8 * intensity, y - 30 * intensity, x + 12 * intensity, y);
    ctx.closePath();
    const fg = ctx.createLinearGradient(x, y, x, y - 50 * intensity);
    fg.addColorStop(0, 'rgba(255,100,0,0.9)');
    fg.addColorStop(0.5, 'rgba(255,200,0,0.8)');
    fg.addColorStop(1, 'rgba(255,255,100,0.1)');
    ctx.fillStyle = fg;
    ctx.fill();

    // Inner flame
    ctx.beginPath();
    ctx.moveTo(x - 6 * intensity, y - 5);
    ctx.quadraticCurveTo(x, y - 28 * intensity, x, y - 38 * intensity);
    ctx.quadraticCurveTo(x, y - 28 * intensity, x + 6 * intensity, y - 5);
    ctx.closePath();
    const fi = ctx.createLinearGradient(x, y - 5, x, y - 40 * intensity);
    fi.addColorStop(0, 'rgba(0,120,255,0.7)');
    fi.addColorStop(1, 'rgba(100,200,255,0.1)');
    ctx.fillStyle = fi;
    ctx.fill();
    ctx.restore();
  }

  update() {
    if (!this.running) return;
    this.frame++;

    // Ramp up heat
    if (this.phase === 1) {
      this.heatIntensity = Math.min(1, this.heatIntensity + 0.02);
      if (this.heatIntensity >= 1) this.phase = 2;
    }

    if (this.phase === 2) {
      // Spawn vapors
      if (this.frame % 5 === 0 && this.waterLevel > 0.02) {
        const cx = this.W / 2;
        const dishY = this.H - 150;
        const dishH = 55;
        this.vapors.push(this.makeVapor(cx + (Math.random() - 0.5) * 120, dishY + dishH * 0.3));
        this.waterLevel = Math.max(0, this.waterLevel - 0.004);

        // Occasionally spawn crystal
        if (Math.random() < 0.08 && this.crystals.length < 20) {
          const cx2 = this.W / 2;
          this.crystals.push(this.makeCrystal(
            cx2 + (Math.random() - 0.5) * 150,
            this.H - 150 + 55 - 8 - Math.random() * 10
          ));
        }
      }

      if (this.waterLevel <= 0.02) {
        this.phase = 3;
        this.running = false;
        this.heatIntensity = 0;
      }
    }

    // Update vapors
    this.vapors = this.vapors.filter(v => {
      v.x += v.vx;
      v.y += v.vy;
      v.life -= v.decay;
      v.r += 0.4;
      return v.life > 0;
    });
  }

  start() {
    if (this.phase === 3) this.reset();
    this.phase = 1;
    this.running = true;
    this._loop();
  }
  pause() { this.running = false; cancelAnimationFrame(this.animId); }
  replay() { this.reset(); this.start(); }
  reset() {
    this.running = false;
    cancelAnimationFrame(this.animId);
    this.frame = 0;
    this.vapors = [];
    this.crystals = [];
    this.waterLevel = 0.75;
    this.heatIntensity = 0;
    this.phase = 0;
    this.draw();
  }
  _loop() {
    this.update();
    this.draw();
    if (this.running) this.animId = requestAnimationFrame(() => this._loop());
  }
}

// ══════════════════════════════════════════════════════════
//  DISTILLATION ANIMATION
// ══════════════════════════════════════════════════════════
class DistillationAnimation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.W = this.canvas.width  = Math.min(520, this.canvas.parentElement.clientWidth - 20);
    this.H = this.canvas.height = 380;
    this.running = false;
    this.frame = 0;
    this.vapors = [];
    this.condensateDrops = [];
    this.phase = 0;
    this.flaskLevel = 0.7;
    this.collectLevel = 0.0;
    this.heatVal = 0;
    this.animId = null;
    this.draw();
  }

  draw() {
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0828');
    bg.addColorStop(1, '#1a1550');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Layout
    const flaskCX = 110, flaskCY = 240, flaskR = 65;
    const neckX = flaskCX + flaskR * 0.55, neckY = flaskCY - flaskR * 0.85;
    const condX1 = neckX + 30, condY1 = neckY - 10;
    const condX2 = W - 90, condY2 = 200;
    const colFlaskCX = W - 70, colFlaskCY = 270, colFlaskR = 45;

    // ── Distillation Flask ──
    ctx.save();
    ctx.beginPath();
    ctx.arc(flaskCX, flaskCY, flaskR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(160,200,255,0.55)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Liquid in flask
    if (this.flaskLevel > 0.05) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(flaskCX, flaskCY, flaskR - 4, 0, Math.PI * 2);
      ctx.clip();
      const liqTop = flaskCY + flaskR - (flaskR * 2 - 8) * this.flaskLevel;
      ctx.fillRect(flaskCX - flaskR, liqTop, flaskR * 2, flaskR * 2);
      const lg = ctx.createLinearGradient(0, liqTop, 0, flaskCY + flaskR);
      lg.addColorStop(0, 'rgba(80,180,255,0.55)');
      lg.addColorStop(1, 'rgba(30,120,220,0.75)');
      ctx.fillStyle = lg;
      ctx.fillRect(flaskCX - flaskR, liqTop, flaskR * 2, flaskR * 2);
      ctx.restore();
    }

    // Flask neck
    ctx.beginPath();
    ctx.moveTo(flaskCX - 12, flaskCY - flaskR * 0.6);
    ctx.lineTo(flaskCX - 10, neckY);
    ctx.moveTo(flaskCX + 12, flaskCY - flaskR * 0.6);
    ctx.lineTo(neckX, neckY);
    ctx.strokeStyle = 'rgba(160,200,255,0.55)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Flame
    if (this.heatVal > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(flaskCX - 14 * this.heatVal, flaskCY + flaskR + 10);
      ctx.quadraticCurveTo(flaskCX, flaskCY + flaskR - 25 * this.heatVal, flaskCX + 14 * this.heatVal, flaskCY + flaskR + 10);
      ctx.closePath();
      const fg = ctx.createLinearGradient(flaskCX, flaskCY + flaskR + 10, flaskCX, flaskCY + flaskR - 30);
      fg.addColorStop(0, 'rgba(255,80,0,0.9)');
      fg.addColorStop(1, 'rgba(255,220,50,0.1)');
      ctx.fillStyle = fg;
      ctx.fill();
      ctx.restore();
    }

    // ── Condenser Tube ──
    const condGrad = ctx.createLinearGradient(condX1, condY1, condX2, condY2);
    condGrad.addColorStop(0, 'rgba(160,200,255,0.45)');
    condGrad.addColorStop(1, 'rgba(80,180,255,0.45)');
    ctx.save();
    ctx.lineWidth = 18;
    ctx.strokeStyle = condGrad;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(condX1, condY1);
    ctx.lineTo(condX2, condY2);
    ctx.stroke();
    // Cool water swirl marks
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(100,220,255,0.3)';
    for (let i = 0; i < 5; i++) {
      const t = i / 5;
      const xi = condX1 + (condX2 - condX1) * t;
      const yi = condY1 + (condY2 - condY1) * t;
      ctx.beginPath();
      ctx.arc(xi, yi, 6, 0, Math.PI);
      ctx.stroke();
    }
    ctx.restore();

    // ── Vapor particles in condenser ──
    this.vapors.forEach(v => {
      ctx.save();
      ctx.globalAlpha = v.life * 0.5;
      ctx.beginPath();
      ctx.arc(v.x, v.y, v.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,230,255,0.9)';
      ctx.fill();
      ctx.restore();
    });

    // ── Condensate Drops ──
    this.condensateDrops.forEach(d => {
      ctx.save();
      ctx.globalAlpha = d.alpha;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = '#a0d8ef';
      ctx.fill();
      ctx.restore();
    });

    // ── Collection Flask ──
    ctx.save();
    ctx.beginPath();
    ctx.arc(colFlaskCX, colFlaskCY, colFlaskR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(160,200,255,0.55)';
    ctx.lineWidth = 3;
    ctx.stroke();

    if (this.collectLevel > 0.01) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(colFlaskCX, colFlaskCY, colFlaskR - 4, 0, Math.PI * 2);
      ctx.clip();
      const cTop = colFlaskCY + colFlaskR - (colFlaskR * 2 - 8) * this.collectLevel;
      const cg = ctx.createLinearGradient(0, cTop, 0, colFlaskCY + colFlaskR);
      cg.addColorStop(0, 'rgba(100,220,255,0.6)');
      cg.addColorStop(1, 'rgba(50,160,230,0.85)');
      ctx.fillStyle = cg;
      ctx.fillRect(colFlaskCX - colFlaskR, cTop, colFlaskR * 2, colFlaskR * 2);
      ctx.restore();
    }
    ctx.restore();

    // ── Labels ──
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Distillation Flask', flaskCX, flaskCY + flaskR + 38);
    ctx.fillText('Condenser', (condX1 + condX2) / 2, (condY1 + condY2) / 2 - 14);
    ctx.fillText('Collection Flask', colFlaskCX, colFlaskCY + colFlaskR + 18);

    if (this.phase === 3) {
      ctx.fillStyle = 'rgba(0,230,118,0.9)';
      ctx.font = 'bold 20px Fredoka One, cursive';
      ctx.fillText('✅ Distillation Complete!', W / 2, H - 10);
    }

    // Cooling label
    if (this.heatVal > 0) {
      ctx.fillStyle = 'rgba(100,220,255,0.85)';
      ctx.font = 'bold 10px Nunito, sans-serif';
      ctx.fillText('Cool Water ↕', (condX1 + condX2) / 2, (condY1 + condY2) / 2 + 18);
    }
  }

  makeVapor() {
    const flaskCX = 110, flaskCY = 240, flaskR = 65;
    const neckX = flaskCX + flaskR * 0.55, neckY = flaskCY - flaskR * 0.85;
    const condX1 = neckX + 30, condY1 = neckY - 10;
    const condX2 = this.W - 90, condY2 = 200;
    const t = Math.random();
    return {
      x: condX1 + (condX2 - condX1) * t * 0.3,
      y: condY1 + (condY2 - condY1) * t * 0.3,
      vx: (condX2 - condX1) * 0.006,
      vy: (condY2 - condY1) * 0.006,
      r: 5 + Math.random() * 6,
      life: 0.8 + Math.random() * 0.2,
      decay: 0.006
    };
  }

  makeDrop() {
    const condX2 = this.W - 90, condY2 = 200;
    return {
      x: condX2 + (Math.random() - 0.5) * 10,
      y: condY2,
      vy: 2 + Math.random() * 2,
      r: 3 + Math.random() * 3,
      alpha: 0.85
    };
  }

  update() {
    if (!this.running) return;
    this.frame++;

    if (this.phase === 1) {
      this.heatVal = Math.min(1, this.heatVal + 0.018);
      if (this.heatVal >= 1) this.phase = 2;
    }

    if (this.phase === 2) {
      if (this.frame % 6 === 0 && this.flaskLevel > 0.05) {
        this.vapors.push(this.makeVapor());
        this.flaskLevel = Math.max(0, this.flaskLevel - 0.003);
      }
      if (this.frame % 18 === 0) {
        this.condensateDrops.push(this.makeDrop());
      }
      if (this.flaskLevel <= 0.05) {
        this.phase = 3;
        this.running = false;
        this.heatVal = 0;
      }
    }

    this.vapors = this.vapors.filter(v => {
      v.x += v.vx;
      v.y += v.vy;
      v.life -= v.decay;
      return v.life > 0;
    });

    const colFlaskCY = 270, colFlaskR = 45;
    this.condensateDrops = this.condensateDrops.filter(d => {
      d.y += d.vy;
      if (d.y > colFlaskCY - colFlaskR) {
        this.collectLevel = Math.min(0.85, this.collectLevel + 0.004);
        return false;
      }
      return true;
    });
  }

  start() {
    if (this.phase === 3) this.reset();
    this.phase = 1;
    this.running = true;
    this._loop();
  }
  pause() { this.running = false; cancelAnimationFrame(this.animId); }
  replay() { this.reset(); this.start(); }
  reset() {
    this.running = false;
    cancelAnimationFrame(this.animId);
    this.frame = 0;
    this.vapors = [];
    this.condensateDrops = [];
    this.phase = 0;
    this.flaskLevel = 0.7;
    this.collectLevel = 0;
    this.heatVal = 0;
    this.draw();
  }
  _loop() {
    this.update();
    this.draw();
    if (this.running) this.animId = requestAnimationFrame(() => this._loop());
  }
}

// ── Attach Controls ──────────────────────────────────────
function initDemoControls(anim, prefix) {
  const playBtn   = document.getElementById(`${prefix}-play`);
  const pauseBtn  = document.getElementById(`${prefix}-pause`);
  const replayBtn = document.getElementById(`${prefix}-replay`);
  if (playBtn)   playBtn.addEventListener('click',   () => anim.start());
  if (pauseBtn)  pauseBtn.addEventListener('click',  () => anim.pause());
  if (replayBtn) replayBtn.addEventListener('click', () => anim.replay());
}
