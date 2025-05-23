import React, { useState } from 'react';

const SeeminglyIrrelevantDecisionsPage: React.FC = () => {
  const [decision, setDecision] = useState('');
  const [safeAlt, setSafeAlt] = useState('');
  const [riskyAlt, setRiskyAlt] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (decision.trim() && safeAlt.trim() && riskyAlt.trim()) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 모든 항목을 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <h2>🧭 의사결정 훈련: 안전한 선택과 위험한 선택 구분하기</h2>
      <p>작은 선택이 재발로 이어질 수 있습니다. 아래 항목을 작성하며 의사결정을 점검해보세요.</p>

      <textarea
        placeholder="💭 오늘 내린(내릴) 중요한 결정은?"
        value={decision}
        onChange={(e) => setDecision(e.target.value)}
      />
      <textarea
        placeholder="🟢 이 상황에서 안전한 선택은?"
        value={safeAlt}
        onChange={(e) => setSafeAlt(e.target.value)}
      />
      <textarea
        placeholder="🔴 위험한 선택은?"
        value={riskyAlt}
        onChange={(e) => setRiskyAlt(e.target.value)}
      />

      <button onClick={handleSubmit}>제출하기</button>

      {warning && <p style={{ color: 'red' }}>{warning}</p>}

      {submitted && (
        <div>
          <p>👍 훌륭해요! 당신의 선택을 돌아보며 스스로를 지킬 수 있는 힘이 생기고 있어요.</p>
          <h4>🧾 오늘의 의사결정 요약</h4>
          <ul>
            <li>💡 결정 상황: {decision}</li>
            <li>✅ 안전한 선택: {safeAlt}</li>
            <li>⚠️ 위험한 선택: {riskyAlt}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeeminglyIrrelevantDecisionsPage;