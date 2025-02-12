import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    return null; // Ne pas afficher sur la page principale
  }

  return (
    <div className="back-button-container">
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        🔙 Retour
      </button>
    </div>
  );
};

export default BackButton;
