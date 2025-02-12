import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

const socket = io("http://127.0.0.1:8080"); // Connexion au serveur WebSocket

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  // Charger les rooms depuis le backend
  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8080/api/rooms");
      setRooms(res.data.rooms); // Assurez-vous que la réponse contient { rooms: [...] }
    } catch (error) {
      console.error("Erreur lors du chargement des rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();

    // Écouter les événements WebSocket pour la mise à jour en temps réel
    socket.on("room_created", (newRoom) => {
      setRooms((prev) => [...prev, newRoom]);
    });

    socket.on("room_deleted", (data) => {
      setRooms((prev) => prev.filter((room) => room.id !== data.room_id));
    });

    return () => {
      socket.off("room_created");
      socket.off("room_deleted");
    };
  }, []);

  // Création d'une nouvelle room via le WebSocket
  const createRoom = () => {
    const roomName = prompt("Entrez le nom de la nouvelle room:");
    if (roomName) {
      socket.emit("create_room", { room_name: roomName, username: "Host" });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold mb-6">🎭 Choisis une Room</h1>

      <div className="grid grid-cols-2 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Button key={room.id} text={room.name} onClick={() => navigate(`/room/${room.id}`)} />
          ))
        ) : (
          <p className="text-white">Aucune room disponible.</p>
        )}
      </div>

      {/* Bouton pour créer une nouvelle room */}
      <div className="mt-6">
        <Button text="➕ Créer une Room" onClick={createRoom} />
      </div>
    </div>
  );
};

export default Rooms;
