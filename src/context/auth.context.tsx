// create a context for the auth state

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface IAuthProvider {
  user: any;
  search: string;
  setSearch: (search: string) => void;
  login: (user: any, accessToken: string) => void;
  logout: () => void;
  categories: string;
  setCategories: (categories: string) => void;
}

export const AuthContext = createContext<IAuthProvider>({
  login: () => {},
  logout: () => {},
  setSearch: () => {},
  user: null,
  search: '',
  setCategories: () => {},
  categories: '',
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [categories, setCategories] = useState('');

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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        search,
        setSearch,
        categories,
        setCategories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
