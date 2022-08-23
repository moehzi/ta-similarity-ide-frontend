import { useContext, useRef } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { Text } from '@chakra-ui/react';

const Terminal = ({ expectedOutput }) => {
  const { result } = useContext(CodeContext);
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

  //   const getTestValue = () => {
  //     let resultA = '';
  //     try {
  //       resultA = `${eval(testCode)}`;
  //     } catch (error) {
  //       resultA = `${error}`;
  //     }
  //     return resultA;
  //   };

  return (
    <div className="mt-4">
      <div className="mt-2">
        <Text fontSize="md">Your output: </Text>
        <CodeMirror
          value={getValue()}
          basicSetup={{
            defaultKeymap: true,
            lineNumbers: true,
          }}
          ref={terminal}
          editable={false}
          extensions={[javascript()]}
          theme={dracula}
          //   minHeight={'100vh'}
          className={'font-code text-lg'}
        />
      </div>
      <div className="mt-2">
        <Text fontSize="md">Expected Output: </Text>
        <CodeMirror
          value={expectedOutput}
          basicSetup={{
            defaultKeymap: true,
            lineNumbers: true,
          }}
          ref={terminal}
          editable={false}
          extensions={[javascript()]}
          theme={dracula}
          //   minHeight={'100vh'}
          className={'font-code text-lg'}
        />
      </div>
    </div>
  );
};

export default Terminal;
