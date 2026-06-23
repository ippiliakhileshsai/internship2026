import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import {
  Pie,
  Bar,
  Doughnut,
} from "react-chartjs-2";

import { useEnergy } from "../context/EnergyContext";

import "../styles/ChartsSection.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ChartsSection = () => {
  const {
    energyMix,
    simulationResults,
  } = useEnergy();

  const pieData = {
    labels: [
      "Solar",
      "Wind",
      "Hydro",
      "Coal",
      "Petroleum",
    ],

    datasets: [
      {
        data: [
          energyMix.solar,
          energyMix.wind,
          energyMix.hydro,
          energyMix.coal,
          energyMix.petroleum,
        ],

        backgroundColor: [
          "#facc15",
          "#60a5fa",
          "#06b6d4",
          "#ef4444",
          "#f97316",
        ],
      },
    ],
  };

  const barData = {
    labels: [
      "Solar",
      "Wind",
      "Hydro",
      "Coal",
      "Petroleum",
    ],

    datasets: [
      {
        label:
          "Sustainability",

        data: [
          95,
          90,
          80,
          25,
          20,
        ],

        backgroundColor: [
          "#22c55e",
          "#16a34a",
          "#10b981",
          "#ef4444",
          "#f97316",
        ],
      },
    ],
  };

  const gaugeData = {
    labels: [
      "Score",
      "Remaining",
    ],

    datasets: [
      {
        data: [
          simulationResults.sustainability,
          100 -
            simulationResults.sustainability,
        ],

        backgroundColor: [
          "#22c55e",
          "#1f2937",
        ],

        borderWidth: 0,
      },
    ],
  };

  return (
    <section className="charts-section">
      <div className="chart-card">
        <h2>
          Energy Mix
        </h2>

        <Pie data={pieData} />
      </div>

      <div className="chart-card">
        <h2>
          Sustainability
          Comparison
        </h2>

        <Bar data={barData} />
      </div>

      <div className="chart-card">
        <h2>
          Sustainability
          Gauge
        </h2>

        <div className="gauge-container">
          <Doughnut
            data={gaugeData}
          />

          <div className="gauge-text">
            {
              simulationResults.sustainability
            }
            %
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;
