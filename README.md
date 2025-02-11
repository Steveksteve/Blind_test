# 🎵 BeatGuess Frontend - React

BeatGuess est une application web de **blind test musical** développée en **React** pour l'interface utilisateur. Le frontend interagit avec une API Flask pour gérer les musiques, les scores et les sessions de jeu en solo ou multijoueur.

---

## 🚀 Fonctionnalités

✅ **Interface interactive et responsive** – Design moderne avec animations fluides.  
✅ **Mode Solo & Multijoueur** – Joue seul ou affronte d'autres joueurs en temps réel.  
✅ **Intégration API** – Connexion avec le backend Flask pour récupérer les extraits musicaux.  
✅ **Système de Timer et Score** – Chaque bonne réponse rapporte des points en fonction du temps.  
✅ **Classement et Historique** – Affichage des meilleurs scores et des dernières parties.  

---

## 📁 Structure du Projet

```
/frontend
│── /src
│   ├── /components  # Composants réutilisables (Boutons, Timer, Score...)
│   ├── /pages  # Pages principales (Home, Game, Results...)
│   ├── /api  # Gestion des appels API avec Flask
│   ├── App.js  # Point d'entrée principal
│   ├── index.js  # Initialisation de React
│   ├── styles.css  # Styles de l'application
│── package.json  # Dépendances et scripts React
│── README.md  # Documentation
```

---

## ⚙️ Installation & Lancement

### **1️⃣ Installer les dépendances**
Dans le dossier **frontend/**, exécute :

```bash
npm install
```

### **2️⃣ Lancer l'application**
Exécute :

```bash
npm start
```

L'application sera accessible sur **http://localhost:3000** 🚀

---

## 🔗 Connexion au Backend Flask

Le frontend communique avec l’API Flask via les endpoints définis dans **/api**. Assure-toi que le backend tourne sur **http://127.0.0.1:5000**. Si nécessaire, modifie l’URL API dans **/src/api/config.js**.

Exemple d’appel API :
```javascript
fetch("http://127.0.0.1:5000/get_song")
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 📌 Technologies Utilisées

- **React** (Framework Frontend)
- **React Router** (Gestion de la navigation entre pages)
- **CSS/Tailwind** (Design moderne et responsive)
- **Flask API** (Interaction avec le backend)
- **Socket.IO** (Mode multijoueur en temps réel)

---

## 🎯 Fonctionnalités à Ajouter

🔹 Ajout d'un mode "Battle Royale" pour des duels de blind test.  
🔹 Intégration d'un sélecteur de playlist (choisir son genre musical préféré).  
🔹 Amélioration des animations et effets sonores pour plus d'immersion.  

---

## 🤝 Contributions

Les contributions sont les bienvenues ! Pour proposer des améliorations :

1. **Fork** le repo
2. Crée une **branche** (`git checkout -b feature/amélioration`)
3. **Commit** (`git commit -m "Ajout d'une nouvelle feature"`)
4. **Push** (`git push origin feature/amélioration`)
5. Fais une **Pull Request** 🎉

---

## 📜 Licence

Ce projet est sous licence **MIT** – Utilisation et modification libre.

---

💡 **Amuse-toi bien avec BeatGuess !** 🎵🔥
