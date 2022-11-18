import React, { createContext, useState } from 'react';
// import useFetch from '../hooks/useFetch';
// import { GET_PROFILE } from '../services/user';

// type UserProviderProps = React.PropsWithChildren<{}>;

export const CodeContext = createContext(null);

export const CodeProvider = ({ children }) => {
  //   const { data, error, loading, refetch } = useFetch(GET_PROFILE);
  const [code, setCode] = useState(``);
  const [result, setResult] = useState('');
  const [description, setDescription] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  const [isCorrect, setIsCorrect] = useState(false);

  return (
    <CodeContext.Provider
      value={{
        srcDoc,
        setSrcDoc,
        code,
        setCode,
        result,
        setResult,
        description,
        isCorrect,
        setIsCorrect,
        setDescription,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
