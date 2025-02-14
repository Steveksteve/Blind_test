from extensions import db

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    current_song = db.Column(db.String(255))
    players = db.relationship('Player', backref='room', lazy=True)

    def __init__(self, current_song):
        self.current_song = current_song
