import React, { useState } from 'react';

const ProblemSolvingPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [brainstorming, setBrainstorming] = useState('');
  const [numbering, setNumbering] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (problem.trim() && brainstorming.trim() && numbering.trim()) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 모든 항목을 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <h2>⚠️ 문제 해결 훈련</h2>
      <p>
        문제를 명확히 인식하고, 가능한 해결책을 구상하여 실행 계획을 세워봅시다.
      </p>

      <textarea
        placeholder="💭 아직 명확한 해결책이 없는 문제가 무엇인가요?"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
      />
      <textarea
        placeholder="💭 그에 대한 해결책을 브레인스토밍 해봅시다."
        value={brainstorming}
        onChange={(e) => setBrainstorming(e.target.value)}
      />
      <textarea
        placeholder="💭 위에 적은 해결책들을 선호하는 순서대로 정리해봅시다."
        value={numbering}
        onChange={(e) => setNumbering(e.target.value)}
      />

      <button onClick={handleSubmit}>제출하기</button>

      {warning && <p style={{ color: 'red' }}>{warning}</p>}

      {submitted && (
        <div>
          <h4>🧾 문제 상황 및 해결책 요약</h4>
          <ul>
            <li>1️⃣ 내가 처한 문제 상황: {problem}</li>
            <li>2️⃣ 브레인스토밍 결과: {brainstorming}</li>
            <li>3️⃣ 우선순위 정리된 해결책: {numbering}</li>
          </ul>
          <p>👍 좋습니다! 이렇게 건강한 방법으로 문제를 해결해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default ProblemSolvingPage;