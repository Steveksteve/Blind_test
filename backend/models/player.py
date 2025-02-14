from extensions import db

class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    score = db.Column(db.Integer, default=0)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)

    def __init__(self, username, room_id):
        self.username = username
        self.room_id = room_id
