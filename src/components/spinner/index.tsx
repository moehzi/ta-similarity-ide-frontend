import React from 'react';
import { Spinner } from '@chakra-ui/react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.600"
        size="xl"
      />
    </div>
  );
};
