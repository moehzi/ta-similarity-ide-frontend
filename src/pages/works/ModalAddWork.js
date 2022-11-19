import React, { useCallback, useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Link,
} from '@chakra-ui/react';
import Switch from 'antd/es/switch';
import { useAuth } from '../../hooks/useAuth';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { createWork } from '../../services/course';
import { useParams } from 'react-router-dom';

const ModalAddWork = ({ isOpen, onClose, refetch }) => {
  const { token } = useAuth();
  const toast = useToast();
  //   const { refetchMyCourse } = useCourse();
  const [isLoading, setIsLoading] = useState(false);
  const { courseId } = useParams();
  const workName = useRef();

  const htmlStarter = useRef(`<html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Document</title>
  </head>
  <body>
	  
  </body>
  </html>`);

  const cssStarter = useRef(`body {
	font-size:14px;
}`);

  const jsStarter = useRef(`function init(){
	// your code here
  }`);

  const workDesc = useRef();

  const dateTime = useRef(new Date());
  const [isStarter, setIsStarter] = useState(false);
  const testCode = useRef(`describe('Masukkan judul test',()=>{

	it('Masukkan spesifik test',()=>{
	  // Tuliskan testnya disini
	  // Contoh:
	  // chai.expect(sum(5,2)).to.eql(7)
	})
})`);
  const [preview, setPreview] = useState(false);

  const onChange = useCallback((value, viewUpdate) => {
    testCode.current = value;
  }, []);

  const onChangeWork = useCallback((value, viewUpdate) => {
    workDesc.current = value;
  }, []);

  const onChangeHTML = useCallback((value, viewUpdate) => {
    htmlStarter.current = value;
  }, []);

  const onChangeCss = useCallback((value, viewUpdate) => {
    cssStarter.current = value;
  }, []);

  const onChangeJs = useCallback((value, viewUpdate) => {
    jsStarter.current = value;
  }, []);

  const handleCreate = () => {
    setIsLoading(true);
    const payload = {
      name: workName.current?.value,
      description: workDesc.current,
      codeTest: testCode.current,
      htmlStarter: isStarter ? htmlStarter.current : '',
      cssStarter: isStarter ? cssStarter.current : '',
      jsStarter: isStarter ? jsStarter.current : '',
      deadline: parseInt(
        (new Date(dateTime.current?.value).getTime() / 1000).toFixed(0)
      ),
    };

    createWork(token, payload, courseId).then((res) => {
      toast({
        title: 'Sucessfully create work',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      refetch();
      setIsLoading(false);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create assignment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input ref={workName} placeholder="Enter your work name" />
            <FormLabel mt={4}>Description</FormLabel>
            <Link onClick={() => setPreview(!preview)}>Preview</Link>
            {preview ? (
              <MarkdownPreview
                source={workDesc.current}
                warpperElement={{
                  'data-color-mode': 'light',
                }}
              />
            ) : (
              <CodeMirror
                value={workDesc.current}
                basicSetup={{
                  defaultKeymap: true,
                  lineNumbers: false,
                }}
                extensions={[markdown()]}
                theme={dracula}
                onChange={onChangeWork}
                minHeight={'400px'}
                className={'font-code mb-4'}
              />
            )}
            <FormLabel>Set starter code</FormLabel>
            <Switch
              defaultChecked={isStarter}
              onClick={() => setIsStarter(!isStarter)}
            />
            {isStarter && (
              <>
                <FormLabel mt={8}>HTML Starter</FormLabel>
                <CodeMirror
                  value={htmlStarter.current}
                  basicSetup={{
                    defaultKeymap: true,
                  }}
                  extensions={[html()]}
                  theme={dracula}
                  onChange={onChangeHTML}
                  minHeight={'400px'}
                  className={'font-code mb-4'}
                />
                <FormLabel mt={8}>CSS Starter</FormLabel>
                <CodeMirror
                  value={cssStarter.current}
                  basicSetup={{
                    defaultKeymap: true,
                  }}
                  extensions={[css()]}
                  theme={dracula}
                  onChange={onChangeCss}
                  minHeight={'400px'}
                  className={'font-code mb-4'}
                />
                <FormLabel mt={8}>JS Starter</FormLabel>
                <CodeMirror
                  value={jsStarter.current}
                  basicSetup={{
                    defaultKeymap: true,
                  }}
                  extensions={[javascript()]}
                  theme={dracula}
                  onChange={onChangeJs}
                  minHeight={'400px'}
                  className={'font-code mb-4'}
                />
              </>
            )}
            <FormLabel mt={8}>Code Test</FormLabel>
            <CodeMirror
              value={testCode.current}
              basicSetup={{
                defaultKeymap: true,
              }}
              extensions={[javascript()]}
              theme={dracula}
              onChange={onChange}
              minHeight={'400px'}
              className={'font-code mb-4'}
            />
            <FormLabel mt={8}>Deadline</FormLabel>
            <Input
              type="datetime-local"
              placeholder="Select Date and Time"
              ref={dateTime}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleCreate}
            isLoading={isLoading}
          >
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddWork;
