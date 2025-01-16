import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: rootReducer
})
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
