import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/Rooms.css";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  // 📌 Fonction pour récupérer les rooms
  const fetchRooms = () => {
    axios.get("http://127.0.0.1:8080/api/rooms")
      .then((response) => {
        console.log("🔍 Rooms récupérées :", response.data.rooms);
        setRooms(response.data.rooms); 
      })
      .catch((error) => console.error("❌ Erreur lors de la récupération des rooms :", error));
  };

  useEffect(() => {
    fetchRooms(); // 🔄 Charge les rooms au démarrage
  }, []);

  // 📌 Création d'une Room
  const createRoom = async () => {
    const roomName = prompt("Entrez le nom de la nouvelle room :");
    if (!roomName) return;

    try {
      const response = await axios.post("http://127.0.0.1:8080/api/rooms", { name: roomName });
      console.log("✅ Room créée :", response.data);
      fetchRooms(); // 🔄 Recharge les rooms après création
    } catch (error) {
      console.error("❌ Erreur lors de la création de la room :", error);
      alert("⚠️ Le nom de la room existe déjà ou autre problème.");
    }
  };

  return (
    <div className="rooms-container">
      <h1 className="rooms-title">🎭 Choisis une Room</h1>

      <div className="rooms-buttons">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Link key={room.id} to={`/room/${room.id}`} className="room-button">
              {room.name} ({room.players} joueurs)
            </Link>
          ))
        ) : (
          <p className="no-room">Aucune room disponible.</p>
        )}
      </div>

      <button className="create-room" onClick={createRoom}>➕ Créer une Room</button>
    </div>
  );
}

export default Rooms;
