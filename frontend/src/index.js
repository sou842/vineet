import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthorContextProvider from './Components/AllContext/AllContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthorContextProvider>
    <Provider store={store}>
    <BrowserRouter>
    <ChakraProvider>
    <App />   
    </ChakraProvider>
    </BrowserRouter>
    </Provider>
    </AuthorContextProvider>
);