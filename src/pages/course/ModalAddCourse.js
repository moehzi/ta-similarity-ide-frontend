import React, { useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import { createCourse } from '../../services/course';
import { useCourse } from '../../hooks/useCourse';

const ModalAddCourse = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const toast = useToast();
  const { refetchMyCourse } = useCourse();

  const courseName = useRef();

  const handleCreate = () => {
    const payload = {
      name: courseName.current.value,
    };

    createCourse(token, payload).then((res) => {
      toast({
        title: 'Sucessfully create course',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      refetchMyCourse();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create course</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Course Name</FormLabel>
            <Input ref={courseName} placeholder="First name" />
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

export default ModalAddCourse;
