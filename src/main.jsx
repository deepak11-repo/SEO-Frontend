import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import store, { persistor } from './store'; // Import persistor from store
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-right"/>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
