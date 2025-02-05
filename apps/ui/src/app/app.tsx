import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EndScoreView from '../views/EndScoreView';
import Header from '../components/Header';
import NewScoreView from '../views/NewScoreView';
import { ReactNode } from 'react';
import ScoreDetailsView from '../views/ScoreDetailsView';
import ScoresListView from '../views/ScoresListView';

interface RouteProps {
  View: () => ReactNode;
}

function Route({ View }: RouteProps) {
  return (
    <div className="h-screen">
      <Header />

      <div className="container mx-auto">
        <View />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <Route View={ScoresListView} /> },
  { path: '/scores', element: <Route View={ScoresListView} /> },
  { path: '/scores/:scoreId', element: <Route View={ScoreDetailsView} /> },
  { path: '/scores/:scoreId/end', element: <Route View={EndScoreView} /> },
  { path: '/scores/new', element: <Route View={NewScoreView} /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
