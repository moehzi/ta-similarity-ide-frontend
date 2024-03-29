import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './hooks/useAuth';
import { extendTheme } from '@chakra-ui/react';
import { MultiSelectTheme } from 'chakra-multiselect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    MultiSelect: MultiSelectTheme,
  },
  initialColorMode: 'system',
  useSystemColorMode: true,
});

root.render(
  <ChakraProvider theme={theme}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ChakraProvider>
);
