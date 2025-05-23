import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CopingData {
  title: string;
  intro: string;
  strategies: string[];
  closing: string;
}

const CopingPractice: React.FC = () => {
  const [content, setContent] = useState<CopingData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/coping_instruction.json')  // public 폴더 기준
      .then(res => res.json())
      .then(data => setContent(data))
      .catch((err) => console.error("❌ JSON 파일 로드 실패:", err));
  }, []);

  useEffect(() => {
    if (content) {
      const timer = setTimeout(() => {
        navigate('/finalpractice'); // FinalPractice 경로로 이동
      }, 5000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [content, navigate]);

  if (!content) return <p>불러오는 중...</p>;

  return (
    <div className="coping-container">
      <h2>{content.title}</h2>
      <p>{content.intro}</p>
      <ul>
        {content.strategies.map((strategy, idx) => (
          <li key={idx}>• {strategy}</li>
        ))}
      </ul>
      <p>{content.closing}</p>
      <p style={{ color: 'gray' }}>👉 잠시 후 연습 페이지로 이동합니다...</p>
    </div>
  );
};

export default CopingPractice;