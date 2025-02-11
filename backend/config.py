import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'super_secret_key')
    #/!\ temporaire, actuellement en local
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@localhost/blindtest_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Clé secrète pour JWT
    JWT_SECRET_KEY = "super_secure_jwt_key"

config = Config()
