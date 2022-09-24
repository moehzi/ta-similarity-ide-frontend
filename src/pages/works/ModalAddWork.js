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
import { useAuth } from '../../hooks/useAuth';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
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
  const dateTime = useRef(new Date());
  const expectedOutput = useRef();
  const [workDesc, setWorkDesc] = useState();
  const [testCode, setTestCode] = useState(`describe('Masukkan judul test',()=>{
	it('Masukkan spesifik test',()=>{
	  // Tuliskan testnya disini
	  // Contoh:
	  // chai.expect(sum(5,2)).to.eql(7)
	})
})`);
  const [preview, setPreview] = useState(false);

  const onChange = useCallback((value, viewUpdate) => {
    setTestCode(value);
  }, []);

  const onChangeWork = useCallback((value, viewUpdate) => {
    setWorkDesc(value);
  }, []);

  const handleCreate = () => {
    setIsLoading(true);
    const payload = {
      name: workName.current?.value,
      description: workDesc,
      codeTest: testCode,
      expectedOutput: expectedOutput.current?.value,
      deadline: parseInt(
        (new Date(dateTime.current?.value).getTime() / 1000).toFixed(0)
      ),
    };

    createWork(token, payload, courseId)
      .then((res) => {
        toast({
          title: 'Sucessfully create work',
          description: res.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
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
              <MarkdownPreview source={workDesc} />
            ) : (
              <CodeMirror
                value={workDesc}
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

            <FormLabel mt={8}>Code Test</FormLabel>
            <CodeMirror
              value={testCode}
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
