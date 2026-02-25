import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Portfolio from './visva.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>
);
