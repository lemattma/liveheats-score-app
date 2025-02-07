import { Mock, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router';

import EndScoreView from './EndScoreView';
import { useScoreData } from '../hooks/useScoreData';

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../hooks/useScoreData', () => ({
  useScoreData: vi.fn(),
}));

describe('EndScoreView', () => {
  const mockNavigate = vi.fn();
  const mockUseParams = { scoreId: '1' };
  const mockUseScoreData = {
    score: {
      id: '1',
      participants: [
        { name: 'Participant 1', standing: undefined },
        { name: 'Participant 2', standing: undefined },
        { name: 'Participant 3', standing: undefined },
        { name: 'Participant 4', standing: undefined },
      ],
    },
    numberOfParticipants: 4,
    fetchScore: vi.fn(),
    setScoreAsEnded: vi.fn(),
    setParticipantStanding: vi.fn(),
  };

  beforeEach(() => {
    (useNavigate as Mock).mockReturnValue(mockNavigate);
    (useParams as Mock).mockReturnValue(mockUseParams);
    (useScoreData as Mock).mockReturnValue(mockUseScoreData);
  });

  it('calls setScoreAsEnded when Save standings button is clicked', () => {
    render(<EndScoreView />);

    expect(screen.getByText('Save standings')).toBeDisabled();

    fireEvent.click(screen.getByTestId('standing-btn-0-0'));
    fireEvent.click(screen.getByTestId('standing-btn-1-1'));
    fireEvent.click(screen.getByTestId('standing-btn-2-2'));

    expect(screen.getByText('Save standings')).toBeDisabled();
    fireEvent.click(screen.getByTestId('standing-btn-3-3'));
    expect(screen.getByText('Save standings')).toBeEnabled();

    fireEvent.click(screen.getByText('Save standings'));

    expect(mockUseScoreData.setScoreAsEnded).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/scores/1');
  });

  it('skips position when there is a tie', () => {
    render(<EndScoreView />);

    // Click on position 1 for participant 1
    fireEvent.click(screen.getByTestId('standing-btn-0-0'));
    // Click on position 1 for participant 2
    fireEvent.click(screen.getByTestId('standing-btn-1-0'));

    expect(screen.getByTestId('standing-btn-2-0')).toBeEnabled();
    expect(screen.getByTestId('standing-btn-2-1')).toBeDisabled();
    expect(screen.getByTestId('standing-btn-2-2')).toBeEnabled();
    expect(screen.getByTestId('standing-btn-2-3')).toBeDisabled();

    // Click on position 3 for participant 3
    fireEvent.click(screen.getByTestId('standing-btn-2-2'));

    expect(screen.getByTestId('standing-btn-3-0')).toBeDisabled();
    expect(screen.getByTestId('standing-btn-3-1')).toBeDisabled();
    expect(screen.getByTestId('standing-btn-3-2')).toBeEnabled();
    expect(screen.getByTestId('standing-btn-3-3')).toBeEnabled();

    expect(screen.getByText('Save standings')).toBeDisabled();
    fireEvent.click(screen.getByTestId('standing-btn-3-3'));
    expect(screen.getByText('Save standings')).toBeEnabled();
    fireEvent.click(screen.getByText('Save standings'));

    expect(mockUseScoreData.setScoreAsEnded).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/scores/1');
  });

  it('resets standings data when Reset button is clicked', () => {
    render(<EndScoreView />);
    fireEvent.click(screen.getByText('Reset'));
    expect(mockUseScoreData.fetchScore).toHaveBeenCalled();
  });

  it('disables Save standings button if standings are incomplete', () => {
    render(<EndScoreView />);
    expect(screen.getByText('Save standings')).toBeDisabled();
  });
});
