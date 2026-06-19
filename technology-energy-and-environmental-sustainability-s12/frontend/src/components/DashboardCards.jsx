import {
  FaLeaf,
  FaCloud,
  FaRecycle,
  FaDollarSign,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { useEnergy } from "../context/EnergyContext";

import "../styles/DashboardCards.css";

const DashboardCards = () => {
  const { simulationResults } =
    useEnergy();

  const cards = [
    {
      icon: <FaLeaf />,
      title:
        "Sustainability",
      value:
        simulationResults.sustainability,
    },

    {
      icon: <FaCloud />,
      title: "CO₂ Score",
      value:
        simulationResults.co2,
    },

    {
      icon: <FaRecycle />,
      title: "Pollution",
      value:
        simulationResults.pollution,
    },

    {
      icon: <FaDollarSign />,
      title: "Cost",
      value:
        simulationResults.cost,
    },
  ];

  return (
    <section
      id="dashboard"
      className="dashboard-grid"
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          whileHover={{
            scale: 1.05,
          }}
          className="dashboard-card"
        >
          <div className="card-icon">
            {card.icon}
          </div>

          <h3>{card.title}</h3>

          <h1>
            {card.value}
          </h1>
        </motion.div>
      ))}
    </section>
  );
};

export default DashboardCards;
