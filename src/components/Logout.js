import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import requireAuth from './requireAuth';
import MessagesContainer from './MessagesContainer';
import WarningMessages from './WarningMessages';
import { ButtonNaked } from './Buttons';
import { doLogoutUser } from '../actions/auth';
import { getOpenNotes } from '../selectors/notes';
import { dirtyRecordsExist } from '../helpers';

class Logout extends Component {

  render() {
    const { openNotes, doLogout, doCancel } = this.props;

    if (!dirtyRecordsExist(openNotes)) {
      doLogout();
      return null;
    }

    return (
      <div className="flex-container justify-content-center align-items-center">
        <MessagesContainer>
          <WarningMessages>
            <div>
              Warning! You have unsaved notes. All changes will be lost if you logout.
            </div>
          </WarningMessages>
        </MessagesContainer>

        <div>
          <ButtonNaked onClick={doLogout}>Logout</ButtonNaked>
          <ButtonNaked onClick={doCancel}>Cancel</ButtonNaked>
        </div>
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