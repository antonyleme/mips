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
  const { registers } = useSimulator();

  return (
    <Box border='1px solid' borderColor='gray.100'>
      <Box p='8px' border='1px solid' borderColor='gray.100' mb='16px'>
        <Heading textAlign={'center'} as='h2' fontSize='20px'>
          Registradores
        </Heading>
      </Box>
      <Table size='sm' variant='striped'>
        <Thead>
          <Tr>
            <Th>Registrador</Th>
            <Th isNumeric>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {registers.map((register) => (
            <Tr key={`register-${register.name}`}>
              <Td>{register.name}</Td>
              <Td isNumeric>{register.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InstructionsTable;
