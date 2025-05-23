import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { register } from '../api/auth';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await register({
      name: form.name,
      email:form.email,
      password: form.password,
      age : parseInt(form.age),
    })

    alert(response.message);
    if (response.message.includes('성공')) {
    navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    }
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