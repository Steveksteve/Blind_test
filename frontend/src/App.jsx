import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Game from "./pages/Game";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Results from "./pages/Results";
import Chat from "./pages/Chat";
import Header from "./components/Header";

/* 🎨 Importation de tous les styles */
import "./style/App.css";
import "./style/BackButton.css";
import "./style/Chat.css";
import "./style/Game.css";
import "./style/Header.css";
import "./style/Home.css";
import "./style/index.css";
import "./style/Login.css";
import "./style/Profile.css";
import "./style/Results.css";
import "./style/Room.css";
import "./style/Rooms.css";
import "./style/Signup.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/game" element={<Game />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
