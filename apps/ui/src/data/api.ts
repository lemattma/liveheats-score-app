import { Score, ScoreStatus } from '../types/scores';

import _ from 'lodash';

const genScoreId = () => `SC-${_.random(11111, 99999)}`;

const initialScores: Score[] = [
  {
    id: genScoreId(),
    title: 'Year 1',
    status: ScoreStatus.ENDED,
  },
  {
    id: genScoreId(),
    title: 'High School race',
    status: ScoreStatus.LIVE,
  },
  {
    id: genScoreId(),
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
  initialScores.push({
    ...score,
    id: genScoreId(),
  });

  localStorage.setItem('scores', JSON.stringify(initialScores));
}
