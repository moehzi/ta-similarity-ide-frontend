import React, { createContext } from 'react';
import useFetch from '../hooks/useFetch';
import { GET_PROFILE } from '../services/user';

type UserProviderProps = React.PropsWithChildren<{}>;

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data, error, loading, refetch } = useFetch(GET_PROFILE);

  return (
    <UserContext.Provider value={{ user: data, loading, refetch, error }}>
      {children}
    </UserContext.Provider>
  );
};
