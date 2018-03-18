import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas';

import temperatureReducer from './TemperatureTaking/TemperatureReducer';
import authenticationReducer from './Authentication/AuthenticationReducer';
import loginReducer from './Authentication/LoginReducer';

import history from './history';

import Page from './Page';
import './App.css';

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  temperature: temperatureReducer,
  authentication: authenticationReducer,
  login: loginReducer,
});
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Page />
    </Router>
  </Provider>
);

export default App;
