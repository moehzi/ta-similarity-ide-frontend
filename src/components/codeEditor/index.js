import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Text } from '@chakra-ui/react';
import { EditorView } from '@codemirror/view';

const CodeEditor = ({ value, onChange, language, display }) => {
  return (
    <div className="flex-1 max-w-[485px]">
      <Text fontSize="2xl" fontWeight={'semibold'}>
        {display}
      </Text>
      <CodeMirror
        value={value}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[
          language,
          EditorView.lineWrapping,
          EditorView.theme({
            '&': { fontSize: '13px' },
            '.cm-content': { fonFamily: 'Source Code Pro', minHeight: '400px' },
            '.cm-scroller': {
              overflow: 'auto',
              maxHeight: '400px',
            },
            '.cm-gutters': {
              minHeight: '400px',
            },
          }),
        ]}
        theme={dracula}
        onChange={onChange}
        className={'font-code'}
      />
    </div>
  );
};

export default CodeEditor;
