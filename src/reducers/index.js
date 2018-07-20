import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import openNotesReducer from './openNotes';
import notesReducer from './notes';
import authReducer from './auth';


const appReducer = combineReducers({
  form: formReducer,
  notesState: notesReducer,
  openNotesState: openNotesReducer,
  auth: authReducer,
  router: routerReducer
});


const rootReducer = (state, action) => {
  if (action.type === 'STORE_RESET') {
    const { router, form } = state;
    state = { router, form };
  }
  return appReducer(state, action)
};


export default rootReducer;