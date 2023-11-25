import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/tictactoe">
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);