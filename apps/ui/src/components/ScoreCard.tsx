import { Score, ScoreStatus } from '../types/scores';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { twMerge } from 'tw-merge';

interface ScoreCardProps {
  score: Score;
}

function ScoreCardStatus({ score }: ScoreCardProps) {
  const classes = 'uppercase text-sm text-gray-600 font-semibold';

  switch (score.status) {
    case ScoreStatus.UPCOMING:
      return (
        <span className={twMerge(clsx(classes, 'text-lh-red'))}>Upcoming</span>
      );
    case ScoreStatus.LIVE:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          <span className="rounded-full w-3 h-3 inline-block bg-lh-green border border-gray-300"></span>
          Live
        </span>
      );
    case ScoreStatus.ENDED:
      return <span className={clsx(classes, 'text-gray-400')}>Ended</span>;
  }
}

function ScoreCard({ score }: ScoreCardProps) {
  return (
    <a
      href="/"
      className={clsx(
        'transition-all duration-150 border border-gray-200 bg-gray-50 rounded-xl shadow p-4',
        'outline outline-2 outline-transparent hover:outline-gray-500/10 active:scale-[.99]'
      )}
    >
      <ScoreCardStatus score={score} />

      <h5 className="text-xl mb-4">{score.title}</h5>

      <span className="flex items-center gap-1">
        Standings
        <ArrowRightIcon className="inline-block w-5 h-5 stroke-2" />
      </span>
    </a>
  );
}

export default ScoreCard;
