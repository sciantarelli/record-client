import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchNotes } from '../actions/notes';
import { getNotes, getNotesError, getNotesIsFetching } from '../selectors/notes';
import requireAuth from './requireAuth';
import { compose } from 'redux';

// TODO: If api call fails with an error, ideally it would retry if the error was something other than unauthorized or bad request
class Notes extends Component {

  // TODO: Consider refactoring this to a HOC, perhaps a data fetcher. Also, consider data fetching shouldn't run if user is logged out
  componentDidMount() {
    const { notes, onFetchNotes } = this.props;

    // TODO: Is this check necessary?
    if (!notes.length) {
      onFetchNotes();
    }
  }

  render() {
    const {isFetching, notes, error} = this.props;

    // TODO: Refactor everything in here to be reusable
    return (
      <div>
        { isFetching && <div>Loading...</div> }
        { error && <p className="error">{error.message}</p> }

        {(notes || []).map(note =>
          <div>{note.name}</div>
        )}
      </div>
    )
  }

};

const mapStateToProps = state => ({
  notes: getNotes(state.notesState),
  error: getNotesError(state.notesState),
  isFetching: getNotesIsFetching(state.notesState)
});


// TODO: Consider refactoring this to a HOC, otherwise it's unnecessary layer (could use dispatch in componentDidMount)
const mapDispatchToProps = (dispatch) => ({
  onFetchNotes: () => dispatch(doFetchNotes())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuth(Notes));