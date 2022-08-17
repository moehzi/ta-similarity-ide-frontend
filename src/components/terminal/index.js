import { useContext, useRef } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

export default function Terminal() {
  const { result } = useContext(CodeContext);
  const terminal = useRef();

  return (
    <CodeMirror
      value={eval(result)}
      basicSetup={{
        defaultKeymap: true,
        lineNumbers: false,
      }}
      ref={terminal}
      editable={false}
      //   extensions={[javascript()]}
      theme={dracula}
      minHeight={'100vh'}
      className={'font-code w-1/2'}
    />
  );
}
