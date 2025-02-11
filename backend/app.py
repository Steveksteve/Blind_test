from flask import Flask
from flask_jwt_extended import JWTManager
from config import config
from models import db, bcrypt
from routes import auth

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = config.SQLALCHEMY_TRACK_MODIFICATIONS
app.config['JWT_SECRET_KEY'] = config.JWT_SECRET_KEY

# Initialiser la base de données et JWT
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth, url_prefix="/api")

# Créer les tables si elles n'existent pas
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
