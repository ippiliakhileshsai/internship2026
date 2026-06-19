const circuitStage = document.getElementById("circuitStage");
const message = document.getElementById("message");
const next = document.getElementById("next");
const testMaterial = document.getElementById("testMaterial");
const choiceButtons = document.querySelectorAll(".material-choice");

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => testChoice(button));
});

function testChoice(button) {
    // Toggle active state on buttons
    choiceButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const isConductor = button.dataset.kind === "conductor";
    const material = button.dataset.material;
    const note = button.dataset.note;

    testMaterial.textContent = material;
    
    if (isConductor) {
        circuitStage.classList.add("is-lit");
        circuitStage.classList.remove("is-blocked");
    } else {
        circuitStage.classList.add("is-blocked");
        circuitStage.classList.remove("is-lit");
    }

    // Update multimeter readings
    const meterStatus = document.getElementById("meter-status");
    const meterCurrent = document.getElementById("meter-current");
    const meterVoltage = document.getElementById("meter-voltage");
    const meterResistance = document.getElementById("meter-resistance");

    if (meterStatus && meterCurrent && meterVoltage && meterResistance) {
        if (isConductor) {
            meterStatus.textContent = "CONNECTED";
            meterStatus.className = "meter-val connected";
            meterCurrent.textContent = "2.40 A";
            meterVoltage.textContent = "12.00 V";
            meterResistance.textContent = "5.00 Ω";
        } else {
            meterStatus.textContent = "BLOCKED";
            meterStatus.className = "meter-val blocked";
            meterCurrent.textContent = "0.00 A";
            meterVoltage.textContent = "12.00 V";
            meterResistance.textContent = "∞ Ω";
        }
    }

    message.className = isConductor ? "message success" : "message error";
    message.innerHTML = isConductor
        ? `<strong>${material} is a conductor.</strong><br>${note}<br>The circuit is complete, so the bulb glows!`
        : `<strong>${material} is an insulator.</strong><br>${note}<br>The circuit is blocked, so the bulb stays off.`;

    next.style.display = isConductor ? "flex" : "none";
}
