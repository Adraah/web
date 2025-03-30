import React from 'react';
import ReactDOM from 'react-dom/client';  // Ensure you're importing from 'react-dom/client'
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import DashboardLayoutBranding from './App';

// Create a root with ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use root.render() to render the app
root.render(
  <React.StrictMode>
    <HashRouter>
      <DashboardLayoutBranding />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
