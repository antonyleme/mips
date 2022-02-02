import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from '@chakra-ui/react';

import useSimulator from '../hooks/use-simulator';

const ExecutionModal = ({ isOpen, onClose }) => {
  const { submit } = useSimulator();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Simular MIPS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Você deseja executar a simulação diretamente ou passo a passo?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={'green'}
              mr={3}
              variant='outline'
              onClick={() => submit('step')}
            >
              Passo a passo
            </Button>
            <Button colorScheme='green' onClick={() => submit('direct')}>
              Execução direta
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExecutionModal;
