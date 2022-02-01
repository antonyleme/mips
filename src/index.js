import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import { ChakraProvider } from '@chakra-ui/react';
import SimulatorProvider from './providers/SimulatorProvider';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <SimulatorProvider>
        <Home />
      </SimulatorProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
