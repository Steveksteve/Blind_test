import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      {/* Bouton Retour */}
      <BackButton />

      {/* Titre principal animé */}
      <motion.h1
        className="text-5xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🎵 BeatGuess
      </motion.h1>

      {/* Slogan */}
      <motion.p
        className="text-lg text-gray-300 mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Devine la musique le plus vite possible !
      </motion.p>

      {/* Conteneur des boutons avec espacement */}
      <motion.div
        className="button-container mt-8 flex flex-col space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button text="🎮 Jouer" onClick={() => navigate("/game")} />
        <Button text="🔐 Connexion" onClick={() => navigate("/login")} />
        <Button text="📝 Inscription" onClick={() => navigate("/signup")} />
        <Button text="💬 Chat" onClick={() => navigate("/chat")} />
        <Button text="🎭 Voir les Rooms" onClick={() => navigate("/rooms")} />
      </motion.div>
    </div>
  );
};

export default Home;
