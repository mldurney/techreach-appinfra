import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './src/reducers';
import { theme } from './src/config/theme';
import App from './src';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

const Main = () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  </StoreProvider>
);

export default Main;
