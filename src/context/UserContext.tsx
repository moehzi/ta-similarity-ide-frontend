import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getProfile } from '../services/user';

type UserProviderProps = React.PropsWithChildren<{}>;

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<[]>([]);
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    if (token) {
      getProfile(token).then((res) => {
        setUser(res.data);
        setIsLoading(false);
      });
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
