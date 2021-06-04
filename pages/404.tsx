 import Link from 'next/link';
 import { FaExclamationTriangle } from 'react-icons/fa';
 import Layout from '../components/Layout';
 import styles from '../styles/404.module.css';

 const notFoundPage = () => (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1 className={styles.error__title}>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">
          Go Back Home
        </Link>
      </div>
    </Layout>
  );

  export default notFoundPage;
