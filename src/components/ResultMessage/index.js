import { useContext, useEffect, useRef, useState } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { html } from '@codemirror/lang-html';
import { Text } from '@chakra-ui/react';

const ResultMessage = ({ value, display }) => {
  const terminal = useRef();

  return (
    <div className="mt-8">
      <Text fontSize={'xl'}>{display}</Text>
      <CodeMirror
        value={value}
        basicSetup={{
          defaultKeymap: true,
          lineNumbers: false,
        }}
        ref={terminal}
        editable={false}
        extensions={[html()]}
        theme={dracula}
        //   minHeight={'100vh'}
        className="mt-2 text-xl text-red-400 font-code"
      />
    </div>
  );
};

export default ResultMessage;
