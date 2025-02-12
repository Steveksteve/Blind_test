import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mt-10">🎵 BeatGuess</h1>
      <p className="text-lg mt-2">Devine la musique le plus vite possible !</p>

      {/* 🎮 Boutons d'action centrés */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/game" className="home-button">🎮 Jouer</Link>
        <Link to="/rooms" className="home-button">🎭 Voir les Rooms</Link>
      </div>
    </div>
  );
};

export default Home;
