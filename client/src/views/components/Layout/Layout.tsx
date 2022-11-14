import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import ReduxToastrLib from 'react-redux-toastr';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <ReduxToastrLib
        newestOnTop={false}
        preventDuplicates
        progressBar
        closeOnToastrClick
        timeOut={4000}
        transitionIn="bounceIn"
        transitionOut="fadeOut"
      />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
