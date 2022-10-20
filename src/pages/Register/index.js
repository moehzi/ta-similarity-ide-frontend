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
import { register } from '../../services/auth';

export const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const username = useRef();
  const password = useRef();
  const registrationNumber = useRef();
  const email = useRef();
  const role = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: username.current?.value,
      password: password.current?.value,
      registrationNumber: registrationNumber.current?.value,
      email: email.current?.value,
      role: role.current?.value,
    };
    register(data)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.data.message);
      });
  };

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
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Name
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
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  NIM/NIM
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  id="registrationNumber"
                  ref={registrationNumber}
                  placeholder="D1211"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={email}
                  placeholder="dewa@gmail.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="w-full mb-6">
                <Stack direction="row" className="w-full">
                  <Button
                    sx={{ width: '100%' }}
                    colorScheme="teal"
                    variant="outline"
                    type="submit"
                  >
                    Register
                  </Button>
                </Stack>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
