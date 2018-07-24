import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';
import { AppLink } from './Links';
import { doFetchNotes } from '../actions/notes';
import { getNotes, getNotesError, getNotesIsFetching } from '../selectors/notes';


// TODO: If api call fails with an error, ideally it would retry if the error was something other than unauthorized or bad request
class Notes extends Component {

  render() {
    const { data } = this.props;

    return (
      <ul>
        <AppLink to='/notes/new' auth={true}>Create Note</AppLink>

        {Object.keys(data || {}).map(id =>
          <AppLink to={`/notes/${id}`} key={id} auth={true}>{data[id].name}</AppLink>
        )}
      </ul>
    )
  }

};

const mapStateToProps = state => ({
  data: getNotes(state.notesState),
  errorMessage: getNotesError(state.notesState),
  isFetching: getNotesIsFetching(state.notesState)
});

const mapDispatchToProps = (dispatch) => ({
  doFetch: () => dispatch(doFetchNotes())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuth(dataLoading(Notes)));