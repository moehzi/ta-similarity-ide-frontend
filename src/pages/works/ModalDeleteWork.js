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
import { useAuth } from '../../hooks/useAuth';
import { deleteWork } from '../../services/work';
const ModalDeleteWork = ({ isOpenDelete, onCloseDelete, workId, refetch }) => {
  const toast = useToast();
  const { token } = useAuth();
  const handleDelete = () => {
    deleteWork(token, workId)
      .then((res) => {
        toast({
          title: 'Delete assignment',
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
        <ModalHeader>Delete assignment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure want to delete this assignment?</ModalBody>

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

export default ModalDeleteWork;
