import { useCallback, useContext } from 'react';

import { CodeContext } from '../../context/CodeContext';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { Button, useToast } from '@chakra-ui/react';
import { submitWork } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';

const CodeEditor = ({ codeTest, workId }) => {
  const { code, setCode, setResult, isCorrect } = useContext(CodeContext);
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
  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  const runCode = () => {
    setResult(`${code} ${codeTest}`);
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
    <div>
      <CodeMirror
        value={code}
        basicSetup={{
          defaultKeymap: true,
        }}
        extensions={[javascript()]}
        theme={dracula}
        onChange={onChange}
        minHeight={'400px'}
        className={'font-code mb-4'}
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

export default CodeEditor;
