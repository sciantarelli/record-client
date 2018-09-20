import { INITIAL_AUTH_STATE } from '../../reducers/auth';
import { INITIAL_NOTES_STATE } from '../../reducers/notes';
import { INITIAL_OPEN_NOTES_STATE } from '../../reducers/openNotes';


export const START_HEADERS = {
  client: 'client start',
  accessToken: 'accessToken start',
  expiry: '1540000000',
  uid: 'uid start'
};

export const END_HEADERS = {
  client: 'client end',
  accessToken: 'accessToken end',
  expiry: '1550000000',
  uid: 'uid end'
};

export const INITIAL_STATE = {
  form: {},
  notesState: INITIAL_NOTES_STATE,
  openNotesState: INITIAL_OPEN_NOTES_STATE,
  auth: INITIAL_AUTH_STATE
};