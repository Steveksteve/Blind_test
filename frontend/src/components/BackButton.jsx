import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition-all"
    >
      🔙 Retour
    </button>
  );
};

export default BackButton;
