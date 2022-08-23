import React, { useCallback, useContext, useRef, useState } from 'react';
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
import { DetailCourseContext } from '../../context/DetailCourseContext';

const ModalAddWork = ({ isOpen, onClose, refetch }) => {
  const { token } = useAuth();
  const toast = useToast();
  //   const { refetchMyCourse } = useCourse();
  const { courseId } = useParams();
  const workName = useRef();
  const [workDesc, setWorkDesc] = useState();
  const [testCode, setTestCode] = useState(`function main() {
// Write your test code here
}
		  
main();`);
  const [preview, setPreview] = useState(false);

  //   const handleCreate = () => {
  //     const payload = {
  //       name: workName.current.value,
  //       description: workDescription.current.value,
  //       codeTest: codeTest.current.value,
  //     };

  //     createCourse(token, payload).then((res) => {
  //       toast({
  //         title: 'Sucessfully create course',
  //         description: res.data.message,
  //         status: 'success',
  //         duration: 9000,
  //         isClosable: true,
  //       });
  //       onClose();
  //       refetchMyCourse();
  //     });
  //   };

  const onChange = useCallback((value, viewUpdate) => {
    setTestCode(value);
  }, []);
  const onChangeWork = useCallback((value, viewUpdate) => {
    setWorkDesc(value);
  }, []);

  const handleCreate = () => {
    const payload = {
      name: workName.current?.value,
      description: workDesc,
      codeTest: testCode,
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
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create course</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input ref={workName} placeholder="Enter your work name" />
            <FormLabel>Description</FormLabel>
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

            <FormLabel mt={4}>Code Test</FormLabel>
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
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddWork;
