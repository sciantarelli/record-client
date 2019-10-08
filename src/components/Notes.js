import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import requireAuth from './auth/requireAuth';
import dataLoading from './data/dataLoading';
import { AppLink } from './navigation/Links';
import ActionsBar from './input/ActionsBar';
import { CrudMessages } from './async';
import { ButtonNaked } from './input/Buttons';
import { doFetchNotes } from '../actions/notes';
import { getNotesArray, getNotesError, getNotesIsFetching } from '../selectors/notes';
import { NOTES_PATH, NEW_NOTE_PATH } from '../constants';


// TODO: If api call fails with an error, ideally it would retry if the error was something other than unauthorized or bad request
class Notes extends Component {

  render() {
    const { data, doNew } = this.props;

    return (
        <div>
          <ActionsBar>
            <ButtonNaked onClick={doNew}>
              Create Note
            </ButtonNaked>
          </ActionsBar>

          <CrudMessages { ...this.props } />

          <ul id="notes-list">
            {(data || []).map(note =>
                <AppLink to={`${NOTES_PATH}/${note.id}`} key={note.id} auth={true}>{note.name}</AppLink>
            )}
          </ul>
        </div>
    )
  }
};

const mapStateToProps = state => ({
  data: getNotesArray(state.notesState),
  errorMessage: getNotesError(state.notesState),
  isFetching: getNotesIsFetching(state.notesState)
});

const mapDispatchToProps = (dispatch) => ({
  doFetch: () => dispatch(doFetchNotes()),
  doNew: () => dispatch(push(NEW_NOTE_PATH))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuth(dataLoading(Notes)));