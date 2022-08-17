import React, { createContext, useState } from 'react';
// import useFetch from '../hooks/useFetch';
// import { GET_PROFILE } from '../services/user';

// type UserProviderProps = React.PropsWithChildren<{}>;

export const CodeContext = createContext(null);

export const CodeProvider = ({ children }) => {
  //   const { data, error, loading, refetch } = useFetch(GET_PROFILE);
  const [code, setCode] = useState('');
  const [result, setResult] = useState('');

  return (
    <CodeContext.Provider value={{ code, setCode, result, setResult }}>
      {children}
    </CodeContext.Provider>
  );
};