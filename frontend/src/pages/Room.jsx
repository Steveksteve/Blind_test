import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Chat from "../pages/Chat";
import "../style/Room.css";

function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(null);
  const [userId] = useState(1); // ⚠️ Remplace par la gestion réelle de l'utilisateur connecté

  // Récupérer les infos de la room
  useEffect(() => {
    axios.get(`http://127.0.0.1:8080/api/rooms`)
      .then((response) => {
        const room = response.data.rooms.find((r) => r.id === parseInt(id));
        if (room) {
          setRoomData(room);
          joinRoom();
        } else {
          alert("Room introuvable !");
          navigate("/rooms");
        }
      })
      .catch((error) => console.error("Erreur lors de la récupération de la room :", error));
  }, [id]);

  // Rejoindre la room
  const joinRoom = () => {
    axios.post("http://127.0.0.1:8080/api/rooms/join", { user_id: userId, room_id: id })
      .then((response) => console.log(response.data.message))
      .catch((error) => console.error("Erreur lors de la connexion à la room :", error));
  };

  // Quitter la room
  const leaveRoom = () => {
    axios.post("http://127.0.0.1:8080/api/rooms/leave", { user_id: userId, room_id: id })
      .then((response) => {
        console.log(response.data.message);
        navigate("/rooms"); // Retour à la liste des rooms après le départ
      })
      .catch((error) => console.error("Erreur lors de la sortie de la room :", error));
  };

  return (
    <div className="room-container">
      {roomData ? (
        <>
          <h1 className="room-title">🎵 {roomData.name}</h1>
          <p className="room-description">Genre : {roomData.genre}</p>
          <p className="room-status">Statut : {roomData.status}</p>
          <p className="room-players">{roomData.players} joueurs connectés</p>

          <Chat roomId={id} />

          <button className="leave-room" onClick={leaveRoom}>🚪 Quitter la Room</button>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default Room;
