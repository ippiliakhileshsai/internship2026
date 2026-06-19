import { useState } from "react";
import { motion } from "framer-motion";

import { useEnergy } from "../context/EnergyContext";

import { calculateScores } from "../utils/simulation_engine";
import { evaluateMix } from "../utils/recommendation_engine";
import { saveSimulation } from "../utils/localStorage";

import "../styles/EnergyMixControls.css";

const EnergyMixControls = () => {
  const {
    energyMix,
    setEnergyMix,
    setSimulationResults,
    setRecommendation,
  } = useEnergy();

  const [error, setError] = useState("");

  const total =
    energyMix.solar +
    energyMix.wind +
    energyMix.hydro +
    energyMix.coal +
    energyMix.petroleum;

  const handleChange = (
    source,
    value
  ) => {
    setEnergyMix({
      ...energyMix,
      [source]: Number(value),
    });
  };

  const runSimulation = () => {
    if (total !== 100) {
      setError(
        "Total energy mix must equal 100%"
      );
      return;
    }

    setError("");

    const scores =
      calculateScores(energyMix);

    const recommendation =
      evaluateMix(energyMix);

    setSimulationResults(scores);

    setRecommendation(
      recommendation
    );

    saveSimulation({
      energyMix,
      scores,
      recommendation,
      date: new Date(),
    });
  };

  const sliders = [
    {
      label: "☀ Solar",
      key: "solar",
    },
    {
      label: "🌬 Wind",
      key: "wind",
    },
    {
      label: "💧 Hydro",
      key: "hydro",
    },
    {
      label: "🏭 Coal",
      key: "coal",
    },
    {
      label: "🛢 Petroleum",
      key: "petroleum",
    },
  ];

  return (
    <section
      id="simulation"
      className="controls-container"
    >
      <h2>
        Energy Mix Controls
      </h2>

      {sliders.map((item) => (
        <motion.div
          key={item.key}
          whileHover={{
            scale: 1.01,
          }}
          className="slider-group"
        >
          <div className="slider-header">
            <label>
              {item.label}
            </label>

            <span>
              {
                energyMix[
                  item.key
                ]
              }
              %
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={
              energyMix[
                item.key
              ]
            }
            onChange={(e) =>
              handleChange(
                item.key,
                e.target.value
              )
            }
          />
        </motion.div>
      ))}

      <div
        className={`total-box ${
          total === 100
            ? "valid"
            : "invalid"
        }`}
      >
        Total = {total}%
      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      <button
        className="simulate-btn"
        onClick={
          runSimulation
        }
      >
        Run Simulation
      </button>
    </section>
  );
};

export default EnergyMixControls;
