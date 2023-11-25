import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOAP}`}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/PI-Food-GH">
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);