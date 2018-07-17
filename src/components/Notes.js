import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchNotes } from '../actions/notes';
import { getNotes, getNotesError, getNotesIsFetching } from '../selectors/notes';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';

// TODO: If api call fails with an error, ideally it would retry if the error was something other than unauthorized or bad request
class Notes extends Component {

  render() {
    const {data} = this.props;

    return (
      <div>
        {(data || []).map(note =>
          <div>{note.name}</div>
        )}
      </div>
    )
  }

};

const mapStateToProps = state => ({
  data: getNotes(state.notesState),
  error: getNotesError(state.notesState),
  isFetching: getNotesIsFetching(state.notesState)
});

const mapDispatchToProps = (dispatch) => ({
  doFetch: () => dispatch(doFetchNotes())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuth(dataLoading(Notes)));