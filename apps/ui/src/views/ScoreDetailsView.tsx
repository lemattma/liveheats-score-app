import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
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
      <div className="text-sm">
        <Link to="/scores" className="flex gap-1">
          <ArrowLeftIcon className="w-5 h-5" />
          All scores
        </Link>
      </div>
      <h1 className="font-semibold text-3xl">{score?.title}</h1>
    </>
  );
}

export default ScoreDetailsView;
