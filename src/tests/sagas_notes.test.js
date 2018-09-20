import { expectSaga, withReducer } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import watchAll from '../sagas';
import notesReducer, { INITIAL_NOTES_STATE } from '../reducers/notes';
import openNotesReducer, { DEFAULT_NOTE_STATE } from '../reducers/openNotes';
import { fetchNote, fetchNotes, createNote, updateNote, deleteNote } from '../api/notes';
import { doFetchNote, doFetchNotes, doNewNote, doCreateNote, doUpdateNote, doDeleteNote } from '../actions/notes';
import { END_HEADERS } from './support/constants';


const fakeNote1 = {
  id: '5',
  name: 'Test Name 1',
  content: 'Test Content 1'
};


const fakeNote2 = {
  id: '6',
  name: 'Test Name 2',
  content: 'Test Content 2'
};


const fakeNotes = {
  [fakeNote1.id]: fakeNote1,
  [fakeNote2.id]: fakeNote2
};


const expectSagaSetup = (reducer = openNotesReducer) =>
    expectSaga(watchAll)
      .withReducer(reducer);


it('Fetches a note', () => {

  return expectSagaSetup()
    .provide([
      [matchers.call.fn(fetchNote), {
        data: fakeNote1,
        headers: END_HEADERS // This doesn't matter, just needed headers entry in the mocked object
      }]
    ])
    .dispatch(doFetchNote(fakeNote1.id))
    .hasFinalState({ [fakeNote1.id]: {
        ...DEFAULT_NOTE_STATE,
        ...fakeNote1
      }
    })
    .silentRun();
});


it('Fetches all notes', () => {

  return expectSagaSetup(notesReducer)
    .provide([
      [matchers.call.fn(fetchNotes), {
        data: fakeNotes,
        headers: END_HEADERS
      }]
    ])
    .dispatch(doFetchNotes())
    .hasFinalState({
      ...INITIAL_NOTES_STATE,
      notes: fakeNotes
    })
    .silentRun();
});


it('Creates a note', () => {

  return expectSagaSetup()
    .provide([
      [matchers.call.fn(createNote), {
        data: fakeNote1,
        headers: END_HEADERS
      }]
    ])
    .dispatch(doNewNote())
    .dispatch(doCreateNote(fakeNote1))
    .hasFinalState({
      [fakeNote1.id]: {
        ...DEFAULT_NOTE_STATE,
        ...fakeNote1
      }
    })
    .silentRun();
});


it('Updates a note', () => {

  const noteUpdated = {
    ...fakeNote1,
    name: 'Test Name 1 Updated',
    content: 'Test Content 1 Updated'
  };

  return expectSagaSetup()
      .provide([
        [matchers.call.fn(createNote), {
          data: fakeNote1,
          headers: END_HEADERS
        }],
        [matchers.call.fn(updateNote), {
          data: noteUpdated,
          headers: END_HEADERS
        }]
      ])
      .dispatch(doNewNote())
      .dispatch(doCreateNote(fakeNote1))
      .dispatch(doUpdateNote(noteUpdated))
      .hasFinalState({
        [fakeNote1.id]: {
          ...DEFAULT_NOTE_STATE,
          ...noteUpdated,
        }
      })
      .silentRun();
});


it('Deletes a note', () => {

  return expectSagaSetup()
      .provide([
        [matchers.call.fn(createNote), {
          data: fakeNote1,
          headers: END_HEADERS
        }],
        [matchers.call.fn(deleteNote), {
          headers: END_HEADERS
        }]
      ])
      .dispatch(doNewNote())
      .dispatch(doCreateNote(fakeNote1))
      .dispatch(doDeleteNote(fakeNote1.id))
      .hasFinalState({})
      .silentRun();
});

