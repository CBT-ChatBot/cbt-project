import React from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h2>안녕하세요, CBT 챗봇에 오신 걸 환영합니다</h2>
        <p>
          이 챗봇은 청소년들이 스스로를 돌아보고 회복할 수 있도록 도와줍니다.
          <br />
          지금 이곳에서 당신만의 안전한 공간을 만들어보세요.
        </p>
        <button
          className="landing-button"
          onClick={() => navigate('/signup')} 
        >
          시작하기
        </button>
      </div>
      <div className="landing-illustration">
        <img src="/assets/meditation.png" alt="명상 일러스트" />
      </div>
    </div>
  );
};

export default LandingPage;
