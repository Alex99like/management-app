import { RouterProvider } from 'react-router-dom';
import { privateRouter, publicRouter } from './config/routes';
import { useAuth } from './views/components/Form/useAuth';
import { Suspense } from 'react';

function App() {
  const { user } = useAuth();
  const routes = user ? publicRouter : privateRouter;

  return (
    <Suspense fallback="Loading..">
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
