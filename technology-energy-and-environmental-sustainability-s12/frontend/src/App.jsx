import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import EnergySourceCards from "./components/EnergySourceCards";
import EnergyMixControls from "./components/EnergyMixControls";
import DashboardCards from "./components/DashboardCards";
import ChartsSection from "./components/ChartsSection";
import RecommendationPanel from "./components/RecommendationPanel";
import ChallengeSection from "./components/ChallengeSection";
import SimulationHistory from "./components/SimulationHistory";


function App() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <EnergySourceCards />

      <EnergyMixControls />

      <DashboardCards />
      
      <ChartsSection />
      
      <RecommendationPanel />

      <ChallengeSection />

      <SimulationHistory />
      
    </>
  );
}

export default App;

