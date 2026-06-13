import { useEnergy } from "../context/EnergyContext";

import "../styles/ChallengeSection.css";

const ChallengeSection = () => {
  const {
    simulationResults,
    challengeStatus,
    setChallengeStatus,
  } = useEnergy();

  const pollutionPassed =
    simulationResults.pollution <
    30;

  const co2Passed =
    simulationResults.co2 < 25;

  const sustainabilityPassed =
    simulationResults.sustainability >
    80;

  const submitChallenge =
    () => {
      const success =
        pollutionPassed &&
        co2Passed &&
        sustainabilityPassed;

      setChallengeStatus(
        success
          ? "SUCCESS"
          : "FAILED"
      );
    };

  return (
    <section
      id="challenge"
      className="challenge-section"
    >
      <h2>
        🎯 Energy Challenge
      </h2>

      <div className="challenge-card">
        <h3>
          Challenge Targets
        </h3>

        <p>
          Pollution &lt; 30
        </p>

        <p>
          CO₂ &lt; 25
        </p>

        <p>
          Sustainability &gt;
          80
        </p>
      </div>

      <div className="status-card">
        <p>
          {pollutionPassed
            ? "✅"
            : "❌"}{" "}
          Pollution
        </p>

        <p>
          {co2Passed
            ? "✅"
            : "❌"}{" "}
          CO₂
        </p>

        <p>
          {sustainabilityPassed
            ? "✅"
            : "❌"}{" "}
          Sustainability
        </p>
      </div>

      <button
        className="challenge-btn"
        onClick={
          submitChallenge
        }
      >
        Submit Challenge
      </button>

      {challengeStatus && (
        <div
          className={`result ${
            challengeStatus ===
            "SUCCESS"
              ? "success"
              : "failed"
          }`}
        >
          {challengeStatus ===
          "SUCCESS"
            ? "🏆 Challenge Completed"
            : "❌ Try Again"}
        </div>
      )}
    </section>
  );
};

export default ChallengeSection;
