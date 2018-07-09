import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const logger = createLogger();
const saga = createSagaMiddleware();

const createAppStore = initialState => {
  const store = createStore(
      rootReducer,
      (initialState || undefined),
      applyMiddleware(saga, logger)
  );

  saga.run(rootSaga);

  return store;
};



export default createAppStore;