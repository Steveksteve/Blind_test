import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-screen">
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎵 BeatGuess
      </motion.h1>
      <motion.p
        className="text-lg text-gray-300 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Devine la musique le plus vite possible !
      </motion.p>
      <motion.div className="button-container">
        <Button text="🎮 Jouer" onClick={() => navigate("/game")} />
        <Button text="🔐 Connexion" onClick={() => navigate("/login")} />
        <Button text="📝 Inscription" onClick={() => navigate("/signup")} />
      </motion.div>
    </div>
  );
};

export default Home;
