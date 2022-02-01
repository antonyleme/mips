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
  const { instructions } = useSimulator();

  return (
    <Box border='1px solid' borderColor='gray.100'>
      <Box p='8px' border='1px solid' borderColor='gray.100' mb='16px'>
        <Heading textAlign={'center'} as='h2' fontSize='20px'>
          Instruções
        </Heading>
      </Box>
      <Table size='sm' variant='striped'>
        <Thead>
          <Tr>
            <Th>PC</Th>
            <Th>Instrução</Th>
          </Tr>
        </Thead>
        <Tbody>
          {instructions.map((instruction, index) => (
            <Tr key={`instruction-${index}`}>
              <Td></Td>
              <Td>{instruction}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InstructionsTable;
