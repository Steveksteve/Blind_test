import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Chat from "./Chat";
import socket from "../api/socket"; // Import WebSocket

const Room = () => {
  const { id } = useParams(); // Récupère l'ID de la room
  const [genre, setGenre] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  // Liste des genres
  const genres = ["Pop", "Rock", "Rap", "Jazz", "Classique", "Electro"];

  useEffect(() => {
    if (username) {
      socket.emit("join_room", { username, room: id });
    }

    socket.on("join_confirmation", (data) => {
      console.log("✅ Confirmation de connexion :", data.message);
    });

    return () => {
      socket.off("join_confirmation");
    };
  }, [id, username]);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">🎶 Room #{id}</h1>

      {/* Filtrage des genres */}
      <div className="mt-4 flex flex-col items-center">
        <h2 className="text-xl mb-2">🎵 Filtrer par genre</h2>
        <select
          className="p-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Tous les genres</option>
          {genres.map((g, index) => (
            <option key={index} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Espace de chat */}
      <div className="mt-6 w-full max-w-lg">
        <Chat roomId={id} username={username} />
      </div>

      {/* Bouton pour jouer */}
      <div className="mt-6">
        <Button text="🎮 Commencer le jeu" />
      </div>
    </div>
  );
};

export default Room;
