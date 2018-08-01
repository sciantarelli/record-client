import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import MessagesContainer from './MessagesContainer';
import ErrorMessages from './ErrorMessages';
import { doAuthUser } from '../actions/auth';
import { getIsAuthenticating, getAuthError } from '../selectors/auth';

class Login extends Component {
  onSubmit = formProps => {
    const { dispatch } = this.props;

    dispatch(doAuthUser(formProps));
  };

  render() {
    const { handleSubmit, authError, isAuthenticating } = this.props;

    return (
      <div>
        <MessagesContainer>
          { isAuthenticating && <p>Logging In...</p> }

          <ErrorMessages>
            { authError && <p>{authError.message}</p> }
          </ErrorMessages>

        </MessagesContainer>

        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label>Email</label>
            <Field
                name="email"
                type="text"
                component="input"
                autoComplete="none"
            />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <Field
                name="password"
                type="password"
                component="input"
                autoComplete="none"
            />
          </fieldset>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: getIsAuthenticating(state.auth),
  authError: getAuthError(state.auth)
});

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'login' })
)(Login);
