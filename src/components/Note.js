import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchNote } from '../actions/notes';
import { getNote, getNoteError, getNoteIsFetching } from '../selectors/notes';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';

class Note extends Component {

  render() {
    const {data} = this.props;

    return(
      <div>
        { data && <div>{data.name}</div> }
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  return {
    data: getNote(state.openNotesState, id),
    error: getNoteError(state.openNotesState, id),
    isFetching: getNoteIsFetching(state.openNotesState, id)
  };
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  doFetch: () => dispatch(doFetchNote(ownProps.match.params.id))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(requireAuth(dataLoading(Note)));