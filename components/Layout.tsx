import React, { FC } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from '../styles/Layout.module.css';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}

const Layout: FC<Props> = ({
  title = 'DJ Events',
  description = 'Find the latest DJ and other musical events',
  keywords = 'music, dj, edm, events',
  children,
}) => (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className={styles.container}>
        {children}
      </div>

      <Footer />
    </div>
  );

export default Layout;