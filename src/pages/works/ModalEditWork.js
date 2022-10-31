import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
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
import { editWork, getWorkById } from '../../services/work';
import moment from 'moment';
import { DetailCourseContext } from '../../context/DetailCourseContext';

const ModalEditWork = ({ isOpen, onClose, refetch, workId }) => {
  const { token } = useAuth();
  const toast = useToast();
  const { detailCourse, loadingDetailCourse, refetchDetailCourse } =
    useContext(DetailCourseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [workName, setWorkName] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [workDesc, setWorkDesc] = useState();
  const [testCode, setTestCode] = useState();
  const [preview, setPreview] = useState(false);

  const onChange = useCallback((value, viewUpdate) => {
    setTestCode(value);
  }, []);

  const onChangeWork = useCallback((value, viewUpdate) => {
    setWorkDesc(value);
  }, []);

  const onChangeName = useCallback((e) => {
    setWorkName(e.target.value);
  }, []);

  const onChangeDate = useCallback((e) => {
    setDateTime(e.target.value);
  }, []);

  const handleWorkById = useMemo(() => {
    const filtered = detailCourse?.works?.find((works) => works._id === workId);
    if (filtered) {
      setWorkName(filtered.name);

      setWorkDesc(filtered.description);
      setTestCode(filtered.codeTest);
      setDateTime(moment.unix(filtered?.deadline).format('yyyy-MM-DDTHH:mm'));
    }
  }, [detailCourse?.works, workId]);

  useEffect(() => {
    console.log('called');
  }, [handleWorkById]);

  const handleEdit = () => {
    setIsLoading(true);
    const payload = {
      name: workName,
      description: workDesc,
      codeTest: testCode,
      deadline: parseInt((new Date(dateTime).getTime() / 1000).toFixed(0)),
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
                  value={workName}
                  onChange={onChangeName}
                  placeholder="Enter your work name"
                />
                <FormLabel mt={4}>Description</FormLabel>
                <Link onClick={() => setPreview(!preview)}>Preview</Link>
                {preview ? (
                  <MarkdownPreview
                    source={workDesc}
                    warpperElement={{
                      'data-color-mode': 'light',
                    }}
                  />
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
                  onChange={onChangeDate}
                  value={dateTime}
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
