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
    circuitStage.className = isConductor ? "circuit-stage is-lit" : "circuit-stage is-blocked";

    message.className = isConductor ? "message success" : "message error";
    message.innerHTML = isConductor
        ? `<strong>${material} is a conductor.</strong><br>${note}<br>The circuit is complete, so the bulb glows!`
        : `<strong>${material} is an insulator.</strong><br>${note}<br>The circuit is blocked, so the bulb stays off.`;

    next.style.display = isConductor ? "flex" : "none";
}
