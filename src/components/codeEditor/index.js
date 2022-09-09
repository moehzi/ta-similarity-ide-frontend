import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Text } from '@chakra-ui/react';

const CodeEditor = ({ value, onChange, language, display }) => {
  return (
    <div className="flex-1">
      <Text fontSize="2xl" fontWeight={'semibold'}>
        {display}
      </Text>
      <CodeMirror
        value={value}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[language]}
        theme={dracula}
        onChange={onChange}
        className={'font-code'}
        maxHeight={'40vh'}
        minHeight={'40vh'}
      />
    </div>
  );
};

export default CodeEditor;
