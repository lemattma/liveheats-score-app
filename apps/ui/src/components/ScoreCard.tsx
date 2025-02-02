import { CheckBadgeIcon, ClockIcon, FireIcon } from '@heroicons/react/24/solid';
import {
  FlagIcon,
  InformationCircleIcon,
  RssIcon,
} from '@heroicons/react/24/outline';
import { Score, ScoreStatus } from '../types/scores';

import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ScoreCardProps {
  score: Score;
}

export function ScoreCardStatus({ score }: ScoreCardProps) {
  const classes = 'uppercase text-sm text-gray-600 font-semibold';

  switch (score.status) {
    case ScoreStatus.UPCOMING:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          <ClockIcon className="w-4 h-4 stroke-2 fill-black/40" />
          <span className="text-black/60">Upcoming</span>
        </span>
      );
    case ScoreStatus.LIVE:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          <FireIcon className="w-4 h-4 stroke-2 fill-lh-red " />
          <span className="text-lh-red">Live</span>
        </span>
      );
    case ScoreStatus.ENDED:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          <CheckBadgeIcon className="w-4 h-4 fill-lh-green stroke-black/60" />
          <span className="text-black/60">Ended</span>
        </span>
      );
  }
}

export function ScoreCardCta({ score }: ScoreCardProps) {
  const classes = 'uppercase text-sm text-gray-600 font-semibold';

  switch (score.status) {
    case ScoreStatus.UPCOMING:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          See details
          <InformationCircleIcon className="inline-block w-4 h-4 stroke-2" />
        </span>
      );
    case ScoreStatus.LIVE:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          Watch live!
          <RssIcon className="inline-block w-4 h-4 stroke-2" />
        </span>
      );
    case ScoreStatus.ENDED:
      return (
        <span className={clsx(classes, 'flex items-center gap-1')}>
          See final standings
          <FlagIcon className="inline-block w-4 h-4 stroke-2" />
        </span>
      );
  }
}

function ScoreCard({ score }: ScoreCardProps) {
  return (
    <Link
      to={`/scores/${score.id}`}
      className={clsx(
        'transition-all duration-150 border border-gray-200 bg-gray-50 rounded-xl shadow p-4',
        'outline outline-2 outline-transparent hover:outline-gray-500/10 active:scale-[.99]'
      )}
    >
      <ScoreCardStatus score={score} />

      <h5 className="text-xl mb-4">{score.title}</h5>

      <ScoreCardCta score={score} />
    </Link>
  );
}

export default ScoreCard;
