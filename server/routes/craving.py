from flask import Blueprint, request, jsonify
from models import db, CravingLog
from datetime import datetime

craving_bp = Blueprint('craving', __name__)

@craving_bp.route('/craving', methods=['POST'])
def save_craving():
    try:
        print("✅ POST 요청 도착")
        
        data = request.get_json()

        new_log = CravingLog(
            date=datetime.strptime(data['date'], "%Y-%m-%d").date(),
            time=data['time'],
            place=data['place'],
            trigger=data['trigger'],
            intensity=int(data['intensity']),
            duration=data['duration'],
            strategy=data['strategy'],
            summary=data['summary'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_log)
        db.session.commit()

        return jsonify({"message": "갈망 대처 실습이 저장되었습니다."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500