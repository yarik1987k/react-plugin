import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataProvider } from './context/DataContext';
import 'regenerator-runtime/runtime';

document.querySelectorAll('.eight29-filters').forEach(app => {
  ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  app);
});