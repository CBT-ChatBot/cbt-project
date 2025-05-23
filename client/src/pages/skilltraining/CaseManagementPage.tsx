import React, { useState } from 'react';

const CaseManagementPage: React.FC = () => {
  const [contactPlan, setContactPlan] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactSituation, setContactSituation] = useState('');
  const [requestedServices, setRequestedServices] = useState('');
  const [outcome, setOutcome] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (
      contactPlan.trim() &&
      contactPerson.trim() &&
      contactSituation.trim() &&
      requestedServices.trim() &&
      outcome.trim()
    ) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 모든 항목을 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <h2>📋 사례 관리 훈련</h2>
      <p>사회적 자원을 파악하고 활용하는 전략을 세웁니다.</p>

      <input
        type="text"
        placeholder="1. 나의 목표는 무엇인가요?"
        value={contactPlan}
        onChange={(e) => setContactPlan(e.target.value)}
      />
      <input
        type="text"
        placeholder="2. 누구에게 연락할 건가요? (이름, 전화번호, 주소 등)"
        value={contactPerson}
        onChange={(e) => setContactPerson(e.target.value)}
      />
      <input
        type="text"
        placeholder="3. 어떤 상황에 연락할 건가요?"
        value={contactSituation}
        onChange={(e) => setContactSituation(e.target.value)}
      />
      <textarea
        placeholder="4. 어떤 서비스를 요청할 건가요?"
        value={requestedServices}
        onChange={(e) => setRequestedServices(e.target.value)}
      />
      <textarea
        placeholder="📋 결과"
        value={outcome}
        onChange={(e) => setOutcome(e.target.value)}
      />

      <button onClick={handleSubmit}>제출하기</button>

      {warning && <p style={{ color: 'red' }}>{warning}</p>}

      {submitted && (
        <div>
          <h3>📋 나의 목표 실행 계획</h3>
          <ul>
            <li>✅ 목표: {contactPlan}</li>
            <li>📞 연락 대상: {contactPerson}</li>
            <li>📍 연락 상황: {contactSituation}</li>
            <li>🛠️ 요청 서비스: {requestedServices}</li>
            <li>📈 결과: {outcome}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CaseManagementPage;