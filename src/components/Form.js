import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import ExecutionModal from './ExecutionModal';
import useSimulator from '../hooks/use-simulator';

function Form() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setFile, text, setText } = useSimulator();

  return (
    <Stack spacing='16px'>
      <Tabs>
        <TabList>
          <Tab>Arquivo</Tab>
          <Tab>Texto</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <FormControl>
              <FormLabel>Arquivo de entrada</FormLabel>
              <Input onChange={(e) => setFile(e.target.files[0])} type='file' />
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl>
              <FormLabel>Texto de entrada</FormLabel>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                minH='300px'
              />
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button onClick={onOpen} colorScheme={'green'}>
        Executar simulador
      </Button>
      <ExecutionModal isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
}

export default Form;
