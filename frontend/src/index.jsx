import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Chat from "./pages/Chat";
import Room from "./pages/Room";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import BackButton from "./components/BackButton";
import "./index.css";

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div>
      <Header /> {/* Le Header est toujours affiché */}
      {!isHome && <BackButton />} {/* Le bouton Retour est affiché sauf sur la Home */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/results" element={<Results />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
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
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  </Router>
);
