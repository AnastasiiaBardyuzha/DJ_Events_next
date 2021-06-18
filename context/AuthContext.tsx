import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { notifyError } from 'helper/notify';
import { authAxiosInstance } from 'api';
import { FormValues } from 'interfaces';

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

  const router = useRouter();

  // Register user
  const register = async (userInfo: UserType) => {
    try {
      const res = await authAxiosInstance.post(
        '/api/register', userInfo,
      );

      setUser(res.data.user);
      router.push('/account/dashboard');
    } catch (er) {
      const {data} = er.response;;

      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login =  async (
    { email:identifier, password }: FormValues,
    ) => {
    try {
      const res = await authAxiosInstance.post(
        '/api/login', { identifier, password },
      );

      setUser(res.data.user);
      router.push('/account/dashboard');
    } catch (er) {
      const {data} = er.response;

      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await authAxiosInstance.post('/api/logout');
 
      setUser(null);
      router.replace('/');
    } catch (er) {
      notifyError();
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn =  async () => {
    try {
      const res = await authAxiosInstance.get('/api/user');
 
      setUser(res.data.user);
    } catch (er) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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