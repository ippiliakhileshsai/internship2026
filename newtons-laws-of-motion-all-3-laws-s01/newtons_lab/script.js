// Interactive visual feedback for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
  // Add click animation to buttons
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      btn.style.transform = 'scale(0.98)';
      setTimeout(() => { btn.style.transform = 'scale(1)'; }, 100);
    });
  });

  // Add subtle pulse to interactive cards
  document.querySelectorAll('.law-card, .game-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.animation = 'cardPulse 0.3s ease';
    });
  });
});

function smoothScroll(sel) {
  document.querySelector(sel).scrollIntoView({ behavior: 'smooth' });
}

function roundR(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function roundRect(ctx, x, y, w, h, r) {
  roundR(ctx, x, y, w, h, r);
  ctx.fill();
}
function switchSimTab(n) {
  [1, 2, 3].forEach(i => {
    document.getElementById('sPanel' + i).classList.remove('active');
    document.getElementById('stab' + i).className = 'sim-tab-btn';
  });
  document.getElementById('sPanel' + n).classList.add('active');
  document.getElementById('stab' + n).className = 'sim-tab-btn active-tab' + n;
  if (n === 1 && !SB1.init) initSB1();
  if (n === 2 && !SB2.init) initSB2();
  if (n === 3 && !SB3.init) initSB3();
}
let SB1 = { init: false, running: false, animId: null, ball: { x: 0, y: 0, vx: 0, r: 20 }, t: 0 };

function initSB1() {
  const c = document.getElementById('sbCanvas1');
  c.width = c.parentElement.clientWidth;
  SB1.init = true;
  SB1.running = false;
  SB1.t = 0;
  SB1.ball = { x: 60, y: c.height - 50, vx: 0, r: 20 };
  updateSB1();
  drawSB1Idle(c);
}

function updateSB1() {
  const mass = +document.getElementById('sb1Mass').value;
  const force = +document.getElementById('sb1Force').value;
  const fricLvl = +document.getElementById('sb1Fric').value;
  const fricNames = ['None (Space!)', 'Very Low', 'Low', 'Medium', 'High', 'Very High', 'Sand', 'Mud', 'Gravel', 'Concrete', 'Max'];
  document.getElementById('sb1MassVal').textContent = mass + ' kg';
  document.getElementById('sb1ForceVal').textContent = force + ' N';
  document.getElementById('sb1FricVal').textContent = fricNames[fricLvl] || 'Medium';
  const acc = (force / mass).toFixed(1);
  const initV = (force / mass * 0.5).toFixed(1);
  const fricForce = (fricLvl * mass * 0.05).toFixed(1);
  const dist = (force * force / (2 * mass * (fricLvl * 0.5 + 0.1))).toFixed(0);
  document.getElementById('sb1ReadV').textContent = initV + ' m/s';
  document.getElementById('sb1ReadA').textContent = acc + ' m/s²';
  document.getElementById('sb1ReadD').textContent = (Math.min(dist, 999)) + ' m';
  document.getElementById('sb1ReadF').textContent = fricForce + ' N';

  let obs = '';
  if (mass > 14) obs = '🏋️ <strong>Heavy ball!</strong> More mass means more inertia — harder to get moving!';
  else if (mass < 4) obs = '🪶 <strong>Light ball!</strong> Less mass = less inertia — gets moving fast!';
  else if (fricLvl >= 7) obs = '🏜️ <strong>Lots of friction!</strong> The ball will slow down very quickly.';
  else if (fricLvl === 0) obs = '🌌 <strong>No friction (space)!</strong> The ball would roll FOREVER — pure inertia!';
  else if (force > 140) obs = '💥 <strong>Massive force!</strong> The ball shoots off super fast!';
  else obs = '⚽ A <strong>' + mass + 'kg ball</strong> kicked with <strong>' + force + 'N</strong> — adjust and kick to see what happens!';
  document.getElementById('sb1Obs').innerHTML = obs;
}

function kickSB1() {
  if (!SB1.init) initSB1();
  const c = document.getElementById('sbCanvas1');
  const mass = +document.getElementById('sb1Mass').value;
  const force = +document.getElementById('sb1Force').value;
  const fricLvl = +document.getElementById('sb1Fric').value;
  cancelAnimationFrame(SB1.animId);
  SB1.ball = { x: 60, y: c.height - 50, vx: (force / mass) * 0.6, r: 18 + mass * 0.5, spin: 0 };
  SB1.friction = 0.005 + fricLvl * 0.006;
  SB1.running = true;
  SB1.t = 0;
  SB1.distTravelled = 0;
  SB1.startX = SB1.ball.x;
  animSB1(c);
}

function resetSB1() {
  const c = document.getElementById('sbCanvas1');
  cancelAnimationFrame(SB1.animId);
  SB1.running = false;
  SB1.ball = { x: 60, y: c.height - 50, vx: 0, r: 20 };
  drawSB1Idle(c);
}

function animSB1(c) {
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);

  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, '#ddeeff'); sky.addColorStop(1, '#eef8ff');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.65);

  const fricLvl = +document.getElementById('sb1Fric').value;
  const groundColors = [
    ['#0d1b2a', '#1a2b3a'], ['#5aaa30', '#7ec850'], ['#5aaa30', '#7ec850'],
    ['#7ec850', '#99c850'], ['#c8b86c', '#e0cc80'], ['#c8b86c', '#e0cc80'],
    ['#e0c870', '#f0d88a'], ['#8B7355', '#a08060'], ['#9B7355', '#b08060'],
    ['#888', '#aaa'], ['#555', '#777']
  ];
  const gc = groundColors[Math.min(fricLvl, groundColors.length - 1)];
  const gg = ctx.createLinearGradient(0, H * 0.65, 0, H);
  gg.addColorStop(0, gc[1]); gg.addColorStop(1, gc[0]);
  ctx.fillStyle = gg; ctx.fillRect(0, H * 0.65, W, H * 0.35);

  const surfLabels = [
    '🌌 Deep Space — NO FRICTION!', '🌿 Wet Grass', '🌿 Grass', '⛺ Dirt',
    '🏖️ Sand', '🏜️ Dry Sand', '🏜️ Heavy Sand', '🟫 Mud',
    '🪨 Gravel', '🏗️ Concrete', '⬛ Max Friction'
  ];
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  roundR(ctx, W / 2 - 100, H - 22, 200, 18, 6); ctx.fill();
  ctx.fillStyle = '#2d3a4a'; ctx.font = 'bold 10px Nunito'; ctx.textAlign = 'center';
  ctx.fillText(surfLabels[Math.min(fricLvl, surfLabels.length - 1)], W / 2, H - 8);

  SB1.t++;
  if (SB1.running) {
    SB1.ball.x += SB1.ball.vx;
    SB1.ball.vx = Math.max(0, SB1.ball.vx - SB1.friction);
    SB1.ball.spin += SB1.ball.vx * 0.05;
    SB1.distTravelled = Math.abs(SB1.ball.x - SB1.startX);
    document.getElementById('sb1ReadD').textContent = Math.round(SB1.distTravelled / 5) + ' m';
    document.getElementById('sb1ReadV').textContent = (SB1.ball.vx * 1.6).toFixed(1) + ' m/s';

    if (SB1.ball.vx === 0 && SB1.running) {
      SB1.running = false;
      if (fricLvl === 0) {
        document.getElementById('sb1Obs').innerHTML = '🌌 <strong>No friction!</strong> In space the ball rolls forever — pure inertia at work!';
      } else {
        document.getElementById('sb1Obs').innerHTML = '🛑 <strong>Ball stopped!</strong> Friction removed all kinetic energy. It rolled about <strong>' + Math.round(SB1.distTravelled / 5) + ' m</strong>.';
      }
    }
    if (SB1.ball.x > W + 60) {
      SB1.ball.x = W + 60; SB1.running = false;
      document.getElementById('sb1Obs').innerHTML = '💨 <strong>Ball rolled off the screen!</strong> With low friction and high force, it just kept going — inertia!';
    }
  }

  if (SB1.ball.x < W + 40) {
    const bx = SB1.ball.x, by = H * 0.65 - SB1.ball.r;
    ctx.beginPath(); ctx.ellipse(bx, H * 0.65 + 3, SB1.ball.r * 0.8, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fill();
    ctx.save(); ctx.translate(bx, by); ctx.rotate(SB1.ball.spin || 0);
    ctx.beginPath(); ctx.arc(0, 0, SB1.ball.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5; ctx.stroke();
    [[0, -SB1.ball.r * 0.55], [SB1.ball.r * 0.4, SB1.ball.r * 0.3], [-SB1.ball.r * 0.4, SB1.ball.r * 0.3]].forEach(([dx, dy]) => {
      ctx.beginPath(); ctx.arc(dx, dy, SB1.ball.r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#222'; ctx.fill();
    });
    ctx.restore();

    if (SB1.ball.vx > 0.3) {
      const alen = SB1.ball.vx * 8;
      ctx.strokeStyle = '#ff7043'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(bx + SB1.ball.r, by); ctx.lineTo(bx + SB1.ball.r + alen, by); ctx.stroke();
      ctx.fillStyle = '#ff7043';
      ctx.beginPath(); ctx.moveTo(bx + SB1.ball.r + alen, by - 5); ctx.lineTo(bx + SB1.ball.r + alen + 10, by); ctx.lineTo(bx + SB1.ball.r + alen, by + 5); ctx.fill();
      ctx.fillStyle = '#ff7043'; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
      ctx.fillText((SB1.ball.vx * 1.6).toFixed(1) + ' m/s', bx + SB1.ball.r + alen / 2 + 5, by - 14);
    }
    if (SB1.ball.vx === 0 && !SB1.running && SB1.t > 5) {
      ctx.fillStyle = 'rgba(255,80,0,0.85)'; ctx.font = 'bold 12px Nunito'; ctx.textAlign = 'center';
      ctx.fillText('🛑 Stopped!', bx, by - SB1.ball.r - 10);
    }
  }

  if (SB1.running || SB1.ball.vx > 0) SB1.animId = requestAnimationFrame(() => animSB1(c));
}

function drawSB1Idle(c) {
  if (!c) return;
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, '#ddeeff'); sky.addColorStop(1, '#eef8ff');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H * 0.65);
  const gg = ctx.createLinearGradient(0, H * 0.65, 0, H);
  gg.addColorStop(0, '#7ec850'); gg.addColorStop(1, '#5aaa30');
  ctx.fillStyle = gg; ctx.fillRect(0, H * 0.65, W, H * 0.35);
  const bx = 60, by = H * 0.65 - 20;
  ctx.beginPath(); ctx.arc(bx, by, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5; ctx.stroke();
  [[0, -11], [8, 6], [-8, 6], [11, -3], [-11, -3]].forEach(([dx, dy]) => {
    ctx.beginPath(); ctx.arc(bx + dx, by + dy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#222'; ctx.fill();
  });
  const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.004);
  ctx.strokeStyle = `rgba(255,112,67,${pulse})`; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(bx, by, 28, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = 'rgba(255,112,67,0.8)'; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
  ctx.fillText('⚽ At rest — waiting for a KICK!', W / 2, H / 2);
}
let SB2 = { init: false, running: false, animId: null, cart: { x: 0, vx: 0 }, t: 0, spin: 0 };

function initSB2() {
  const c = document.getElementById('sbCanvas2');
  c.width = c.parentElement.clientWidth;
  SB2.init = true; SB2.running = false; SB2.t = 0;
  SB2.cart = { x: 30, vx: 0 };
  updateSB2();
  drawSB2Idle(c);
}

function updateSB2() {
  const F = +document.getElementById('sb2Force').value;
  const m = +document.getElementById('sb2Mass').value;
  const a = (F / m).toFixed(2);
  document.getElementById('sb2ForceVal').textContent = F + ' N';
  document.getElementById('sb2MassVal').textContent = m + ' kg';
  document.getElementById('sb2ReadF').textContent = F + ' N';
  document.getElementById('sb2ReadM').textContent = m + ' kg';
  document.getElementById('sb2ReadA').textContent = a + ' m/s²';

  let obs = '';
  if (m > 35) obs = '🏋️ <strong>Very heavy cart!</strong> Even a big force gives little acceleration. F = ma means a = F ÷ m!';
  else if (F > 100 && m < 10) obs = '💥 <strong>Huge force, tiny mass!</strong> This cart will zoom away super fast!';
  else if (a < 0.5) obs = '🐢 <strong>Small acceleration!</strong> The force is too low for the mass. Push harder!';
  else obs = `📐 With F=${F}N and m=${m}kg, acceleration = <strong>${a} m/s²</strong>. That's F=ma at work!`;
  document.getElementById('sb2Obs').innerHTML = obs;
}

function pushSB2() {
  if (!SB2.init) initSB2();
  const c = document.getElementById('sbCanvas2');
  const F = +document.getElementById('sb2Force').value;
  const m = +document.getElementById('sb2Mass').value;
  cancelAnimationFrame(SB2.animId);
  SB2.cart = { x: 30, vx: 0 };
  SB2.acceleration = F / m * 0.04;
  SB2.mass = m; SB2.force = F;
  SB2.friction = 0.005 + m * 0.0003;
  SB2.running = true; SB2.t = 0; SB2.spin = 0;
  animSB2(c);
}

function resetSB2() {
  const c = document.getElementById('sbCanvas2');
  cancelAnimationFrame(SB2.animId); SB2.running = false;
  SB2.cart = { x: 30, vx: 0 }; drawSB2Idle(c);
  document.getElementById('sb2ReadSpd').textContent = '—';
  updateSB2();
}

function animSB2(c) {
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#f0f8ff'); bg.addColorStop(1, '#ddeeff');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#c8e6c9'; ctx.fillRect(0, H * 0.55, W, H * 0.35);
  ctx.setLineDash([12, 8]); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, H * 0.72); ctx.lineTo(W, H * 0.72); ctx.stroke();
  ctx.setLineDash([]);

  const finX = W - 60;
  ctx.strokeStyle = '#2d3a4a'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(finX, H * 0.5); ctx.lineTo(finX, H * 0.92); ctx.stroke();
  const fs = 7;
  for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) {
    ctx.fillStyle = (row + col) % 2 === 0 ? '#fff' : '#2d3a4a';
    ctx.fillRect(finX + col * fs, H * 0.5 + row * fs, fs, fs);
  }

  SB2.t++;
  if (SB2.running) {
    SB2.cart.vx += SB2.acceleration;
    SB2.cart.vx = Math.max(0, SB2.cart.vx - SB2.friction);
    SB2.cart.x += SB2.cart.vx;
    SB2.spin += SB2.cart.vx * 0.06;
    document.getElementById('sb2ReadSpd').textContent = (SB2.cart.vx * 20).toFixed(1) + ' m/s';

    if (SB2.cart.x >= finX - 30) {
      SB2.cart.x = finX - 30; SB2.running = false;
      document.getElementById('sb2Obs').innerHTML = `🏁 <strong>Finish!</strong> F=${SB2.force}N ÷ m=${SB2.mass}kg = <strong>${(SB2.force / SB2.mass).toFixed(2)} m/s²</strong> acceleration. That's Newton's Second Law!`;
    }
  }

  if (SB2.cart.vx > 0.1) {
    const arrowLen = SB2.force * 0.5;
    ctx.strokeStyle = '#00b894'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(SB2.cart.x - 10, H * 0.65); ctx.lineTo(SB2.cart.x - 10 - arrowLen, H * 0.65); ctx.stroke();
    ctx.fillStyle = '#00b894';
    ctx.beginPath(); ctx.moveTo(SB2.cart.x - 10, H * 0.65 - 6); ctx.lineTo(SB2.cart.x, H * 0.65); ctx.lineTo(SB2.cart.x - 10, H * 0.65 + 6); ctx.fill();
    ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
    ctx.fillText('F = ' + SB2.force + 'N →', SB2.cart.x - arrowLen / 2 - 10, H * 0.65 - 12);
  }

  const cx = SB2.cart.x, cy = H * 0.72;
  const cw = 50 + SB2.mass * 0.6, ch = 28 + SB2.mass * 0.2;
  [cx + 12, cx + cw - 12].forEach(wx => {
    ctx.beginPath(); ctx.arc(wx, cy + 10, 11, 0, Math.PI * 2); ctx.fillStyle = '#555'; ctx.fill();
    ctx.beginPath(); ctx.arc(wx, cy + 10, 6, 0, Math.PI * 2); ctx.fillStyle = '#888'; ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 2;
    for (let a = 0; a < 4; a++) {
      const aa = SB2.spin + a * Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(wx + Math.cos(aa) * 2, cy + 10 + Math.sin(aa) * 2);
      ctx.lineTo(wx + Math.cos(aa) * 9, cy + 10 + Math.sin(aa) * 9); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(wx, cy + 10, 2, 0, Math.PI * 2); ctx.fillStyle = '#ccc'; ctx.fill();
  });
  ctx.fillStyle = '#00b89433'; ctx.strokeStyle = '#00b894'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx + 4, cy - ch); ctx.lineTo(cx + cw - 4, cy - ch);
  ctx.lineTo(cx + cw, cy - 4); ctx.lineTo(cx, cy - 4); ctx.closePath(); ctx.fill(); ctx.stroke();
  const boxes = Math.floor(SB2.mass / 5);
  for (let b = 0; b < Math.min(boxes, 4); b++) {
    const bx2 = cx + 6 + b * 12, by2 = cy - ch + 4;
    ctx.fillStyle = ['#ff7043', '#ffd60a', '#9c59d1', '#e17055'][b % 4];
    ctx.fillRect(bx2, by2, 10, 10); ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1; ctx.strokeRect(bx2, by2, 10, 10);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  roundR(ctx, cx + cw / 2 - 38, cy - ch - 28, 76, 20, 8); ctx.fill();
  ctx.fillStyle = '#007a5e'; ctx.font = 'bold 10px Nunito'; ctx.textAlign = 'center';
  ctx.fillText('a = ' + (SB2.force / SB2.mass).toFixed(1) + ' m/s²', cx + cw / 2, cy - ch - 13);

  if (SB2.running) SB2.animId = requestAnimationFrame(() => animSB2(c));
}

function drawSB2Idle(c) {
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#f0f8ff'); bg.addColorStop(1, '#ddeeff');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#c8e6c9'; ctx.fillRect(0, H * 0.55, W, H * 0.35);
  ctx.fillStyle = 'rgba(0,184,148,0.9)'; ctx.font = 'bold 13px Nunito'; ctx.textAlign = 'center';
  ctx.fillText('Set Force & Mass → Press Push! 💪', W / 2, H / 2);
}

let SB3 = { init: false, running: false, animId: null, rocket: { y: 0, vy: 0 }, t: 0, altitude: 0, particles: [] };

function initSB3() {
  const c = document.getElementById('sbCanvas3');
  c.width = c.parentElement.clientWidth;
  SB3.init = true; SB3.running = false; SB3.t = 0;
  SB3.altitude = 0; SB3.particles = [];
  SB3.rocket = { y: c.height - 80, vy: 0 };
  updateSB3();
  drawSB3Idle(c);
}

function updateSB3() {
  const thrust = +document.getElementById('sb3Thrust').value;
  const mass = +document.getElementById('sb3Mass').value;
  const thrustN = (thrust * 20).toFixed(0);
  const gravity = 9.8;
  const acc = ((thrustN / mass) - gravity).toFixed(2);
  document.getElementById('sb3ThrustVal').textContent = thrust + '%';
  document.getElementById('sb3MassVal').textContent = mass + ' tons';
  document.getElementById('sb3ReadThrust').textContent = thrustN + ' kN';
  document.getElementById('sb3ReadReaction').textContent = thrustN + ' kN';
  document.getElementById('sb3ReadAcc').textContent = (parseFloat(acc) > 0 ? '+' : '') + acc + ' m/s²';
  let obs = '';
  if (parseFloat(acc) <= 0) obs = '⚠️ <strong>Not enough thrust!</strong> The rocket can\'t lift off! Increase thrust or reduce mass.';
  else if (parseFloat(acc) > 15) obs = '🚀 <strong>Huge net acceleration!</strong> The reaction force far exceeds gravity — BLAST OFF!';
  else obs = `🔥 Action: gases pushed down with <strong>${thrustN} kN</strong>. Reaction: rocket pushed up with <strong>${thrustN} kN</strong>. Net = <strong>${acc} m/s²</strong> upward!`;
  document.getElementById('sb3Obs').innerHTML = obs;
}

function launchSB3() {
  if (!SB3.init) initSB3();
  const c = document.getElementById('sbCanvas3');
  const thrust = +document.getElementById('sb3Thrust').value;
  const mass = +document.getElementById('sb3Mass').value;
  const thrustN = thrust * 20;
  const netAcc = (thrustN / mass) - 9.8;
  cancelAnimationFrame(SB3.animId);
  SB3.rocket = { y: c.height - 80, vy: 0 };
  SB3.netAcc = netAcc * 0.03;
  SB3.thrust = thrustN; SB3.mass = mass;
  SB3.altitude = 0; SB3.t = 0;
  SB3.running = netAcc > 0;
  SB3.particles = [];
  if (netAcc <= 0) {
    document.getElementById('sb3Obs').innerHTML = '⚠️ <strong>Cannot lift off!</strong> Thrust (' + thrustN + ' kN) is less than gravity force (' + (mass * 9.8).toFixed(0) + ' kN). Increase thrust!';
    drawSB3Idle(c); return;
  }
  animSB3(c);
}

function resetSB3() {
  const c = document.getElementById('sbCanvas3');
  cancelAnimationFrame(SB3.animId); SB3.running = false;
  SB3.altitude = 0; SB3.particles = [];
  SB3.rocket = { y: c.height - 80, vy: 0 };
  document.getElementById('sb3ReadAlt').textContent = '0 m';
  drawSB3Idle(c); updateSB3();
}

function animSB3(c) {
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0d1b2a'); bg.addColorStop(0.6, '#1a3a5c'); bg.addColorStop(1, '#2e6680');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  [[W * 0.1, 15], [W * 0.3, 40], [W * 0.5, 12], [W * 0.7, 35], [W * 0.88, 18], [W * 0.2, 60], [W * 0.6, 55]].forEach(([sx, sy]) => {
    ctx.beginPath(); ctx.arc(sx, sy, 1.5, 0, Math.PI * 2); ctx.fill();
  });

  ctx.fillStyle = '#4a4a4a'; ctx.fillRect(0, H - 24, W, 24);
  ctx.fillStyle = '#616161'; ctx.fillRect(W / 2 - 40, H - 32, 80, 10);

  SB3.t++;
  if (SB3.running) {
    SB3.rocket.vy -= SB3.netAcc;
    SB3.rocket.y += SB3.rocket.vy;
    SB3.altitude += Math.abs(SB3.rocket.vy) * 5;
    document.getElementById('sb3ReadAlt').textContent = Math.round(SB3.altitude) + ' m';

    if (SB3.t % 2 === 0) {
      for (let i = 0; i < 3; i++) {
        SB3.particles.push({ x: W / 2 + (Math.random() - 0.5) * 12, y: SB3.rocket.y + 60, vy: 2 + Math.random() * 3, vx: (Math.random() - 0.5) * 2, life: 1, r: 5 + Math.random() * 7, color: Math.random() < 0.5 ? '#ff7043' : '#ffd600' });
      }
    }
    SB3.particles = SB3.particles.filter(p => p.life > 0);
    SB3.particles.forEach(p => { p.y += p.vy; p.x += p.vx; p.life -= 0.03; p.r *= 1.02; });

    if (SB3.rocket.y < -120) {
      SB3.running = false;
      document.getElementById('sb3Obs').innerHTML = `🌟 <strong>Escaped screen!</strong> With ${SB3.thrust} kN thrust and ${SB3.mass} tons, the net acceleration was <strong>${(SB3.thrust / SB3.mass - 9.8).toFixed(1)} m/s²</strong>. Action-Reaction works!`;
    }
  }

  SB3.particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color; ctx.fill(); ctx.globalAlpha = 1;
  });

  const rx = W / 2, ry = SB3.rocket.y;
  if (SB3.running) {
    ctx.strokeStyle = '#ff7043'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(rx + 60, ry + 30); ctx.lineTo(rx + 60, ry + 60); ctx.stroke();
    ctx.fillStyle = '#ff7043';
    ctx.beginPath(); ctx.moveTo(rx + 54, ry + 55); ctx.lineTo(rx + 60, ry + 68); ctx.lineTo(rx + 66, ry + 55); ctx.fill();
    ctx.font = 'bold 9px Nunito'; ctx.textAlign = 'center';
    ctx.fillText('ACTION ↓', rx + 60, ry + 25);
    ctx.strokeStyle = '#69f0ae'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(rx - 60, ry + 20); ctx.lineTo(rx - 60, ry - 10); ctx.stroke();
    ctx.fillStyle = '#69f0ae';
    ctx.beginPath(); ctx.moveTo(rx - 66, ry - 5); ctx.lineTo(rx - 60, ry - 18); ctx.lineTo(rx - 54, ry - 5); ctx.fill();
    ctx.fillStyle = '#69f0ae'; ctx.font = 'bold 9px Nunito'; ctx.textAlign = 'center';
    ctx.fillText('REACTION ↑', rx - 60, ry + 32);
  }

  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath(); ctx.moveTo(rx, ry - 20); ctx.lineTo(rx - 14, ry + 50); ctx.lineTo(rx + 14, ry + 50); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#bdbdbd'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#ef5350';
  ctx.beginPath(); ctx.moveTo(rx, ry - 42); ctx.lineTo(rx - 12, ry - 16); ctx.lineTo(rx + 12, ry - 16); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(rx, ry + 8, 9, 0, Math.PI * 2); ctx.fillStyle = '#81d4fa'; ctx.fill();
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#ef5350';
  ctx.beginPath(); ctx.moveTo(rx - 14, ry + 50); ctx.lineTo(rx - 26, ry + 58); ctx.lineTo(rx - 14, ry + 38); ctx.fill();
  ctx.beginPath(); ctx.moveTo(rx + 14, ry + 50); ctx.lineTo(rx + 26, ry + 58); ctx.lineTo(rx + 14, ry + 38); ctx.fill();

  if (SB3.running) {
    const fl = 18 + Math.sin(SB3.t * 0.4) * 8;
    const flg = ctx.createLinearGradient(rx, ry + 50, rx, ry + 50 + fl);
    flg.addColorStop(0, '#ffd600'); flg.addColorStop(0.5, '#ff7043'); flg.addColorStop(1, 'transparent');
    ctx.fillStyle = flg;
    ctx.beginPath(); ctx.moveTo(rx - 10, ry + 50); ctx.lineTo(rx, ry + 50 + fl); ctx.lineTo(rx + 10, ry + 50); ctx.fill();
  }

  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  roundR(ctx, W - 100, 12, 88, 28, 8); ctx.fill();
  ctx.fillStyle = '#9c59d1'; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
  ctx.fillText('🚀 ' + Math.round(SB3.altitude) + 'm', W - 56, 30);

  if (SB3.running) SB3.animId = requestAnimationFrame(() => animSB3(c));
}

