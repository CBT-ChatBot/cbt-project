# 블루프린트 모듈화

from flask import Blueprint
from routes.auth import auth_bp

def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix='/api/auth')