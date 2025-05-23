const BASE_URL = 'http://127.0.0.1:5000/api/craving';

export interface FinalPracticeForm {
  date: string;
  time: string;
  place: string;
  trigger: string;
  intensity: number;
  duration: string;
  strategy: string;
  summary: string;
}

export async function submitFinalPractice(form: FinalPracticeForm) {
    const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(form),
    });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || '서버 오류');
  }

  return data;
}