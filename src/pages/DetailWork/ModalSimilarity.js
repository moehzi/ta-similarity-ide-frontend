import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { checkSimilarityStudent } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';

const ModalSimilarity = ({
  isOpen,
  onClose,
  setIsLoading,
  refetchDetailWork,
  workId,
}) => {
  const [selected, setSelected] = useState('RabinKarp');
  const { token } = useAuth();
  const handleButton = (e) => {
    setSelected(e.target.id);
    console.log(e.target.id);
  };
  const toast = useToast();

  const checkSimilarity = () => {
    setIsLoading(true);
    const payload = {
      algorithm: selected,
    };
    checkSimilarityStudent(token, workId, payload)
      .then((res) => {
        toast({
          title: 'Check Similarity',
          description: res.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsLoading(false);
        refetchDetailWork();
        onClose();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose the algorithm :</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4}>
            <Button
              colorScheme={selected === 'RabinKarp' && 'telegram'}
              id="RabinKarp"
              onClick={handleButton}
              variant={selected !== 'RabinKarp' ? 'outline' : 'solid'}
            >
              Rabin Karp
            </Button>
            <Button
              colorScheme={selected === 'JaroWinkler' && 'telegram'}
              id="JaroWinkler"
              variant={selected !== 'JaroWinkler' ? 'outline' : 'solid'}
              onClick={handleButton}
            >
              Jaro Winkler
            </Button>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            variant={'outline'}
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="solid"
            colorScheme={'telegram'}
            onClick={checkSimilarity}
          >
            Check Similarity
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSimilarity;
