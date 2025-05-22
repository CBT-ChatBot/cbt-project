# 회원가입/로그인 라우터
from flask import Blueprint, request, jsonify
from models import User
from db import db
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': '이미 가입된 이메일입니다.'}), 400

    hashed_pw = generate_password_hash(data['password'])
    user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_pw,
        age=data['age']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': '회원가입 성공'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': '로그인 성공'}), 200

    return jsonify({'message': '이메일 또는 비밀번호가 틀렸습니다.'}), 401