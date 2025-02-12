import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData.username, formData.email, formData.password);
    if (success) {
      navigate("/login");
    } else {
      setError("Erreur lors de l'inscription. Essayez un autre email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">📝 Inscription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button text="Créer un compte" />
      </form>
    </div>
  );
};

export default Signup;