function drawSB3Idle(c) {
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0d1b2a'); bg.addColorStop(1, '#1a3352');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const rx = W / 2, ry = H - 80;
  ctx.fillStyle = '#e0e0e0'; ctx.beginPath(); ctx.moveTo(rx, ry - 20); ctx.lineTo(rx - 14, ry + 50); ctx.lineTo(rx + 14, ry + 50); ctx.fill();
  ctx.fillStyle = '#ef5350'; ctx.beginPath(); ctx.moveTo(rx, ry - 42); ctx.lineTo(rx - 12, ry - 16); ctx.lineTo(rx + 12, ry - 16); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = 'bold 13px Nunito'; ctx.textAlign = 'center';
  ctx.fillText('Set Thrust & Mass → Launch! 🚀', W / 2, H / 2 - 20);
  ctx.fillStyle = '#4a4a4a'; ctx.fillRect(0, H - 24, W, 24);
}

let animId = null, playing = true, curSim = 0, S = {};
const SIMS = {
  1: {
    badge: '🛸 FIRST LAW', badgeBg: '#fff0eb', badgeColor: '#ff7043',
    title: 'Law of Inertia', tagline: 'A ball just sits there… until you give it a KICK! ⚽',
    panels: [
      { em: '⚽', title: 'Ball at rest', desc: 'The ball does nothing by itself.' },
      { em: '🦵 →', title: 'A force is applied', desc: 'The boy kicks the ball!' },
      { em: '💨⚽', title: 'Ball moves!', desc: 'It keeps going until something stops it.' }
    ],
    fact: '<strong>Did you know?</strong> In space there is almost no friction, so a ball would roll forever and ever without stopping! 🌌',
    btnColor: '#ff7043'
  },
  2: {
    badge: '🚀 SECOND LAW', badgeBg: '#e6fdf5', badgeColor: '#00b894',
    title: 'Force = Mass × Acceleration', tagline: 'Same push — but a heavy cart barely moves! 🛒',
    panels: [
      { em: '🛒', title: 'Empty cart', desc: 'Light! Easy to push fast.' },
      { em: '💪', title: 'Same force', desc: 'Boy pushes both carts equally.' },
      { em: '🛒📦', title: 'Full cart', desc: 'Heavy! Moves much slower.' }
    ],
    fact: '<strong>Did you know?</strong> A bowling ball and a tennis ball dropped from the same height hit the ground at nearly the same time! 🎳🎾',
    btnColor: '#00b894'
  },
  3: {
    badge: '💥 THIRD LAW', badgeBg: '#f5eaff', badgeColor: '#9c59d1',
    title: 'Action & Reaction', tagline: 'Gas blasts DOWN → rocket shoots UP! 🚀',
    panels: [
      { em: '🔥↓', title: 'Action', desc: 'Hot gases shoot downward.' },
      { em: '↕', title: 'Equal & opposite', desc: 'Every push gets a push back!' },
      { em: '🚀↑', title: 'Reaction', desc: 'Rocket zooms upward!' }
    ],
    fact: '<strong>Did you know?</strong> When you swim, you push water backward (action) and the water pushes you forward (reaction)! 🏊',
    btnColor: '#9c59d1'
  }
};

