import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Rooms.css';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) return;

    const newRoomId = rooms.length + 1;
    setRooms([...rooms, { id: newRoomId, name: newRoomName }]);
    setNewRoomName("");
    setShowForm(false);

    // Redirection vers la sélection de genres après la création de la room
    navigate(`/room/${newRoomId}/genres`);
  };

  return (
    <div className="rooms-container">
      <h1 className="rooms-title">🎭 Choisis une Room</h1>
      <div className="rooms-buttons">
        {rooms.map(room => (
          <Link key={room.id} to={`/room/${room.id}`} className="room-button">
            {room.name}
          </Link>
        ))}
      </div>

      {/* Bouton pour ouvrir le formulaire */}
      <button className="create-room-button" onClick={() => setShowForm(true)}>➕ Créer une Room</button>

      {/* Formulaire en tant qu'alerte en haut à droite */}
      {showForm && (
        <div className="room-alert">
          <input
            type="text"
            placeholder="Nom de la room"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={handleCreateRoom}>Créer</button>
          <button className="close-alert" onClick={() => setShowForm(false)}>✖</button>
        </div>
      )}
    </div>
  );
}

export default Rooms;
