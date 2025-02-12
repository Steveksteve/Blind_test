from flask import Blueprint, request, jsonify
from extensions import db
from models import Room
from datetime import datetime

room_bp = Blueprint('room_bp', __name__)

@room_bp.route("/rooms", methods=["POST"])
def create_room():
    data = request.get_json()
    name = data.get("name")

    # Vérifier si la room existe déjà
    existing_room = Room.query.filter_by(name=name).first()
    if existing_room:
        return jsonify({"error": "Une room avec ce nom existe déjà."}), 400

    new_room = Room(
        name=name,
        genre=data.get("genre"),
        status="waiting",
        created_at=datetime.now(),
        active_users=0
    )
    
    db.session.add(new_room)
    try:
        db.session.commit()
        return jsonify({"message": "Room créée avec succès.", "room_id": new_room.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