function openSim(n) {
  curSim = n;
  const d = SIMS[n];
  const badge = document.getElementById('mBadge');
  badge.textContent = d.badge; badge.style.background = d.badgeBg; badge.style.color = d.badgeColor;
  document.getElementById('mTitle').textContent = d.title;
  document.getElementById('mTagline').textContent = d.tagline;
  document.getElementById('mPanels').innerHTML = d.panels.map(p =>
    `<div class="sim-story-panel"><span class="big-em">${p.em}</span><div class="panel-title">${p.title}</div><div class="panel-desc">${p.desc}</div></div>`
  ).join('');
  document.getElementById('mFact').innerHTML = d.fact;
  document.getElementById('playBtn').style.background = d.btnColor;
  document.getElementById('modalOverlay').classList.add('open');
  playing = true; document.getElementById('playBtn').textContent = '⏸ Pause';
  initSim(n);
}

function closeSim() { document.getElementById('modalOverlay').classList.remove('open'); cancelAnimationFrame(animId); }
function closeOnBg(e) { if (e.target === document.getElementById('modalOverlay')) closeSim(); }
function togglePlay() {
  playing = !playing;
  document.getElementById('playBtn').textContent = playing ? '⏸ Pause' : '▶ Play';
  if (playing) loop();
}
function resetSim() { initSim(curSim); }

