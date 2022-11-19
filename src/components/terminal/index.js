import { useContext, useRef } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Text } from '@chakra-ui/react';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';

const Terminal = ({ expectedOutput }) => {
  const { result } = useContext(CodeContext);
  const terminal = useRef();

  const myTheme = createTheme({
    settings: {
      background: '#ffffff',
      foreground: '#0e141e',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
      lineHighlight: '#fff',
      gutterBackground: '#fff',
      gutterForeground: '#8a919966',
    },
    styles: [
      { tag: t.comment, color: '#787b8099' },
      { tag: t.variableName, color: '#0080ff' },
      { tag: [t.string, t.special(t.brace)], color: '#0e141e' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: '#5c6166' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#5c6166' },
      { tag: t.operator, color: '#5c6166' },
      { tag: t.className, color: '#5c6166' },
      { tag: t.definition(t.typeName), color: '#5c6166' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.angleBracket, color: '#5c6166' },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' },
    ],
  });

  return (
    <div>
      <div>
        <Text fontSize="md">Your output: </Text>
        <CodeMirror
          value={
            result?.actual_output?.length > 0
              ? `${result?.actual_output[0]}`
              : `${result?.error_msg[0]}`
          }
          basicSetup={{
            defaultKeymap: true,
            lineNumbers: true,
          }}
          ref={terminal}
          editable={false}
          extensions={[
            javascript(),
            EditorView.theme({
              '&': { fontSize: '14px' },
              '.cm-scroller': {
                overflow: 'auto',
                maxHeight: '400px',
              },
            }),
          ]}
          theme={myTheme}
          //   minHeight={'100vh'}
          className={'font-code text'}
        />
      </div>
      <div>
        <Text fontSize="md">Expected Output: </Text>
        <CodeMirror
          value={`${result?.expected_output[0]}`}
          basicSetup={{
            defaultKeymap: true,
            lineNumbers: true,
          }}
          ref={terminal}
          editable={false}
          extensions={[
            javascript(),
            EditorView.theme({
              '&': { fontSize: '14px' },
              '.cm-scroller': {
                overflow: 'auto',
                maxHeight: '400px',
              },
            }),
          ]}
          theme={myTheme}
          //   minHeight={'100vh'}
          className={'font-code text-lg'}
        />
      </div>
    </div>
  );
};

export default Terminal;
