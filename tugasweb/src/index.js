import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Home from './Page/home';
import { ChakraProvider } from '@chakra-ui/react';

// ...existing code...
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <ChakraProvider>
      <React.StrictMode>
        <App /> 
      </React.StrictMode>
    </ChakraProvider>
  </BrowserRouter>
);

// ...existing code...
reportWebVitals();