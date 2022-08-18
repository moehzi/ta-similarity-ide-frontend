import { useContext, useRef } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

const ResultMessage = () => {
  const { result, testOutput } = useContext(CodeContext);
  const terminal = useRef();

  const getValue = () => {
    let resultA = '';
    try {
      resultA = `${eval(result)}`;
    } catch (error) {
      resultA = `${error}`;
    }
    return resultA;
  };

  return (
    <CodeMirror
      value={
        getValue() === testOutput ? 'Correct Answer ✅' : 'Wrong answer :( ❌'
      }
      basicSetup={{
        defaultKeymap: true,
        lineNumbers: false,
      }}
      ref={terminal}
      editable={false}
      extensions={[javascript()]}
      theme={dracula}
      //   minHeight={'100vh'}
      className="mt-2 text-xl text-red-400 font-code"
    />
  );
};

export default ResultMessage;
