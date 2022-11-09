import {
  Stack,
  Button,
  Alert,
  AlertIcon,
  Box,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react';
import React, { FormEvent, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/auth';

export const Login = () => {
  const { token, setToken, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      username: username.current?.value,
      password: password.current?.value,
    };
    login(data)
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        localStorage.removeItem('token');
        setErrorMessage(err.response.data.data.message);
      });
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [navigate, token]);

  return (
    <div className="flex items-center min-h-screen bg-white">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">
              Sign in
            </h1>
            <p className="text-gray-500">Sign in to access your account</p>
          </div>
          <div className="m-7">
            {errorMessage && (
              <Alert status="error" className="mb-4">
                <AlertIcon />
                <Box>
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Box>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={username}
                  placeholder="D1211"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 ">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={password}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
              <div className="w-full mb-6">
                <Stack direction="row" className="w-full">
                  {isLoading ? (
                    <Button
                      sx={{ width: '100%' }}
                      isLoading
                      colorScheme="teal"
                      variant="outline"
                    >
                      Log in
                    </Button>
                  ) : (
                    <Button
                      sx={{ width: '100%' }}
                      colorScheme="teal"
                      variant="outline"
                      type="submit"
                    >
                      Log in
                    </Button>
                  )}
                </Stack>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
