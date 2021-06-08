import { ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ShowCase from 'components/ShowCase';
import styles from '../styles/Layout.module.css';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  children: ReactNode;
}

const Layout: NextPage<Props> = ({
  title = 'DJ Events',
  description = 'Find the latest DJ and other musical events',
  keywords = 'music, dj, edm, events',
  children,
}) => {
  const { pathname } = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {pathname === '/' && <ShowCase />}

      <div className={styles.container}>
        {children}
      </div>

      <Footer />

      <ToastContainer />
    </div>
  );
};

export default Layout;
