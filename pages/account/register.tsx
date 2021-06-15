import { useEffect } from 'react';
import CustomLink from 'components/common/CustomLink';
import { FaUser } from 'react-icons/fa';
import Layout from 'components/Layout';
import RegisterForm from 'components/forms/RegisterForm'; 
import { useAuth } from 'context/AuthContext'; 
import { notifyError } from 'helper/notify';
import { FormValues } from 'constants_types/types';
import styles from 'styles/AuthForm.module.css';

const RegisterPage = () => {
  const { register, error } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    error && notifyError(error);
  });
  const handleSubmit = async (values: FormValues) => {
    try {
      await register(values);
    } catch(er){
      notifyError(error);
    }
    
  };

  return (
    <Layout title='User Registration'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>

        <RegisterForm handleSubmit={handleSubmit} />
        
        <p>
          Already have an account?
          {' '}
          <CustomLink href='/account/login'>
            Login
          </CustomLink>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
