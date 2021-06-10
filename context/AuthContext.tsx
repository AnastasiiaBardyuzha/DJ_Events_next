import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { authAxiosInstance } from 'api/index';
import { FormValues } from 'constants_types/types';

interface Props {
  children: ReactNode
}

interface UserType {
  username?: string,
  email?: string,
  password?: string,
}

interface AuthContextType {
  user: UserType | null,
  error: string | null,
  register: (userInfo: UserType) => void,
  login: (loginInfo: FormValues) => void,
  logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
  register: () => null,
  login: () => null,
  logout: () => null,
});

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider: NextPage<Props> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Register user
  const register = (userInfo: UserType) => {
    console.log(userInfo);
  };

  // Login user
  const login =  async ({ email:identifier, password }: FormValues) => {
    try {
      const res = await authAxiosInstance.post('/api/login', {identifier, password});

      console.log('loginres: ', res.data);
      
    }catch (er) {
      console.log(er);
      
    }
  };

  // Logout user
  const logout =  () => {
    console.log('Logout');
  };

  // Check if user is logged in
  const checkUserLoggedIn =  (userInfo: UserType) => {
    console.log('Check');
    console.log(userInfo);
    
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;