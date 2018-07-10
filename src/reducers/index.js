import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import notesReducer from './notes';
import authReducer from './auth';

const rootReducer = combineReducers({
  form: formReducer,
  notesState: notesReducer,
  auth: authReducer
});

export default rootReducer;