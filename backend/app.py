import os
import eventlet
eventlet.monkey_patch()  # ✅ Nécessaire pour le bon fonctionnement avec eventlet

from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # ✅ Import Flask-CORS
from config import config
from extensions import db, bcrypt, socketio
from routes import auth
from music_routes import music
from socket_manager import init_socketio
from room_routes import room_bp  # ✅ Import du Blueprint des rooms

# 📌 Initialisation de l'application Flask
app = Flask(__name__)
app.config.from_object(config)

# ✅ Active CORS pour autoriser uniquement les requêtes du frontend (localhost:3000)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# 📌 Initialisation des extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)  # ✅ Initialisation correcte du JWT

# 📌 Initialisation de SocketIO
socketio = init_socketio(app)

# 📌 Enregistrement des routes
app.register_blueprint(auth, url_prefix="/api")
app.register_blueprint(music, url_prefix="/api")
app.register_blueprint(room_bp, url_prefix="/api")  # ✅ Enregistrement du Blueprint des rooms

# 📌 Page d'accueil simple (pour test)
@app.route('/')
def index():
    return render_template('index.html')

# 📌 Création des tables de la base de données
with app.app_context():
    try:
        db.create_all()
        print("✅ Base de données initialisée avec succès.")
    except Exception as e:
        print(f"⚠️ Erreur lors de l'initialisation de la base de données : {e}")

# 📌 Lancement du serveur Flask avec WebSocket (SocketIO)
if __name__ == '__main__':
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8080))

    print(f"🚀 Serveur démarré sur http://{host}:{port}")
    socketio.run(app, host=host, port=port, debug=True, allow_unsafe_werkzeug=True)
