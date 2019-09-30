import { combineReducers } from 'redux';
import { routerReducer } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import crudReducer from './crudReducer';
import notesReducer from './notes';
import openNotesReducer from './openNotes';


const appReducer = combineReducers({
  form: formReducer,
  notesState: notesReducer,
  openNotesState: openNotesReducer,
  auth: authReducer,
  crud: crudReducer
});


const rootReducer = (state, action) => {
  if (action.type === 'STORE_RESET') {
    const { router, form } = state;

    if (typeof router != 'undefined') {
      state = { router, form };
    } else {
      state = { form };
    }
  }

  return appReducer(state, action)
};


export default rootReducer;