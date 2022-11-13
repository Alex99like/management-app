import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { FormAuth } from '../Form/Form';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

export const Layout = (): JSX.Element => {
  return (
    <>
      <FormAuth />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
