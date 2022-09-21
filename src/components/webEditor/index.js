import { useCallback, useContext, useEffect, useState } from 'react';

import { CodeContext } from '../../context/CodeContext';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { Button, useToast } from '@chakra-ui/react';
import { submitWork, testWork } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';

import CodeEditor from '../codeEditor';
import { useNavigate } from 'react-router-dom';

const WebEditor = ({ workId }) => {
  const {
    setHtml,
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

  const onChangeHTML = useCallback(
    (value, viewUpdate) => {
      setHtml(value);
    },
    [setHtml]
  );

  const onChangeCss = useCallback(
    (value, viewUpdate) => {
      setCss(value);
    },
    [setCss]
  );

  const onChangeJs = useCallback(
    (value, viewUpdate) => {
      setJs(value);
    },
    [setJs]
  );

  useEffect(() => {
    console.log('ini jalan');
  }, [onChangeCss, onChangeJs, onChangeHTML]);

  useEffect(() => {
    setJs('');
    setHtml('');
    setCss('');
    setSrcDoc('');
    setIsCorrect(false);
    setResult('');
  }, []);

  const [loadingTest, setLoadingTest] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const navigate = useNavigate();

  const runCode = () => {
    const payload = {
      jsCode: `${js}`,
    };
    setLoadingTest(true);
    testWork(token, workId, payload)
      .then((res) => {
        setResult(res.data.data);
        setIsCorrect(res.data.solution);
      })
      .catch((err) => setLoadingTest(false))
      .finally(() => setLoadingTest(false));

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
    setLoadingSubmit(true);
    submitWork(token, workId, payload).then((res) => {
      toast({
        title: 'Submit Work',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setLoadingSubmit(false);
      navigate(`/courses/${res.data.data.classId}`);
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
        <Button
          onClick={runCode}
          colorScheme={'whatsapp'}
          isLoading={loadingTest}
        >
          Run Code
        </Button>

        {isCorrect && (
          <Button
            onClick={submitCode}
            colorScheme={'gray'}
            isLoading={loadingSubmit}
          >
            Submit Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default WebEditor;
