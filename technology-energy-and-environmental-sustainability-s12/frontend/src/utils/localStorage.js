const STORAGE_KEY =
  "simulation_history";

export const saveSimulation =
  (simulationData) => {

    const existing =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        )
      ) || [];

    existing.push(
      simulationData
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(existing)
    );
  };

export const getSimulationHistory =
  () => {
    return (
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEY
        )
      ) || []
    );
  };

export const clearHistory =
  () => {
    localStorage.removeItem(
      STORAGE_KEY
    );
  };
