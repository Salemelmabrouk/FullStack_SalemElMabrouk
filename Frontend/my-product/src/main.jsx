// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct module for createRoot
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // Use createRoot

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
