import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Heading,
} from '@chakra-ui/react';
import useSimulator from '../../hooks/use-simulator';

const InstructionsTable = () => {
  const { memories } = useSimulator();

  return (
    <Box border='1px solid' borderColor='gray.100'>
      <Box p='8px' border='1px solid' borderColor='gray.100' mb='16px'>
        <Heading textAlign={'center'} as='h2' fontSize='20px'>
          Memória
        </Heading>
      </Box>
      <Table size='sm' variant='striped'>
        <Thead>
          <Tr>
            <Th>Local</Th>
            <Th isNumeric>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memories.map((memory) => (
            <Tr key={`memory-${memory.position}`}>
              <Td>{memory.position}</Td>
              <Td isNumeric>{memory.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InstructionsTable;
