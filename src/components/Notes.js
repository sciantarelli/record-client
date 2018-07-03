import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchNotes } from '../actions/notes'

// TODO: If api call fails with an error, ideally it would retry if the error was something other than unauthorized or bad request
class Notes extends Component {

  // TODO: Consider refactoring this to a HOC
  componentDidMount() {
    const { notes, onFetchNotes } = this.props;

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
  // TODO: This should use a selector
    notes: state.notesState.notes,
    error: state.notesState.error,
    isFetching: state.notesState.isFetching
});


const mapDispatchToProps = (dispatch) => ({
  onFetchNotes: () => dispatch(doFetchNotes())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);