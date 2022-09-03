import { useCallback, useContext, useEffect } from 'react';

import { CodeContext } from '../../context/CodeContext';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { Button, useToast } from '@chakra-ui/react';
import { submitWork, testWork } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';

import CodeEditor from '../codeEditor';

const WebEditor = ({ workId }) => {
  const {
    setHtml,
    code,
    setCss,
    setJs,
    js,
    css: CSS,
    html: HTML,
    setResult,
    isCorrect,
    setSrcDoc,
    setIsCorrect,
  } = useContext(CodeContext);
  const { token } = useAuth();
  const toast = useToast();

  const onChangeHTML = useCallback((value, viewUpdate) => {
    setHtml(value);
  }, []);

  const onChangeCss = useCallback((value, viewUpdate) => {
    setCss(value);
  }, []);

  const onChangeJs = useCallback((value, viewUpdate) => {
    setJs(value);
  }, []);

  const runCode = () => {
    const payload = {
      jsCode: `${js}`,
    };
    testWork(token, workId, payload).then((res) => {
      setResult(res.data.data);
      setIsCorrect(res.data.solution);
    });

    setSrcDoc(`
	<html>
	<body>${HTML}</body>
	<style>${CSS}</style>
	<script>${js}</script>
	</html>`);
  };

  const submitCode = () => {
    const payload = {
      jsCode: js,
      cssCode: CSS,
      htmlCode: HTML,
    };
    submitWork(token, workId, payload).then((res) => {
      toast({
        title: 'Submit Work',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <div className="mt-4">
      <div className="flex gap-4 mb-4">
        <CodeEditor
          display={'HTML'}
          value={HTML}
          language={html()}
          onChange={onChangeHTML}
        />
        <CodeEditor
          display={'CSS'}
          value={CSS}
          language={css()}
          onChange={onChangeCss}
        />
        <CodeEditor
          display={'JavaScript'}
          value={js}
          language={javascript()}
          onChange={onChangeJs}
        />
      </div>
      <div className="flex gap-4">
        <Button onClick={runCode} colorScheme={'whatsapp'}>
          Run Code
        </Button>

        {isCorrect && (
          <Button onClick={submitCode} colorScheme={'gray'}>
            Submit Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebEditor;
