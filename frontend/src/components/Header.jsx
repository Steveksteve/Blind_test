import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/"; // Vérifie si on est sur la page principale

  return (
    <header className="w-full bg-gray-900 text-white py-3 shadow-lg z-50 fixed top-0">
      <nav className="flex justify-around items-center">
        <h1 className="text-lg font-bold">🎵 BeatGuess</h1>
        {!isHome && ( // Masquer ces liens sur la Home
          <>
            <Link to="/signup" className="text-lg hover:text-pink-500 transition-all">📝 Inscription</Link>
            <Link to="/login" className="text-lg hover:text-pink-500 transition-all">🔐 Connexion</Link>
            <Link to="/profile" className="text-lg hover:text-pink-500 transition-all">👤 Profil</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
