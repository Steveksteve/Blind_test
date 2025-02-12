import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        🎵 <span>BeatGuess</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/signup">Inscription</Link>
        <Link to="/login">Connexion</Link>
        <Link to="/profile" className="profile-link">👤 Profil</Link>
      </nav>
    </header>
  );
};

export default Header;
