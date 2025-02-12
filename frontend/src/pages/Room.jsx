import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../pages/Chat';
import '../style/Room.css';

function Room() {
  const { id } = useParams();
  return (
    <div className="room-container">
      <h1 className="room-title">🎵 Room {id}</h1>
      <p className="room-description">Choisis ton genre musical et commence le jeu !</p>
      <Chat />
    </div>
  );
}

export default Room;
