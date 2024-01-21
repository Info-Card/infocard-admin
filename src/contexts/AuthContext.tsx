import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useGetMeQuery, useLoginMutation } from '@/store/auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValue {
  isLoading: boolean;
  user: any;
  login: (params: any) => Promise<void>;
  logout: () => void;
}

const initialAuthContextValue: AuthContextValue = {
  isLoading: false,
  user: undefined,
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextValue>(
  initialAuthContextValue
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<any>();

  const { data: userData, isLoading: userLoading } = useGetMeQuery(
    {},
    {
      skip:
        typeof localStorage !== 'undefined'
          ? !localStorage.getItem('user')
          : true,
    }
  );
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  useEffect(() => {
    if (
      typeof localStorage !== 'undefined' &&
      localStorage?.getItem('user')
    ) {
      setUser(JSON.parse(localStorage?.getItem('user') || ''));
    } else if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (!userLoading) {
      setUser(null);
    }
  }, [userData, userLoading]);

  const handleLogin = async (params: any) => {
    try {
      const res = await login(params).unwrap();
      if (res.user.role !== 'admin') {
        toast.error('Unauthorized: Only admins are allowed.');
        throw new Error('Unauthorized: Only admins are allowed.');
      }
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('tokens', JSON.stringify(res.tokens));
      router.replace((router.query.returnUrl as string) || '/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth/login');
  };

  const values = {
    isLoading: userLoading || loginLoading,
    user,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
