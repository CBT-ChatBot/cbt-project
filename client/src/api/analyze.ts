const BASE_URL = 'http://127.0.0.1:5000/api/analyze';

export async function analyzeSession(answers: string[], usedDrugs: string) {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, used_drugs: usedDrugs }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || '분석 요청 실패');
  }

  return await res.json();
}