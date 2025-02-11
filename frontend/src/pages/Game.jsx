import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";

const Game = () => {
  const [song, setSong] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const fetchSong = async () => {
    const res = await axios.get("http://127.0.0.1:5000/get_song");
    setSong(res.data);
    setMessage("");
  };

  const checkAnswer = () => {
    if (!song) return;
    if (guess.toLowerCase() === song.title.toLowerCase()) {
      setMessage("✅ Bonne réponse !");
    } else {
      setMessage("❌ Mauvaise réponse !");
    }
    setGuess("");
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">🎶 Devine la chanson</h1>
      <Button text="🔄 Charger un extrait" onClick={fetchSong} />
      {song && (
        <>
          <audio controls autoPlay className="mt-4">
            <source src={song.url} type="audio/mp3" />
          </audio>
          <Input
            placeholder="Entrez la réponse..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <Button text="Valider" onClick={checkAnswer} />
          <p className="mt-2 font-bold">{message}</p>
        </>
      )}
    </div>
  );
};

export default Game;
