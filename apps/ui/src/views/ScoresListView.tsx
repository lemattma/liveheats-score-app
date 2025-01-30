import { useEffect, useState } from 'react';

import { Score } from '../types/scores';
import ScoreCard from '../components/ScoreCard';
import { getScores } from '../data/api';

function ScoresListView() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    async function fetchScores() {
      const scores = await getScores();
      setScores(scores);
    }
    fetchScores();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {scores.map((score) => (
        <ScoreCard key={score.id} score={score} />
      ))}
    </div>
  );
}

export default ScoresListView;
