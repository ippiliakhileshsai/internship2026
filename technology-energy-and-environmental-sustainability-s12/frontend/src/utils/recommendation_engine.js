import { calculateScores } from "./simulation_engine";

export const evaluateMix = (
  mix
) => {
  const scores =
    calculateScores(mix);

  let title =
    "Moderate Energy Mix";

  let tips = [];

  if (
    Number(scores.pollution) >
    70
  ) {
    title =
      "Environmental Risk";

    tips = [
      "Reduce Coal usage",
      "Reduce Petroleum usage",
      "Increase Solar energy",
      "Increase Wind energy",
    ];
  }

  else if (mix.coal > 50) {
    title =
      "High Pollution Alert";

    tips = [
      "Reduce Coal below 50%",
      "Increase renewables",
    ];
  }

  else if (
    mix.petroleum > 40
  ) {
    title =
      "High Carbon Emissions";

    tips = [
      "Reduce Petroleum",
      "Increase Solar",
      "Increase Wind",
    ];
  }

  else if (
    mix.solar + mix.wind >
    60
  ) {
    title =
      "Sustainable Mix";

    tips = [
      "Excellent renewable balance",
      "Consider Hydro",
      "Maintain clean energy usage",
    ];
  }

  if (
    Number(
      scores.sustainability
    ) > 80
  ) {
    title =
      "Excellent Energy Plan";

    tips = [
      "Outstanding sustainability",
      "Maintain current mix",
      "Expand Solar allocation",
      "Keep Coal minimum",
    ];
  }

  return {
    title,
    tips,
  };
};
