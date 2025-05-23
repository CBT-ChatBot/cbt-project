import React, { useState } from 'react';

const RefusalSkillsAssertivenessPage: React.FC = () => {
  const [route, setRoute] = useState('');
  const [offer, setOffer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (route.trim() && offer.trim()) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 두 항목 모두 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <h2>🚫 거절 기술 및 자기주장 훈련</h2>
      <p>
        약물 권유를 효과적으로 거절하는 방법을 학습합니다. 아래 항목을 작성해보세요.
      </p>

      <textarea
        placeholder="약물에 접근하게 되는 경로와, 접근을 줄이기 위한 조치"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
      />
      <textarea
        placeholder="약물을 제안할 것 같은 사람과, 그들에게 거절의 표시 방법"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
      />

      <button onClick={handleSubmit}>제출하기</button>

      {warning && <p style={{ color: 'red' }}>{warning}</p>}

      {submitted && (
        <div>
          <p>🎉 잘하셨어요! 거절 연습 세션이 완료되었습니다.</p>
          <h4>📋 실습 요약</h4>
          <ul>
            <li>📌 약물 접근 경로 및 조치: {route}</li>
            <li>📌 약물 제안자 및 거절 방법: {offer}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RefusalSkillsAssertivenessPage;