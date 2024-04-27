// create a context for the auth state

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface IAuthProvider {
  user: any;
  login: (user: any, accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthProvider>({
  login: () => {},
  logout: () => {},
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = (user: any, accessToken: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
