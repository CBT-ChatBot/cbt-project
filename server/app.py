# 앱 설정 및 서버 시작
from flask import Flask
from flask_cors import CORS
from db import db
from routes import register_routes
from routes.chat import chat_bp
from models import User
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

# MySQL 연결 정보
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    return '서버 작동중'

register_routes(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)