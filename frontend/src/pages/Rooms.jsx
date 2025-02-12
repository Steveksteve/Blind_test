import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Rooms.css';

function Rooms() {
  return (
    <div className="rooms-container">
      <h1 className="rooms-title">🎭 Choisis une Room</h1>
      <div className="rooms-buttons">
        <Link to="/room/1" className="room-button">Room 1</Link>
        <Link to="/room/2" className="room-button">Room 2</Link>
        <Link to="/room/3" className="room-button">Room 3</Link>
        <button className="create-room">➕ Créer une Room</button>
      </div>
    </div>
  );
}

export default Rooms;