function initSim(n) {
  cancelAnimationFrame(animId);
  const c = document.getElementById('simCanvas');
  c.width = c.parentElement.clientWidth || 560;
  const ctx = c.getContext('2d');
  if (n === 1) init1(c, ctx);
  if (n === 2) init2(c, ctx);
  if (n === 3) init3(c, ctx);
  playing = true; loop();
}

function loop() {
  if (!playing) return;
  const c = document.getElementById('simCanvas');
  const ctx = c.getContext('2d');
  if (curSim === 1) draw1(c, ctx);
  if (curSim === 2) draw2(c, ctx);
  if (curSim === 3) draw3(c, ctx);
  animId = requestAnimationFrame(loop);
}

function drawLabel(ctx, x, y, text, W) {
  const safeX = Math.min(Math.max(x, 60), W - 60);
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  const tw = ctx.measureText(text).width;
  ctx.fillRect(safeX - tw / 2 - 8, y - 16, tw + 16, 22);
  ctx.fillStyle = '#333'; ctx.font = 'bold 12px Nunito'; ctx.textAlign = 'center';
  ctx.fillText(text, safeX, y);
}

function init1(c, ctx) { S = { phase: 0, t: 0, ball: { x: c.width * 0.55, y: c.height - 60, vx: 0 }, boy: { x: c.width * 0.25 }, kickTimer: 80, legAngle: 0, friction: 0.012 }; }
function draw1(c, ctx) {
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const skyG = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  skyG.addColorStop(0, '#ddeeff'); skyG.addColorStop(1, '#eef8ff');
  ctx.fillStyle = skyG; ctx.fillRect(0, 0, W, H * 0.65);
  const gG = ctx.createLinearGradient(0, H * 0.65, 0, H);
  gG.addColorStop(0, '#7ec850'); gG.addColorStop(1, '#5aaa30');
  ctx.fillStyle = gG; ctx.fillRect(0, H * 0.65, W, H * 0.35);
  ctx.fillStyle = '#ffed4a'; ctx.font = '28px sans-serif'; ctx.fillText('☀️', W - 66, 56);
  const gy = H * 0.65;
  S.t++;
  if (S.phase === 0) { S.kickTimer--; S.legAngle = Math.sin(S.t * 0.05) * 0.15; if (S.kickTimer <= 0) { S.phase = 1; S.legAngle = 0; } }
  if (S.phase === 1) { S.legAngle += 0.18; if (S.legAngle >= 1.2) { S.phase = 2; S.ball.vx = 5.5; } }
  if (S.phase === 2) { S.ball.x += S.ball.vx; S.ball.vx = Math.max(0, S.ball.vx - S.friction); if (S.ball.vx === 0) { S.phase = 3; S.kickTimer = 90; } if (S.ball.x > W + 40) { S.phase = 3; S.ball.x = -40; S.kickTimer = 90; } }
  if (S.phase === 3) { S.kickTimer--; if (S.kickTimer <= 0) { S.ball.x = W * 0.55; S.ball.vx = 0; S.phase = 0; S.kickTimer = 80; S.legAngle = 0; } }
  const bx = S.ball.x, by = gy - 24;
  if (S.ball.x > -30 && S.ball.x < W + 30) {
    ctx.beginPath(); ctx.arc(bx, by, 22, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5; ctx.stroke();
    [[0, -12], [9, 8], [-9, 8], [14, -4], [-14, -4]].forEach(([dx, dy]) => {
      ctx.beginPath(); ctx.arc(bx + dx, by + dy, 4, 0, Math.PI * 2); ctx.fillStyle = '#222'; ctx.fill();
    });
  }
  const bx2 = S.boy.x, hy2 = gy - 10;
  ctx.beginPath(); ctx.arc(bx2, hy2 - 70, 14, 0, Math.PI * 2); ctx.fillStyle = '#ffe0b2'; ctx.fill();
  ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = '#1e88e5'; ctx.fillRect(bx2 - 10, hy2 - 52, 20, 28);
  ctx.strokeStyle = '#ffe0b2'; ctx.lineWidth = 3; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(bx2 - 10, hy2 - 48); ctx.lineTo(bx2 - 22, hy2 - 30); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(bx2 + 10, hy2 - 48); ctx.lineTo(bx2 + 22, hy2 - 30); ctx.stroke();
  ctx.strokeStyle = '#1565c0'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(bx2, hy2 - 20); ctx.lineTo(bx2 - 8, hy2); ctx.stroke();
  const kx = bx2 + 8 + Math.sin(S.legAngle) * 30, ky = hy2 - Math.cos(S.legAngle) * 20;
  ctx.beginPath(); ctx.moveTo(bx2, hy2 - 20); ctx.lineTo(kx, ky); ctx.stroke();
  ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(kx + Math.sin(S.legAngle) * 14 + 2, ky + 14, 8, 5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.textAlign = 'center';
  if (S.phase === 0) drawLabel(ctx, S.ball.x + 1, by - 34, 'At rest 😴', W);
  if (S.phase === 2 && S.ball.vx > 0.5) drawLabel(ctx, S.ball.x, by - 34, 'Moving! →', W);
  if (S.phase === 3 && S.ball.x < W - 10) drawLabel(ctx, S.ball.x, by - 34, 'Stopped 🛑', W);
}

function init2(c, ctx) { S = { t: 0, empty: { x: 30, vx: 0, speed: 3.5 }, loaded: { x: 30, vx: 0, speed: 1.2 }, phase: 0, pauseT: 60 }; }
function draw2(c, ctx) {
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#f0f8ff'); bg.addColorStop(1, '#ddeeff');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const lane1y = H * 0.3, lane2y = H * 0.65;
  [lane1y, lane2y].forEach(ly => { ctx.fillStyle = '#c8e6c9'; ctx.fillRect(0, ly, W, H * 0.28); });
  ctx.fillStyle = '#555'; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'left'; ctx.fillText('SAME FORCE 💪', 10, 20);
  S.t++;
  if (S.phase === 0) { S.pauseT--; if (S.pauseT <= 0) S.phase = 1; }
  if (S.phase === 1) {
    S.empty.x = Math.min(S.empty.x + S.empty.speed, W - 80);
    S.loaded.x = Math.min(S.loaded.x + S.loaded.speed, W - 80);
    if (S.empty.x >= W - 80 && S.loaded.x >= W - 80) { S.phase = 0; S.pauseT = 70; S.empty.x = 30; S.loaded.x = 30; }
  }
  drawSim2Cart(ctx, S.empty.x + 60, lane1y + 4, H * 0.24, '#00b894', 0, '😊 Easy!');
  drawSim2Cart(ctx, S.loaded.x + 60, lane2y + 4, H * 0.24, '#e17055', 3, '😅 Heavy!');
  ctx.textAlign = 'center';
  if (S.phase === 1) {
    ctx.fillStyle = '#00b894'; ctx.font = 'bold 13px Nunito'; ctx.fillText('ZOOM! 💨', S.empty.x + 105, lane1y - 8);
    ctx.fillStyle = '#e17055'; ctx.fillText('Slow... 🐢', S.loaded.x + 105, lane2y - 8);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  roundRect(ctx, W / 2 - 90, H - 32, 180, 24, 10);
  ctx.fillStyle = '#00b894'; ctx.font = 'bold 13px Nunito'; ctx.textAlign = 'center';
  ctx.fillText('F = Mass × Acceleration', W / 2, H - 14);
}

function drawSim2Cart(ctx, x, y, h, color, boxes, faceLabel) {
  const cw = 60, ch = 40, by2 = y + h - 50;
  ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.fillStyle = color + '22';
  ctx.beginPath(); ctx.moveTo(x, by2); ctx.lineTo(x + cw, by2); ctx.lineTo(x + cw + 8, by2 - ch); ctx.lineTo(x + 8, by2 - ch); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x, by2 - ch); ctx.lineTo(x - 12, by2 - ch - 10); ctx.stroke();
  [x + 10, x + cw - 5].forEach(wx => {
    ctx.beginPath(); ctx.arc(wx, by2 + 8, 8, 0, Math.PI * 2); ctx.fillStyle = '#555'; ctx.fill();
    ctx.beginPath(); ctx.arc(wx, by2 + 8, 4, 0, Math.PI * 2); ctx.fillStyle = '#aaa'; ctx.fill();
  });
  for (let i = 0; i < boxes; i++) {
    ctx.fillStyle = '#f39c12'; ctx.strokeStyle = '#d68910'; ctx.lineWidth = 1;
    ctx.fillRect(x + 8 + i * 14, by2 - ch + 4, 12, 12);
    ctx.strokeRect(x + 8 + i * 14, by2 - ch + 4, 12, 12);
  }
  ctx.fillStyle = color; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
  ctx.fillText(faceLabel, x + cw / 2, by2 - ch - 14);
}

function init3(c, ctx) { S = { t: 0, rocket: { y: c.height - 80 }, gasParticles: [], phase: 0, countdown: 3, countT: 60, phase1T: 0 }; }
function draw3(c, ctx) {
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0d1b2a'); bg.addColorStop(0.5, '#1a3a5c'); bg.addColorStop(1, '#2e7d96');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  [[20, 15], [60, 35], [W * 0.3, 20], [W * 0.5, 10], [W * 0.7, 40], [W - 30, 20], [W - 60, 50]].forEach(([sx, sy]) => {
    ctx.beginPath(); ctx.arc(sx, sy, 1.5, 0, Math.PI * 2); ctx.fill();
  });
  ctx.fillStyle = '#4a4a4a'; ctx.fillRect(0, H - 28, W, 28);
  ctx.fillStyle = '#616161'; ctx.fillRect(W / 2 - 40, H - 38, 80, 12);
  S.t++;
  if (S.phase === 0) { S.countT--; if (S.countT <= 0) { S.countdown--; S.countT = 60; if (S.countdown < 0) { S.phase = 1; S.phase1T = 0; } } }
  if (S.phase === 1) {
    S.phase1T++; S.rocket.y -= 2.2;
    if (S.phase1T % 3 === 0) {
      for (let i = 0; i < 3; i++) {
        S.gasParticles.push({ x: W / 2 + (Math.random() - 0.5) * 14, y: S.rocket.y + 70, vy: 2 + Math.random() * 3, vx: (Math.random() - 0.5) * 2, life: 1, r: 6 + Math.random() * 8, color: Math.random() < 0.5 ? '#ff7043' : '#ffd600' });
      }
    }
    if (S.rocket.y < -120) S.phase = 2;
  }
  if (S.phase === 2) { S.rocket.y = H - 80; S.phase = 0; S.countdown = 3; S.countT = 60; S.gasParticles = []; }
  S.gasParticles = S.gasParticles.filter(p => p.life > 0);
  S.gasParticles.forEach(p => {
    p.y += p.vy; p.x += p.vx; p.life -= 0.025; p.r *= 1.03;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + Math.floor(p.life * 180).toString(16).padStart(2, '0'); ctx.fill();
  });
  const rx = W / 2, ry = S.rocket.y;
  if (S.phase === 1) {
    const flameH = 20 + Math.sin(S.t * 0.4) * 8;
    const flg = ctx.createLinearGradient(rx, ry + 55, rx, ry + 55 + flameH);
    flg.addColorStop(0, '#ffd600'); flg.addColorStop(0.5, '#ff7043'); flg.addColorStop(1, 'transparent');
    ctx.fillStyle = flg;
    ctx.beginPath(); ctx.moveTo(rx - 10, ry + 55); ctx.lineTo(rx, ry + 55 + flameH); ctx.lineTo(rx + 10, ry + 55); ctx.closePath(); ctx.fill();
  }
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath(); ctx.moveTo(rx, ry - 20); ctx.lineTo(rx - 16, ry + 50); ctx.lineTo(rx + 16, ry + 50); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#bdbdbd'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#ef5350';
  ctx.beginPath(); ctx.moveTo(rx, ry - 42); ctx.lineTo(rx - 12, ry - 16); ctx.lineTo(rx + 12, ry - 16); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(rx, ry + 8, 9, 0, Math.PI * 2); ctx.fillStyle = '#81d4fa'; ctx.fill();
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#ef5350';
  ctx.beginPath(); ctx.moveTo(rx - 16, ry + 50); ctx.lineTo(rx - 28, ry + 58); ctx.lineTo(rx - 16, ry + 38); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(rx + 16, ry + 50); ctx.lineTo(rx + 28, ry + 58); ctx.lineTo(rx + 16, ry + 38); ctx.closePath(); ctx.fill();
  ctx.textAlign = 'center';
  if (S.phase === 0) { ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 20px Baloo 2'; ctx.fillText(S.countdown > 0 ? `🚀 Launching in ${S.countdown}...` : '🔥 BLAST OFF!', W / 2, H / 2); }
  if (S.phase === 1) {
    ctx.fillStyle = '#ff7043'; ctx.font = 'bold 12px Nunito'; ctx.fillText('⬇ Gas down (ACTION)', W / 2, H - 48);
    ctx.strokeStyle = '#69f0ae'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(W * 0.82, ry + 20); ctx.lineTo(W * 0.82, ry - 10); ctx.stroke();
    ctx.fillStyle = '#69f0ae';
    ctx.beginPath(); ctx.moveTo(W * 0.82 - 6, ry - 8); ctx.lineTo(W * 0.82, ry - 22); ctx.lineTo(W * 0.82 + 6, ry - 8); ctx.fill();
    ctx.fillStyle = '#69f0ae'; ctx.font = 'bold 11px Nunito'; ctx.fillText('⬆ Rocket UP (REACTION)', W * 0.82, ry - 28);
  }
}

let G1 = {}, g1AnimId = null;

function startGame1() {
  const c = document.getElementById('game1Canvas');
  c.width = c.parentElement.clientWidth;
  document.getElementById('g1btn').textContent = '↺ Restart';
  document.getElementById('g1btn').onclick = startGame1;
  G1 = { balls: [], spawnTimer: 0, spawnInterval: 90, score: 0, lives: 3, gameOver: false, won: false, goalX: c.width - 48, goalTop: 60, goalBot: 160, friction: 0.018, t: 0 };
  spawnBall1(c);
  cancelAnimationFrame(g1AnimId);
  c.onclick = null;
  c.onclick = (e) => clickBall1(e, c);
  c.ontouchstart = (e) => { e.preventDefault(); const t = e.touches[0]; clickBall1({ clientX: t.clientX, clientY: t.clientY }, c); };
  gameLoop1(c);
  updateG1UI();
}

function spawnBall1(c) {
  const y = 70 + Math.random() * (c.height - 130);
  G1.balls.push({ x: 40, y, vx: 0, r: 18, kicked: false, missed: false, scored: false });
}

function clickBall1(e, c) {
  if (G1.gameOver || G1.won) return;
  const rect = c.getBoundingClientRect();
  const mx = (e.clientX - rect.left) * (c.width / rect.width);
  const my = (e.clientY - rect.top) * (c.height / rect.height);
  G1.balls.forEach(b => {
    if (!b.kicked && !b.missed && !b.scored) {
      const dx = mx - b.x, dy = my - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < b.r + 14) { b.vx = 6 + Math.random() * 2; b.kicked = true; }
    }
  });
}

