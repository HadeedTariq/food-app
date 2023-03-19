import React from 'react';
import { StateProvider } from './context/StateProvider'
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import reducer from './context/reducer';
import { initialState } from './context/initialState';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>
);
