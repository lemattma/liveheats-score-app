import { Score, ScoreStatus } from '../types/scores';

import _ from 'lodash';

const genScoreId = () => `SC-${_.random(11111, 99999)}`;

const initialScores: Score[] = [
  {
    id: genScoreId(),
    title: 'Year 1',
    status: ScoreStatus.ENDED,
    participants: [{ name: 'Amanda' }, { name: 'Gabe' }],
  },
  {
    id: genScoreId(),
    title: 'High School race',
    status: ScoreStatus.LIVE,
    participants: [{ name: 'Amanda' }, { name: 'Gabe' }],
  },
  {
    id: genScoreId(),
    title: 'Year 6 race',
    status: ScoreStatus.UPCOMING,
    participants: [{ name: 'Amanda' }, { name: 'Gabe' }],
  },
];

export async function getScores(): Promise<Score[]> {
  const storedScores = localStorage.getItem('scores');
  if (storedScores) return JSON.parse(storedScores);

  localStorage.setItem('scores', JSON.stringify(initialScores));
  return initialScores;
}

export async function getScore(id: string): Promise<Score | undefined> {
  const scores = await getScores();
  return scores.find((score) => score.id === id);
}

export async function saveScore(score: Score): Promise<void> {
  const scores = await getScores();
  scores.push({
    ...score,
    id: genScoreId(),
  });

  localStorage.setItem('scores', JSON.stringify(scores));
}

export async function updateScore(score: Score): Promise<void> {
  const scores = await getScores();
  const updatedScores = scores.map((s) => (s.id === score.id ? score : s));
  localStorage.setItem('scores', JSON.stringify(updatedScores));
}
