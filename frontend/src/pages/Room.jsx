import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Room.css";

const genres = ["Pop", "Rock", "Rap", "Classique", "Jazz", "Electro"];

function Room() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (!selectedGenre) {
      alert("Veuillez choisir un genre avant de jouer !");
      return;
    }
    navigate("/game"); // Redirection vers la page de jeu
  };

  return (
    <div className="room-container">
      <h1>🎵 Choisis un genre</h1>
      <div className="genres-list">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-button ${selectedGenre === genre ? "selected" : ""}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <button className="start-game" onClick={handleStartGame}>
        ▶ Commencer à jouer
      </button>
    </div>
  );
}

export default Room;
