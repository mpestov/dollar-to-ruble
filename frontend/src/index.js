import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';
import websocketMiddleware from './middlewares/websocket';
import websocketReducer from './reducers/websocket';
import forcedCurrencyRateReducer from './reducers/forced-currency-rate';
import './index.css';
import App from './components/App/App';

const store = createStore(
  combineReducers({
    websocket: websocketReducer,
    forcedCurrencyRate: forcedCurrencyRateReducer,
  }),
  applyMiddleware(
    ReduxThunk,
    websocketMiddleware,
  ),
);

require('dotenv').config();

axios.defaults.baseURL = `http://${process.env.REACT_APP_API_HOST}`;

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
