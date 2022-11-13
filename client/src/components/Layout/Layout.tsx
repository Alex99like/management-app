import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../views/components/Footer/Footer';
import Header from '../../views/components/Header/Header';
import styles from './Layout.module.scss';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
