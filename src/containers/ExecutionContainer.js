import { Box, Grid, Stack } from '@chakra-ui/react';
import InstructionsTable from '../components/execution/InstructionsTable';
import RegistersTable from '../components/execution/RegistersTable';
import MemoryTable from '../components/execution/MemoryTable';
import ClockTable from '../components/execution/ClockTable';

const ExecutionContainer = () => {
  return (
    <Box>
      <Stack spacing='24px'>
        <Grid gap='24px' templateColumns={{ base: '1fr', lg: '1fr 1fr 1fr' }}>
          <InstructionsTable />
          <RegistersTable />
          <MemoryTable />
        </Grid>

        <ClockTable />
      </Stack>
    </Box>
  );
};

export default ExecutionContainer;
