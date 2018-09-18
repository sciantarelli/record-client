import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, initialize } from 'redux-form';
import { ButtonGroup } from 'reactstrap';
import { ButtonNaked } from './Buttons';
import { FlexFillContainer } from './FlexComponents';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';
import ActionsBar from './ActionsBar';
import CrudMessages from './CrudMessages';
import { doSaveNote, doFetchNote, doCloseNote, doDeleteNote } from '../actions/notes';
import { doDispatchThenRoute } from '../actions/routing';
import { getNote, getNoteError, getNoteValidationErrors, getNoteIsFetching, getNoteIsSaving, getNoteIsDeleting, getNoteIsDirty } from '../selectors/notes';
import { propertiesDoMatch } from '../helpers';
import { NOTES_PATH } from '../constants';


class Note extends Component {

  componentDidMount() {
    // TODO: The intent of this code was to perform an implicit submit every x seconds, which it did. However, I dislike the timer aspect of it. So then, thought to leave it up to componentWillUnmount, however, that doesn't fire when navigating directly from note to note. So this code is being saved for the purpose of a possible autosave feature, on a timer, etc.
    // const { handleSubmit } = this.props;
    // const submitter = handleSubmit(this.onImplicitSubmit);
    //
    // const intervalId = window.setInterval(() => {
    //   if (this.props.data) submitter();
    // }, 5000);
    //
    // this.setState({intervalId});
  }

  // TODO: See comment in componentDidMount.
  componentWillUnmount() {
    // const { handleSubmit } = this.props;
    // const submitter = handleSubmit(this.onImplicitSubmit);
    // window.clearInterval(this.state.intervalId);
    // submitter();
  }

  componentDidUpdate() {
    const { doInitializeForm } = this.props;
    const { formValues, data } = this.props;

    if (!formValues || !data || (formValues.id !== data.id)) {
      doInitializeForm(data);
      return;
    }

    const compare = ['name', 'content'];
    let identical = 0;

    for (let i=0; i < compare.length; i++) {
      let prop = compare[i];

      if (formValues[prop] === data[prop]) {
        identical++;
      }
    }

    if (identical !== compare.length) doInitializeForm(data);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { data } = this.props;
    const matchProps = ['id', 'isDirty', 'error', 'validationErrors'];
    // Note, there are some warnings in the documentation about using shouldComponentUpdate: https://reactjs.org/docs/react-component.html#shouldcomponentupdate

    // However, this check seems simple and harmless.
    return !(
        data &&
        nextProps.data &&
        propertiesDoMatch(data, nextProps.data, matchProps) &&
        nextProps.data.inputChangeOnly
    );
  }

  // Currently unused, but keep. See notes in componentDidMount
  onImplicitSubmit = formProps => {
    const { doSave, data } = this.props;
    const compare = ['name', 'content'];

    for (let i=0; i < compare.length; i++) {
      let prop = compare[i];

      if (formProps[prop] !== data[prop]) {
        doSave(formProps);
        break;
      }
    }
  };

  onExplicitSave = formProps => {
    const { data, doCreateAndRoute, doSave } = this.props;

    (data && data.id) ? doSave(formProps) : doCreateAndRoute(formProps);
  };

  onExplicitSaveAndClose = formProps => {
    const { doSaveCloseAndRoute } = this.props;

    doSaveCloseAndRoute(formProps);
  };

  render() {
    console.log('*** rendering Note *** ');
    const { data, isFetching, isSaving, isDeleting, isDirty, handleSubmit, doCloseAndRoute, doDelete } = this.props;
    const disabled = (isFetching || isSaving || isDeleting);

    return (
      <React.Fragment>
        { !disabled &&
          <ActionsBar>
            <ButtonGroup>
              <ButtonNaked disabled={!isDirty}
                           onClick={handleSubmit(this.onExplicitSave)}>
                Save
              </ButtonNaked>

              <ButtonNaked disabled={!isDirty}
                           onClick={handleSubmit(this.onExplicitSaveAndClose)}>
                Save+Close
              </ButtonNaked>

              <ButtonNaked onClick={doCloseAndRoute}>Close</ButtonNaked>

              <ButtonNaked disabled={!data || !data.id}
                      onClick={doDelete}>
                Delete
              </ButtonNaked>
            </ButtonGroup>
          </ActionsBar>
        }

        <CrudMessages { ...this.props } />

        <FlexFillContainer component='form'
                           onSubmit={handleSubmit(this.onExplicitSave)}>

          <Field
              className="component-name"
              name="name"
              type="text"
              component="input"
              disabled={disabled}
          />

          <Field
              className="component-content flex-fill"
              name="content"
              type="text"
              component="textarea"
              disabled={disabled}
          />

        </FlexFillContainer>
      </React.Fragment>
    )
  }
}

// Id can be explicitly passed for 'new' note, so that's checked first
const getIdFromOwnProps = (ownProps) =>
    ownProps.id || (ownProps.match && ownProps.match.params.id);


const mapStateToProps = (state, ownProps) => {
  const id = getIdFromOwnProps(ownProps);
  const data = getNote(state.openNotesState, id);

  // TODO: Consider condensing this. data is the same as initialValues, but data is used by Data Loader so that's probably fine. But what about all these selectors? Maybe build into data a different way?
  return {
    data,
    errorMessage: getNoteError(state.openNotesState, id),
    validationErrors: getNoteValidationErrors(state.openNotesState, id),
    isFetching: getNoteIsFetching(state.openNotesState, id),
    isSaving: getNoteIsSaving(state.openNotesState, id),
    isDeleting: getNoteIsDeleting(state.openNotesState, id),
    isDirty: getNoteIsDirty(state.openNotesState, id),
    initialValues: data,
    formValues: getFormValues('note')(state)
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  const id = getIdFromOwnProps(ownProps);

  return {
    doFetch: () => dispatch(doFetchNote(id)),
    doCreateAndRoute: (formProps) => {
      dispatch(doDispatchThenRoute(
        doSaveNote(formProps),
        `${NOTES_PATH}/:id`,
        true // Not really necessary, but just in case any more actions are added in this sequence
      ));
    },
    doSave: (formProps) => dispatch(doSaveNote(formProps)),
    doCloseAndRoute: () => {
      dispatch(doDispatchThenRoute(
        doCloseNote(id),
        NOTES_PATH
      ));
    },
    doSaveCloseAndRoute: (data) => {
      dispatch(doDispatchThenRoute(
        [doSaveNote(data), doCloseNote(data.id)],
        NOTES_PATH,
        !Number.isInteger(data.id)
      ));
    },
    doDelete: () =>  {
      dispatch(doDispatchThenRoute(
        doDeleteNote(id),
        NOTES_PATH
      ));
    },
    doInitializeForm: (data) => dispatch(initialize('note', data))
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: 'note',
      // Removing this in favor of manual re-initialization, which gives more control when syncing form to open notes
      // enableReinitialize: true
    }),
    requireAuth,
    dataLoading
)(Note);