function gameLoop1(c) {
  const ctx = c.getContext('2d');
  G1.t++; G1.spawnTimer++;
  if (G1.spawnTimer >= G1.spawnInterval && G1.balls.filter(b => !b.scored && !b.missed).length < 2) {
    spawnBall1(c); G1.spawnTimer = 0;
  }
  G1.balls.forEach(b => {
    if (b.kicked && !b.scored && !b.missed) {
      b.x += b.vx; b.vx = Math.max(0, b.vx - G1.friction);
      if (b.x >= G1.goalX && b.y >= G1.goalTop && b.y <= G1.goalBot) { b.scored = true; G1.score++; updateG1UI(); }
      if (b.x > c.width + 20) b.missed = true;
      if (b.vx === 0 && b.x < G1.goalX - 20) { b.missed = true; G1.lives = Math.max(0, G1.lives - 1); updateG1UI(); }
    }
    if (!b.kicked && b.x < -30) b.missed = true;
  });
  if (G1.score >= 5) G1.won = true;
  if (G1.lives <= 0) G1.gameOver = true;
  drawGame1(ctx, c);
  if (!G1.gameOver && !G1.won) g1AnimId = requestAnimationFrame(() => gameLoop1(c));
}

function drawGame1(ctx, c) {
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, W, H * 0.6);
  ctx.fillStyle = '#5aaa30'; ctx.fillRect(0, H * 0.6, W, H * 0.4);
  ctx.strokeStyle = '#4a9020'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, H * 0.6); ctx.lineTo(W, H * 0.6); ctx.stroke();
  [[W * 0.2, 28], [W * 0.65, 18]].forEach(([cx, cy]) => {
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    [[0, 0, 18], [16, -8, 22], [32, 0, 18]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(cx + dx, cy + dy, r, 0, Math.PI * 2); ctx.fill(); });
  });
  const gx = G1.goalX, gt = G1.goalTop, gb = G1.goalBot;
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(gx, gt, W - gx, gb - gt);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(gx, gt, W - gx - 2, gb - gt);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1;
  for (let nx = gx + 10; nx < W; nx += 14) { ctx.beginPath(); ctx.moveTo(nx, gt); ctx.lineTo(nx, gb); ctx.stroke(); }
  for (let ny = gt + 10; ny < gb; ny += 14) { ctx.beginPath(); ctx.moveTo(gx, ny); ctx.lineTo(W, ny); ctx.stroke(); }
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px Nunito'; ctx.textAlign = 'center'; ctx.fillText('GOAL!', gx + (W - gx) / 2, gt - 8);
  G1.balls.forEach(b => {
    if (b.missed) return;
    ctx.beginPath(); ctx.ellipse(b.x, H * 0.6 + 4, b.r * 0.8, 5, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fill();
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.scored ? '#ffd60a' : '#fff'; ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5; ctx.stroke();
    if (!b.scored) { [[0, -10], [8, 6], [-8, 6], [12, -3], [-12, -3]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(b.x + dx, b.y + dy, 3.5, 0, Math.PI * 2); ctx.fillStyle = '#222'; ctx.fill(); }); }
    else { ctx.fillStyle = '#ff7043'; ctx.font = 'bold 14px Nunito'; ctx.textAlign = 'center'; ctx.fillText('GOAL!', b.x, b.y - b.r - 6); }
    if (!b.kicked && !b.scored) {
      const pulse = 0.6 + 0.4 * Math.sin(G1.t * 0.1);
      ctx.strokeStyle = `rgba(255,112,67,${pulse})`; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r + 7, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = `rgba(255,112,67,${pulse})`; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
      ctx.fillText('TAP!', b.x, b.y + b.r + 18);
    }
    if (b.kicked && b.vx > 0.3 && !b.scored) {
      ctx.strokeStyle = '#ffd60a'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(b.x + b.r, b.y); ctx.lineTo(b.x + b.r + b.vx * 6, b.y); ctx.stroke();
      ctx.fillStyle = '#ffd60a';
      ctx.beginPath(); ctx.moveTo(b.x + b.r + b.vx * 6, b.y - 4); ctx.lineTo(b.x + b.r + b.vx * 6 + 7, b.y); ctx.lineTo(b.x + b.r + b.vx * 6, b.y + 4); ctx.fill();
    }
  });
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; roundR(ctx, 10, 10, 120, 30, 10); ctx.fill();
  ctx.fillStyle = '#ff7043'; ctx.font = 'bold 14px Baloo 2'; ctx.textAlign = 'left'; ctx.fillText(`⚽ ${G1.score} / 5`, 18, 30);
  if (G1.won || G1.gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 26px Baloo 2'; ctx.textAlign = 'center';
    ctx.fillText(G1.won ? '🎉 You Win!' : '😢 Game Over!', W / 2, H / 2 - 14);
    ctx.font = '14px Nunito';
    ctx.fillText(G1.won ? 'Balls keep moving — Inertia!' : 'Balls need force — try again!', W / 2, H / 2 + 14);
  }
}

