import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import openNotesReducer from './openNotes';
import notesReducer from './notes';
import authReducer from './auth';

const rootReducer = combineReducers({
  form: formReducer,
  notesState: notesReducer,
  openNotesState: openNotesReducer,
  auth: authReducer,
  router: routerReducer
});

export default rootReducer;