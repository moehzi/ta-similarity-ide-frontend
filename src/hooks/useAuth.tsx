import React, { createContext, useContext, useState } from 'react';

type AuthProviderProps = React.PropsWithChildren<{}>;

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ token, setToken, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
