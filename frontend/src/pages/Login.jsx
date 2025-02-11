import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion réussie !");
    navigate("/game");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">🔐 Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button text="Se connecter" />
      </form>
    </div>
  );
};

export default Login;
