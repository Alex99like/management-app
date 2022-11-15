import { RouterProvider } from 'react-router-dom';
import { privateRouter, publicRouter } from './config/routes';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();
  const routes = user ? publicRouter : privateRouter;

  return <RouterProvider router={routes} />;
}

export default App;
