import { Participant, Score, ScoreStatus } from '../types/scores';
import { getScore, updateScore } from '../data/api';
import { useCallback, useEffect, useState } from 'react';

export const useScoreData = (scoreId?: string) => {
  const [score, setScore] = useState<Score | null>(null);

  const fetchScore = useCallback(async () => {
    if (!scoreId) return;

    const scoreRes = await getScore(scoreId);

    if (!scoreRes) return;

    setScore(scoreRes);
  }, [scoreId]);

  const setScoreAsEnded = async (participants: Participant[]) => {
    if (!score) return;

    await updateScore({
      ...score,
      status: ScoreStatus.ENDED,
      participants: participants,
    });
  };

  const setParticipantStanding = (participantIndex: number, position: number) => {
    if (!score) return;

    setScore({
      ...score,
      participants: score.participants.map((participant, index) => {
        return { ...participant, standing: index === participantIndex ? position : participant.standing };
      }),
    });
  };

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  const numberOfParticipants = score?.participants.length || 0;

  return { score, numberOfParticipants, fetchScore, setScoreAsEnded, setScore, setParticipantStanding };
};
