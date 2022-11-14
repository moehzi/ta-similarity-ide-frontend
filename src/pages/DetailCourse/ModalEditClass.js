import React, { useContext } from 'react';
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
import { MultiSelect } from 'chakra-multiselect';
import { editClass } from '../../services/class';
import { ClassContext } from '../../context/ListClassCourse';

const ModalEditClass = ({
  isOpen,
  onClose,
  courseId,
  className,
  value,
  options,
  setClassName,
  handleChangeSelect,
  selected,
}) => {
  const { token } = useAuth();
  const toast = useToast();
  //   const { refetchMyCourse } = useCourse();
  const { refetch } = useContext(ClassContext);

  const handleCreate = () => {
    const payload = {
      name: className,
      author: selected,
    };

    editClass(token, payload, courseId).then((res) => {
      toast({
        title: 'Update Course',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      refetch();
    });
  };

  const handleChange = (e) => {
    setClassName(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={className}
              onChange={handleChange}
              placeholder="First name"
            />
            <MultiSelect
              options={options}
              value={value}
              label="Choose the lecturer"
              onChange={handleChangeSelect}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            Edit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditClass;
