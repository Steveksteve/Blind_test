import React, { useState } from "react";
import Button from "../components/Button";

const Profile = () => {
  const [bannerShape, setBannerShape] = useState("rounded");
  const [bannerColor, setBannerColor] = useState("blue");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen mt-20 text-sm">
      <h1 className="text-3xl font-bold mt-12">👤 Mon Profil</h1>

      {/* 🎨 Bannière centrée */}
      <div className="flex justify-center w-full mt-8">
        <div className={`banner ${bannerShape} ${bannerColor}`}></div>
      </div>

      {/* Bouton Modifier centré */}
      <div className="mt-6">
        <Button text={isEditing ? "✅ Enregistrer" : "✏️ Modifier"} onClick={() => setIsEditing(!isEditing)} />
      </div>

      {/* Affichage des options seulement après clic */}
      {isEditing && (
        <div className="mt-8 flex flex-col items-center">
          {/* Sélection de la forme */}
          <h2 className="text-md mt-4">🔷 Choisir la forme</h2>
          <div className="flex space-x-2 mt-2">
            <Button text="🔵 Arrondi" onClick={() => setBannerShape("rounded")} />
            <Button text="⬛ Rectangle" onClick={() => setBannerShape("rectangular")} />
            <Button text="💊 Capsule" onClick={() => setBannerShape("capsule")} />
          </div>

          {/* Sélection de la couleur */}
          <h2 className="text-md mt-4">🌈 Choisir la couleur</h2>
          <div className="flex space-x-2 mt-2">
            <Button text="🔴 Rouge" onClick={() => setBannerColor("red")} />
            <Button text="🔵 Bleu" onClick={() => setBannerColor("blue")} />
            <Button text="🟢 Vert" onClick={() => setBannerColor("green")} />
            <Button text="🟣 Violet" onClick={() => setBannerColor("purple")} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
