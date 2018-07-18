import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { doFetchNote, doUpdateNote } from '../actions/notes';
import { getNote, getNoteError, getNoteIsFetching, getNoteIsSaving } from '../selectors/notes';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';

class Note extends Component {

  onSubmit = formProps => {
    const { dispatch } = this.props;

    dispatch(doUpdateNote(formProps));
  };

  render() {
    const { data, errorMessage, isFetching, isSaving, handleSubmit } = this.props;

    if (!data || errorMessage) return null;

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


const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const data = getNote(state.openNotesState, id);

  return {
    data,
    errorMessage: getNoteError(state.openNotesState, id),
    isFetching: getNoteIsFetching(state.openNotesState, id),
    isSaving: getNoteIsSaving(state.openNotesState, id),
    initialValues: data
  };
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  doFetch: () => dispatch(doFetchNote(ownProps.match.params.id))
});

// TODO: Fix up this compose call
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'note',
      enableReinitialize: true
    })
)(requireAuth(dataLoading(Note)));