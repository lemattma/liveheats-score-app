import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Score } from '../types/scores';
import { getScore } from '../data/api';

function ScoreDetailsView() {
  const [score, setScore] = useState<Score>();
  const { scoreId } = useParams<{ scoreId: string }>();

  useEffect(() => {
    async function fetchScore(scoreId: string) {
      const scores = await getScore(scoreId);
      setScore(scores);
    }
    if (scoreId) fetchScore(scoreId);
  }, [scoreId]);

  return (
    <>
      <div className="mb-1">
        <Link to="/scores" className="flex items-center gap-1 text-black/60">
          <ArrowLeftIcon className="w-4 h-4 stroke-2" />
          All scores
        </Link>
      </div>
      <h1 className="font-semibold text-3xl">{score?.title}</h1>
    </>
  );
}

export default ScoreDetailsView;
