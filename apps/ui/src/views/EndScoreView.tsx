import { useNavigate, useParams } from 'react-router';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Participant } from '../types/scores';
import clsx from 'clsx';
import ordinal from 'ordinal';
import { useScoreData } from '../hooks/useScoreData';
import { useStandingData } from '../hooks/useStandingData';

function EndScoreView() {
  const navigate = useNavigate();
  const { scoreId } = useParams<{ scoreId: string }>();
  const { score, numberOfParticipants, fetchScore, setScoreAsEnded, setParticipantStanding } = useScoreData(scoreId);
  const { standingData, saveStandingsState, resetStandingData } = useStandingData();

  const saveRace = async () => {
    if (!score) return;

    const sortedParticipants = score.participants.sort((a, b) => {
      return (a.standing || 0) - (b.standing || 0);
    });

    setScoreAsEnded(sortedParticipants);

    navigate(`/scores/${score.id}`);
  };

  const standingBtnHandler = (participantIndex: number, position: number) => {
    saveStandingsState(position);
    setParticipantStanding(participantIndex, position);
  };

  const StandingButtons = ({
    participant,
    participantIndex,
  }: {
    participant: Participant;
    participantIndex: number;
  }) => {
    return Array.from({ length: numberOfParticipants }).map((_, idx) => {
      const pos = idx + 1;

      const btnIsDisabled = [
        participant.standing !== undefined,
        pos < standingData.max,
        pos <= standingData.number && pos > standingData.max,
        pos > standingData.number + 1,
      ].some(Boolean);

      return (
        <button
          key={idx}
          type="button"
          data-testid={`standing-btn-${participantIndex}-${idx}`}
          className={clsx('btn btn-sm _w-12 btn-primary', participant.standing === pos && 'btn-link')}
          disabled={btnIsDisabled}
          onClick={() => standingBtnHandler(participantIndex, pos)}
        >
          {pos}
        </button>
      );
    });
  };

  return (
    <div className="sm:w-2/4 mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Race standings</h1>

      <div className="flex flex-col gap-5">
        {score?.participants.map((participant, participantIndex) => (
          <div className="flex flex-col gap-1 justify-center items-center" key={participantIndex}>
            <div className="font-semibold text-right_">{participant.name}</div>

            <span className="col-span-2_ flex gap-1">
              {participant.standing ? (
                <div className="flex items-center h-12_ text-black/40">{ordinal(participant.standing)} place</div>
              ) : (
                <StandingButtons participant={participant} participantIndex={participantIndex} />
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
            onClick={() => {
              resetStandingData();
              fetchScore();
            }}
          >
            Reset
          </button>

          <button
            className="btn btn-md btn-primary"
            disabled={standingData.number < numberOfParticipants}
            onClick={saveRace}
          >
            Save standings
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndScoreView;
