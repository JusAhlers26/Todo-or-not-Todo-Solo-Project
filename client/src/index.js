import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodosContextProvider } from './components/context/TodoContext'
import { AuthContextProvider } from './components/context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);