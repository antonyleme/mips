import { Flex, Box, Text, Heading, Button } from '@chakra-ui/react';
import useSimulator from '../hooks/use-simulator';

function Header() {
  const { submited, reset } = useSimulator();

  return (
    <Flex mb='32px' alignItems={'flex-end'} justifyContent={'space-between'}>
      <Box>
        <Heading>Simulador MIPS</Heading>
        <Text>Faça sua entrada de dados via arquivo ou via texto</Text>
      </Box>
      {submited && (
        <Button onClick={reset} colorScheme={'blue'}>
          Nova simulação
        </Button>
      )}
    </Flex>
  );
}

export default Header;