function updateG1UI() {
  document.getElementById('g1score').textContent = `⚽ Score: ${G1.score}`;
  document.getElementById('g1lives').textContent = '❤️'.repeat(G1.lives) + '🖤'.repeat(3 - G1.lives);
}

// ══════════════════════════════════════
//  GAME 2 — RACE CARTS
// ══════════════════════════════════════
let G2 = { c: null, ctx: null, animId: null, state: 'idle', power: 0, round: 0, t: 0, lightCart: { x: 0, vx: 0 }, heavyCart: { x: 0, vx: 0 }, confetti: [] };
const G2_ROUNDS = [
  { lightBoxes: 0, heavyBoxes: 2, lightLabel: 'Empty 🪶', heavyLabel: '2 Boxes 📦📦', winMsg: '🎉 Same push, less mass = more speed!' },
  { lightBoxes: 0, heavyBoxes: 4, lightLabel: 'Empty 🪶', heavyLabel: '4 Boxes 📦📦📦📦', winMsg: '🎉 Even more boxes = even slower!' },
  { lightBoxes: 1, heavyBoxes: 5, lightLabel: '1 Box 📦', heavyLabel: '5 Boxes 📦×5', winMsg: '🎉 More mass = less acceleration! F=ma!' }
];

function initGame2() {
  const c = document.getElementById('game2Canvas');
  c.width = c.parentElement.clientWidth;
  G2.c = c; G2.ctx = c.getContext('2d');
  G2.state = 'idle'; G2.power = 0; G2.round = 0; G2.t = 0;
  G2.lightCart = { x: 18, vx: 0 }; G2.heavyCart = { x: 18, vx: 0 };
  resetG2Carts(); drawG2();
  const btn = document.getElementById('g2PushBtn');
  btn.className = ''; btn.textContent = '▶ Start Race!';
  document.getElementById('g2PowerLabel').textContent = 'Hold the button to charge! ⚡';
  document.getElementById('g2PowerFill').style.width = '0%';
  document.getElementById('g2ResultBadge').className = 'g2-result-badge';
  updateG2ScoreUI();
  btn.onclick = null;
  btn.onclick = () => {
    if (G2.state === 'idle') { G2.state = 'pressing'; btn.textContent = '⚡ Charging...'; btn.classList.add('pressing'); G2.power = 0; document.getElementById('g2ResultBadge').className = 'g2-result-badge'; }
  };
  btn.onmouseup = btn.ontouchend = (e) => { if (e) e.preventDefault(); if (G2.state === 'pressing') launchG2(); };
  btn.ontouchstart = (e) => {
    e.preventDefault();
    if (G2.state === 'idle') { G2.state = 'pressing'; btn.textContent = '⚡ Charging...'; btn.classList.add('pressing'); G2.power = 0; document.getElementById('g2ResultBadge').className = 'g2-result-badge'; }
  };
  document.addEventListener('mouseup', globalMouseUp);
  document.addEventListener('touchend', globalMouseUp);
}

function globalMouseUp() { if (G2.state === 'pressing') launchG2(); }

function resetG2Carts() {
  G2.lightCart = { x: 18, vx: 0 };
  G2.heavyCart = { x: 18, vx: 0 };
}

function launchG2() {
  if (G2.state !== 'pressing') return;
  const btn = document.getElementById('g2PushBtn');
  btn.textContent = '🏁 Racing...'; btn.className = 'disabled-btn';
  G2.state = 'racing';
  const roundData = G2_ROUNDS[G2.round];
  const power = G2.power / 100;
  const baseSpeed = 2.5 + power * 4;
  const lightMass = 1 + roundData.lightBoxes * 0.9;
  const heavyMass = 1 + roundData.heavyBoxes * 0.9;
  G2.lightCart.vx = baseSpeed / lightMass;
  G2.heavyCart.vx = baseSpeed / heavyMass;
}

function g2GameLoop() {
  const c = G2.c;
  if (!c) return;
  G2.t++;
  const W = c.width, finishX = W - 70;
  if (G2.state === 'pressing') {
    G2.power = Math.min(100, G2.power + 1.8);
    const pct = Math.round(G2.power);
    document.getElementById('g2PowerFill').style.width = pct + '%';
    document.getElementById('g2PowerLabel').textContent = pct < 30 ? '⚡ Keep holding...' : pct < 70 ? '💪 Getting stronger!' : '🔥 MAX POWER!';
  }
  if (G2.state === 'racing') {
    const friction = 0.008;
    G2.lightCart.x += G2.lightCart.vx; G2.lightCart.vx = Math.max(0, G2.lightCart.vx - friction);
    G2.heavyCart.x += G2.heavyCart.vx; G2.heavyCart.vx = Math.max(0, G2.heavyCart.vx - friction);
    const lightDone = G2.lightCart.vx === 0 || G2.lightCart.x >= finishX;
    const heavyDone = G2.heavyCart.vx === 0 || G2.heavyCart.x >= finishX;
    if (lightDone && heavyDone) {
      G2.state = 'done'; G2.round++;
      const roundData = G2_ROUNDS[Math.min(G2.round - 1, G2_ROUNDS.length - 1)];
      const badge = document.getElementById('g2ResultBadge');
      badge.textContent = roundData.winMsg; badge.className = 'g2-result-badge show';
      updateG2ScoreUI();
      G2.confetti = [];
      for (let i = 0; i < 28; i++) {
        G2.confetti.push({ x: W / 2, y: c.height / 2, vx: (Math.random() - 0.5) * 7, vy: -3 - Math.random() * 4, color: ['#00b894', '#ffd60a', '#ff7043', '#9c59d1', '#fff'][Math.floor(Math.random() * 5)], r: 4 + Math.random() * 4, life: 1 });
      }
      const btn = document.getElementById('g2PushBtn');
      if (G2.round >= G2_ROUNDS.length) {
        setTimeout(() => { btn.textContent = '🏆 Play Again!'; btn.className = ''; btn.onclick = initGame2; G2.state = 'idle'; }, 2200);
      } else {
        setTimeout(() => {
          resetG2Carts();
          document.getElementById('g2PowerFill').style.width = '0%';
          document.getElementById('g2PowerLabel').textContent = 'Hold the button to charge! ⚡';
          G2.state = 'idle'; btn.textContent = '🚀 Next Round!'; btn.className = '';
          btn.onclick = () => { G2.state = 'pressing'; btn.textContent = '⚡ Charging...'; btn.classList.add('pressing'); G2.power = 0; document.getElementById('g2ResultBadge').className = 'g2-result-badge'; };
          btn.onmouseup = btn.ontouchend = (e) => { if (e) e.preventDefault(); if (G2.state === 'pressing') launchG2(); };
          btn.ontouchstart = (e) => { e.preventDefault(); if (G2.state === 'idle') { G2.state = 'pressing'; btn.textContent = '⚡ Charging...'; btn.classList.add('pressing'); G2.power = 0; document.getElementById('g2ResultBadge').className = 'g2-result-badge'; } };
        }, 2200);
      }
    }
  }
  if (G2.confetti.length > 0) {
    G2.confetti.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.022; });
    G2.confetti = G2.confetti.filter(p => p.life > 0);
  }
  drawG2();
  G2.animId = requestAnimationFrame(g2GameLoop);
}

function drawG2() {
  const c = G2.c, ctx = G2.ctx;
  if (!c || !ctx) return;
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#e8f8f1'; ctx.fillRect(0, 0, W, H);
  [[W * 0.15, 22], [W * 0.7, 16]].forEach(([cx, cy]) => {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    [[0, 0, 14], [13, -5, 17], [26, 0, 14]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(cx + dx, cy + dy, r, 0, Math.PI * 2); ctx.fill(); });
  });
  const finishX = W - 70;
  const lane1Y = Math.floor(H * 0.28), lane2Y = Math.floor(H * 0.68);
  [lane1Y, lane2Y].forEach(ly => {
    ctx.fillStyle = '#c8e6c9'; ctx.fillRect(0, ly - 18, W, 36);
    ctx.strokeStyle = '#a5d6a7'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, ly - 18); ctx.lineTo(W, ly - 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, ly + 18); ctx.lineTo(W, ly + 18); ctx.stroke();
    ctx.setLineDash([12, 8]); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(W, ly); ctx.stroke();
    ctx.setLineDash([]);
  });
  [lane1Y, lane2Y].forEach(ly => {
    ctx.strokeStyle = '#2d3a4a'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(finishX, ly - 30); ctx.lineTo(finishX, ly + 30); ctx.stroke();
    const fx = finishX, fy = ly - 28, fs = 7;
    for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? '#fff' : '#2d3a4a';
      ctx.fillRect(fx + col * fs, fy + row * fs, fs, fs);
    }
    ctx.fillStyle = '#f44336'; ctx.font = 'bold 9px Nunito'; ctx.textAlign = 'center';
    ctx.fillText('FINISH', finishX + 12, ly + 32);
  });
  const roundData = G2_ROUNDS[Math.min(G2.round, G2_ROUNDS.length - 1)];
  ctx.fillStyle = '#007a5e'; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'left'; ctx.fillText(roundData.lightLabel, 8, lane1Y - 24);
  ctx.fillStyle = '#c0392b'; ctx.fillText(roundData.heavyLabel, 8, lane2Y - 24);
  drawG2Cart(ctx, G2.lightCart.x, lane1Y, '#00b894', roundData.lightBoxes, G2.lightCart.vx, G2.t);
  drawG2Cart(ctx, G2.heavyCart.x, lane2Y, '#e17055', roundData.heavyBoxes, G2.heavyCart.vx, G2.t);
  if (G2.state === 'racing') {
    if (G2.lightCart.vx > 0.1) drawSpeedArrows(ctx, G2.lightCart.x + 72, lane1Y, G2.lightCart.vx, '#00b894');
    if (G2.heavyCart.vx > 0.1) drawSpeedArrows(ctx, G2.heavyCart.x + 72, lane2Y, G2.heavyCart.vx, '#e17055');
  }
  G2.confetti.forEach(p => { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1; });
  if (G2.state === 'pressing') { const pulse = 0.3 + 0.3 * Math.sin(G2.t * 0.25); ctx.fillStyle = `rgba(0,184,148,${pulse})`; ctx.fillRect(0, 0, W, H); }
}

