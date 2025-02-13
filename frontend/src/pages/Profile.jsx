import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Profile.css";

function Profile() {
  const { user, logout, token } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || "Utilisateur");
  const [email, setEmail] = useState(user?.email || "user@example.com");
  const [bannerColor, setBannerColor] = useState("#6A4BBC");
  const [bannerShape, setBannerShape] = useState("rounded");
  const [avatar, setAvatar] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Charge les infos utilisateur depuis le backend
  useEffect(() => {
    if (token) {
      axios.get("http://127.0.0.1:8080/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setUsername(res.data.username);
          setEmail(res.data.email);
        })
        .catch(() => logout());
    }
  }, [token, logout]);

  // ✅ Gérer l’upload de l’avatar (simulé localement)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // ✅ Bascule la forme de la bannière
  const toggleBannerShape = () => {
    setBannerShape(bannerShape === "rounded" ? "square" : "rounded");
  };

  // ✅ Gestion du changement de mot de passe
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8080/api/change-password",
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Mot de passe mis à jour avec succès !");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
    } catch (error) {
      alert("❌ Erreur lors du changement de mot de passe.");
    }
  };

  return (
    <div className="profile-container">
      {/* Bannière personnalisable */}
      <div className={`profile-banner ${bannerShape}`} style={{ backgroundColor: bannerColor }}>
        <div className="banner-content">
          {/* Avatar cliquable */}
          <div className="avatar-container">
            <label htmlFor="avatar-upload">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="avatar" />
              ) : (
                <span className="upload-text">📷</span>
              )}
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>
          <span className="username">{username}</span>
        </div>
      </div>

      {/* Options de personnalisation */}
      <div className="profile-options">
        <button
          className="option-button"
          onClick={() => {
            const newColor = prompt("Entrez une couleur hexadécimale (ex: #6A4BBC):", bannerColor);
            if (newColor) setBannerColor(newColor);
          }}
        >
          🎨 Changer la couleur
        </button>
        <button className="option-button" onClick={toggleBannerShape}>
          🔄 Changer la forme
        </button>
        <button className="option-button" onClick={() => setShowPasswordModal(true)}>
          🔑 Changer le mot de passe
        </button>
        <button className="option-button logout" onClick={() => {
          logout();
          navigate("/login");
        }}>
          🚪 Se déconnecter
        </button>
      </div>

      {/* Informations du compte */}
      <div className="profile-info">
        <h2>👤 {username}</h2>
        <p>📧 {email}</p>
      </div>

      {/* Pop-up pour changer le mot de passe */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Changer le mot de passe</h3>
            <form onSubmit={handleChangePassword}>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="modal-button">
                  Valider
                </button>
                <button
                  type="button"
                  className="modal-button cancel"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
