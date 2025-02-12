import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

const Rooms = () => {
  const navigate = useNavigate();

  // Liste des rooms avec noms modifiés
  const [rooms, setRooms] = useState([
    { id: 1, name: "Room 1" },
    { id: 2, name: "Room 2" },
    { id: 3, name: "Room 3" },
  ]);

  // Ajouter une nouvelle room
  const createRoom = () => {
    const newRoom = { id: rooms.length + 1, name: `Room ${rooms.length + 1}` };
    setRooms([...rooms, newRoom]);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <BackButton />
      <h1 className="text-4xl font-bold mb-6">🎭 Choisis une Room</h1>

      <div className="grid grid-cols-2 gap-6">
        {rooms.map((room) => (
          <Button key={room.id} text={room.name} onClick={() => navigate(`/room/${room.id}`)} />
        ))}
      </div>

      {/* Bouton pour créer une nouvelle room */}
      <div className="mt-6">
        <Button text="➕ Créer une Room" onClick={createRoom} />
      </div>
    </div>
  );
};

export default Rooms;
