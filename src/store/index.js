import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { attachPathNameToAction } from '../middleware/attach_pathname';
import rootSaga from '../sagas';


const logger = createLogger();
const saga = createSagaMiddleware();


const createClientStore = (initialState, history) => {

  if (!initialState || (initialState === '__SERVER_REDUX_STATE__')) {
    initialState = {};
  }

  let auth, expiry;

  // TODO: Refactor once this is solid
  if ((auth = JSON.parse(localStorage.getItem('auth')))) {

    if ((expiry = parseInt(auth.expiry, 10))
        && (Date.now() < (expiry * 1000))) {

      initialState.auth = auth
    } else {
      localStorage.removeItem('auth');
    }
  }

  const store = createStore(
      connectRouter(history)(rootReducer),
      initialState,
      compose(
        applyMiddleware(
          routerMiddleware(history),
          attachPathNameToAction,
          saga,
          logger
        )
      )
  );

  saga.run(rootSaga);

  return store;
};


const createServerStore = () => {

  const initialState = {};

  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(saga, logger)
  );

  saga.run(rootSaga);

  return store;
};



export { createClientStore, createServerStore };