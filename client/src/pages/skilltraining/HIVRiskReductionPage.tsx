import React, { useState } from 'react';

const HIVRiskReductionPage: React.FC = () => {
  const [changes, setChanges] = useState('');
  const [reasons, setReasons] = useState('');
  const [steps, setSteps] = useState('');
  const [helper, setHelper] = useState('');
  const [obstacles, setObstacles] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (changes && reasons && steps && helper && obstacles) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 모든 항목을 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <div className="practice-container">
        <h2>🛡️ HIV 감염 위험 감소 계획</h2>
        <p>감염 예방을 위한 행동 변화 계획을 세웁니다.</p>

        <textarea placeholder="1. 바꾸고 싶은 행동" value={changes} onChange={(e) => setChanges(e.target.value)} />
        <textarea placeholder="2. 변화가 필요한 가장 중요한 이유" value={reasons} onChange={(e) => setReasons(e.target.value)} />
        <textarea placeholder="3. 계획한 구체적인 행동" value={steps} onChange={(e) => setSteps(e.target.value)} />
        <textarea placeholder="4. 도움을 줄 수 있는 사람들과 방법" value={helper} onChange={(e) => setHelper(e.target.value)} />
        <textarea placeholder="5. 예상되는 장애물" value={obstacles} onChange={(e) => setObstacles(e.target.value)} />

        <button onClick={handleSubmit}>제출하기</button>

        {warning && <p className="warning">{warning}</p>}

        {submitted && (
          <div className="summary">
            <h3>📋 변화 계획 요약</h3>
            <ul>
              <li>✏️ 행동 변화: {changes}</li>
              <li>🔍 변화 이유: {reasons}</li>
              <li>📋 구체적인 행동: {steps}</li>
              <li>🤝 도움 받을 방법: {helper}</li>
              <li>⚠️ 장애물: {obstacles}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HIVRiskReductionPage;