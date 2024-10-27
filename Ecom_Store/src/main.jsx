// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure the path is correct
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Import your CSS file if needed

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped in Router
root.render(
  <Router>
    <App />
  </Router>
);
