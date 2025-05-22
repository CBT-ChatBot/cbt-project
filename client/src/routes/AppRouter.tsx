import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/Signup';
import LoginPage from '../pages/Login';
import MainPage from '../pages/Mainpage';
import DiaryChatPage from '../pages/DiaryChat';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/diary-chat" element={<DiaryChatPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;