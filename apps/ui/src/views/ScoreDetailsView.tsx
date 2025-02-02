import { Link, useParams } from 'react-router-dom';
import { Score, ScoreStatus } from '../types/scores';
import { useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ScoreCardStatus } from '../components/ScoreCard';
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

  if (!score) return;

  return (
    <>
      <div className="mb-1">
        <Link to="/scores" className="flex items-center gap-1 text-black/60">
          <ArrowLeftIcon className="w-4 h-4 stroke-2" />
          All scores
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="font-semibold text-3xl">{score?.title}</h1>
        <ScoreCardStatus score={score} />
      </div>

      {score?.status === ScoreStatus.ENDED && (
        <>
          <h5 className="font-semibold">Final results</h5>
          <ol className="list-inside list-decimal">
            {score?.participants.map((participant, index) => (
              <li key={index}>{participant.name}</li>
            ))}
          </ol>
        </>
      )}

      {score?.status === ScoreStatus.UPCOMING && (
        <>
          <h5 className="font-semibold">Initial standing</h5>
          <ol className="list-inside list-decimal">
            {score?.participants.map((participant, index) => (
              <li key={index}>{participant.name}</li>
            ))}
          </ol>
        </>
      )}

      {score?.status === ScoreStatus.LIVE && (
        <>
          <h5 className="font-semibold">Live results</h5>
          <ol className="list-inside list-decimal">
            {score?.participants.map((participant, index) => (
              <li key={index}>{participant.name}</li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}

export default ScoreDetailsView;
