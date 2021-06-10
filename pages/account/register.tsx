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
import RegisterForm from 'components/forms/RegisterForm'; 
import { FormValues } from 'constants_types/types';
import styles from 'styles/AuthForm.module.css';

const RegisterPage = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>

        <RegisterForm handleSubmit={handleSubmit} />
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
          Already have an account? <Link href='/account/login'>Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
