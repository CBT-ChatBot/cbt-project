import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import { analyzeSession } from '../api/analyze';

const drug_questions = [
  "어떤 감정이나 생각이 들었을 때 약물을 사용했나요?",
  "당시에 '약물 없이 견딜 수 없다'고 느낀 이유는 무엇이었나요?",
  "약물을 사용해야 한다고 느끼게 만든 이전의 구체적인 경험이나 근거가 있었을까요?",
  "이렇게 약물을 사용하는 것이 당신의 삶에 어떤 긍정적/부정적 영향을 미칠 것 같나요?",
  "다시 그 순간으로 돌아간다면, 어떤 다른 선택을 해볼 수 있을까요?"
];

const cbt_questions = [
  "지금 어떤 생각이 가장 많이 떠오르나요?",
  "그 생각이 옳다고 믿는 근거는 무엇인가요?",
  "그 생각을 뒷받침할 수 있는 근거가 있나요?",
  "그런 생각을 계속하면 어떤 결과가 생길까요?",
  "다른 시각에서 본다면 어떤 생각이 가능할까요?"
];

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState<'start' | 'cbt' | 'result'>('start');
  const [usedDrugs, setUsedDrugs] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [distortions, setDistortions] = useState<string[]>([]);

  const currentQuestions = usedDrugs === '예' ? drug_questions : cbt_questions;

  const handleDrugAnswer = (answer: '예' | '아니오') => {
    setUsedDrugs(answer);
    setStage('cbt');
  };

  const handleSubmit = async () => {
    const updatedAnswers = [...answers, input];
    setAnswers(updatedAnswers);
    setInput('');

    if (step < 4) {
      setStep(step + 1);
    } else {
      if (usedDrugs === '예') {
        setResult("약물 사용 기록이 저장되었습니다. 곧 갈망 대처 실습으로 이동합니다...");
        setSessionId(Date.now());
        setTimeout(() => {
          navigate('/coping');
        }, 2000);
        setStage('result');
      } else {
        try {
          const response = await analyzeSession(updatedAnswers, usedDrugs || '아니오');
          setResult(response.labels);
          setSessionId(response.session_id);

          const parsed = response.labels
            .split(/[\n,]+/)
            .map((d: string) => d.replace(/^\d+\.\s*/, '').trim().toLowerCase())
            .filter(Boolean);

          setDistortions(parsed);
          setStage('result');
        } catch (error: any) {
          alert('분석 중 오류가 발생했습니다: ' + error.message);
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    if (stage === 'result') {
      if (distortions.length === 1) {
        const single = distortions[0];
        const encoded = encodeURIComponent(single);
        const timer = setTimeout(() => {
          navigate(`/practice/${encoded}`, { state: { distortions } });
        }, 2000);
        return () => clearTimeout(timer);
      } else if (distortions.length > 1) {
        navigate('/select-practice', { state: { distortions } });
      }
    }
  }, [distortions, navigate, stage]);

  return (
    <div className="practice-wrapper">
      <h2>CBT 챗봇 자기 탐색</h2>

      {stage === 'start' && (
        <>
          <p>최근에 약물 복용을 하셨나요?</p>
          <button onClick={() => handleDrugAnswer('예')}>예</button>
          <button onClick={() => handleDrugAnswer('아니오')}>아니오</button>
        </>
      )}

      {stage === 'cbt' && (
        <>
          <p><b>Q{step + 1}.</b> {currentQuestions[step]}</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            placeholder="답변을 입력하세요"
          />
          <button onClick={handleSubmit}>다음</button>
        </>
      )}

      {stage === 'result' && (
        <>
          <h3>🧠 분석 결과</h3>
          <div className="result-box">{result}</div>
          <p>세션 ID: {sessionId}</p>

          {distortions.length === 1 ? (
            <p>🔄 실습 페이지로 이동 중입니다...</p>
          ) : distortions.length === 0 ? (
            <p>❌ 감지된 인지 왜곡이 없습니다.</p>
          ) : null}
        </>
      )}
    </div>
  );
};

export default MainPage;