function drawG2Cart(ctx, x, cy, color, boxes, vx, t) {
  const cw = 64, ch = 34, cx2 = x, top = cy - ch / 2;
  const spinAngle = t * vx * 0.12;
  [cx2 + 10, cx2 + cw - 10].forEach(wx => {
    ctx.beginPath(); ctx.arc(wx, cy + ch / 2 - 6, 11, 0, Math.PI * 2); ctx.fillStyle = '#555'; ctx.fill();
    ctx.beginPath(); ctx.arc(wx, cy + ch / 2 - 6, 6, 0, Math.PI * 2); ctx.fillStyle = '#888'; ctx.fill();
    ctx.strokeStyle = '#444'; ctx.lineWidth = 2;
    for (let a = 0; a < 4; a++) {
      const aa = spinAngle + a * Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(wx + Math.cos(aa) * 2, cy + ch / 2 - 6 + Math.sin(aa) * 2);
      ctx.lineTo(wx + Math.cos(aa) * 9, cy + ch / 2 - 6 + Math.sin(aa) * 9); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(wx, cy + ch / 2 - 6, 2, 0, Math.PI * 2); ctx.fillStyle = '#ccc'; ctx.fill();
  });
  ctx.fillStyle = color + '33'; ctx.strokeStyle = color; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx2 + 6, top); ctx.lineTo(cx2 + cw - 6, top); ctx.lineTo(cx2 + cw, cy + ch / 2 - 16); ctx.lineTo(cx2, cy + ch / 2 - 16); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx2, top); ctx.lineTo(cx2 - 10, top - 10); ctx.stroke();
  ctx.beginPath(); ctx.arc(cx2 - 10, top - 12, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  const maxBoxesVisible = Math.min(boxes, 4);
  for (let b = 0; b < maxBoxesVisible; b++) {
    const bx = cx2 + 5 + b * 14, by = top + 4;
    ctx.fillStyle = ['#ff7043', '#ffd60a', '#9c59d1', '#e17055', '#00b894'][b % 5];
    ctx.fillRect(bx, by, 12, 12); ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, 12, 12);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(bx + 6, by); ctx.lineTo(bx + 6, by + 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx, by + 6); ctx.lineTo(bx + 12, by + 6); ctx.stroke();
  }
  if (boxes > 4) { ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.font = 'bold 9px Nunito'; ctx.textAlign = 'center'; ctx.fillText(`+${boxes - 4}`, cx2 + cw - 8, top + 14); }
}

function drawSpeedArrows(ctx, x, cy, vx, color) {
  const speed = Math.min(vx, 7);
  const numArrows = Math.ceil(speed / 2.5);
  for (let i = 0; i < numArrows; i++) {
    const ax = x + i * 14, opacity = 0.4 + 0.6 * (i / numArrows);
    ctx.strokeStyle = color; ctx.globalAlpha = opacity; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ax, cy - 5); ctx.lineTo(ax + 10, cy); ctx.lineTo(ax, cy + 5); ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function updateG2ScoreUI() {
  document.getElementById('g2score').textContent = `🏁 Round: ${G2.round} / ${G2_ROUNDS.length}`;
  const labels = ['🪶 Light vs heavy', '🪶 Light vs heavier', '📦 Light vs heaviest'];
  document.getElementById('g2roundLabel').textContent = G2.round < G2_ROUNDS.length ? labels[G2.round] : '🏆 All done!';
}

// ══════════════════════════════════════
//  GAME 3 — ROCKET GAME
// ══════════════════════════════════════
let G3 = {}, g3AnimId = null;

function startGame3() {
  const c = document.getElementById('game3Canvas');
  c.width = c.parentElement.clientWidth;
  document.getElementById('g3btn').textContent = '↺ Restart';
  document.getElementById('g3btn').onclick = startGame3;
  G3 = { rocket: { x: 60, y: c.height / 2, vy: 0 }, gravity: 0.18, thrust: -4.5, stars: [], meteors: [], starTimer: 0, meteorTimer: 0, score: 0, lives: 3, t: 0, gameOver: false, won: false, thrustFlash: 0, hitFlash: 0 };
  spawnStar3(c); updateG3UI();
  cancelAnimationFrame(g3AnimId);
  c.onclick = doThrust3;
  c.ontouchstart = (e) => { e.preventDefault(); doThrust3(); };
  gameLoop3(c);
}

function doThrust3() { if (G3.gameOver || G3.won) return; G3.rocket.vy = G3.thrust; G3.thrustFlash = 10; }

function spawnStar3(c) { G3.stars.push({ x: c.width + 20, y: 30 + Math.random() * (c.height - 60), vx: -(2 + Math.random() * 1.5), r: 14, collected: false }); }

function spawnMeteor3(c) { G3.meteors.push({ x: c.width + 20, y: 20 + Math.random() * (c.height - 40), vx: -(2.5 + Math.random() * 2), r: 16, hit: false }); }

function gameLoop3(c) {
  const ctx = c.getContext('2d');
  G3.t++;
  const W = c.width, H = c.height;
  if (!G3.gameOver && !G3.won) {
    G3.rocket.vy += G3.gravity;
    G3.rocket.y += G3.rocket.vy;
    G3.rocket.y = Math.max(18, Math.min(H - 18, G3.rocket.y));
    if (G3.rocket.y <= 18 || G3.rocket.y >= H - 18) G3.rocket.vy *= -0.4;
    G3.starTimer++; if (G3.starTimer > 80) { spawnStar3(c); G3.starTimer = 0; }
    G3.meteorTimer++; if (G3.meteorTimer > 120 && G3.score >= 2) { spawnMeteor3(c); G3.meteorTimer = 0; }
    G3.stars.forEach(s => { s.x += s.vx; });
    G3.meteors.forEach(m => { m.x += m.vx; });
    G3.stars = G3.stars.filter(s => s.x > -30 && !s.collected);
    G3.meteors = G3.meteors.filter(m => m.x > -30 && !m.hit);
    G3.stars.forEach(s => { const dx = G3.rocket.x - s.x, dy = G3.rocket.y - s.y; if (Math.sqrt(dx * dx + dy * dy) < s.r + 16) { s.collected = true; G3.score++; updateG3UI(); } });
    G3.meteors.forEach(m => { const dx = G3.rocket.x - m.x, dy = G3.rocket.y - m.y; if (Math.sqrt(dx * dx + dy * dy) < m.r + 14) { m.hit = true; G3.lives = Math.max(0, G3.lives - 1); G3.hitFlash = 20; updateG3UI(); } });
    G3.stars = G3.stars.filter(s => !s.collected);
    G3.meteors = G3.meteors.filter(m => !m.hit);
    if (G3.score >= 8) G3.won = true;
    if (G3.lives <= 0) G3.gameOver = true;
  }
  if (G3.thrustFlash > 0) G3.thrustFlash--;
  if (G3.hitFlash > 0) G3.hitFlash--;
  drawGame3(ctx, c);
  if (!G3.gameOver && !G3.won) g3AnimId = requestAnimationFrame(() => gameLoop3(c));
}

function drawGame3(ctx, c) {
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0d1b2a'); bg.addColorStop(1, '#1a3352');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  if (G3.hitFlash > 0) { ctx.fillStyle = `rgba(255,80,80,${G3.hitFlash / 20 * 0.35})`; ctx.fillRect(0, 0, W, H); }
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  [[W * 0.1, 15], [W * 0.3, 40], [W * 0.5, 12], [W * 0.7, 35], [W * 0.88, 18], [W * 0.2, 60], [W * 0.6, 55], [W * 0.85, 50]].forEach(([sx, sy]) => {
    ctx.beginPath(); ctx.arc(sx, sy, 1.2, 0, Math.PI * 2); ctx.fill();
  });
  ctx.fillStyle = 'rgba(100,200,100,0.2)'; ctx.fillRect(0, H - 16, W, 16);
  ctx.fillStyle = 'rgba(100,200,100,0.4)'; ctx.font = '9px Nunito'; ctx.textAlign = 'center'; ctx.fillText('EARTH BELOW 🌍', W / 2, H - 4);
  G3.stars.forEach(s => {
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = '#ffd600'; ctx.fill();
    ctx.fillStyle = '#ffd600'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('⭐', s.x - 9, s.y + 7);
  });
  G3.meteors.forEach(m => {
    ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fillStyle = '#795548'; ctx.fill();
    ctx.strokeStyle = '#5d4037'; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('☄️', m.x - 9, m.y + 7);
  });
  if (G3.thrustFlash > 0) {
    const fl = G3.thrustFlash;
    ctx.fillStyle = `rgba(255,150,0,${fl / 10 * 0.9})`;
    ctx.beginPath(); ctx.moveTo(G3.rocket.x - 8, G3.rocket.y + 18); ctx.lineTo(G3.rocket.x, G3.rocket.y + 18 + fl * 3); ctx.lineTo(G3.rocket.x + 8, G3.rocket.y + 18); ctx.fill();
    ctx.fillStyle = `rgba(255,180,0,${fl / 10})`; ctx.font = 'bold 10px Nunito'; ctx.textAlign = 'center';
    ctx.fillText('🔥 FIRE DOWN! (Action)', G3.rocket.x + 55, G3.rocket.y + 40);
    ctx.fillStyle = `rgba(100,255,180,${fl / 10})`; ctx.fillText('⬆️ Rocket UP (Reaction)', G3.rocket.x + 55, G3.rocket.y + 54);
  }
  const rx = G3.rocket.x, ry = G3.rocket.y;
  ctx.beginPath(); ctx.arc(rx, ry, 24, 0, Math.PI * 2); ctx.fillStyle = 'rgba(156,89,209,0.18)'; ctx.fill();
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath(); ctx.moveTo(rx, ry - 18); ctx.lineTo(rx - 12, ry + 14); ctx.lineTo(rx + 12, ry + 14); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#bdbdbd'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = '#9c59d1';
  ctx.beginPath(); ctx.moveTo(rx, ry - 30); ctx.lineTo(rx - 8, ry - 14); ctx.lineTo(rx + 8, ry - 14); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(rx, ry, 6, 0, Math.PI * 2); ctx.fillStyle = '#81d4fa'; ctx.fill();
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = '#9c59d1';
  ctx.beginPath(); ctx.moveTo(rx - 12, ry + 14); ctx.lineTo(rx - 20, ry + 20); ctx.lineTo(rx - 12, ry + 6); ctx.fill();
  ctx.beginPath(); ctx.moveTo(rx + 12, ry + 14); ctx.lineTo(rx + 20, ry + 20); ctx.lineTo(rx + 12, ry + 6); ctx.fill();
  if (G3.thrustFlash === 0) {
    const pulse = 0.5 + 0.5 * Math.sin(G3.t * 0.12);
    ctx.fillStyle = `rgba(156,89,209,${pulse})`; ctx.font = 'bold 11px Nunito'; ctx.textAlign = 'center';
    ctx.fillText('TAP TO BOOST! 👆', rx, ry - 36);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; roundR(ctx, 8, 8, 115, 28, 8); ctx.fill();
  ctx.fillStyle = '#9c59d1'; ctx.font = 'bold 13px Baloo 2'; ctx.textAlign = 'left'; ctx.fillText(`⭐ ${G3.score} / 8`, 14, 27);
  if (G3.won || G3.gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.58)'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 22px Baloo 2'; ctx.textAlign = 'center';
    ctx.fillText(G3.won ? '🚀 Rocket Star!' : '💥 Try Again!', W / 2, H / 2 - 14);
    ctx.font = '13px Nunito';
    ctx.fillText(G3.won ? 'Fire DOWN → fly UP! Action & Reaction!' : 'Tap to fire and dodge meteors!', W / 2, H / 2 + 14);
  }
}

function updateG3UI() {
  document.getElementById('g3score').textContent = `⭐ Stars: ${G3.score}`;
  document.getElementById('g3lives').textContent = '❤️'.repeat(G3.lives) + '🖤'.repeat(3 - G3.lives);
}

// ══════════════════════════════════════
//  QUIZ
// ══════════════════════════════════════
const QS = [
  { law: '⚽ First Law', lc: '#ff7043', scene: '⚽', q: 'A ball is sitting still on the ground. What makes it move?', opts: ['It moves by itself', 'A force must push or kick it', 'Wind always moves it', 'Gravity moves it sideways'], ans: 1, fb: '✅ Correct! A ball at rest needs a force (like a kick) to start moving. That\'s the First Law!' },
  { law: '⚽ First Law', lc: '#ff7043', scene: '🚗💨', q: 'A toy car is rolling. Nothing is touching it. What happens next?', opts: ['It goes faster', 'It stops immediately', 'It keeps rolling until something stops it', 'It turns around'], ans: 2, fb: '✅ Right! In motion = stays in motion. It keeps going until friction stops it!' },
  { law: '🛒 Second Law', lc: '#00b894', scene: '🛒 vs 🛒📦', q: 'You push an empty cart and a full cart with the SAME force. Which moves faster?', opts: ['Full cart', 'They go the same speed', 'Empty cart', 'Neither moves'], ans: 2, fb: '✅ Exactly! Less mass → more acceleration! The empty cart zooms ahead!' },
  { law: '🛒 Second Law', lc: '#00b894', scene: 'F = m × a', q: 'What does the formula F = ma mean?', opts: ['Force equals more and acceleration', 'Force = Mass × Acceleration', 'Force means acceleration', 'Faster = more animals'], ans: 1, fb: '✅ Perfect! F = ma means Force equals Mass times Acceleration!' },
  { law: '🛒 Second Law', lc: '#00b894', scene: '💪🏋️', q: 'You push a car with twice the force. The acceleration will...', opts: ['Stay the same', 'Become half', 'Double', 'Triple'], ans: 2, fb: '✅ Yes! Double the force = double the acceleration!' },
  { law: '🚀 Third Law', lc: '#9c59d1', scene: '🚀🔥', q: 'Why does a rocket fly upward?', opts: ['It\'s very light', 'Gases shoot down and push it up', 'Wind pushes it', 'It floats like a balloon'], ans: 1, fb: '✅ Brilliant! Gases push down (action) → rocket goes up (reaction). Newton\'s Third Law!' },
  { law: '🚀 Third Law', lc: '#9c59d1', scene: '🏊', q: 'A swimmer pushes water backward. What pushes the swimmer forward?', opts: ['Their goggles', 'The water pushing them forward', 'Their swimsuit', 'Luck'], ans: 1, fb: '✅ Correct! The water pushes back (reaction). Equal and opposite!' },
  { law: '⚽ First Law', lc: '#ff7043', scene: '🚌😮', q: 'Why do you slide forward when a bus suddenly brakes?', opts: ['The bus pushes you', 'Your body keeps moving forward due to inertia', 'Gravity pulls you', 'You jumped'], ans: 1, fb: '✅ Yes! Your body has inertia — it wants to keep moving even when the bus stops!' },
  { law: '🚀 Third Law', lc: '#9c59d1', scene: '🚣', q: 'You push off a wall in a swimming pool. You move...', opts: ['Toward the wall', 'Nowhere', 'Away from the wall', 'Downward'], ans: 2, fb: '✅ Exactly! You push the wall (action) → wall pushes you away (reaction)!' },
  { law: '🛒 Second Law', lc: '#00b894', scene: '🔢', q: 'A 2 kg toy gets 10 N of force. What is the acceleration? (a = F ÷ m)', opts: ['2 m/s²', '20 m/s²', '5 m/s²', '8 m/s²'], ans: 2, fb: '✅ Super! a = 10 ÷ 2 = 5 m/s². You\'re a physics genius! 🧠' }
];

let qi = 0, qscore = 0, qdone = false;

function startQuiz() {
  qi = 0; qscore = 0; qdone = false;
  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('quizActive').style.display = 'block';
  showQ();
}

function showQ() {
  qdone = false;
  const q = QS[qi];
  document.getElementById('qNum').textContent = `Question ${qi + 1} of ${QS.length}`;
  document.getElementById('qStar').textContent = `⭐ ${qscore} stars`;
  document.getElementById('qFill').style.width = `${((qi + 1) / QS.length) * 100}%`;
  const tag = document.getElementById('qTag');
  tag.textContent = q.law; tag.style.background = q.lc + '22'; tag.style.color = q.lc;
  document.getElementById('qScene').textContent = q.scene;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qFeedback').className = 'q-feedback';
  document.getElementById('nextBtn').className = 'next-q-btn';
  const letters = ['A', 'B', 'C', 'D'];
  const grid = document.getElementById('optsGrid');
  grid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const b = document.createElement('button');
    b.className = 'opt-btn';
    b.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
    b.onclick = () => checkA(i, b);
    grid.appendChild(b);
  });
}

