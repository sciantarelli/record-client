import { combineReducers } from 'redux';
import { routerReducer } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import notesReducer from './notes';
import openNotesReducer from './openNotes';


const appReducer = combineReducers({
  form: formReducer,
  notesState: notesReducer,
  openNotesState: openNotesReducer,
  auth: authReducer
});


const rootReducer = (state, action) => {
  if (action.type === 'STORE_RESET') {
    const { router, form } = state;
    state = { router, form };
  }
  return appReducer(state, action)
};


export default rootReducer;