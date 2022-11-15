import { RouterProvider, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRouter, publicRouter } from './config/routes';
import { RootProvider } from './providers/RootProvider';
import Cookies from 'cookies-js';
import { useAuth } from './views/components/Form/useAuth';
import { useEffect } from 'react';

function App() {
  const { user } = useAuth();
  const routes = user ? publicRouter : privateRouter;

  return <RouterProvider router={routes} />;
}

export default App;
