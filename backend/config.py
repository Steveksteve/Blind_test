import os
from dotenv import load_dotenv
from datetime import timedelta

# Charger les variables d'environnement
load_dotenv()

class Config:
    # 🔐 Clés secrètes
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_jwt_key')

    # 📌 Expiration des tokens JWT (1 heure)
    JWT_ACCESS_TOKEN_EXPIRES = False

    # 📌 Configuration de la base de données
    DATABASE_URL = os.getenv('SQLALCHEMY_DATABASE_URI')

    if not DATABASE_URL:
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'database.db')}"
        print(f"⚠️ Aucune base distante définie, basculement sur SQLite: {DATABASE_URL}")
    else:
        print(f"✅ Base de données utilisée: {DATABASE_URL}")

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # 🌍 Activer CORS (nécessaire pour le front React)
    CORS_HEADERS = "Content-Type"

    @staticmethod
    def init_app(app):
        """Permet d'ajouter des configurations supplémentaires à l'initialisation."""
        pass

config = Config()
