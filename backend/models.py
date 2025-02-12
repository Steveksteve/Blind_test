from datetime import datetime
from extensions import db, bcrypt

# 📌 Modèle User : Stocke les joueurs inscrits
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Date d'inscription
    profile_picture = db.Column(db.String(255), default="default.jpg")  # URL de l'avatar
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=True)  # Relation avec les rooms

    def __init__(self, username, email, password, profile_picture="default.jpg"):
        self.username = username
        self.email = email
        self.set_password(password)
        self.profile_picture = profile_picture

    def set_password(self, password):
        """ Hash le mot de passe avant de le stocker """
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """ Vérifie si le mot de passe est correct """
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username} - {self.email}>"

# 📌 Modèle Room : Stocke les salles de jeu
class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    genre = db.Column(db.String(50), nullable=True)  
    status = db.Column(db.String(20), default="waiting")  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    active_users = db.Column(db.Integer, default=0)  # ✅ Ajout du nombre de joueurs actifs

    users = db.relationship("User", backref="room", lazy=True, cascade="all, delete-orphan")

    def __init__(self, name, genre=None):
        self.name = name
        self.genre = genre

    def __repr__(self):
        return f"<Room {self.name} - {self.genre} - {self.active_users} joueurs>"

# 📌 Modèle Game : Stocke la partie en cours
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    current_song = db.Column(db.String(200), nullable=True)  # Titre de la chanson
    question_type = db.Column(db.String(50), nullable=True)  # title / artist / album
    time_left = db.Column(db.Integer, default=30)  # Timer
    status = db.Column(db.String(20), default="waiting")  # waiting / playing / finished
    started_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, room_id):
        self.room_id = room_id

    def __repr__(self):
        return f"<Game Room {self.room_id}, Status: {self.status}>"

# 📌 Modèle Score : Stocke les scores des joueurs dans chaque partie
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    score = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", backref=db.backref("scores", cascade="all, delete-orphan"))
    game = db.relationship("Game", backref=db.backref("scores", cascade="all, delete-orphan"))

    def __init__(self, user_id, game_id, score=0):
        self.user_id = user_id
        self.game_id = game_id
        self.score = score

    def __repr__(self):
        return f"<Score User {self.user_id}, Game {self.game_id}, Score {self.score}>"
