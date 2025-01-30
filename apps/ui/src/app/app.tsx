import { useEffect, useState } from 'react';

import Header from '../components/Header';
import { Score } from '../types/scores';
import ScoreCard from '../components/ScoreCard';
import { getScores } from '../data/api';

function App() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    async function fetchScores() {
      const scores = await getScores();
      setScores(scores);
    }
    fetchScores();
  }, []);

  return (
    <div className="h-screen">
      <Header />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {scores.map((score) => (
            <ScoreCard key={score.id} score={score} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
