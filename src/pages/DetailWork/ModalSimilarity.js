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
  Text,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { checkSimilarityStudent } from '../../services/work';
import { useAuth } from '../../hooks/useAuth';

const ModalSimilarity = ({
  isOpen,
  onClose,
  setIsLoading,
  isLoading,
  refetchDetailWork,
  workId,
}) => {
  const [selected, setSelected] = useState('RabinKarp');
  const [classCategory, setClassCategory] = useState('one-class');
  const [kGram, setKgram] = useState('3');

  const { token } = useAuth();
  const handleButton = (e) => {
    setSelected(e.target.id);
  };

  const handleAllClass = (e) => {
    setClassCategory(e.target.id);
  };

  const handleKGram = (e) => {
    setKgram(e.target.id);
  };
  const toast = useToast();

  const checkSimilarity = () => {
    setIsLoading(true);
    const payload = {
      algorithm: selected,
      categoryClass: classCategory,
      kGram: Number(kGram),
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
        <ModalHeader>Check Similarity</ModalHeader>
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

          <Stack mt="4">
            <Heading size="sm">Kgram :</Heading>
            <Flex gap={4} mt={4} alignItems={'center'}>
              <Button
                colorScheme={kGram === '3' && 'telegram'}
                id="3"
                onClick={handleKGram}
                variant={kGram !== '3' ? 'outline' : 'solid'}
              >
                3
              </Button>
              <Button
                colorScheme={kGram === '5' && 'telegram'}
                id="5"
                variant={kGram !== '5' ? 'outline' : 'solid'}
                onClick={handleKGram}
              >
                5
              </Button>
              <Button
                colorScheme={kGram === '7' && 'telegram'}
                id="7"
                variant={kGram !== '7' ? 'outline' : 'solid'}
                onClick={handleKGram}
              >
                7
              </Button>
            </Flex>
          </Stack>
          <Flex gap={4} mt={4}>
            <Button
              colorScheme={classCategory === 'one-class' && 'telegram'}
              id="one-class"
              onClick={handleAllClass}
              variant={classCategory !== 'one-class' ? 'outline' : 'solid'}
            >
              Only this class
            </Button>
            <Button
              colorScheme={classCategory === 'all-class' && 'telegram'}
              id="all-class"
              variant={classCategory !== 'all-class' ? 'outline' : 'solid'}
              onClick={handleAllClass}
            >
              All Class
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
            isLoading={isLoading}
            onClick={checkSimilarity}
          >
            Check
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSimilarity;
