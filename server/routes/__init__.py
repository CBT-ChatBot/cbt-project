# 블루프린트 모듈화

from flask import Blueprint
from routes.auth import auth_bp
from routes.analyze import analyze_bp
from routes.chat import chat_bp
from routes.craving import craving_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(analyze_bp, url_prefix='/api')    
    app.register_blueprint(chat_bp, url_prefix='/api')
    app.register_blueprint(craving_bp, url_prefix='/api')