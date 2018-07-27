import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, initialize } from 'redux-form';
import requireAuth from './requireAuth';
import dataLoading from './dataLoading';
import { doSaveNote, doFetchNote, doCloseNote } from '../actions/notes';
import { doDispatchThenRoute } from '../actions/routing';
import { getNote, getNoteError, getNoteValidationErrors, getNoteIsFetching, getNoteIsSaving } from '../selectors/notes';


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
    // Note, there are some warnings in the documentation about using shouldComponentUpdate: https://reactjs.org/docs/react-component.html#shouldcomponentupdate

    // However, this check seems simple and harmless.
    return !(
        data &&
        nextProps.data &&
        (data.id === nextProps.data.id) &&
        nextProps.data.inputChange
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

  onExplicitSubmit = formProps => {
    const { data, doCreateAndRoute, doSave } = this.props;

    (data && data.id) ? doSave(formProps) : doCreateAndRoute(formProps);
  };

  render() {
    console.log('*** rendering Note *** ');
    const { skipLoad, data, errorMessage, validationErrors, isFetching, isSaving, handleSubmit, doCloseAndRoute, doSaveCloseAndRoute } = this.props;

    if (!skipLoad && (!data || errorMessage || validationErrors)) return null;

    return (
      <div>
        { !isFetching && !isSaving &&
          <span>
            <button onClick={handleSubmit(this.onExplicitSubmit)}>
              Save
            </button>

            <button onClick={() => doSaveCloseAndRoute(data)}>
              Save+Close
            </button>

            <button onClick={doCloseAndRoute}>Close</button>
          </span>
        }

        <form onSubmit={handleSubmit(this.onExplicitSubmit)}>
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
                className="temp-textarea"
            />
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

  // TODO: Consider condensing this. data is the same as initialValues, but data is used by Data Loader so that's probably fine. But what about all these selectors? Maybe build into data a different way?
  return {
    data,
    errorMessage: getNoteError(state.openNotesState, id),
    validationErrors: getNoteValidationErrors(state.openNotesState, id),
    isFetching: getNoteIsFetching(state.openNotesState, id),
    isSaving: getNoteIsSaving(state.openNotesState, id),
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
        '/notes/:id',
        true // Not really necessary, but just in case any more actions are added in this sequence
      ));
    },
    doSave: (formProps) => dispatch(doSaveNote(formProps)),
    doCloseAndRoute: () => {
      dispatch(doDispatchThenRoute(
        doCloseNote(id),
        '/notes'
      ));
    },
    doSaveCloseAndRoute: (data) => {
      dispatch(doDispatchThenRoute(
        [doSaveNote(data), doCloseNote(data.id)],
        '/notes',
        !Number.isInteger(data.id)
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