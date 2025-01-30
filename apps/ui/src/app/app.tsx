import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Header from '../components/Header';
import { JSX } from 'react';
import ScoreDetailsView from '../views/ScoreDetailsView';
import ScoresListView from '../views/ScoresListView';

interface RouteProps {
  View: () => JSX.Element;
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
