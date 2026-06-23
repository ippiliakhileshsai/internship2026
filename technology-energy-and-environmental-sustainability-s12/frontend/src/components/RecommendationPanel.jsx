import { useEnergy } from "../context/EnergyContext";

import "../styles/RecommendationPanel.css";

const RecommendationPanel = () => {
  const { recommendation } =
    useEnergy();

  return (
    <section
      id="recommendation"
      className="recommendation-panel"
    >
      <h2>
        💡 Recommendation
      </h2>

      <div className="recommendation-card">
        <h3>
          {
            recommendation.title
          }
        </h3>

        <ul>
          {recommendation.tips?.map(
            (tip, index) => (
              <li key={index}>
                ✅ {tip}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default RecommendationPanel;
