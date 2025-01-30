import { Score, ScoreStatus } from '../types/scores';

const initialScores: Score[] = [
  {
    id: '032EA55EF692',
    title: 'Year 1',
    date: new Date('2025-01-01T14:00:00'),
    status: ScoreStatus.ENDED,
  },
  {
    id: '58FE362F36F4',
    title: 'High School race',
    date: new Date(),
    status: ScoreStatus.LIVE,
  },
  {
    id: 'AF0E130D9300',
    title: 'Year 6 race',
    date: new Date('2025-02-01T18:00:00'),
    status: ScoreStatus.UPCOMING,
  },
];

export async function getScores(): Promise<Score[]> {
  return initialScores;
}

export async function getScore(id: string): Promise<Score | undefined> {
  return initialScores.find((score) => score.id === id);
}
