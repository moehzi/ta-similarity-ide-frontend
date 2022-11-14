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
import { deleteClass } from '../../services/class';
import { useAuth } from '../../hooks/useAuth';

const ModalDeleteClass = ({
  isOpenDelete,
  onCloseDelete,
  classId,
  refetch,
}) => {
  const toast = useToast();
  const { token } = useAuth();
  const handleDelete = () => {
    deleteClass(token, classId)
      .then((res) => {
        toast({
          title: 'Delete class',
          description: res.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        onCloseDelete();
        refetch();
      });
  };
  return (
    <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure want to delete this class?</ModalBody>

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

export default ModalDeleteClass;
