import { expectSaga, withReducer } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga-test-plan/matchers';
import watchAll from '../sagas';
import rootReducer from '../reducers';
import { doAuthSuccess } from '../actions/auth';
import { doNewNote, doCreateNote, doFetchNote } from '../actions/notes';
import { createNote, fetchNote } from '../api/notes';
import { INITIAL_STATE, START_HEADERS, END_HEADERS } from './support/constants';
import { INITIAL_AUTH_STATE } from '../reducers/auth';
import { DEFAULT_NOTE_STATE, INITIAL_OPEN_NOTES_STATE } from '../reducers/openNotes';
import { NEW_ID, NEW_NOTE_NAME } from '../constants';


const noteId = '5';

const noteValidationErrors = [
  'Content cannot be blank'
];

const error404 = {
  response: {
    status: 404,
    headers: END_HEADERS
  }
};

const error401 = {
  response: {
    status: 401
  }
};

const error422 = {
  response: {
    status: 422,
    data: {
      errors: noteValidationErrors
    },
    headers: END_HEADERS
  }
};

const expectSagaSetup = () =>
    expectSaga(watchAll)
        .withReducer(rootReducer)
        .dispatch(doAuthSuccess(START_HEADERS));


describe('Sagas for Error Handling', () => {

  it('Updates necessary state for handle404()', () => {

    const { accessToken, client, expiry, uid } =
        END_HEADERS;

    // This triggers handleFetchNote() saga
    return expectSagaSetup()
      .provide([
        [call.fn(fetchNote), throwError(error404)]
      ])
      .dispatch(doFetchNote(noteId))
      .hasFinalState({
        ...INITIAL_STATE,
        auth: {
          ...INITIAL_AUTH_STATE,
          accessToken, client, expiry, uid
        }
      })
      .silentRun();
  });


  it('Updates necessary state for handle401()', () => {

    // This triggers handleFetchNote() saga
    return expectSagaSetup()
      .provide([
        [call.fn(fetchNote), throwError(error401)]
      ])
      .dispatch(doFetchNote(noteId))
      .hasFinalState(INITIAL_STATE)
      .silentRun();
  });


  it('Updates necessary state for handle422()', () => {
    const { accessToken, client, expiry, uid } =
        END_HEADERS;

    return expectSagaSetup()
      .provide([
        [call.fn(createNote), throwError(error422)]
      ])
      .dispatch(doNewNote())
      .dispatch(doCreateNote({ name: NEW_NOTE_NAME, content: ''}))
      .hasFinalState({
        ...INITIAL_STATE,
        openNotesState: {
          ...INITIAL_OPEN_NOTES_STATE,
          [NEW_ID]: {
            ...DEFAULT_NOTE_STATE,
            name: NEW_NOTE_NAME,
            isDirty: true,
            validationErrors: noteValidationErrors
          }
        },
        auth: {
          ...INITIAL_AUTH_STATE,
          accessToken, client, expiry, uid
        }
      })
      .silentRun();
  });
});