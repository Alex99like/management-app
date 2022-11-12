import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publiRouter } from './config/routes';
import { RootProvider } from './providers/RootProvider';

function App() {
  return <RouterProvider router={publiRouter} />;
}

export default App;
