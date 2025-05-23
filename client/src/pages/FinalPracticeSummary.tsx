import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/FinalPractice.css';

const FinalPracticeSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = (location.state as any)?.form;

  if (!form) {
    return <p>❌ 데이터를 불러오지 못했습니다.</p>;
  }

  return (
    <div className="final-practice-container">
      <h3>🎉 훌륭해요! 갈망에 대한 인식과 대처 전략은 회복의 핵심입니다.</h3>
      <ul>
        <li>📅 날짜: {form.date} ⏰ 시간: {form.time}</li>
        <li>📍 장소: {form.place}</li>
        <li>💭 유발 요인: {form.trigger}</li>
        <li>🔥 충동 강도: {form.intensity} / 100</li>
        <li>⏳ 지속 시간: {form.duration}</li>
        <li>🛠️ 대처 전략: {form.strategy}</li>
        <li>📝 구체적 계획: {form.summary}</li>
      </ul>
      <button onClick={() => navigate('/main')}>처음으로 돌아가기</button>
    </div>
  );
};

export default FinalPracticeSummary;