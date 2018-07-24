import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';
import { doCreateNote, doFetchNote, doUpdateNote, doCloseNote } from '../actions/notes';
import { getNote, getNoteError, getNoteIsFetching, getNoteIsSaving } from '../selectors/notes';


class Note extends Component {

  onSubmit = formProps => {
    const { data, doCreate, doUpdate } = this.props;

    (data && data.id) ? doUpdate(formProps) : doCreate(formProps);
  };

  render() {
    const { skipLoad, data, errorMessage, isFetching, isSaving, handleSubmit } = this.props;

    if (!skipLoad && (!data || errorMessage)) return null;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
                name="name"
                type="text"
                component="input"
            />
          </div>
          <div>
            <Field
                name="content"
                type="text"
                component="textarea"
                class="temp-textarea"
            />
          </div>

          <div>
            { !isFetching && !isSaving && <button>Save</button> }
          </div>
        </form>
      </div>
    )
  }
}

// Id can be explicitly passed for 'new' note, so that's checked first
const getIdFromOwnProps = (ownProps) =>
    ownProps.id || (ownProps.match && ownProps.match.params.id);


const mapStateToProps = (state, ownProps) => {
  const id = getIdFromOwnProps(ownProps);
  const data = getNote(state.openNotesState, id);

  return {
    data,
    errorMessage: getNoteError(state.openNotesState, id),
    isFetching: getNoteIsFetching(state.openNotesState, id),
    isSaving: getNoteIsSaving(state.openNotesState, id),
    initialValues: data
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  const id = getIdFromOwnProps(ownProps);

  return {
    doFetch: () => dispatch(doFetchNote(id)),
    doCreate: (formProps) => dispatch(doCreateNote(formProps)),
    doUpdate: (formProps) => dispatch(doUpdateNote(formProps)),
    doClose: () => dispatch(doCloseNote(id))
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'note',
      enableReinitialize: true
    }),
    requireAuth,
    dataLoading
)(Note);