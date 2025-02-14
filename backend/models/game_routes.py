from flask import Blueprint, request, jsonify
from flask_socketio import emit
from extensions import db, socketio
from models import Room, Player

game_bp = Blueprint('game_bp', __name__)

# Rejoindre une partie
@game_bp.route('/join-game', methods=['POST'])
def join_game():
    data = request.json
    room_id = data['room_id']
    username = data['username']
    
    room = Room.query.filter_by(id=room_id).first()
    if not room:
        return jsonify({'message': 'Room not found'}), 404

    if any(player.username == username for player in room.players):
        return jsonify({'message': 'Player already in the room'}), 400
    
    new_player = Player(username=username, room_id=room.id)
    db.session.add(new_player)
    db.session.commit()

    socketio.emit('new_round', {'song_title': room.current_song}, room=room_id)
    
    return jsonify({'message': f'Joined room {room_id} successfully'}), 200

# Soumettre une réponse
@game_bp.route('/submit-answer', methods=['POST'])
def submit_answer():
    data = request.json
    room_id = data['room_id']
    username = data['username']
    answer = data['answer']
    
    room = Room.query.filter_by(id=room_id).first()
    if not room:
        return jsonify({'message': 'Room not found'}), 404

    correct_answer = room.current_song
    player = Player.query.filter_by(username=username, room_id=room_id).first()
    if not player:
        return jsonify({'message': 'Player not found'}), 404

    if answer.strip().lower() == correct_answer.lower():
        player.score += 10  # Ajout de points pour une bonne réponse
        db.session.commit()
        
    emit('update_scores', {'scores': [{'username': p.username, 'score': p.score} for p in room.players]}, room=room_id)
    
    return jsonify({'message': 'Answer submitted'}), 200

# Fin de la partie
@game_bp.route('/game-over', methods=['POST'])
def game_over():
    data = request.json
    room_id = data['room_id']
    
    room = Room.query.filter_by(id=room_id).first()
    if not room:
        return jsonify({'message': 'Room not found'}), 404
    
    winner = max(room.players, key=lambda p: p.score)
    
    emit('game_over', {'winner': winner.username}, room=room_id)
    
    return jsonify({'message': 'Game over', 'winner': winner.username}), 200
