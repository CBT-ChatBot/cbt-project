import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css'; // CSS가 정의된 파일 경로

const SelectPracticePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const distortions: string[] = location.state?.distortions || [];

  return (
    <div className="practice-wrapper">
      <h2>✨ 감지된 인지 왜곡이 여러 개입니다</h2>
      <p>아래에서 실습하고 싶은 주제를 선택해주세요.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        {distortions.map((d, idx) => (
          <button
            key={idx}
            onClick={() =>
              navigate(`/practice/${encodeURIComponent(d)}`, {
                state: { distortions }
              })
            }
          >
            {d} 실습 시작하기
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectPracticePage;