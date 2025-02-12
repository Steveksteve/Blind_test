import os
from dotenv import load_dotenv

# Charger les variables depuis .env
load_dotenv()

class Config:
    # 🔐 Clés secrètes
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_jwt_key')

    # 📌 Définition de la base de données
    DATABASE_URL = os.getenv('SQLALCHEMY_DATABASE_URI')

    # Si aucune BDD n'est configurée, utiliser SQLite en local
    if not DATABASE_URL:
        BASE_DIR = os.path.abspath(os.path.dirname(__file__))
        DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'database.db')}"

    SQLALCHEMY_DATABASE_URI = DATABASE_URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass

config = Config()
