import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Button from "../components/Button";
import Chat from "./Chat";

const socket = io("http://127.0.0.1:8080");

const Room = () => {
  const { id } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("join_room", { room_id: id, username: "Joueur" + Math.floor(Math.random() * 100) });

    socket.on("join_confirmation", (data) => {
      setRoomInfo(data.room);
      setPlayers(data.players);
    });

    socket.on("room_update", (data) => {
      setPlayers(data.users);
    });

    socket.on("room_deleted", () => {
      alert("La room a été supprimée !");
      window.location.href = "/";
    });

    return () => {
      socket.emit("leave_room", { room_id: id, username: "Joueur" });
      socket.off("join_confirmation");
      socket.off("room_update");
      socket.off("room_deleted");
    };
  }, [id]);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">🎶 {roomInfo ? roomInfo.name : "Chargement..."}</h1>

      {players.length > 0 ? (
        <p className="mt-2 text-lg">{players.length} joueur(s) connecté(s)</p>
      ) : (
        <p className="mt-2 text-lg">La room est vide</p>
      )}

      <Chat />

      <div className="mt-6">
        <Button text="🎮 Commencer le jeu" onClick={() => socket.emit("start_game", { room_id: id })} />
      </div>
    </div>
  );
};

export default Room;
