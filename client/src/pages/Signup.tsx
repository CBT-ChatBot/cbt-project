import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('회원가입 데이터:', form); // 백엔드 연결 전까지 확인용
    navigate('/login'); // 회원가입 후 로그인 페이지로 이동
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="이름" onChange={handleChange} required />
        <input type="email" name="email" placeholder="이메일 주소" onChange={handleChange} required />
        <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
        <input type="number" name="age" placeholder="나이" onChange={handleChange} required />
        <button type="submit">계정 만들기</button>
      </form>
      <p className="bottom-text">
        이미 계정이 있으신가요?{' '}
        <span onClick={() => navigate('/login')} className="link-text">
          로그인하기
        </span>
      </p>
    </div>
  );
};

export default Signup;