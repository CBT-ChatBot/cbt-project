import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import SignUpPage from '../pages/Signup';
import LoginPage from '../pages/Login';
import MainPage from '../pages/Mainpage';
import DiaryChatPage from '../pages/DiaryChat';
import CopingPractice from '../pages/CopingPractice';
import FinalPractice from '../pages/FinalPractice';
import FinalPracticeSummary from '../pages/FinalPracticeSummary';
import PracticePage from '../pages/PracticePage';
import SelectPracticePage from '../pages/SelectPracticePage';


import AllPurposeCopingPlanPage from '../pages/skilltraining/AllPurposeCopingPlanPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/diary-chat" element={<DiaryChatPage />} />
        <Route path="/coping" element={<CopingPractice/>}/>
        <Route path="/finalpractice" element={<FinalPractice />} />
        <Route path="/summary" element={<FinalPracticeSummary />} />
        <Route path="/practice/:distortion" element={<PracticePage />} />
        <Route path="/select-practice" element={<SelectPracticePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;