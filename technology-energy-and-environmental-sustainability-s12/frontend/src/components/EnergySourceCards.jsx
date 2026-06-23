import {
  FaSolarPanel,
  FaWater,
  FaIndustry,
  FaOilCan,
  FaWind,
} from "react-icons/fa";

import "../styles/EnergySourceCards.css";

const EnergySourceCards = () => {
  const sources = [
    {
      name: "Solar",
      icon: <FaSolarPanel />,
      pollution: 5,
      co2: 5,
      sustainability: 95,
      type: "Renewable",
    },

    {
      name: "Wind",
      icon: <FaWind />,
      pollution: 8,
      co2: 5,
      sustainability: 90,
      type: "Renewable",
    },

    {
      name: "Hydro",
      icon: <FaWater />,
      pollution: 20,
      co2: 15,
      sustainability: 80,
      type: "Renewable",
    },

    {
      name: "Coal",
      icon: <FaIndustry />,
      pollution: 95,
      co2: 100,
      sustainability: 25,
      type: "Non-Renewable",
    },

    {
      name: "Petroleum",
      icon: <FaOilCan />,
      pollution: 85,
      co2: 90,
      sustainability: 20,
      type: "Non-Renewable",
    },
  ];

  return (
    <section className="source-section">
      <h2>
        Energy Source Information
      </h2>

      <div className="source-grid">
        {sources.map((source) => (
          <div
            key={source.name}
            className="source-card"
          >
            <div className="source-icon">
              {source.icon}
            </div>

            <h3>{source.name}</h3>

            <span className="energy-type">
              {source.type}
            </span>

            <div className="source-details">
              <p>
                Pollution:
                <strong>
                  {" "}
                  {source.pollution}
                </strong>
              </p>

              <p>
                CO₂:
                <strong>
                  {" "}
                  {source.co2}
                </strong>
              </p>

              <p>
                Sustainability:
                <strong>
                  {" "}
                  {
                    source.sustainability
                  }
                </strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnergySourceCards;
