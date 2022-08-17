import { useCallback, useContext } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { Button } from 'antd';

export default function CodeEditor() {
  const { code, setCode, setResult } = useContext(CodeContext);
  const submitCode = () => {
    setResult(code);
  };

  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  return (
    <>
      <CodeMirror
        value={code}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[javascript()]}
        theme={dracula}
        onChange={onChange}
        minHeight={'100vh'}
        className={'font-code w-1/2'}
      />
      <Button onClick={submitCode}>Submit code</Button>
    </>
  );
}
