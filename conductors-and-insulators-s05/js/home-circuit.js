/* ═══════════════════════════════════════════════════════
   CONDUCTOVERSE — Home Hero Page Interactive Circuit
   Coordinates selector choices, ON/OFF switch state, and
   mascot explanations for the home page hero circuit.
   ═══════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
    const stage = document.getElementById("heroCircuitStage");
    const switchBtn = document.getElementById("heroSwitchBtn");
    const testItem = document.getElementById("heroTestItem");
    const mascotText = document.getElementById("heroMascotText");
    const choiceBtns = document.querySelectorAll(".hero-choice-btn");

    let selectedMaterial = null; // Stores currently selected material object
    let isSwitchOn = false;

    // Material choice handlers
    choiceBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active style from all choice buttons
            choiceBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Store selected material data
            selectedMaterial = {
                name: btn.dataset.name,
                kind: btn.dataset.kind,
                emoji: btn.dataset.emoji,
                desc: btn.dataset.desc
            };

            // Update slot on circuit
            testItem.textContent = `${selectedMaterial.emoji} ${selectedMaterial.name}`;
            testItem.className = `test-item-slot slotted ${selectedMaterial.kind}`;

            // Reset switch representation when changing materials
            updateCircuitState();
        });
    });

    // Switch click handler
    switchBtn.addEventListener("click", () => {
        isSwitchOn = !isSwitchOn;
        if (isSwitchOn) {
            switchBtn.textContent = "ON";
            switchBtn.className = "hero-switch-btn on";
        } else {
            switchBtn.textContent = "OFF";
            switchBtn.className = "hero-switch-btn off";
        }
        updateCircuitState();
    });

    function updateCircuitState() {
        if (!selectedMaterial) {
            mascotText.innerHTML = "Select a material first, then flip the switch <strong>ON</strong> to test!";
            stage.className = "circuit-stage";
            return;
        }

        if (isSwitchOn) {
            if (selectedMaterial.kind === "conductor") {
                stage.className = "circuit-stage is-lit";
                mascotText.innerHTML = `🌟 <strong>${selectedMaterial.name} conducts!</strong> ${selectedMaterial.desc}`;
            } else {
                stage.className = "circuit-stage is-blocked";
                mascotText.innerHTML = `⚠️ <strong>${selectedMaterial.name} blocks!</strong> ${selectedMaterial.desc}`;
            }
        } else {
            stage.className = "circuit-stage";
            mascotText.innerHTML = `Click the Switch to turn it <strong>ON</strong> and test the <strong>${selectedMaterial.name}</strong>!`;
        }
    }
});
