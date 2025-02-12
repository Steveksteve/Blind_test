import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Chat from "./Chat";

const Room = () => {
  const { id } = useParams();
  const [showChat, setShowChat] = useState(false);
  const [roomName, setRoomName] = useState(`Room ${id}`);

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">🎶 {roomName}</h1>

      {/* Modifier le nom de la Room */}
      <Input
        placeholder="Modifier le nom de la room..."
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />

      {/* Afficher ou cacher le chat */}
      <Button text={showChat ? "❌ Cacher le Chat" : "💬 Voir le Chat"} onClick={() => setShowChat(!showChat)} />
      
      {showChat && (
        <div className="mt-6 w-full max-w-lg">
          <Chat />
        </div>
      )}
    </div>
  );
};

export default Room;
