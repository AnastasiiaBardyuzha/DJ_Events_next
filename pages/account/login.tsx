/* eslint-disable react/no-unescaped-entities */
import {
  useState,
  useEffect,
  useContext,
  SyntheticEvent,
  // ChangeEventHandler,
} from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import Layout from 'components/Layout';
import LoginForm from 'components/forms/LoginForm'; 
import { FormValues } from 'constants_types/types';
import styles from 'styles/AuthForm.module.css';

const LoginPage = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>

        <LoginForm handleSubmit={handleSubmit} />
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email'>Email Address
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor='password'>Password
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <input type='submit' value='Login' className='btn' />
        </form> */}

        <p>
          Don't have an account? <Link href='/account/register'>Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
