import { combineReducers } from 'redux';
import notesReducer from './notes';

const rootReducer = combineReducers({
  notesState: notesReducer
});

export default rootReducer;