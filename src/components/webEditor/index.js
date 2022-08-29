import { useCallback, useContext, useEffect } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { Button, useToast } from '@chakra-ui/react';
import { submitWork } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';
import { Pane } from '../pane';

const WebEditor = ({ codeTest, workId }) => {
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
  } = useContext(CodeContext);
  const { token } = useAuth();
  const toast = useToast();

  //   const testCode = `// Don't delete this
  //   function main() {
  // 	let boolRes = false;
  // 	const testCase = [[1,2,3],[1,4,5],[1,5,6]]
  // 	for(let i =0;i<testCase.length;i++){
  // 		const a = testCase[i][0]
  // 		const b = testCase[i][1]
  // 		const result = testCase[i][2]
  // 		const res = solveFirst(a, b);
  // 		if(res===result){
  // 			boolRes = true;
  // 		}else{
  // 			boolRes = false;
  // 		}
  // 	}
  // 	return boolRes;
  // }

  // main();`;
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
    setResult(`${js} ${codeTest}`);
    setSrcDoc(`
	<html>
	<body>${HTML}</body>
	<style>${CSS}</style>
	<script>${js}</script>
	</html>`);
  };

  const submitCode = () => {
    const payload = {
      code: code,
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
    <div className="flex-1">
      <CodeMirror
        value={HTML}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[html()]}
        theme={dracula}
        onChange={onChangeHTML}
        className={'font-code mb-4'}
        minHeight={'25vh'}
      />
      <CodeMirror
        value={CSS}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[css()]}
        theme={dracula}
        onChange={onChangeCss}
        className={'font-code mb-4'}
        minHeight={'25vh'}
      />
      <CodeMirror
        value={js}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[javascript()]}
        theme={dracula}
        onChange={onChangeJs}
        className={'font-code mb-4'}
        minHeight={'25vh'}
      />
      <Button onClick={runCode} colorScheme={'whatsapp'}>
        Run Code
      </Button>

      {isCorrect && (
        <Button ml={4} onClick={submitCode} colorScheme={'gray'}>
          Submit Code
        </Button>
      )}
    </div>
  );
};

export default WebEditor;
