/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import Layout from 'components/Layout';
import LoginForm from 'components/forms/LoginForm';
import { useAuth } from 'context/AuthContext'; 
import { notifyError } from 'helper/notify';
import { FormValues } from 'constants_types/types';
import styles from 'styles/AuthForm.module.css';

const LoginPage = () => {
  const { login, error } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    error && notifyError(error);
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      await login(values); 
    } catch (er) {
      notifyError(error);
    }
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>

        <LoginForm handleSubmit={handleSubmit} />
        <p>
          Don't have an account? <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
