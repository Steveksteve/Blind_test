import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/buttons/Button";
import Input from "../components/Input";

const Game = () => {
  const [roomId, setRoomId] = useState(null); // ID de la room courante
  const [userId, setUserId] = useState(null); // ID de l'utilisateur
  const [song, setSong] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 secondes par question
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (roomId) {
      fetchPlayers();
    }
  }, [roomId]);

  const fetchPlayers = async () => {
    try {
      const res = await axios.get(`/api/room/${roomId}/players`);
      setPlayers(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des joueurs", error);
    }
  };

  const joinRoom = async () => {
    try {
      const res = await axios.post(`/api/room/join`, { roomId });
      setUserId(res.data.userId);
      setIsHost(res.data.isHost);
    } catch (error) {
      console.error("Erreur lors du rejoint de la room", error);
    }
  };

  const startGame = async () => {
    if (players.length < 2) {
      setMessage("Il faut au moins 2 joueurs pour démarrer la partie !");
      return;
    }
    try {
      const res = await axios.post(`/api/game/start`, { roomId });
      setGameStarted(true);
      startRound();
    } catch (error) {
      console.error("Erreur lors du démarrage du jeu", error);
    }
  };

  const startRound = async () => {
    try {
      const res = await axios.get(`/api/game/round`, { params: { roomId } });
      const { song, question, questionType, timeLeft } = res.data;
      setSong(song);
      setQuestion(question);
      setTimeLeft(timeLeft);
      setMessage("");
      setAnswer("");
      startTimer();
    } catch (error) {
      console.error("Erreur lors du démarrage du round", error);
    }
  };

  const startTimer = () => {
    let timer = timeLeft;
    const interval = setInterval(() => {
      if (timer <= 0) {
        clearInterval(interval);
        setMessage("Temps écoulé !");
        endRound();
      } else {
        setTimeLeft(timer);
        timer--;
      }
    }, 1000);
  };

  const handleAnswer = () => {
    if (answer.toLowerCase() === song.correctAnswer.toLowerCase()) {
      setMessage("✅ Bonne réponse !");
      updateScore(true);
    } else {
      setMessage("❌ Mauvaise réponse !");
      updateScore(false);
    }
    setAnswer("");
  };

  const updateScore = async (correct) => {
    try {
      await axios.post(`/api/game/score`, { userId, roomId, correct });
      fetchPlayers();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du score", error);
    }
  };

  const endRound = async () => {
    try {
      await axios.post(`/api/game/round/end`, { roomId });
      fetchPlayers();
    } catch (error) {
      console.error("Erreur lors de la fin du round", error);
    }
  };

  const checkWinner = () => {
    if (players.some(player => player.score >= 100)) {
      const winner = players.find(player => player.score >= 100);
      setWinner(winner);
      setGameEnded(true);
    }
  };

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      checkWinner();
    }
  }, [players]);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">🎶 Blind Test</h1>
      
      {!gameStarted ? (
        <>
          <Input 
            placeholder="Entrez l'ID de la room" 
            value={roomId} 
            onChange={(e) => setRoomId(e.target.value)} 
          />
          <Button text="Rejoindre la room" onClick={joinRoom} />
          {isHost && players.length >= 2 && (
            <Button text="Lancer la partie" onClick={startGame} />
          )}
        </>
      ) : (
        <>
          {winner ? (
            <div className="text-xl font-bold">
              Félicitations à {winner.username} pour avoir gagné !
              <img src={winner.profile_picture} alt={winner.username} />
            </div>
          ) : (
            <div>
              <audio controls autoPlay className="mt-4">
                <source src={song.url} type="audio/mp3" />
              </audio>
              <h2 className="text-xl mt-4">{question}</h2>
              <Input
                placeholder="Entrez votre réponse"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button text="Valider" onClick={handleAnswer} />
              <p className="mt-2 font-bold">{message}</p>
              <p>Temps restant : {timeLeft}s</p>
            </div>
          )}
        </>
      )}

      <div className="players-list">
        <h3>Joueurs :</h3>
        {players.map(player => (
          <div key={player.id} className="player-card">
            <img src={player.profile_picture} alt={player.username} />
            <div>{player.username}</div>
            <div>Score: {player.score}</div>
            <div>Status: {player.lastAnswerStatus || "Aucune réponse"}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;