function checkA(idx, btn) {
  if (qdone) return;
  qdone = true;
  const q = QS[qi];
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.add('disabled'));
  const fb = document.getElementById('qFeedback');
  if (idx === q.ans) {
    qscore++;
    btn.classList.add('correct');
    fb.textContent = q.fb; fb.className = 'q-feedback correct show';
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.opt-btn')[q.ans].classList.add('correct');
    fb.textContent = '❌ Not quite! ' + q.fb.replace('✅ ', '');
    fb.className = 'q-feedback wrong show';
  }
  document.getElementById('qStar').textContent = `⭐ ${qscore} stars`;
  document.getElementById('nextBtn').className = 'next-q-btn show';
}

function nextQ() {
  qi++;
  if (qi >= QS.length) showResults();
  else showQ();
}

function showResults() {
  document.getElementById('quizActive').style.display = 'none';
  const r = document.getElementById('quizResults');
  r.style.display = 'block';
  const pct = Math.round(qscore / QS.length * 100);
  document.getElementById('finalNum').textContent = qscore;
  const ring = document.getElementById('scoreRing');
  let emoji, title, msg, rc;
  if (pct >= 90) { emoji = '🏆'; title = 'Science Champion!'; msg = 'Incredible! Newton would be SO proud of you! 🎉'; rc = '#ffd60a'; }
  else if (pct >= 70) { emoji = '🌟'; title = 'Great Job!'; msg = 'You know your Newton\'s Laws really well! Keep it up! 💪'; rc = '#00b894'; }
  else if (pct >= 50) { emoji = '👍'; title = 'Good Try!'; msg = 'You\'re learning! Watch the animations again and try once more!'; rc = '#9c59d1'; }
  else { emoji = '📚'; title = 'Keep Learning!'; msg = 'Science takes practice! Look at the cards and try again!'; rc = '#ff7043'; }
  document.getElementById('resEmoji').textContent = emoji;
  ring.style.borderColor = rc;
  ring.querySelector('.big-num').style.color = rc;
  document.getElementById('resTitle').textContent = title;
  document.getElementById('resMsg').textContent = msg;
}

// ══════════════════════════════════════
//  IDLE DRAW HELPERS
// ══════════════════════════════════════
function drawIdleGame1() {
  const c = document.getElementById('game1Canvas');
  if (!c) return;
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, W, H * 0.6);
  ctx.fillStyle = '#5aaa30'; ctx.fillRect(0, H * 0.6, W, H * 0.4);
  ctx.beginPath(); ctx.arc(W / 3, H * 0.6 - 22, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5; ctx.stroke();
  [[0, -13], [9, 7], [-9, 7]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(W / 3 + dx, H * 0.6 - 22 + dy, 4, 0, Math.PI * 2); ctx.fillStyle = '#222'; ctx.fill(); });
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(W - 60, H * 0.3, 58, H * 0.35);
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(W - 60, H * 0.3, 58, H * 0.35);
  ctx.fillStyle = '#2d3a4a'; ctx.font = 'bold 12px Nunito'; ctx.textAlign = 'center'; ctx.fillText('Press Start!', W / 2, H / 2);
}

function drawIdleGame3() {
  const c = document.getElementById('game3Canvas');
  if (!c) return;
  const ctx = c.getContext('2d'), W = c.width, H = c.height;
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0d1b2a'); bg.addColorStop(1, '#1a3352');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const rx = 60, ry = H / 2;
  ctx.fillStyle = '#e0e0e0';
  ctx.beginPath(); ctx.moveTo(rx, ry - 18); ctx.lineTo(rx - 12, ry + 14); ctx.lineTo(rx + 12, ry + 14); ctx.fill();
  ctx.fillStyle = '#9c59d1';
  ctx.beginPath(); ctx.moveTo(rx, ry - 30); ctx.lineTo(rx - 8, ry - 14); ctx.lineTo(rx + 8, ry - 14); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px Nunito'; ctx.textAlign = 'center'; ctx.fillText('Press Start!', W / 2, H / 2);
}

// ══════════════════════════════════════
//  INIT ON PAGE LOAD
// ══════════════════════════════════════
window.addEventListener('load', () => {
  ['game1Canvas', 'game3Canvas'].forEach(id => {
    const c = document.getElementById(id);
    if (c) c.width = c.parentElement.clientWidth;
  });
  drawIdleGame1();
  initGame2();
  g2GameLoop();
  drawIdleGame3();
  initSB1();
});
