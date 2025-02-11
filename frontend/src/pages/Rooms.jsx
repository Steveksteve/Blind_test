import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Rooms = () => {
  const navigate = useNavigate();
  
  const rooms = [
    { id: 1, name: "🎧 Pop Hits" },
    { id: 2, name: "🎸 Rock Classics" },
    { id: 3, name: "🎶 Rap & Hip-Hop" },
    { id: 4, name: "🎻 Musiques de films" },
  ];

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-4xl font-bold mb-6">🎵 Choisis une Room</h1>
      <div className="grid grid-cols-2 gap-6">
        {rooms.map((room) => (
          <Button key={room.id} text={room.name} onClick={() => navigate(`/room/${room.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
