import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      axios.get("http://127.0.0.1:8080/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
        });
    }
  }, [token]);

  // ✅ Fonction d'inscription
  const register = async (username, email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/register", {
        username,
        email,
        password,
      });

      alert("Inscription réussie !");
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error.response?.data || error);
      alert(error.response?.data?.error || "Erreur lors de l'inscription.");
    }
  };

  // ✅ Fonction de connexion
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser({ username: response.data.username });
    } catch (error) {
      console.error("❌ Erreur lors de la connexion :", error.response?.data || error);
      alert(error.response?.data?.error || "Identifiants incorrects.");
    }
  };

  // ✅ Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
