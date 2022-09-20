import React, { createContext } from 'react';
import useFetch from '../hooks/useFetch';
import { USER_CLASS } from '../services/class';

export const UserClassContext = createContext(null);

export const UserClassProvider = ({ children }) => {
  const { data, refetch, loading } = useFetch(USER_CLASS());
  return (
    <UserClassContext.Provider
      value={{
        data,
        refetch,
        loading,
      }}
    >
      {children}
    </UserClassContext.Provider>
  );
};
