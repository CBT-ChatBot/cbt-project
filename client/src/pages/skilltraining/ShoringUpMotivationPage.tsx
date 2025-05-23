import React, { useState } from 'react';

const ShoringUpMotivationPage: React.FC = () => {
  const [sessionType, setSessionType] = useState<'동기부여 강화' | '약물에 대한 생각 전환하기'>('동기부여 강화');
  const [form, setForm] = useState({
    pos: '',
    neg: '',
    goal: '',
    reason: '',
    change_step: '',
    other: '',
    interfere: '',
    thought: '',
    coping: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitMotivation = () => {
    const { pos, neg, goal, reason, change_step, other, interfere } = form;
    if (pos && neg && goal && reason && change_step && other && interfere) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 모든 항목을 작성해주세요.');
    }
  };

  const handleSubmitThought = () => {
    const { thought, coping } = form;
    if (thought && coping) {
      setSubmitted(true);
      setWarning('');
    } else {
      setWarning('⚠️ 모든 항목을 작성해주세요.');
    }
  };

  return (
    <div className="practice-wrapper">
      <h2>🎯 동기 강화 훈련</h2>

      <div>
        <label>
          오늘 연습할 주제를 선택하세요:
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value as any)}
          >
            <option value="동기부여 강화">동기부여 강화</option>
            <option value="약물에 대한 생각 전환하기">약물에 대한 생각 전환하기</option>
          </select>
        </label>
      </div>

      {sessionType === '동기부여 강화' ? (
        <div>
          <h3>📌 약물 중단의 동기부여하기</h3>
          <textarea name="pos" placeholder="✅ 긍정적인 결과" value={form.pos} onChange={handleChange} />
          <textarea name="neg" placeholder="❌ 부정적인 결과" value={form.neg} onChange={handleChange} />
          <textarea name="goal" placeholder="🎯 변화 목표" value={form.goal} onChange={handleChange} />
          <textarea name="reason" placeholder="🎯 변화 이유" value={form.reason} onChange={handleChange} />
          <textarea name="change_step" placeholder="🎯 변화 단계" value={form.change_step} onChange={handleChange} />
          <textarea name="other" placeholder="🎯 타인의 도움" value={form.other} onChange={handleChange} />
          <textarea name="interfere" placeholder="🎯 방해 요소" value={form.interfere} onChange={handleChange} />
          <button onClick={handleSubmitMotivation}>제출하기</button>
        </div>
      ) : (
        <div>
          <h3>🧠 약물에 대한 생각 전환하기</h3>
          <textarea name="thought" placeholder="💭 생각 내용" value={form.thought} onChange={handleChange} />
          <textarea name="coping" placeholder="🛠️ 전환 방법" value={form.coping} onChange={handleChange} />
          <button onClick={handleSubmitThought}>제출하기</button>
        </div>
      )}

      {submitted && <p>🎉 실습이 성공적으로 저장되었습니다!</p>}
      {warning && <p style={{ color: 'red' }}>{warning}</p>}
    </div>
  );
};

export default ShoringUpMotivationPage;