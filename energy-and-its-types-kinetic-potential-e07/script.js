// Slider Elements
const heightSlider = document.getElementById("height");
const massSlider = document.getElementById("mass");
const speedSlider = document.getElementById("speed");

const heightValue = document.getElementById("heightValue");
const massValue = document.getElementById("massValue");
const speedValue = document.getElementById("speedValue");

// Energy Values
const peText = document.getElementById("pe");
const keText = document.getElementById("ke");
const teText = document.getElementById("te");

// Ball
const ball = document.getElementById("ball");

// Update slider values live
heightSlider.addEventListener("input", updateSimulation);
massSlider.addEventListener("input", updateSimulation);
speedSlider.addEventListener("input", updateSimulation);

// Chart
const ctx = document.getElementById("energyChart").getContext("2d");

const energyChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            "Potential Energy",
            "Kinetic Energy",
            "Total Energy"
        ],
        datasets: [{
            label: "Energy (J)",
            data: [98.1, 0, 98.1],
            backgroundColor: [
                "#4CAF50",
                "#2196F3",
                "#9C27B0"
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Calculate Energy
function updateSimulation() {

    let h = parseFloat(heightSlider.value);
    let m = parseFloat(massSlider.value);
    let v = parseFloat(speedSlider.value);

    heightValue.textContent = h;
    massValue.textContent = m;
    speedValue.textContent = v;

    let g = 9.81;

    let PE = m * g * h;
    let KE = 0.5 * m * v * v;
    let TE = PE + KE;

    peText.textContent = PE.toFixed(2) + " J";
    keText.textContent = KE.toFixed(2) + " J";
    teText.textContent = TE.toFixed(2) + " J";

    // Update graph
    energyChart.data.datasets[0].data = [
        PE,
        KE,
        TE
    ];

    energyChart.update();
}

// Start Animation
function startSimulation() {

    let h = parseFloat(heightSlider.value);

    ball.style.transition = "all 2s ease";

    let newTop = 280 - (h * 10);

    ball.style.top = newTop + "px";
    ball.style.left = "620px";

    updateSimulation();
}

// Reset
function resetSimulation() {

    heightSlider.value = 10;
    massSlider.value = 1;
    speedSlider.value = 0;

    ball.style.transition = "none";
    ball.style.left = "365px";
    ball.style.top = "-35px";

    updateSimulation();
}

// Initial Load
updateSimulation();