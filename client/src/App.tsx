import { RouterProvider, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { privateRouter, publicRouter } from './config/routes';
import { RootProvider } from './providers/RootProvider';
import Cookies from 'cookies-js';
import { useAuth } from './views/components/Form/useAuth';
import { Suspense, useEffect } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

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
