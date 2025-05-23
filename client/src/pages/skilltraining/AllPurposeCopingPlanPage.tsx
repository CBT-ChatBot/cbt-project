import React, { useState } from 'react';
import '../../styles/AllPurposeCopingPlanPage.css';
const AllPurposeCopingPlanPage: React.FC = () => {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState(7); // 기본값 7분
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if ([q1, q3, q4, q5, q6].every((field) => field.trim())) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('모든 항목을 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <div className="practice-container">
        <h2>⚠️ 위험 상황 대응 훈련</h2>
        <p>
          예기치 못한 상황은 언제든 발생할 수 있습니다. 이번 시간에는 고위험 상황에서 사용할 수 있는 대응 계획을 세워보세요.
        </p>

        <textarea
          placeholder="1. 내가 갈 수 있는 안전한 장소는?"
          value={q1}
          onChange={(e) => setQ1(e.target.value)}
        />
        <label>
          2. 나는 약물을 사용할지 여부를 <b>{q2}분</b> 후에 결정할 것입니다.
        </label>
        <input
          type="range"
          min={1}
          max={15}
          value={q2}
          onChange={(e) => setQ2(parseInt(e.target.value))}
        />
        <textarea
          placeholder="3. 주의를 분산시킬 수 있는 활동은?"
          value={q3}
          onChange={(e) => setQ3(e.target.value)}
        />
        <textarea
          placeholder="4. 비상연락망 전화번호는?"
          value={q4}
          onChange={(e) => setQ4(e.target.value)}
        />
        <textarea
          placeholder="5. 내가 금단에 성공한 기억은?"
          value={q5}
          onChange={(e) => setQ5(e.target.value)}
        />
        <textarea
          placeholder="6. 지금의 생각을 전환할 긍정적인 사고는?"
          value={q6}
          onChange={(e) => setQ6(e.target.value)}
        />

        <button onClick={handleSubmit}>제출하기</button>

        {warning && <p style={{ color: 'red' }}>{warning}</p>}

        {submitted && (
          <div>
            <p>👍 훌륭해요! 이 선언문을 자주 읽고 실천해보세요.</p>
            <h4>🧾 선언문 요약</h4>
            <ul>
              <li>1.  안전한 장소: {q1}</li>
              <li>2.  참아야 할 시간: {q2}분</li>
              <li>3.  주의 분산 활동: {q3}</li>
              <li>4.  비상 연락망: {q4}</li>
              <li>5.  성공 기억: {q5}</li>
              <li>6.  긍정적인 사고 전환: {q6}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPurposeCopingPlanPage;