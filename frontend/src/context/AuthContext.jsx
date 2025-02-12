import { createContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api
        .get("/profile")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await api.post("/login", { email, password });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser({ username: res.data.username, email });
      return true;
    } catch (error) {
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post("/register", { username, email, password });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
