import { act, renderHook } from '@testing-library/react';

import { useStandingData } from './useStandingData';

describe('useStandingData', () => {
  it('should update data', () => {
    const { result } = renderHook(() => useStandingData());

    expect(result.current.standingData).toEqual({
      max: 0,
      sum: 0,
      number: 0,
      counter: {},
    });

    act(() => {
      result.current.saveStandingsState(1);
      result.current.saveStandingsState(1);
    });

    expect(result.current.standingData).toEqual({
      max: 1,
      sum: 2,
      number: 2,
      counter: { 0: 2 },
    });

    act(() => {
      result.current.saveStandingsState(3);
      result.current.saveStandingsState(4);
    });

    expect(result.current.standingData).toEqual({
      max: 4,
      sum: 9,
      number: 4,
      counter: { 0: 2, 2: 1, 3: 1 },
    });
  });

  it('should reset data to initial values', () => {
    const { result } = renderHook(() => useStandingData());

    act(() => {
      result.current.saveStandingsState(5);
    });

    expect(result.current.standingData).toEqual({
      max: 5,
      sum: 5,
      number: 1,
      counter: { 4: 1 },
    });

    act(() => {
      result.current.resetStandingData();
    });

    expect(result.current.standingData).toEqual({
      max: 0,
      sum: 0,
      number: 0,
      counter: {},
    });
  });
});
