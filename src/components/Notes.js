import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';
import { AppLink } from './Links';
import ActionsBar from './ActionsBar';
import CrudMessages from './CrudMessages';
import { ButtonNaked } from './Buttons';
import { doFetchNotes } from '../actions/notes';
import { getNotes, getNotesError, getNotesIsFetching } from '../selectors/notes';
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
            {Object.keys(data || {}).map(id =>
                <AppLink to={`${NOTES_PATH}/${id}`} key={id} auth={true}>{data[id].name}</AppLink>
            )}
          </ul>
        </div>
    )
  }
};

const mapStateToProps = state => ({
  data: getNotes(state.notesState),
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