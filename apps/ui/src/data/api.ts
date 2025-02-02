import { Score, ScoreStatus } from '../types/scores';

const initialScores: Score[] = [
  {
    id: '032EA55EF692',
    title: 'Year 1',
    status: ScoreStatus.ENDED,
  },
  {
    id: '58FE362F36F4',
    title: 'High School race',
    status: ScoreStatus.LIVE,
  },
  {
    id: 'AF0E130D9300',
    title: 'Year 6 race',
    status: ScoreStatus.UPCOMING,
  },
];

export async function getScores(): Promise<Score[]> {
  return localStorage.getItem('scores')
    ? JSON.parse(localStorage.getItem('scores') as string)
    : initialScores;
}

export async function getScore(id: string): Promise<Score | undefined> {
  return initialScores.find((score) => score.id === id);
}

export async function saveScore(score: Score): Promise<void> {
  initialScores.push(score);
  localStorage.setItem('scores', JSON.stringify(initialScores));
}
