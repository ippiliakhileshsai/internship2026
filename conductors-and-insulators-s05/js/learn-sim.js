/* ═══════════════════════════════════════════════════════
   CONDUCTOVERSE — Learn Page Atomic Simulations
   Visualizes free electrons in copper and locked electrons
   in insulators with interactive mouse-drag and control panel mechanics.
   ═══════════════════════════════════════════════════════ */

(function () {
    // Helper to setup canvas
    function createSimCanvas(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return null;

        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        container.appendChild(canvas);

        const rect = container.getBoundingClientRect();
        canvas.width = rect.width || 340;
        canvas.height = rect.height || 180;

        return { canvas, ctx: canvas.getContext("2d") };
    }

    // ═══════════════════ CONDUCTOR SIMULATION ═══════════════════
    const condSetup = createSimCanvas("conductorSim");
    if (condSetup) {
        const { canvas, ctx } = condSetup;
        const width = canvas.width;
        const height = canvas.height;

        const atoms = [
            { x: width * 0.22, y: height * 0.5, r: 24, label: "Cu²⁺" },
            { x: width * 0.5, y: height * 0.5, r: 24, label: "Cu²⁺" },
            { x: width * 0.78, y: height * 0.5, r: 24, label: "Cu²⁺" }
        ];

        const electrons = [];
        const numElectrons = 14;
        for (let i = 0; i < numElectrons; i++) {
            electrons.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: 4,
                glowColor: "#00f3ff"
            });
        }

        // Voltage control hook
        const voltageSlider = document.getElementById("voltageSlider");
        let voltage = parseFloat(voltageSlider ? voltageSlider.value : 1.5);

        if (voltageSlider) {
            voltageSlider.addEventListener("input", (e) => {
                voltage = parseFloat(e.target.value);
            });
        }

        let dragStart = null;
        let dragForce = { x: 0, y: 0 };

        canvas.addEventListener("mousedown", (e) => {
            const rect = canvas.getBoundingClientRect();
            dragStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        });

        canvas.addEventListener("mousemove", (e) => {
            if (!dragStart) return;
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            dragForce.x = (currentX - dragStart.x) * 0.08;
            dragForce.y = (currentY - dragStart.y) * 0.08;

            for (let el of electrons) {
                el.vx += dragForce.x * 0.15;
                el.vy += dragForce.y * 0.15;
            }

            dragStart = { x: currentX, y: currentY };
        });

        window.addEventListener("mouseup", () => {
            dragStart = null;
        });

        canvas.addEventListener("touchstart", (e) => {
            if (e.touches.length === 0) return;
            const rect = canvas.getBoundingClientRect();
            dragStart = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        });

        canvas.addEventListener("touchmove", (e) => {
            if (!dragStart || e.touches.length === 0) return;
            const rect = canvas.getBoundingClientRect();
            const currentX = e.touches[0].clientX - rect.left;
            const currentY = e.touches[0].clientY - rect.top;

            dragForce.x = (currentX - dragStart.x) * 0.08;
            dragForce.y = (currentY - dragStart.y) * 0.08;

            for (let el of electrons) {
                el.vx += dragForce.x * 0.15;
                el.vy += dragForce.y * 0.15;
            }
            dragStart = { x: currentX, y: currentY };
        });

        canvas.addEventListener("touchend", () => {
            dragStart = null;
        });

        function renderConductor() {
            // Draw a translucent black/blue overlay to create neon motion trails
            ctx.fillStyle = "rgba(240, 247, 255, 0.4)"; 
            ctx.fillRect(0, 0, width, height);

            // Draw copper atoms
            for (let atom of atoms) {
                // Outer glow ring
                ctx.beginPath();
                ctx.arc(atom.x, atom.y, atom.r + 6, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 145, 0, 0.05)";
                ctx.fill();

                // Atom base
                ctx.beginPath();
                ctx.arc(atom.x, atom.y, atom.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
                ctx.strokeStyle = "rgba(255, 145, 0, 0.85)";
                ctx.lineWidth = 2.5;
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#ff7a18";
                ctx.font = "bold 11px Outfit";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(atom.label, atom.x, atom.y);
            }

            // Draw and update free electrons
            for (let el of electrons) {
                // Constant base drift proportional to voltage
                el.vx += voltage * 0.035;

                // Move
                el.x += el.vx;
                el.y += el.vy;

                // Friction
                el.vx *= 0.96;
                el.vy *= 0.96;

                // Boundary bounce
                if (el.y - el.size < 6) {
                    el.y = 6 + el.size;
                    el.vy *= -1;
                }
                if (el.y + el.size > height - 6) {
                    el.y = height - 6 - el.size;
                    el.vy *= -1;
                }

                // Wrap left/right
                if (el.x < 0) el.x = width;
                if (el.x > width) el.x = 0;

                // Draw electron glow
                ctx.beginPath();
                ctx.arc(el.x, el.y, el.size + 4, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0, 243, 255, 0.35)";
                ctx.fill();

                // Draw core
                ctx.beginPath();
                ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.fill();
            }

            requestAnimationFrame(renderConductor);
        }
        renderConductor();
    }

    // ═══════════════════ INSULATOR SIMULATION ═══════════════════
    const insSetup = createSimCanvas("insulatorSim");
    if (insSetup) {
        const { canvas, ctx } = insSetup;
        const width = canvas.width;
        const height = canvas.height;

        const atoms = [
            { x: width * 0.22, y: height * 0.5, r: 24, label: "Core" },
            { x: width * 0.5, y: height * 0.5, r: 24, label: "Core" },
            { x: width * 0.78, y: height * 0.5, r: 24, label: "Core" }
        ];

        const boundElectrons = [];
        const orbitRadius = 45;
        atoms.forEach((atom, idx) => {
            for (let i = 0; i < 3; i++) {
                const angle = (Math.PI * 2 / 3) * i + Math.random() * 0.2;
                boundElectrons.push({
                    atomIdx: idx,
                    angle: angle,
                    speed: 0.015 + Math.random() * 0.005,
                    ox: 0,
                    oy: 0,
                    wobbleTime: 0
                });
            }
        });

        let dragTarget = null;
        let isDragging = false;
        let dragPos = { x: 0, y: 0 };
        let electrostaticStress = 0; // Stress factor when electrostatic pull is enabled
        let stressActive = false;

        // Stress test button hook
        const btnStressTest = document.getElementById("btnStressTest");
        if (btnStressTest) {
            btnStressTest.addEventListener("click", () => {
                stressActive = !stressActive;
                if (stressActive) {
                    btnStressTest.textContent = "Release Pull";
                    btnStressTest.style.background = "linear-gradient(135deg, #2a9d8f, #264653) !important";
                } else {
                    btnStressTest.textContent = "Apply Electrostatic Pull";
                    btnStressTest.style.background = "";
                }
            });
        }

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (e.clientX || e.touches[0].clientX) - rect.left,
                y: (e.clientY || e.touches[0].clientY) - rect.top
            };
        }

        function startDrag(e) {
            isDragging = true;
            dragPos = getMousePos(e);
        }

        function moveDrag(e) {
            if (!isDragging) return;
            dragPos = getMousePos(e);
        }

        function stopDrag() {
            isDragging = false;
        }

        canvas.addEventListener("mousedown", startDrag);
        canvas.addEventListener("mousemove", moveDrag);
        window.addEventListener("mouseup", stopDrag);

        canvas.addEventListener("touchstart", startDrag);
        canvas.addEventListener("touchmove", moveDrag);
        canvas.addEventListener("touchend", stopDrag);

        function renderInsulator() {
            // Draw a translucent black/blue overlay to create neon motion trails
            ctx.fillStyle = "rgba(240, 247, 255, 0.4)"; 
            ctx.fillRect(0, 0, width, height);

            // Animate electrostatic stress waves if active
            if (stressActive) {
                electrostaticStress += (20 - electrostaticStress) * 0.1;
                
                // Draw vertical electric field lines in the background
                ctx.strokeStyle = "rgba(255, 51, 81, 0.08)";
                ctx.lineWidth = 3;
                for (let x = 10; x < width; x += 30) {
                    ctx.beginPath();
                    ctx.moveTo(x + Math.sin(Date.now() * 0.01 + x) * 6, 0);
                    ctx.lineTo(x + Math.sin(Date.now() * 0.01 + x) * 6, height);
                    ctx.stroke();
                }
            } else {
                electrostaticStress += (0 - electrostaticStress) * 0.1;
            }

            // Draw Atoms and orbits
            atoms.forEach((atom, idx) => {
                // Orbit circle
                ctx.beginPath();
                ctx.arc(atom.x, atom.y, orbitRadius, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(100, 116, 139, 0.12)";
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]); // Reset

                // Nucleus
                ctx.beginPath();
                ctx.arc(atom.x, atom.y, atom.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
                ctx.strokeStyle = "rgba(78, 101, 127, 0.85)";
                ctx.lineWidth = 2.5;
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#334155";
                ctx.font = "bold 10px Inter";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(atom.label, atom.x, atom.y);
            });

            // Draw bound electrons
            for (let el of boundElectrons) {
                const atom = atoms[el.atomIdx];
                
                // Base orbit position
                el.angle += el.speed;
                const orbitX = atom.x + Math.cos(el.angle) * orbitRadius;
                const orbitY = atom.y + Math.sin(el.angle) * orbitRadius;

                // Mouse interaction - pull electron towards drag position but lock it back with a strong spring force
                let targetX = orbitX;
                let targetY = orbitY;

                // Apply constant electrostatic pull stress (pull to the right)
                if (electrostaticStress > 0.5) {
                    targetX += electrostaticStress * 0.8; 
                    el.wobbleTime = 2; // Trigger wobble alert
                }

                if (isDragging) {
                    const dx = dragPos.x - orbitX;
                    const dy = dragPos.y - orbitY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const pullForce = (120 - dist) / 120;
                        targetX += (dx / dist) * pullForce * 12;
                        targetY += (dy / dist) * pullForce * 12;
                        el.wobbleTime = 10; 
                    }
                }

                // Spring ease to target position
                el.ox += (targetX - (orbitX + el.ox)) * 0.25;
                el.oy += (targetY - (orbitY + el.oy)) * 0.25;

                const ex = orbitX + el.ox;
                const ey = orbitY + el.oy;

                // Draw connection spring line if stretched
                if (Math.abs(el.ox) > 2 || Math.abs(el.oy) > 2) {
                    ctx.beginPath();
                    ctx.moveTo(orbitX, orbitY);
                    ctx.lineTo(ex, ey);
                    ctx.strokeStyle = stressActive ? "rgba(255, 51, 81, 0.4)" : "rgba(22, 104, 255, 0.3)";
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                // Draw locked electron core
                ctx.beginPath();
                ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
                ctx.fillStyle = stressActive ? "rgba(255, 51, 81, 0.8)" : "#94a3b8"; 
                ctx.fill();

                // Draw padlock
                ctx.fillStyle = "#334155";
                ctx.font = "8px Inter";
                ctx.fillText("🔒", ex + 1, ey - 6);

                // If user stretches or stresses, show warning labels
                if (el.wobbleTime > 0) {
                    ctx.fillStyle = stressActive ? "rgba(255, 51, 81, 0.95)" : "rgba(22, 104, 255, 0.95)";
                    ctx.font = "bold 8px Inter";
                    ctx.fillText(stressActive ? "STRESS! 🔒" : "Locked! 🔒", ex, ey + 10);
                    el.wobbleTime--;
                }
            }

            requestAnimationFrame(renderInsulator);
        }
        renderInsulator();
    }
})();
