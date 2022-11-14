import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { deleteCourse } from '../../services/course';
import { useAuth } from '../../hooks/useAuth';

const ModalDeleteCourse = ({
  isOpenDelete,
  onCloseDelete,
  courseId,
  onClose,
  refetch,
}) => {
  const toast = useToast();
  const { token } = useAuth();
  const handleDelete = () => {
    deleteCourse(token, courseId).then((res) => {
      toast({
        title: 'Delete course',
        description: res.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      refetch();
    });
  };
  return (
    <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure want to delete this course?</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            variant="outline"
            onClick={onCloseDelete}
          >
            Close
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteCourse;
