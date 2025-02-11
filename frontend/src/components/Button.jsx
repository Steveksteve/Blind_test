import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="px-6 py-3 rounded-lg shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
      {text}
    </button>
  );
};

export default Button;
