import { Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { CodeContext } from '../../context/CodeContext';

export const Pane = () => {
  const { srcDoc } = useContext(CodeContext);
  return (
    <div className="h-[50vh] mt-5">
      <Text fontSize={'2xl'} fontWeight="semibold">
        Playground
      </Text>
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-same-origin allow-scripts"
        frameBorder="0"
        width="100%"
        height="100%"
      />
    </div>
  );
};
