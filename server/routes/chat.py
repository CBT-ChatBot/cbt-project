from openai import OpenAI
from flask import Blueprint, request, jsonify
import os

chat_bp = Blueprint('chat', __name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@chat_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json(force=True)
        messages = data.get("messages")
        if not messages:
            return jsonify({"error":"메세지 필수"}), 400

        response = client.chat.completions.create(
            model=os.getenv("GPT_MODEL"),
            messages=messages
        )

        return jsonify({"response": response.choices[0].message.content})

    except Exception as e:
        print("서버 오류 발생:", e)
        return jsonify({"error": str(e)}), 500