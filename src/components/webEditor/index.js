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

  const testCode = `mocha.run()
  .on('test', function(test) {
    console.log('Test started: ' + test.title);
  })
  .on('test end', function(test) {
    console.log('Test ended: ' + test.title);
  })
  .on('pass', function(test) {
    console.log('Test passed');
  })
  .on('fail', function(test, err) {
    console.log('Test failed');
    console.log(test);
    console.log(err);
	return err.message;
  })
  .on('end', function() {
    console.log('All tests done');
  })`;

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
    // setResult(`
    // <html>
    //   <head>
    // 	<title>Mocha Tests</title>
    // 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mocha/10.0.0/mocha.css" />
    //   </head>
    //   <body>
    // 	<div id="mocha"></div>
    // 	<script src="https://cdnjs.cloudflare.com/ajax/libs/mocha/8.0.1/mocha.min.js"></script>
    // 	<script src="https://cdnjs.cloudflare.com/ajax/libs/chai/4.2.0/chai.min.js"></script>
    // 	<script>
    // 	  mocha.setup('bdd');
    // 	</script>

    // 	<!-- load code you want to test here -->
    // 	<script>
    // 	  ${js}

    // 	  describe('test', () => {
    // 		it('Should return 6', () => {
    // 		  chai.expect(sum(4, 2)).to.eql(6);
    // 		});

    // 		it('Should return 7',()=>{
    // 			chai.expect(sum(5,2)).to.eql(7);
    // 		})
    // 	  });
    // 	</script>

    // 	<!-- load your test files here -->

    // 	<script>
    // 	   mocha
    // 		.run()
    // 		.on('test', function (test) {
    // 		  console.log('Test started: ' + test.title);
    // 		})
    // 		.on('test end', function (test) {
    // 		  console.log('Test ended: ',test);
    // 		})
    // 		.on('pass', function (test) {
    // 		  console.log('Test passed');
    // 		  console.log(test)
    // 		  window.localStorage.setItem('success',test.title)
    // 		})
    // 		.on('fail', function (test, err) {
    // 			window.localStorage.setItem('error',err.message)
    // 			window.localStorage.removeItem('success');
    // 		})
    // 		.on('end', function () {
    // 		  console.log('All tests done');
    // 		});
    // 	</script>
    //   </body>
    // </html>`);
    const payload = {
      code: `${js}`,
    };
    testWork(token, workId, payload).then((res) => {
      console.log(res, 'mantap');

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
