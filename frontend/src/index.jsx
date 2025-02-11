import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* Page d'accueil */}
      <Route path="/" element={<Home />} />

      {/* Pages du jeu */}
      <Route path="/game" element={<Game />} />
      <Route path="/results" element={<Results />} />

      {/* Authentification */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Chat global */}
      <Route path="/chat" element={<Chat />} />

      {/* Rooms */}
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  </Router>
);
