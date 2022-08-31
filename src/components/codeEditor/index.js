import { useCallback, useContext } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { Button, Text, useToast } from '@chakra-ui/react';
import { submitWork } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';

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
