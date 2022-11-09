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
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { MultiSelect } from 'chakra-multiselect';
import { createClass } from '../../services/class';

const ModalAddClass = ({
  isOpen,
  onClose,
  refetch,
  options,
  handleChange,
  selected,
  value,
}) => {
  const { token } = useAuth();
  const toast = useToast();
  //   const { refetchMyCourse } = useCourse();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Class</ModalHeader>
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
