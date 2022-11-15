import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ReduxToastrLib from 'react-redux-toastr';
import { useAuth } from '../../../hooks/useAuth';

export const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const { routes } = useAuth();

  useEffect(() => {
    if (routes === 'public') navigate('/main');
    if (routes === 'private') navigate('/');
  }, [routes]);

  return (
    <>
      <Header />
      <main>
        <ReduxToastrLib
          newestOnTop={false}
          preventDuplicates
          progressBar
          closeOnToastrClick
          timeOut={4000}
          transitionIn="bounceIn"
          transitionOut="fadeOut"
        />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
