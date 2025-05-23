import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import AllPurposeCopingPlanPage from './skilltraining/AllPurposeCopingPlanPage';
import ShoringUpMotivationPage from './skilltraining/ShoringUpMotivationPage';
import RefusalSkillsAssertivenessPage from './skilltraining/RefusalSkillsAssertivenessPage';
import SeeminglyIrrelevantDecisionsPage from './skilltraining/SeeminglyIrrelevantDecisionsPage';
import ProblemSolvingPage from './skilltraining/ProblemSolvingPage';
import CaseManagementPage from './skilltraining/CaseManagementPage';
import HIVRiskReductionPage from './skilltraining/HIVRiskReductionPage';

const distortionComponentMap: { [key: string]: React.FC } = {
  'all-or-nothing thinking': AllPurposeCopingPlanPage,
  'emotional reasoning': AllPurposeCopingPlanPage,
  'mental filter': AllPurposeCopingPlanPage,
  'fortune-telling': ShoringUpMotivationPage,
  'overgeneralization': ShoringUpMotivationPage,
  'mind reading': RefusalSkillsAssertivenessPage,
  'should statements': RefusalSkillsAssertivenessPage,
  'personalization': SeeminglyIrrelevantDecisionsPage,
  'magnification': ProblemSolvingPage,
  'labeling': CaseManagementPage,
  'hiv risk reduction': HIVRiskReductionPage,
};

const PracticePage: React.FC = () => {
  const { distortion } = useParams<{ distortion: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const distortions: string[] = location.state?.distortions || [];
  const key = decodeURIComponent(distortion || '').toLowerCase();

  const Component = distortionComponentMap[key];

  useEffect(() => {
    if (!Component) {
      console.error("해당 인지 왜곡에 대한 컴포넌트를 찾을 수 없습니다:", key);
    }
  }, [key]);

  return Component ? (
    <>
      <Component />
      {distortions.length > 1 && (
        <button
          onClick={() => navigate('/select-practice', { state: { distortions } })}
          style={{ marginTop: '20px' }}
        >
          🔁 다른 실습 선택하러 가기
        </button>
      )}
    </>
  ) : (
    <p>❌ 해당 실습 컴포넌트를 찾을 수 없습니다.</p>
  );
};

export default PracticePage;