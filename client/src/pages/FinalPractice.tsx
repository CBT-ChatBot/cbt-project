import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FinalPractice.css';
import { submitFinalPractice } from '../api/finalpractice';

const strategies = [
  "몇 분 동안 다른 일에 집중하기",
  "지지해주는 사람과 이야기하기",
  "충동이 자연스러운 것임을 인정하며 지금 상태를 견디기",
  "약물 사용의 부정적 결과 떠올리기",
  "스스로에게 이겨낼 방법 설명하기",
];

const FinalPractice: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: '',
    time: '',
    place: '',
    trigger: '',
    intensity: 50,
    duration: '',
    strategy: '',
    summary: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitFinalPractice(form);
      navigate('/summary', { state: { form } });
    } catch (error: any) {
      alert('저장 중 오류 발생: ' + error.message);
    }
  };

  return (
    <div className="final-practice-container">
      <h2>🚨 갈망 대처 실습</h2>
      <p>충동을 인식하고 대처 전략을 스스로 정리해봅시다.</p>

      <form className="final-practice-form" onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="time" name="time" value={form.time} onChange={handleChange} required />
        <textarea name="place" placeholder="📍 장소" value={form.place} onChange={handleChange} required />
        <textarea name="trigger" placeholder="💭 어떤 일이 있었고 어떤 감정이 들었나요?" value={form.trigger} onChange={handleChange} required />
        
        <label>🔥 충동 강도 (1~100): {form.intensity}</label>
        <input type="range" name="intensity" min="1" max="100" value={form.intensity} onChange={handleChange} />

        <input name="duration" placeholder="⏳ 충동 지속 시간" value={form.duration} onChange={handleChange} required />

        <select name="strategy" value={form.strategy} onChange={handleChange} required>
          <option value="">대처 전략 선택</option>
          {strategies.map((s, idx) => (
            <option key={idx} value={s}>{s}</option>
          ))}
        </select>

        <textarea name="summary" placeholder="📌 구체적으로 어떻게 실행할 건가요?" value={form.summary} onChange={handleChange} required />

        <button type="submit">제출하기</button>
      </form>
    </div>
  );
};

export default FinalPractice;