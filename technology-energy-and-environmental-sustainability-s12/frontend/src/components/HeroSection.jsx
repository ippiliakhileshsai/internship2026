import { motion } from "framer-motion";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <motion.h1
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          Smart Energy Advisor
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
        >
          Build sustainable energy plans,
          analyze environmental impact,
          and discover cleaner energy
          strategies in real-time.
        </motion.p>

        <motion.a
          href="#simulation"
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="hero-btn"
        >
          Start Simulation
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
