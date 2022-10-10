import React from 'react';
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
import { editCourse } from '../../services/course';
import { useCourse } from '../../hooks/useCourse';

const ModalEditCourse = ({
  isOpen,
  onClose,
  courseId,
  courseName,
  setCourseName,
}) => {
  const { token } = useAuth();
  const toast = useToast();
  const { refetchMyCourse } = useCourse();

  const handleEdit = () => {
    const payload = {
      name: courseName,
    };

    editCourse(token, payload, courseId).then((res) => {
      toast({
        title: 'Update Course',
        description: res.data.message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      refetchMyCourse();
    });
  };

  const handleChange = (e) => {
    setCourseName(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Course Name</FormLabel>
            <Input
              value={courseName}
              onChange={handleChange}
              placeholder="First name"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEdit}>
            Edit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditCourse;
