import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { MultiSelect } from 'chakra-multiselect';
import { getTeacher } from '../../services/user';
import { createClass } from '../../services/class';

const ModalAddClass = ({ isOpen, onClose, refetch }) => {
  const { token } = useAuth();
  const toast = useToast();
  //   const { refetchMyCourse } = useCourse();
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [listTeacher, setListTeacher] = useState([]);
  const { courseId } = useParams();
  const className = useRef();

  const handleCreate = () => {
    const payload = {
      name: className.current?.value,
      author: selected,
    };

    createClass(token, payload, courseId).then((res) => {
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

  const handleChange = (value2) => {
    console.log(`selected ${value2}`);
    setValue(value2);
    const selectedTeacher = listTeacher.filter((teacher) =>
      value2.includes(teacher.name)
    );

    const selectedId = selectedTeacher.map((v) => v._id);

    setSelected(selectedId);
  };

  useEffect(() => {
    getTeacher(token).then((res) => {
      const teacherName = res?.data?.map((v) => v.name);
      setOptions(teacherName);
      setListTeacher(res.data);
    });
  }, []);

  const [value, setValue] = useState([]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create assignment</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input mb={4} ref={className} placeholder="Enter your work name" />
          </FormControl>
          <MultiSelect
            options={options}
            value={value}
            label="Choose the lecturer"
            onChange={handleChange}
          />
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

export default ModalAddClass;
