import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
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
    <>
      <div className="flex items-center mb-4">
        <div className="grow">
          <h1 className="font-semibold text-3xl">My Scores</h1>
        </div>
        <Link to="/scores/new" className="btn btn-md btn-primary">
          <PlusIcon className="w-4 h-4 stroke-[3]" />
          Add Score
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {scores.map((score) => (
          <ScoreCard key={score.id} score={score} />
        ))}
      </div>
    </>
  );
}

export default ScoresListView;
