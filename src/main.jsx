import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import geocodingSlice from './features/geocodingSlice';
import weatherSlice from './features/weatherSlice';


const store = configureStore({
  reducer: {
    city: geocodingSlice,
    weather: weatherSlice,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</Provider>,
)
