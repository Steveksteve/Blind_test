import React, { useState } from "react";
import "../style/Profile.css";

function Profile() {
  const [username, setUsername] = useState("Utilisateur123");
  const [email, setEmail] = useState("user@example.com");
  const [bannerColor, setBannerColor] = useState("#6A4BBC");
  const [bannerShape, setBannerShape] = useState("rounded"); // "rounded" ou "square"
  const [avatar, setAvatar] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  // Lorsque l'utilisateur clique sur l'avatar, le input file est activé (grâce à la balise label)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Bascule la forme de la bannière
  const toggleBannerShape = () => {
    setBannerShape(bannerShape === "rounded" ? "square" : "rounded");
  };

  // Gestion du formulaire de changement de mot de passe
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    if (confirmEmail !== email) {
      alert("L'email de confirmation ne correspond pas !");
      return;
    }
    alert("Mot de passe changé avec succès !");
    setNewPassword("");
    setConfirmPassword("");
    setConfirmEmail("");
    setShowPasswordModal(false);
  };

  return (
    <div className="profile-container">
      {/* Bannière personnalisable */}
      <div className={`profile-banner ${bannerShape}`} style={{ backgroundColor: bannerColor }}>
        <div className="banner-content">
          {/* Avatar cliquable pour changer l'image */}
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
          {/* Nom d'utilisateur centré */}
          <span className="username">{username}</span>
        </div>
      </div>

      {/* Options de personnalisation de la bannière */}
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
              <input
                type="email"
                placeholder="Email de confirmation"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
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
