import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import BoardPage from '../views/pages/BoardPage/BoardPage';
import MainPage from '../views/pages/MainPage/MainPage';
import NotFound from '../views/pages/NotFoundPage/NotFoundPage';
import WelcomePage from '../views/pages/WelcomePage/WelcomePage';

export const publiRouter = createBrowserRouter([
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
