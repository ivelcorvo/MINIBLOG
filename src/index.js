import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { DarkModeContextProvider } from './context/DarkModeContext';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>    
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
