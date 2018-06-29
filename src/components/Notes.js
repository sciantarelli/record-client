import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doFetchNotes } from '../actions/notes'


class Notes extends Component {

  componentDidMount() {
    if (!this.props.notes) {
      this.props.onFetchNotes();
    }
  }

  render() {
    return (
        <div>Notes here!</div>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFetchNotes: () => dispatch(doFetchNotes())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notes);