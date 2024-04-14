import { createContext, useState } from 'react';

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
  user: any;
}

const defaultProvider = {
  isAuth: false,
  setIsAuth: () => {},
  user: null,
};

const AuthContext = createContext<IAuthContext>(defaultProvider);

// create context provider
function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<any>(null);

  return <AuthContext.Provider value={{ isAuth, setIsAuth, user }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
