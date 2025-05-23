import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { login } from '../api/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
    
        const response = await login({
          email, password
        });
    
        alert(response.message);
        if (response.message === '로그인 성공') {
          navigate('/main'); // 로그인 성공 시 메인 페이지로 이동
        } else {
          alert(`로그인 실패: ${response.message}`);
        }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;