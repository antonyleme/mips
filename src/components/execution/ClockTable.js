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

const ClockTable = () => {
  return (
    <Box border='1px solid' borderColor='gray.100'>
      <Box p='8px' border='1px solid' borderColor='gray.100' mb='16px'>
        <Heading textAlign={'center'} as='h2' fontSize='20px'>
          Ciclos de clock
        </Heading>
      </Box>
      <Table size='sm' variant='striped'>
        <Thead>
          <Tr>
            <Th>1</Th>
            <Th>2</Th>
            <Th>3</Th>
            <Th>4</Th>
            <Th>5</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>*</Td>
            <Td>*</Td>
            <Td>*</Td>
            <Td>*</Td>
            <Td>*</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ClockTable;
