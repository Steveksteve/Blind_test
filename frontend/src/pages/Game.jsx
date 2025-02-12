import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import Input from "../components/Input";

const Game = () => {
  const [song, setSong] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [questionType, setQuestionType] = useState(""); // Type de question
  const [timer, setTimer] = useState(30); // Timer de 30s
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let countdown;
    if (isPlaying && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setMessage("⏳ Temps écoulé !");
      setIsPlaying(false);
    }
    return () => clearInterval(countdown);
  }, [isPlaying, timer]);

  const fetchSong = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/get_song");
      setSong(res.data);
      setMessage("");
      setGuess("");
      setTimer(30);
      setIsPlaying(true);
      generateQuestion(res.data);
    } catch (error) {
      setMessage("❌ Erreur lors du chargement de la chanson.");
    }
  };

  const generateQuestion = (track) => {
    const questions = [
      { type: "title", question: "Quel est le titre de cette musique ?", answer: track.title },
      { type: "artist", question: "Qui est l’artiste ?", answer: track.artist },
      { type: "album", question: "De quel album provient cette musique ?", answer: track.album }
    ];
    const selected = questions[Math.floor(Math.random() * questions.length)];
    setQuestionType(selected);
  };

  const checkAnswer = () => {
    if (!song) return;
    if (guess.toLowerCase() === questionType.answer.toLowerCase()) {
      setMessage("✅ Bonne réponse !");
    } else {
      setMessage("❌ Mauvaise réponse !");
    }
    setGuess("");
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">🎶 Devine la chanson</h1>
      <Button text="🔄 Charger un extrait" onClick={fetchSong} />
      {song && (
        <>
          <audio controls autoPlay className="mt-4">
            <source src={song.preview_url} type="audio/mp3" />
          </audio>
          <p className="text-xl mt-4">{questionType.question}</p>
          <p className="font-bold">⏳ {timer} secondes restantes</p>
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
