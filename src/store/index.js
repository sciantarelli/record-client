import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const logger = createLogger();
const saga = createSagaMiddleware();

const createAppStore = initialState => {

  if (!initialState || (initialState === '__SERVER_REDUX_STATE__')) {
    initialState = {};
  }

  let auth, expiry;

  // TODO: Refactor once this is solid
  if (typeof localStorage !== 'undefined'
      && (auth = JSON.parse(localStorage.getItem('auth')))) {

    if ((expiry = parseInt(auth.expiry, 10))
        && (Date.now() < (expiry * 1000))) {

      initialState.auth = auth
    } else {
      localStorage.removeItem('auth');
    }
  }

  const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(saga, logger)
  );

  saga.run(rootSaga);

  return store;
};



export default createAppStore;