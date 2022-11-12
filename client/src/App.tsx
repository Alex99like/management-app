import { RouterProvider } from 'react-router-dom';

import { publiRouter } from './config/routes';
import { RootProvider } from './providers/RootProvider';

function App() {
  return (
    <RootProvider>
      <RouterProvider router={publiRouter} />;
    </RootProvider>
  );
}

export default App;
