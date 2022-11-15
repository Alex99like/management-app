import { createBrowserRouter } from 'react-router-dom';
import { FormAuth } from '../views/components/Form/Form';
import { Layout } from '../views/components/Layout/Layout';
import BoardPage from '../views/pages/BoardPage/BoardPage';
import MainPage from '../views/pages/MainPage/MainPage';
import NotFound from '../views/pages/NotFoundPage/NotFoundPage';
import WelcomePage from '../views/pages/WelcomePage/WelcomePage';

export const publicRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'board',
        element: <BoardPage />,
      },
    ],
  },
]);

export const privateRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: 'login',
        element: <FormAuth path={'login'} />,
      },
      {
        path: 'register',
        element: <FormAuth path={'register'} />,
      },
    ],
  },
]);
