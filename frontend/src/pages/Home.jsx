import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

function Home() {
  return (
    <div className="home">
      <h2>🎶 Devine la musique le plus vite possible !</h2>
      <div className="home-buttons">
        <Link to="/game" className="button">🎮 Jouer</Link>
        <Link to="/rooms" className="button">🧑‍🤝‍🧑 Voir les Rooms</Link>
      </div>
    </div>
  );
}

export default Home;
