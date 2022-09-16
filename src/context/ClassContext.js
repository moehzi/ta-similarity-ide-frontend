import React, { createContext } from 'react';
import useFetch from '../hooks/useFetch';
import { GET_LIST_ALL_CLASS } from '../services/class';

export const ListClassContext = createContext(null);

export const ListClassProvider = ({ children }) => {
  const { data, refetch, loading } = useFetch(GET_LIST_ALL_CLASS());
  return (
    <ListClassContext.Provider
      value={{
        data,
        refetch,
        loading,
      }}
    >
      {children}
    </ListClassContext.Provider>
  );
};
