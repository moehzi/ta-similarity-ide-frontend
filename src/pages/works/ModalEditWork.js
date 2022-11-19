import React, {
  useCallback,
  useState,
  useMemo,
  useContext,
  useRef,
} from 'react';
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
import { editWork } from '../../services/work';
import moment from 'moment';
import { DetailCourseContext } from '../../context/DetailCourseContext';

const ModalEditWork = ({ isOpen, onClose, refetch, workId }) => {
  const { token } = useAuth();
  const toast = useToast();
  const { detailCourse } = useContext(DetailCourseContext);
  const [isLoading, setIsLoading] = useState(false);
  const workName = useRef();
  const dateTime = useRef();
  const workDesc = useRef();
  const testCode = useRef();
  const [preview, setPreview] = useState(false);

  const onChange = useCallback((value, viewUpdate) => {
    testCode.current = value;
  }, []);

  const onChangeWork = useCallback((value, viewUpdate) => {
    workDesc.current = value;
  }, []);

  const onChangeName = useCallback((e) => {
    workName.current = e.target.value;
  }, []);

  const onChangeDate = useCallback((e) => {
    dateTime.current = e.target.value;
  }, []);

  useMemo(() => {
    const filtered = detailCourse?.works?.find((works) => works._id === workId);
    if (filtered) {
      workName.current = filtered.name;
      workDesc.current = filtered.description;
      testCode.current = filtered.codeTest;
      dateTime.current = moment
        .unix(filtered?.deadline)
        .format('yyyy-MM-DDTHH:mm');
    }
  }, [detailCourse?.works, workId]);

  const handleEdit = () => {
    setIsLoading(true);
    const payload = {
      name: workName.current,
      description: workDesc.current,
      codeTest: testCode.current,
      deadline: parseInt(
        (new Date(dateTime.current).getTime() / 1000).toFixed(0)
      ),
    };

    editWork(token, workId, payload)
      .then((res) => {
        toast({
          title: 'Update Work',
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
      {!isLoading && (
        <>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Assignment</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={workName.current}
                  onChange={onChangeName}
                  placeholder="Enter your work name"
                />
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
                  onChange={onChangeDate}
                  value={dateTime.current}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleEdit}
                isLoading={isLoading}
              >
                Edit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </>
      )}
    </Modal>
  );
};

export default ModalEditWork;
