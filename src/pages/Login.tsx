import { Stack, Button } from '@chakra-ui/react';
import React, { FormEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login } from '../services/auth';

export const Login = () => {
  const { token, setToken, isLoading, setIsLoading } = useAuth();
  const navigate = useNavigate();

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
        setIsLoading(false);
      })
      .catch((err) => localStorage.removeItem('token'));
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [navigate, token]);

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign in
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={username}
                  placeholder="D1211"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    Password
                  </label>
                  <a
                    href="#!"
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={password}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
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
