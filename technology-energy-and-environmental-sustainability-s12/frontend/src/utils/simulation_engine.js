export const calculateScores = (
  mix
) => {
  const pollution =
    (mix.solar * 5 +
      mix.wind * 8 +
      mix.hydro * 20 +
      mix.coal * 95 +
      mix.petroleum * 85) /
    100;

  const co2 =
    (mix.solar * 5 +
      mix.wind * 5 +
      mix.hydro * 15 +
      mix.coal * 100 +
      mix.petroleum * 90) /
    100;

  const sustainability =
    (mix.solar * 95 +
      mix.wind * 90 +
      mix.hydro * 80 +
      mix.coal * 25 +
      mix.petroleum * 20) /
    100;

  const cost =
    (mix.solar * 60 +
      mix.wind * 55 +
      mix.hydro * 50 +
      mix.coal * 30 +
      mix.petroleum * 35) /
    100;

  return {
    pollution:
      pollution.toFixed(2),

    co2:
      co2.toFixed(2),

    sustainability:
      sustainability.toFixed(2),

    cost:
      cost.toFixed(2),
  };
};