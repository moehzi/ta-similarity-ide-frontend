import { useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { Text } from '@chakra-ui/react';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';

const ResultMessage = ({ value, display }) => {
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
    <div className="mt-4">
      <Text fontSize={'lg'} fontWeight="semibold">
        {display} :
      </Text>
      <CodeMirror
        value={value}
        basicSetup={{
          defaultKeymap: true,
          lineNumbers: true,
        }}
        ref={terminal}
        editable={false}
        extensions={
          ([html()],
          EditorView.theme({
            '&': { fontSize: '14px' },
            '.cm-scroller': {
              overflow: 'auto',
              maxHeight: '400px',
            },
          }))
        }
        theme={myTheme}
        //   minHeight={'100vh'}
        className="mt-2 text-xl text-red-400 font-code"
      />
    </div>
  );
};

export default ResultMessage;
