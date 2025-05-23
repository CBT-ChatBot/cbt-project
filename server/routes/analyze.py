from flask import Blueprint, request, jsonify
from openai import OpenAI
import os
from models import db, Session, Answer, Label
from dotenv import load_dotenv
from datetime import datetime
import re

analyze_bp = Blueprint('analyze', __name__)
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# CBT 질문 고정
FIXED_QUESTIONS = [
    "최근에 힘들었던 일이 있었나요?",
    "그 일이 당신에게 어떤 감정을 느끼게 했나요?",
    "그 감정이 들 때 어떤 생각이 먼저 떠올랐나요?",
    "그 생각에 어떤 의미를 부여하셨나요?",
    "그런 생각이 사실이라는 근거는 있나요?"
]

# 인지 왜곡 키워드
DISTORTION_TYPES = [
    "mind reading", "fortune-telling", "all-or-nothing thinking", "should statements",
    "labeling", "emotional reasoning", "personalization", "magnification",
    "overgeneralization", "mental filter"
]

@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json(force=True)
        answers = data.get("answers")
        used_drugs = data.get("used_drugs")

        if not answers or len(answers) != 5:
            return jsonify({"error": "5개의 답변이 필요합니다."}), 400

        # 세션 저장
        session = Session(created_at=datetime.utcnow(), used_drugs=used_drugs)
        db.session.add(session)
        db.session.commit()

        for i, content in enumerate(answers):
            db.session.add(Answer(
                session_id=session.id,
                turn=i,
                question=FIXED_QUESTIONS[i],
                answer=content
            ))
        db.session.commit()

        # 전체 묶음 프롬프트 구성
        combined_text = "\n".join([
            f"{i+1}. 질문: {FIXED_QUESTIONS[i]}\n   답변: {answers[i]}"
            for i in range(len(answers))
        ])

        gpt_messages = [
            {
                "role": "system",
                "content": "You are a CBT chatbot. You understand and analyze user input in Korean. Please always respond in English."
            },
            {
                "role": "user",
                "content": (
                    "Here is a CBT self-reflection consisting of 5 answers from one user. "
                    "Please evaluate the entire set of answers as a whole and identify cognitive distortions or belief types present. "
                    "Only consider the following types:\n"
                    "- mind reading\n- fortune-telling\n- all-or-nothing thinking\n- should statements\n- labeling\n"
                    "- emotional reasoning\n- personalization\n- magnification\n- overgeneralization\n- mental filter\n\n"
                    "Respond as a numbered list. Do not include any text outside the list.\n\n"
                    + combined_text
                )
            }
        ]

        response = client.chat.completions.create(
            model=os.getenv("OPENAI_FINE_TUNED_MODEL"),
            messages=gpt_messages,
            temperature=0.0
        )

        full_text = response.choices[0].message.content.strip()

        # 인지 왜곡 키워드 감지
        detected_distortions = [
            d for d in DISTORTION_TYPES if re.search(rf"\b{re.escape(d)}\b", full_text, re.IGNORECASE)
        ]

        # 결과 저장
        db.session.add(Label(session_id=session.id, label_type="result", label_value=full_text))
        for distortion in detected_distortions:
            db.session.add(Label(session_id=session.id, label_type="distortion", label_value=distortion))
        db.session.commit()

        return jsonify({
            "labels": full_text,
            "detected": detected_distortions,
            "session_id": session.id
        })

    except Exception as e:
        print("❌ 분석 실패:", e)
        return jsonify({"error": str(e)}), 500