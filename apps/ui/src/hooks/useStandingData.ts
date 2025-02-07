import { useState } from 'react';

type ScoreCounter = Record<string, number>;
export type StandingsData = {
  max: number;
  sum: number;
  number: number;
  counter: ScoreCounter;
};

export const useStandingData = () => {
  const [standingData, setStandingData] = useState<StandingsData>({
    max: 0,
    sum: 0,
    number: 0,
    counter: {},
  });

  const resetStandingData = () => {
    setStandingData({ max: 0, sum: 0, number: 0, counter: {} });
  };

  const saveStandingsState = (standing: number) => {
    setStandingData((prevState) => ({
      ...prevState,
      max: Math.max(prevState.max, standing),
      sum: prevState.sum + standing,
      number: prevState.number + 1,
      counter: {
        ...prevState.counter,
        [standing - 1]: (prevState.counter[standing - 1] || 0) + 1,
      },
    }));
  };

  return {
    standingData,
    saveStandingsState,
    resetStandingData,
  };
};
