import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import requireAuth from './requireAuth';
import { doLogoutUser } from '../actions/auth';
import { getOpenNotes } from '../selectors/notes';

class Logout extends Component {

  render() {
    const { openNotes, doLogout, doCancel } = this.props;

    return (
      <div>
        { (Object.keys(openNotes).length > 0) && <p>Warning, any unsaved changed to open notes will be discarded!</p> }

        <button onClick={doLogout}>Logout</button>
        <button onClick={doCancel}>Cancel</button>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  openNotes: getOpenNotes(state.openNotesState)
});


const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(doLogoutUser()),
  doCancel: () => dispatch(push('/'))
});

// This should requireAuth too
export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Logout));