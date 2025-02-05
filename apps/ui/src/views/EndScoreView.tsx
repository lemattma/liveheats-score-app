import { Participant, Score, ScoreStatus } from '../types/scores';
import { getScore, updateScore } from '../data/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import ordinal from 'ordinal';

type ScoreCounter = Record<string, number>;
type StandingsData = {
  max: number;
  sum: number;
  number: number;
  counter: Record<string, number>;
};

function EndScoreView() {
  const navigate = useNavigate();
  const { scoreId } = useParams<{ scoreId: string }>();
  const [score, setScore] = useState<Score>();
  const [standingCounter, setStandingCounter] = useState<StandingsData>({
    max: 0,
    sum: 0,
    number: 0,
    counter: {},
  });

  const numberOfParticipants = score?.participants.length || 0;

  useEffect(() => {
    async function fetchScore(scoreId: string) {
      const scoreRes = await getScore(scoreId);
      if (!scoreRes) return;

      const counter = scoreRes.participants.reduce<ScoreCounter>(
        (acc, _p, idx: number) => ({ ...acc, [idx]: 0 }),
        {}
      );

      setStandingCounter((prev) => ({ ...prev, counter }));
      setScore(scoreRes);
    }
    if (scoreId) fetchScore(scoreId);
  }, [scoreId]);

  const setParticipantStanding = (
    participantIndex: number,
    standing: number
  ) => {
    if (!score) return;

    setScore({
      ...score,
      participants: score.participants.map((participant, index) => {
        if (index === participantIndex) {
          return { ...participant, standing };
        }
        return participant;
      }),
    });
  };

  const reset = () => {
    setStandingCounter({ max: 0, sum: 0, number: 0, counter: {} });

    if (score?.participants) {
      setScore({
        ...score,
        participants: score.participants.map((p) => ({
          ...p,
          standing: undefined,
        })),
      });
    }
  };

  const saveStandings = async () => {
    if (!score) return;

    const sortedParticipants = score.participants.sort((a, b) => {
      return (a.standing || 0) - (b.standing || 0);
    });

    await updateScore({
      ...score,
      status: ScoreStatus.ENDED,
      participants: sortedParticipants,
    });

    navigate(`/scores/${score.id}`);
  };

  const setStanding = (participantIndex: number, position: number) => {
    setParticipantStanding(participantIndex, position);
    setStandingCounter((prev) => ({
      ...prev,
      max: Math.max(prev.max, position),
      sum: prev.sum + position,
      number: prev.number + 1,
      counter: {
        ...prev.counter,
        [position - 1]: (prev.counter[position - 1] || 0) + 1,
      },
    }));
  };

  const generateStandingButtons = (
    participant: Participant,
    participantIndex: number
  ) => {
    return Array.from({ length: numberOfParticipants }).map((_, idx) => {
      const pos = idx + 1;

      const btnIsDisabled = [
        participant.standing !== undefined,
        pos < standingCounter.max,
        pos <= standingCounter.number && pos > standingCounter.max,
        pos > standingCounter.number + 1,
      ].some(Boolean);

      return (
        <button
          key={idx}
          type="button"
          className={clsx(
            'btn btn-sm _w-12 btn-primary',
            participant.standing === pos && 'btn-link'
          )}
          disabled={btnIsDisabled}
          onClick={() => setStanding(participantIndex, pos)}
        >
          {pos}
        </button>
      );
    });
  };

  return (
    <div className="sm:w-2/4 mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Race standings
      </h1>

      <div className="flex flex-col gap-5">
        {score?.participants.map((participant, participantIndex) => (
          <div
            className="flex flex-col gap-1 justify-center items-center"
            key={participantIndex}
          >
            <div className="font-semibold text-right_">{participant.name}</div>

            <span className="col-span-2_ flex gap-1">
              {participant.standing ? (
                <div className="flex items-center h-12_ text-black/40">
                  {ordinal(participant.standing)} place
                </div>
              ) : (
                generateStandingButtons(participant, participantIndex)
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="divider" />

      <div className="flex items-center mt-6">
        <div>
          <button
            type="button"
            className="btn btn-sm btn-link p-0 border-none text-black/60"
            onClick={() => navigate(`/scores/${score?.id}`)}
          >
            <ArrowLeftIcon className="w-4 h-4 stroke-2" />
            Back to event
          </button>
        </div>

        <div className="grow flex items-center gap-2 justify-end ">
          <button
            type="button"
            className="btn btn-md btn-outline"
            onClick={reset}
          >
            Reset
          </button>

          <button
            className="btn btn-md btn-primary"
            disabled={standingCounter.number < numberOfParticipants}
            onClick={saveStandings}
          >
            Save standings
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndScoreView;
