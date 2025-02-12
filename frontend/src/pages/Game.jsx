import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Button from "../components/Button";

const socket = io("http://127.0.0.1:8080");

const Game = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [questionType, setQuestionType] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    socket.on("new_game", (data) => {
      console.log("🚀 Nouvelle partie commencée !");
      fetchSong();
    });

    return () => {
      socket.off("new_game");
    };
  }, []);

  useEffect(() => {
    let countdown;
    if (isPlaying && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setMessage("⏳ Temps écoulé !");
      setIsPlaying(false);
      socket.emit("game_finished", { room_id: id });
    }
    return () => clearInterval(countdown);
  }, [isPlaying, timer]);

  const fetchSong = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8080/api/get_song`);
      const data = await res.json();
      setSong(data);
      setMessage("");
      setGuess("");
      setTimer(30);
      setIsPlaying(true);
      generateQuestion(data);
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
          <Button text="Valider" onClick={checkAnswer} />
          <p className="mt-2 font-bold">{message}</p>
        </>
      )}
    </div>
  );
};

export default Game;
