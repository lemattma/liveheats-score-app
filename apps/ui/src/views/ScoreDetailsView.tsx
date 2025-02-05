import { Link, useParams } from 'react-router-dom';
import { Score, ScoreStatus } from '../types/scores';
import { getScore, updateScore } from '../data/api';
import { useEffect, useState } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ScoreCardStatus } from '../components/ScoreCard';
import ordinal from 'ordinal';

function ScoreDetailsView() {
  const [score, setScore] = useState<Score>();
  const { scoreId } = useParams<{ scoreId: string }>();

  useEffect(() => {
    async function saveScore() {
      if (!score) return;
      updateScore(score);
    }

    saveScore();
  }, [score, score?.status]);

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

      <div className="flex items-center_ mb-4">
        <div className="grow">
          <h1 className="font-semibold text-3xl">{score?.title}</h1>
          <ScoreCardStatus score={score} />
        </div>

        {score?.status === ScoreStatus.LIVE && (
          <Link
            to={`/scores/${score.id}/end`}
            className="btn btn-md btn-primary"
          >
            End event
          </Link>
        )}

        {score?.status === ScoreStatus.UPCOMING && (
          <button
            className="btn btn-md btn-primary"
            onClick={() => setScore({ ...score, status: ScoreStatus.LIVE })}
          >
            Start Event
          </button>
        )}
      </div>

      {score?.status === ScoreStatus.ENDED && (
        <>
          <h5 className="font-semibold">Final results</h5>
          <ul>
            {score?.participants.map((participant, index) => (
              <li key={index}>
                {ordinal(participant.standing || 0)} place: {participant.name}
              </li>
            ))}
          </ul>
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
