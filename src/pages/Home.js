import { Container } from '@chakra-ui/react';
import Form from '../components/Form';
import ExecutionContainer from '../containers/ExecutionContainer';
import useSimulator from '../hooks/use-simulator';
import Header from '../components/Header';

function Home() {
  const { submited } = useSimulator();

  return (
    <Container maxW='container.lg' py='64px'>
      <Header />

      {!submited ? <Form /> : <ExecutionContainer />}
    </Container>
  );
}

export default Home;
