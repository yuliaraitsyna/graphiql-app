import {useEffect, useState} from 'react';
import {AuthContext} from './AuthContext';
import {UserCredential} from 'firebase/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserCredential | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userCredential: UserCredential) => {
    localStorage.setItem('user', JSON.stringify(userCredential));
    setUser(userCredential);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{isLoggedIn, user, login, logout}}>{children}</AuthContext.Provider>;
};
