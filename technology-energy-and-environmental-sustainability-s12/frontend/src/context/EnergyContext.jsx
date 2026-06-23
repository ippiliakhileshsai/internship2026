import {
  createContext,
  useContext,
  useState,
} from "react";

const EnergyContext =
  createContext();

export const EnergyProvider = ({
  children,
}) => {
  const [energyMix, setEnergyMix] =
    useState({
      solar: 20,
      wind: 20,
      hydro: 20,
      coal: 20,
      petroleum: 20,
    });

  const [
    simulationResults,
    setSimulationResults,
  ] = useState({
    pollution: 0,
    co2: 0,
    sustainability: 0,
    cost: 0,
  });

  const [
    recommendation,
    setRecommendation,
  ] = useState({
    title: "",
    tips: [],
  });

  const [
    challengeStatus,
    setChallengeStatus,
  ] = useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  return (
    <EnergyContext.Provider
      value={{
        energyMix,
        setEnergyMix,

        simulationResults,
        setSimulationResults,

        recommendation,
        setRecommendation,

        challengeStatus,
        setChallengeStatus,

        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </EnergyContext.Provider>
  );
};

export const useEnergy = () =>
  useContext(EnergyContext);
