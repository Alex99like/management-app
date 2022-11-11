import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './views/components/Footer/Footer';
import Header from './views/components/Header/Header';
import BoardPage from './views/pages/BoardPage/BoardPage';
import MainPage from './views/pages/MainPage/MainPage';
import NotFound from './views/pages/NotFoundPage/NotFoundPage';
import WelcomePage from './views/pages/WelcomePage/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
